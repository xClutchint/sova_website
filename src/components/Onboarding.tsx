import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import gsap from 'gsap';

const SUPABASE_URL = 'https://dokxqmjiyieypbdrbbqm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRva3hxbWppeWlleXBiZHJiYnFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0ODY0NjAsImV4cCI6MjA4NDA2MjQ2MH0.XJTfLClEu9F8O3MXdehS9zUGJBcRVr7faXIdbc_rqhM';
const CWS_LINK = 'https://chromewebstore.google.com/detail/sova/bcgajmmdpahecgikfkmlijabhbmgoalb?utm_source=item-share-cb';

const isMobile = () => /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const CheckIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
);

const Onboarding = () => {
    const [sent, setSent] = useState(false);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendCooldown, setResendCooldown] = useState(0);
    const [installClicked, setInstallClicked] = useState(false);
    const [codeVerified, setCodeVerified] = useState(false);
    const [mobile] = useState(() => isMobile());
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const codeRef = useRef('');

    // Entrance animation
    useLayoutEffect(() => {
        const els = containerRef.current?.querySelectorAll('.ob-fade');
        if (!els || els.length === 0) return;
        gsap.set(els, { opacity: 1, y: 0 });
        const ctx = gsap.context(() => {
            gsap.from(els, {
                y: 30, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.05
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Animate transition from email to timeline
    useEffect(() => {
        if (!sent || !timelineRef.current || !formRef.current) return;
        const tl = gsap.timeline();
        tl.to(formRef.current, {
            height: 0, opacity: 0, marginBottom: 0, duration: 0.5, ease: 'power3.inOut',
            onComplete: () => { if (formRef.current) formRef.current.style.display = 'none'; }
        });
        const steps = timelineRef.current.querySelectorAll('.step-item');
        tl.fromTo(timelineRef.current,
            { display: 'none', opacity: 0 },
            { display: 'flex', opacity: 1, duration: 0.01 },
            '-=0.1'
        );
        tl.from(steps, {
            y: 40, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out'
        });
    }, [sent]);

    // Animate step 2 check when install is clicked
    useEffect(() => {
        if (!installClicked) return;
        const el = document.getElementById('step2-circle');
        if (el) {
            gsap.to(el, { scale: 0.8, duration: 0.15, ease: 'power2.in', onComplete: () => {
                gsap.to(el, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
            }});
        }
    }, [installClicked]);

    // Animate step 3 check + transition to thank you
    useEffect(() => {
        if (!codeVerified) return;
        const el = document.getElementById('step3-circle');
        if (el) {
            gsap.to(el, { scale: 0.8, duration: 0.15, ease: 'power2.in', onComplete: () => {
                gsap.to(el, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
            }});
        }
        // After a beat, morph to thank you
        setTimeout(() => {
            const timeline = timelineRef.current;
            if (timeline) {
                gsap.to(timeline, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' });
            }
        }, 1500);
    }, [codeVerified]);

    // Poll for code verification (check if extension claimed the code)
    const startPolling = useCallback(() => {
        if (pollingRef.current) return;
        pollingRef.current = setInterval(async () => {
            if (!codeRef.current) return;
            try {
                const res = await fetch(`${SUPABASE_URL}/rest/v1/website_signups?code=eq.${codeRef.current}&select=claimed`, {
                    headers: {
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    }
                });
                const data = await res.json();
                if (data?.[0]?.claimed === true) {
                    setCodeVerified(true);
                    if (pollingRef.current) clearInterval(pollingRef.current);
                    pollingRef.current = null;
                }
            } catch { /* silent */ }
        }, 3000);
    }, []);

    // Start polling once install is clicked
    useEffect(() => {
        if (installClicked) startPolling();
        return () => {
            if (pollingRef.current) clearInterval(pollingRef.current);
            pollingRef.current = null;
        };
    }, [installClicked, startPolling]);

    // Resend cooldown
    useEffect(() => {
        if (resendCooldown <= 0) return;
        const t = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
        return () => clearTimeout(t);
    }, [resendCooldown]);

    // Auto-focus
    useEffect(() => {
        if (!sent && !mobile) inputRef.current?.focus();
    }, [sent, mobile]);

    const sendCode = async (resend = false) => {
        const trimmed = email.trim().toLowerCase();
        if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
            setError('Enter a valid email address');
            return;
        }
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`${SUPABASE_URL}/functions/v1/website-signup`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'send', email: trimmed }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Something went wrong');
            // Store the code reference for polling (we fetch it from DB)
            // We'll poll by email instead since we don't have the code client-side
            if (!resend) setSent(true);
            setResendCooldown(30);
            // Fetch the code for polling
            try {
                const codeRes = await fetch(`${SUPABASE_URL}/rest/v1/website_signups?email=eq.${encodeURIComponent(trimmed)}&claimed=eq.false&order=created_at.desc&limit=1&select=code`, {
                    headers: {
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    }
                });
                const codeData = await codeRes.json();
                if (codeData?.[0]?.code) codeRef.current = codeData[0].code;
            } catch { /* silent */ }
        } catch (e: any) {
            setError(e.message || 'Failed to send code');
        } finally {
            setLoading(false);
        }
    };

    const handleInstallClick = () => {
        setInstallClicked(true);
        window.open(CWS_LINK, '_blank');
    };

    // Mobile
    if (mobile) {
        // Mobile: sent state
        if (sent) {
            return (
                <div ref={containerRef} className="min-h-screen bg-[#1A1A1A] text-cream flex items-center justify-center px-6 py-12 relative overflow-x-hidden overflow-y-auto">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/[0.05] rounded-full blur-[100px]"></div>
                    </div>
                    <div className="relative z-10 text-center max-w-sm w-full">
                        {/* Logo */}
                        <div className="ob-fade flex items-center justify-center gap-2 mb-10">
                            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-cream"></div>
                            </div>
                            <span className="font-outfit font-bold text-base text-cream/60">SOVA</span>
                        </div>

                        {/* Check sent icon */}
                        <div className="ob-fade w-16 h-16 rounded-full bg-primary mx-auto mb-6 flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.25)]">
                            <CheckIcon />
                        </div>

                        <h1 className="ob-fade text-2xl font-sans font-bold mb-2 tracking-tight">
                            Code sent to your <span className="font-serif italic text-primary font-medium">inbox.</span>
                        </h1>
                        <p className="ob-fade text-sm font-mono text-cream/50 mb-6">{email}</p>

                        {/* Divider */}
                        <div className="ob-fade w-12 h-px bg-white/[0.08] mx-auto mb-6"></div>

                        {/* Desktop instruction */}
                        <div className="ob-fade mb-6">
                            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cream/40">
                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                                </svg>
                            </div>
                            <h2 className="text-lg font-sans font-bold text-cream mb-2">Now head to your desktop</h2>
                            <p className="text-sm text-cream/40 font-sans leading-relaxed">
                                SOVA is a Chrome extension. Install it on your desktop browser, then enter the code from your email.
                            </p>
                        </div>

                        {/* Steps */}
                        <div className="ob-fade text-left space-y-4 mb-8">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="text-[10px] font-mono font-bold text-primary">1</span>
                                </div>
                                <p className="text-sm text-cream/50 font-sans">Open <span className="font-mono text-primary">subsova.com</span> on your computer</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="text-[10px] font-mono font-bold text-primary">2</span>
                                </div>
                                <p className="text-sm text-cream/50 font-sans">Install SOVA from the Chrome Web Store</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="text-[10px] font-mono font-bold text-primary">3</span>
                                </div>
                                <p className="text-sm text-cream/50 font-sans">Enter the 6-digit code from your email</p>
                            </div>
                        </div>

                        {/* Link box */}
                        <div className="ob-fade bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-4 mb-6">
                            <p className="text-[10px] font-mono text-cream/30 uppercase tracking-wider mb-1">Open on your computer</p>
                            <p className="text-base font-mono text-primary font-bold select-all">subsova.com</p>
                        </div>

                        {/* Resend */}
                        <div>
                            {resendCooldown > 0 ? (
                                <span className="text-xs font-mono text-cream/20">Resend in {resendCooldown}s</span>
                            ) : (
                                <button
                                    onClick={() => sendCode(true)}
                                    disabled={loading}
                                    className="text-xs font-mono text-primary/60 hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
                                >
                                    {loading ? 'Sending...' : 'Resend code'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        // Mobile: email input
        return (
            <div ref={containerRef} className="min-h-screen bg-[#1A1A1A] text-cream flex items-center justify-center px-6 py-12 relative overflow-x-hidden overflow-y-auto">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/[0.06] rounded-full blur-[100px]"></div>
                </div>
                <div className="relative z-10 text-center max-w-sm w-full">
                    <div className="ob-fade flex items-center justify-center gap-2 mb-10">
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-cream"></div>
                        </div>
                        <span className="font-outfit font-bold text-base text-cream/60">SOVA</span>
                    </div>

                    <h1 className="ob-fade text-3xl font-sans font-bold mb-3 tracking-tight">
                        Get started<br/><span className="font-serif italic text-primary font-medium">with SOVA.</span>
                    </h1>
                    <p className="ob-fade text-sm text-cream/40 font-sans leading-relaxed mb-8">
                        Enter your email to receive a setup code. You'll use it on your desktop to complete onboarding.
                    </p>

                    {/* Email input */}
                    <div className="ob-fade mb-3 text-left">
                        <input
                            type="email"
                            value={email}
                            onChange={e => { setEmail(e.target.value); setError(''); }}
                            onKeyDown={e => e.key === 'Enter' && sendCode()}
                            placeholder="you@email.com"
                            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 py-4 text-base font-sans text-cream placeholder:text-cream/20 focus:outline-none focus:border-primary/40 focus:bg-white/[0.06] transition-all duration-300"
                            autoComplete="email"
                        />
                        {error && (
                            <p className="text-xs font-sans text-primary mt-2 ml-1">{error}</p>
                        )}
                    </div>

                    <button
                        onClick={() => sendCode()}
                        disabled={loading}
                        className="w-full bg-primary text-white py-4 rounded-2xl text-base font-bold font-sans flex items-center justify-center gap-2 shadow-[0_10px_40px_rgba(239,68,68,0.2)] disabled:opacity-50 disabled:cursor-not-allowed border-none cursor-pointer"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                Send Setup Code
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </>
                        )}
                    </button>

                    <p className="text-[11px] text-cream/20 font-sans mt-4 leading-relaxed">
                        Used for billing reminders only. Never sold or shared.
                        <br/>
                        <a href="#/privacy" className="text-cream/30 hover:text-cream/50 transition-colors underline">Privacy Policy</a>
                    </p>
                </div>
            </div>
        );
    }

    // Thank you state
    if (codeVerified && sent) {
        return (
            <div className="min-h-screen bg-[#1A1A1A] text-cream flex items-center justify-center px-4 md:px-6 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/[0.06] rounded-full blur-[120px]"></div>
                </div>
                <div className="relative z-10 text-center max-w-lg">
                    <div className="w-20 h-20 rounded-full bg-primary mx-auto mb-8 flex items-center justify-center shadow-[0_0_60px_rgba(239,68,68,0.3)]">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-sans font-bold tracking-tight leading-[0.95] mb-4">
                        You're <span className="font-serif italic text-primary font-medium">all set.</span>
                    </h1>
                    <p className="text-base text-cream/40 font-sans leading-relaxed mb-2">
                        SOVA is now tracking your subscriptions.
                    </p>
                    <p className="text-sm text-cream/30 font-sans">
                        Reminders will be sent to <span className="font-mono text-cream/50">{email}</span>
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                        <span className="text-xs font-mono text-cream/30 uppercase tracking-widest">System active</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="min-h-screen bg-[#1A1A1A] text-cream flex items-center justify-center px-4 md:px-6 py-12 relative overflow-x-hidden overflow-y-auto">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-lg">
                {/* Logo */}
                <div className="ob-fade flex items-center gap-2 mb-10 md:mb-14">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-cream"></div>
                    </div>
                    <span className="font-outfit font-bold text-base text-cream/60">SOVA</span>
                </div>

                {/* Headline */}
                <h1 className="ob-fade text-3xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight leading-[0.95] mb-4 md:mb-6">
                    {sent ? (
                        <>You're <span className="font-serif italic text-primary font-medium">almost in.</span></>
                    ) : (
                        <>Get started<br/><span className="font-serif italic text-primary font-medium">with SOVA.</span></>
                    )}
                </h1>

                {!sent && (
                    <p className="ob-fade text-sm md:text-base text-cream/40 font-sans leading-relaxed mb-6 md:mb-8 max-w-md">
                        Enter your email to receive a setup code. You'll use it once in the extension to complete onboarding.
                    </p>
                )}

                {/* Email form - collapses after send */}
                <div ref={formRef} className="overflow-hidden mb-6">
                    <div className="ob-fade mb-3">
                        <input
                            ref={inputRef}
                            type="email"
                            value={email}
                            onChange={e => { setEmail(e.target.value); setError(''); }}
                            onKeyDown={e => e.key === 'Enter' && sendCode()}
                            placeholder="you@email.com"
                            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl px-6 py-4 text-base font-sans text-cream placeholder:text-cream/20 focus:outline-none focus:border-primary/40 focus:bg-white/[0.06] transition-all duration-300"
                            autoComplete="email"
                        />
                        {error && (
                            <p className="text-xs font-sans text-primary mt-2 ml-1">{error}</p>
                        )}
                    </div>

                    <button
                        onClick={() => sendCode()}
                        disabled={loading}
                        className="w-full bg-primary text-white py-4 rounded-2xl text-base font-bold font-sans flex items-center justify-center gap-2 shadow-[0_10px_40px_rgba(239,68,68,0.2)] hover:shadow-[0_15px_50px_rgba(239,68,68,0.3)] transition-all duration-300 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed border-none cursor-pointer"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                Send Setup Code
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </>
                        )}
                    </button>

                    <p className="text-[11px] text-cream/20 font-sans mt-4 text-center leading-relaxed">
                        Used for billing reminders only. Stored on your device, never on our servers.
                        <br/>
                        <a href="#/privacy" className="text-cream/30 hover:text-cream/50 transition-colors underline">Privacy Policy</a>
                    </p>
                </div>

                {/* Timeline - appears after send */}
                <div ref={timelineRef} className="flex-col gap-0 hidden">

                    {/* Step 1: Code sent - always complete */}
                    <div className="step-item flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                                <CheckIcon />
                            </div>
                            <div className={`w-px flex-1 my-2 transition-colors duration-500 ${installClicked ? 'bg-primary/40' : 'bg-white/[0.08]'}`}></div>
                        </div>
                        <div className="pb-8 pt-1.5">
                            <h3 className="font-sans font-bold text-base text-cream mb-1">Code sent</h3>
                            <p className="text-sm text-cream/40 font-sans leading-relaxed">
                                We sent a 6-digit setup code to <span className="text-cream/70 font-mono">{email}</span>
                            </p>
                            <div className="mt-3">
                                {resendCooldown > 0 ? (
                                    <span className="text-xs font-mono text-cream/20">Resend in {resendCooldown}s</span>
                                ) : (
                                    <button
                                        onClick={() => sendCode(true)}
                                        disabled={loading}
                                        className="text-xs font-mono text-primary/60 hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
                                    >
                                        {loading ? 'Sending...' : 'Resend code'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Install */}
                    <div className="step-item flex gap-4">
                        <div className="flex flex-col items-center">
                            <div
                                id="step2-circle"
                                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${
                                    installClicked
                                        ? 'bg-primary shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                                        : 'bg-white/[0.06] border border-white/[0.08]'
                                }`}
                            >
                                {installClicked ? (
                                    <CheckIcon />
                                ) : (
                                    <span className="text-sm font-mono font-bold text-cream/50">2</span>
                                )}
                            </div>
                            <div className={`w-px flex-1 my-2 transition-colors duration-500 ${codeVerified ? 'bg-primary/40' : 'bg-white/[0.08]'}`}></div>
                        </div>
                        <div className="pb-8 pt-1.5">
                            <h3 className="font-sans font-bold text-base text-cream mb-1">
                                {installClicked ? 'Extension installed' : 'Install the extension'}
                            </h3>
                            {installClicked ? (
                                <p className="text-sm text-cream/40 font-sans leading-relaxed">
                                    SOVA has been added to Chrome.
                                </p>
                            ) : (
                                <>
                                    <p className="text-sm text-cream/40 font-sans leading-relaxed mb-4">
                                        Add SOVA to Chrome. It opens automatically after install.
                                    </p>
                                    <button
                                        onClick={handleInstallClick}
                                        className="inline-flex items-center gap-3 bg-primary text-white px-6 py-3 rounded-full text-sm font-bold font-sans border-none cursor-pointer shadow-[0_8px_30px_rgba(239,68,68,0.25)] hover:shadow-[0_12px_40px_rgba(239,68,68,0.35)] transition-all duration-300 hover:scale-[1.02]"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white/80">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                                            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
                                            <line x1="21.17" y1="8" x2="15.34" y2="8" stroke="currentColor" strokeWidth="1.5"/>
                                            <line x1="8.66" y1="8" x2="2.83" y2="8" stroke="currentColor" strokeWidth="1.5"/>
                                            <line x1="12" y1="2" x2="12" y2="5.5" stroke="currentColor" strokeWidth="1.5"/>
                                        </svg>
                                        Install SOVA for Chrome
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Step 3: Enter code */}
                    <div className="step-item flex gap-4">
                        <div className="flex flex-col items-center">
                            <div
                                id="step3-circle"
                                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${
                                    codeVerified
                                        ? 'bg-primary shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                                        : 'bg-white/[0.06] border border-white/[0.08]'
                                }`}
                            >
                                {codeVerified ? (
                                    <CheckIcon />
                                ) : (
                                    <span className="text-sm font-mono font-bold text-cream/50">3</span>
                                )}
                            </div>
                        </div>
                        <div className="pt-1.5">
                            <h3 className="font-sans font-bold text-base text-cream mb-1">
                                {codeVerified ? 'Code verified' : 'Enter your code'}
                            </h3>
                            <p className="text-sm text-cream/40 font-sans leading-relaxed">
                                {codeVerified
                                    ? 'Your email has been linked successfully.'
                                    : 'When SOVA opens, tap "I have a setup code" and enter the 6-digit code from your email.'
                                }
                            </p>
                            {installClicked && !codeVerified && (
                                <div className="mt-3 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                                    <span className="text-xs font-mono text-cream/30">Waiting for code entry...</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Skip link */}
                {!sent && (
                    <div className="mt-4 pt-6 border-t border-white/[0.04]">
                        <a href={CWS_LINK} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-cream/20 hover:text-cream/40 transition-colors no-underline">
                            Skip and install directly from Chrome Web Store &rarr;
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Onboarding;
