import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PrivacyPage = () => {
    const container = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.priv-fade', {
                y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.15
            });
            gsap.utils.toArray('.priv-section').forEach((el) => {
                gsap.from(el as Element, {
                    scrollTrigger: { trigger: el as Element, start: 'top 85%' },
                    y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'
                });
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={container} className="min-h-screen bg-[#1A1A1A] text-cream selection:bg-primary/20">

            {/* Hero */}
            <section className="relative w-full min-h-[60vh] flex items-end overflow-hidden">
                {/* Subtle radial glow */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[120px]"></div>
                </div>

                <div className="max-w-5xl mx-auto w-full px-4 md:px-6 pb-16 md:pb-24 pt-32 relative z-10">
                    <a href="#" className="priv-fade inline-flex items-center gap-2 text-xs font-mono text-cream/30 hover:text-cream/60 transition-colors mb-12 uppercase tracking-widest">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        Home
                    </a>

                    <h1 className="priv-fade text-4xl md:text-6xl lg:text-[5.5rem] font-sans font-bold tracking-tight leading-[0.95] mb-6">
                        Privacy at <span className="font-serif italic text-primary font-medium">SOVA.</span>
                    </h1>

                    <p className="priv-fade text-base md:text-xl font-sans text-cream/50 max-w-2xl leading-relaxed">
                        Your subscription data belongs to you. Here's exactly what we collect, what touches our servers, and what we'll never ask for.
                    </p>

                    <div className="priv-fade flex items-center gap-3 mt-10">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                        <span className="text-xs font-mono text-cream/30 uppercase tracking-widest">Last updated March 2026</span>
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="max-w-5xl mx-auto px-4 md:px-6">
                <div className="w-full h-px bg-white/[0.06]"></div>
            </div>

            {/* TL;DR */}
            <section className="priv-section max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16">
                    <div>
                        <span className="text-xs font-mono text-primary tracking-widest uppercase">Summary</span>
                    </div>
                    <div>
                        <p className="text-lg md:text-2xl font-sans text-cream/80 leading-relaxed font-medium">
                            Detection runs in your browser. Data lives on your device. If you sync across devices, everything is encrypted before it leaves. We never touch bank credentials, never read your emails server-side, and never store browsing history.
                        </p>
                        <p className="text-base font-sans text-cream/40 leading-relaxed mt-6">
                            Two things briefly pass through our servers in transit: reminder emails (to deliver them via SendGrid) and optional checkout screenshots (to extract subscription details via AI). Both are processed in memory and immediately discarded. They are never written to a database or log file.
                        </p>
                    </div>
                </div>
            </section>

            <div className="max-w-5xl mx-auto px-4 md:px-6"><div className="w-full h-px bg-white/[0.06]"></div></div>

            {/* What stays on device */}
            <section className="priv-section max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16">
                    <div>
                        <span className="text-xs font-mono text-primary tracking-widest uppercase">Your Device</span>
                        <h2 className="text-2xl md:text-3xl font-sans font-bold mt-3 tracking-tight">What stays local</h2>
                    </div>
                    <div className="space-y-8">
                        {[
                            { title: "Subscriptions", text: "Service names, amounts, billing dates, frequencies. All stored in Chrome's built-in storage on your machine." },
                            { title: "Email address", text: "Only stored if you opt into reminders. Lives on your device, never persisted on our servers." },
                            { title: "Account ID", text: "A randomly generated 24-character string with no connection to your real identity." },
                            { title: "Encryption keys", text: "Generated on your device for sync encryption. Never uploaded or shared." },
                            { title: "Preferences", text: "Currency, reminder settings, display options. All local." },
                        ].map((item, i) => (
                            <div key={i} className="group">
                                <div className="flex items-baseline gap-4">
                                    <span className="text-xs font-mono text-cream/20 tabular-nums w-6 shrink-0">0{i + 1}</span>
                                    <div>
                                        <h3 className="font-sans font-semibold text-cream/90 text-base mb-1">{item.title}</h3>
                                        <p className="font-sans text-sm text-cream/40 leading-relaxed">{item.text}</p>
                                    </div>
                                </div>
                                {i < 4 && <div className="mt-6 ml-10 h-px bg-white/[0.04]"></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="max-w-5xl mx-auto px-4 md:px-6"><div className="w-full h-px bg-white/[0.06]"></div></div>

            {/* What touches servers */}
            <section className="priv-section max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16">
                    <div>
                        <span className="text-xs font-mono text-primary tracking-widest uppercase">Our Servers</span>
                        <h2 className="text-2xl md:text-3xl font-sans font-bold mt-3 tracking-tight">What briefly passes through</h2>
                    </div>
                    <div className="space-y-10">
                        {[
                            { title: "Encrypted sync snapshots", badge: "ENCRYPTED", text: "When you enable cross-device sync, your data is encrypted with AES-256 on your device before upload. We store the encrypted blob temporarily. We cannot read it." },
                            { title: "Reminder emails", badge: "IN TRANSIT", text: "Subscription name, amount, and date are sent to our email service to compose and deliver the reminder. Processed in memory, then discarded." },
                            { title: "Checkout screenshots", badge: "IN TRANSIT", text: "When you confirm tracking, a screenshot is sent to our server to extract subscription details. Processed in memory, never stored or logged." },
                            { title: "Transfer codes", badge: "EPHEMERAL", text: "One-time codes for syncing to a new device. Expire automatically after 24 hours." },
                            { title: "Deduplication hashes", badge: "HASHED", text: "One-way hashes to prevent duplicate reminder emails. We cannot reverse them to get subscription names." },
                        ].map((item, i) => (
                            <div key={i}>
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-sans font-semibold text-cream/90 text-base">{item.title}</h3>
                                    <span className="text-[9px] font-mono font-bold tracking-wider text-primary/70 bg-primary/[0.08] px-2 py-0.5 rounded-full">{item.badge}</span>
                                </div>
                                <p className="font-sans text-sm text-cream/40 leading-relaxed">{item.text}</p>
                                {i < 4 && <div className="mt-8 h-px bg-white/[0.04]"></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="max-w-5xl mx-auto px-4 md:px-6"><div className="w-full h-px bg-white/[0.06]"></div></div>

            {/* What we never see */}
            <section className="priv-section max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16">
                    <div>
                        <span className="text-xs font-mono text-primary tracking-widest uppercase">Off Limits</span>
                        <h2 className="text-2xl md:text-3xl font-sans font-bold mt-3 tracking-tight">What we never see</h2>
                    </div>
                    <div>
                        <div className="space-y-4">
                            {[
                                "Your browsing history or what pages you visit",
                                "Bank credentials, Plaid access, or credit card numbers",
                                "Your subscription data in plaintext on our servers",
                                "Gmail inbox contents (scanning runs entirely in your browser)",
                                "Google account credentials or OAuth tokens",
                                "Your real name, phone number, or address",
                                "Cookies, IP addresses, or device fingerprints for tracking",
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <span className="text-primary/50 text-lg leading-none mt-0.5 shrink-0">/</span>
                                    <p className="font-sans text-sm text-cream/50 leading-relaxed">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-5xl mx-auto px-4 md:px-6"><div className="w-full h-px bg-white/[0.06]"></div></div>

            {/* Data retention */}
            <section className="priv-section max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16">
                    <div>
                        <span className="text-xs font-mono text-primary tracking-widest uppercase">Retention</span>
                        <h2 className="text-2xl md:text-3xl font-sans font-bold mt-3 tracking-tight">When data gets deleted</h2>
                    </div>
                    <div className="space-y-0">
                        {[
                            { data: "Sync snapshots", when: "7 days of inactivity" },
                            { data: "Transfer codes", when: "24 hours" },
                            { data: "Reminder dedup hashes", when: "30 days" },
                            { data: "Cancellation intents", when: "Immediately after pickup" },
                            { data: "Account record", when: "On request" },
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between items-baseline py-4 border-b border-white/[0.04]">
                                <span className="font-sans text-sm text-cream/60">{item.data}</span>
                                <span className="font-mono text-xs text-cream/30 text-right">{item.when}</span>
                            </div>
                        ))}
                        <p className="text-sm text-cream/30 font-sans mt-6">
                            You can reset your account at any time from SOVA's settings, which clears all cloud data tied to your account ID.
                        </p>
                    </div>
                </div>
            </section>

            <div className="max-w-5xl mx-auto px-4 md:px-6"><div className="w-full h-px bg-white/[0.06]"></div></div>

            {/* Permissions */}
            <section className="priv-section max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16">
                    <div>
                        <span className="text-xs font-mono text-primary tracking-widest uppercase">Permissions</span>
                        <h2 className="text-2xl md:text-3xl font-sans font-bold mt-3 tracking-tight">Why we ask</h2>
                    </div>
                    <div className="space-y-0">
                        {[
                            { perm: "storage", why: "Save subscriptions and settings locally in your browser." },
                            { perm: "activeTab", why: "Capture a screenshot when you click 'Track' on a detected checkout." },
                            { perm: "tabs", why: "Open cancellation pages and onboarding flows." },
                            { perm: "alarms", why: "Schedule checks for upcoming billing dates and trial expirations." },
                            { perm: "notifications", why: "Surface browser alerts for charges and trial endings." },
                            { perm: "all URLs", why: "Detection runs on every page to identify subscription checkouts. All analysis is local." },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 py-4 border-b border-white/[0.04]">
                                <code className="text-xs font-mono text-primary/60 w-24 md:w-28 shrink-0 pt-0.5">{item.perm}</code>
                                <p className="text-sm text-cream/40 font-sans leading-relaxed">{item.why}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="max-w-5xl mx-auto px-4 md:px-6"><div className="w-full h-px bg-white/[0.06]"></div></div>

            {/* Email reminders */}
            <section className="priv-section max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16">
                    <div>
                        <span className="text-xs font-mono text-primary tracking-widest uppercase">Reminders</span>
                        <h2 className="text-2xl md:text-3xl font-sans font-bold mt-3 tracking-tight">Email delivery</h2>
                    </div>
                    <div>
                        <p className="font-sans text-sm text-cream/50 leading-relaxed mb-4">
                            If you provide an email, SOVA sends you reminders before trials end or payments renew. Your email lives on your device and is only sent to our server at the moment of delivery. We use SendGrid to send the email. The content is composed in transit and never logged or retained.
                        </p>
                        <p className="font-sans text-sm text-cream/50 leading-relaxed">
                            Remove your email from SOVA's settings at any time to stop all reminders. There is no account to delete on our end because we never stored it.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="max-w-5xl mx-auto px-4 md:px-6 py-12 border-t border-white/[0.06]">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-sm font-sans text-cream/30">
                        <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                            <div className="w-1 h-1 rounded-full bg-cream"></div>
                        </div>
                        SOVA
                    </div>
                    <p className="text-xs font-sans text-cream/20">
                        Questions? <a href="mailto:sova.extension@gmail.com" className="text-cream/40 hover:text-cream/60 transition-colors">sova.extension@gmail.com</a>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default PrivacyPage;
