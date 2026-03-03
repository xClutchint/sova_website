import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Chrome, Search, MousePointer2, CheckCircle, CreditCard, Bell } from 'lucide-react';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

// Sub-components for Right Side visual artifacts
const Artifacts = [
    // Step 1: Install
    ({ progress }: { progress: number }) => (
        <div className="w-[320px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col items-center">
            <Chrome className="w-12 h-12 text-cream/80 mb-4" />
            <h3 className="text-xl font-sans font-bold text-cream mb-1">SOVA</h3>
            <p className="text-sm font-sans text-cream/50 mb-6">Subscription Intelligence</p>

            <div className="relative w-full h-12 bg-charcoal rounded-full overflow-hidden flex items-center justify-center border border-white/10">
                <div
                    className="absolute top-0 left-0 h-full bg-primary origin-left transition-transform duration-300 ease-linear"
                    style={{ transform: `scaleX(${progress < 0.5 ? progress * 2 : 1})` }}
                />
                <span className="relative z-10 text-sm font-bold font-sans text-white">
                    {progress < 0.5 ? 'Installing...' : 'Added to Chrome'}
                </span>
                {progress >= 0.5 && (
                    <CheckCircle className="relative z-10 w-4 h-4 ml-2 text-white animate-[bounceIn_0.5s_cubic-bezier(0.34,1.56,0.64,1)]" />
                )}
            </div>
        </div>
    ),
    // Step 2: Detect
    ({ progress }: { progress: number }) => (
        <div className="w-[480px] h-[300px] bg-charcoal/50 rounded-lg border border-white/10 shadow-2xl overflow-hidden flex flex-col relative">
            {/* Mock Header */}
            <div className="h-10 border-b border-white/5 bg-charcoal/80 flex items-center px-4 gap-2">
                <div className="flex gap-1.5 opacity-50"><div className="w-2.5 h-2.5 rounded-full bg-red-400" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-400" /><div className="w-2.5 h-2.5 rounded-full bg-green-400" /></div>
                <div className={clsx("ml-4 flex-1 h-6 rounded-md bg-white/5 border flex items-center px-3 transition-colors duration-500", progress > 0.3 ? "border-primary/50 text-primary" : "border-white/5 text-white/30")}>
                    <Search className="w-3 h-3 mr-2 font-bold" />
                    <span className="text-[10px] font-mono">notion.so/pricing</span>
                </div>
                {/* Sonar */}
                <div className="relative w-6 h-6 flex items-center justify-center">
                    <div className={clsx("w-3 h-3 rounded-full bg-primary/20", progress > 0.3 && "animate-[ping_2s_infinite]")}></div>
                    <div className={clsx("absolute w-2 h-2 rounded-full", progress > 0.3 ? "bg-primary" : "bg-white/20")}></div>
                </div>
            </div>
            {/* Mock Content */}
            <div className="flex-1 p-6">
                <div className="w-1/3 h-4 bg-white/10 rounded mb-4"></div>
                <div className="flex gap-4">
                    <div className="flex-1 h-32 bg-white/5 rounded-lg border border-white/5"></div>
                    <div className={clsx("flex-1 h-32 rounded-lg border transition-all duration-500", progress > 0.3 ? "bg-primary/5 border-primary/30" : "bg-white/5 border-white/5")}></div>
                    <div className="flex-1 h-32 bg-white/5 rounded-lg border border-white/5"></div>
                </div>
            </div>
        </div>
    ),
    // Step 3: Popup Appears
    ({ progress }: { progress: number }) => (
        <div className="w-[300px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[-10px_-10px_30px_rgba(0,0,0,0.5)] rounded-2xl p-5 relative overflow-hidden">
            <p className="text-sm font-sans text-cream/80 font-medium mb-3">Track this subscription?</p>
            <div className="flex justify-between items-end mb-4 bg-charcoal/50 p-3 rounded-lg border border-white/5">
                <div>
                    <h3 className="text-sm font-bold font-sans text-cream">Figma Pro</h3>
                    <p className="text-[10px] font-mono text-midgrey">Detected 1m ago</p>
                </div>
                <p className="text-sm font-mono font-bold text-cream">$15<span className="text-[10px]">/mo</span></p>
            </div>
            <div className="flex gap-2 relative">
                <button className="flex-1 py-2 rounded-xl text-xs font-bold bg-white/5 text-cream/70">Ignore</button>
                <button className={clsx(
                    "flex-1 py-2 rounded-xl text-xs font-bold text-white transition-all duration-300 flex items-center justify-center gap-1",
                    progress < 0.3 ? "bg-primary scale-100" : "bg-green-500 scale-95"
                )}>
                    {progress < 0.3 ? 'Confirm' : 'Tracked'}
                    {progress >= 0.3 && <CheckCircle className="w-3 h-3" />}
                </button>
                {/* Pointer */}
                <MousePointer2 className={clsx(
                    "absolute w-6 h-6 text-white transition-all duration-700 ease-in-out z-20",
                    progress > 0.05 && progress < 0.3 ? "bottom-0 right-10 translate-y-2 opacity-100" : (progress >= 0.3 ? "bottom-0 right-10 translate-y-2 scale-75 opacity-0" : "-bottom-8 -right-8 opacity-0")
                )} />
            </div>
        </div>
    ),
    // Step 4: Mini dash
    ({ progress }: { progress: number }) => (
        <div className="w-[320px] bg-charcoal border border-white/10 rounded-2xl shadow-2xl p-4 flex flex-col gap-2">
            <h3 className="text-sm font-bold font-sans text-cream mb-2 px-1">Your Subscriptions</h3>
            {[
                { n: 'Figma', p: '$15.00', d: 'Renews in 12d' },
                { n: 'Vercel', p: '$20.00', d: 'Renews in 4d', alert: true },
                { n: 'Spotify', p: '$9.99', d: 'Renews tomorrow' },
                { n: 'ChatGPT Plus', p: '$20.00', d: 'Renews in 15d' },
            ].map((s, i) => (
                <div key={i} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5" style={{ opacity: progress > (i * 0.05) + 0.1 ? 1 : 0, transform: `translateY(${progress > (i * 0.05) + 0.1 ? 0 : 10}px)`, transition: 'all 0.4s ease-out' }}>
                    <div>
                        <p className="text-xs font-bold text-cream flex items-center gap-1">
                            {s.n}
                            {s.alert && <span className="w-1.5 h-1.5 rounded-full bg-primary block animate-pulse"></span>}
                        </p>
                        <p className={clsx("text-[9px]", s.alert ? "text-primary font-bold" : "text-midgrey")}>{s.d}</p>
                    </div>
                    <p className="text-xs font-mono font-bold text-cream">{s.p}</p>
                </div>
            ))}
            <div className="mt-2 pt-3 border-t border-white/10 flex justify-between px-1">
                <span className="text-xs text-cream/50">Total</span>
                <span className="text-sm font-mono font-bold text-primary">$64.99/mo</span>
            </div>
        </div>
    ),
    // Step 5: Web dash
    ({ progress }: { progress: number }) => (
        <div className="w-[600px] h-[340px] bg-charcoal rounded-xl border border-white/10 shadow-2xl flex overflow-hidden">
            <div className="w-40 bg-[#141414] border-r border-white/5 p-4 flex flex-col gap-2">
                <div className="w-16 h-4 bg-white/20 rounded mb-4"></div>
                <div className="w-full h-8 bg-white/10 rounded"></div>
                <div className="w-full h-8 bg-white/5 rounded"></div>
                <div className="w-full h-8 bg-white/5 rounded"></div>
            </div>
            <div className="flex-1 p-6 flex flex-col gap-6">
                <div className="flex justify-between items-end">
                    <h2 className="text-xl font-sans font-bold text-cream">Overview</h2>
                    <div className="flex flex-col items-end border border-primary/20 bg-primary/5 px-3 py-1.5 rounded-lg">
                        <span className="text-[10px] text-primary/70 uppercase font-bold tracking-wider">Total Monthly</span>
                        <span className="text-2xl font-mono font-bold text-primary">
                            ${Math.min(94, Math.floor(progress * 150))}.00
                        </span>
                    </div>
                </div>
                <div className="flex-1 flex items-end gap-2 px-2">
                    {[30, 40, 25, 60, 45, 80, 55, 94].map((h, i) => (
                        <div key={i} className={clsx("flex-1 rounded-t-sm relative", i === 7 ? "bg-primary/20" : "bg-white/5")} style={{ height: `${progress > (i * 0.1) ? h : 0}%`, transition: 'height 0.5s ease-out' }}>
                            <div className="absolute top-0 w-full bg-primary" style={{ height: i === 7 ? '4px' : '0' }}></div>
                            {i === 7 && progress > 0.7 && (
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono text-primary font-bold animate-pulse">${h}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ),
    // Step 6: Reminders
    ({ progress }: { progress: number }) => (
        <div className="flex flex-col gap-4 items-center">
            <div className={clsx("w-[280px] bg-white/5 backdrop-blur-xl border-l-[3px] border-l-primary border-y border-r border-y-white/10 border-r-white/10 shadow-lg p-4 rounded-r-2xl rounded-l-md transition-all duration-700 ease-out", progress > 0.05 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10")}>
                <div className="flex items-center gap-2 mb-1">
                    <Bell className="w-3 h-3 text-primary animate-[bounceIn_1s_cubic-bezier(0.34,1.56,0.64,1)]" />
                    <span className="text-[10px] uppercase font-bold text-primary">SOVA Alert</span>
                </div>
                <p className="text-xs font-sans text-cream/90 font-medium">Your <span className="font-bold">Adobe</span> trial ends in 2 days.</p>
            </div>
            <div className={clsx("w-[280px] bg-white/5 backdrop-blur-xl border-l-[3px] border-l-[#F5F2EC] border-y border-r border-y-white/10 border-r-white/10 shadow-lg p-4 rounded-r-2xl rounded-l-md transition-all duration-700 delay-100 ease-out", progress > 0.2 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10")}>
                <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="w-3 h-3 text-cream/60" />
                    <span className="text-[10px] uppercase font-bold text-cream/60">Renewal</span>
                </div>
                <p className="text-xs font-sans text-cream/90 font-medium"><span className="font-bold">Spotify</span> renews tomorrow — $9.99.</p>
            </div>
        </div>
    )
];

const RAW_STEPS = [
    {
        headline: "One click. That's it.",
        sub: "Install SOVA from the Chrome Web Store and you're fully set up. No account needed to start.",
    },
    {
        headline: "SOVA watches every checkout.",
        sub: "The moment you land on a subscription or pricing page, SOVA recognizes it instantly — automatically.",
    },
    {
        headline: "One tap to never forget.",
        sub: "A clean, non-intrusive popup gives you full control. Confirm and it's tracked forever.",
    },
    {
        headline: "Your subscriptions. Right in your toolbar.",
        sub: "Click the SOVA icon anytime to see your full subscription list — without opening a new tab.",
    },
    {
        headline: "The full picture, always.",
        sub: "Open the SOVA dashboard for deep insights — categorized subscriptions, spend trends, and complete history.",
    },
    {
        headline: "Never get charged by surprise.",
        sub: "SOVA automatically sets reminders for every free trial and renewal. You'll always know before it hits.",
    }
];

const HowItWorks = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);
    const [progressValues, setProgressValues] = useState([0, 0, 0, 0, 0, 0]);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            RAW_STEPS.forEach((_, i) => {
                ScrollTrigger.create({
                    trigger: `.hiw-trigger-${i}`,
                    start: "top top",
                    end: "bottom top",
                    onEnter: () => setActiveStep(i),
                    onEnterBack: () => setActiveStep(i),
                    scrub: 0.5,
                    onUpdate: (self) => {
                        setProgressValues(prev => {
                            const nv = [...prev];
                            nv[i] = self.progress;
                            return nv;
                        });
                    }
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="how-it-works" className="relative w-full bg-[#1A1A1A] text-cream">

            {/* Header Block Before Steps */}
            <div className="w-full flex flex-col items-center justify-center pt-32 pb-16 px-6 text-center z-10 relative">
                <span className="text-xs font-mono font-bold text-primary tracking-widest mb-6 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]">— HOW IT WORKS —</span>
                <h2 className="text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1] mb-6 flex flex-col md:flex-row gap-2 md:gap-4 items-center">
                    <span className="font-sans font-bold">From install to</span>
                    <span className="font-serif italic text-primary font-medium pr-2">total clarity.</span>
                </h2>
                <p className="text-lg md:text-xl font-sans text-cream/60 max-w-xl">
                    Six steps. Fully automatic. Zero effort on your part.
                </p>
            </div>

            <div className="relative w-full overflow-visible" style={{ height: `${RAW_STEPS.length * 100}vh` }}>
                {/* Visual Sticky Container */}
                <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex flex-col lg:flex-row max-w-7xl mx-auto px-6">

                    {/* Left Column: Text & Counter */}
                    <div className="w-full lg:w-5/12 h-1/2 lg:h-full flex flex-col justify-center pr-12 relative z-20">
                        {RAW_STEPS.map((step, i) => {
                            const isActive = activeStep === i;
                            const isPast = activeStep > i;

                            return (
                                <div
                                    key={i}
                                    className="absolute top-1/2 -translate-y-1/2 left-6 lg:left-0 right-12 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] w-full"
                                    style={{
                                        opacity: isActive ? 1 : 0,
                                        transform: isActive ? 'translateX(0px) translateY(-50%)' : (isPast ? 'translateX(-40px) translateY(-50%)' : 'translateX(40px) translateY(-50%)'),
                                        filter: isActive ? 'blur(0px)' : 'blur(4px)',
                                        pointerEvents: isActive ? 'auto' : 'none'
                                    }}
                                >
                                    {/* Slot Machine Number Flip */}
                                    <div className="overflow-hidden h-10 mb-4 inline-flex items-start">
                                        <span className="text-primary font-mono text-2xl font-bold transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col" style={{ transform: `translateY(-${activeStep * (100 / RAW_STEPS.length)}%)` }}>
                                            {RAW_STEPS.map((_, idx) => (
                                                <span key={idx} className="h-10 flex items-center leading-none">0{idx + 1}</span>
                                            ))}
                                        </span>
                                    </div>

                                    <h3 className="text-4xl md:text-5xl font-sans font-bold text-cream mb-4 tracking-tight leading-[1.1]">
                                        {step.headline}
                                    </h3>
                                    <p className="text-lg font-sans text-cream/60 leading-relaxed mb-8 pr-12">
                                        {step.sub}
                                    </p>

                                    {/* Progress Bar inside step container */}
                                    <div className="w-full max-w-[200px] h-[2px] bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary origin-left transition-transform duration-[50ms] ease-linear"
                                            style={{ transform: `scaleX(${progressValues[i]})` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Column: Visual Artifacts */}
                    <div className="w-full lg:w-7/12 h-1/2 lg:h-full flex items-center justify-center relative z-10">
                        {RAW_STEPS.map((_, i) => {
                            const isActive = activeStep === i;
                            const isPast = activeStep > i;
                            const Artifact = Artifacts[i];

                            return (
                                <div
                                    key={i}
                                    className="absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] w-full h-full"
                                    style={{
                                        opacity: isActive ? 1 : 0,
                                        transform: isActive ? 'scale(1) translateX(0px)' : (isPast ? 'scale(0.95) translateX(-40px)' : 'scale(1.05) translateX(40px)'),
                                        filter: isActive ? 'blur(0px)' : 'blur(10px)',
                                        pointerEvents: isActive ? 'auto' : 'none'
                                    }}
                                >
                                    <Artifact progress={progressValues[i]} />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Invisible Trigger Bounds */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                    {RAW_STEPS.map((_, i) => (
                        <div key={i} className={`hiw-trigger-${i} w-full h-[100vh]`} />
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes bounceIn {
                    0% { transform: scale(0); opacity: 0; }
                    60% { transform: scale(1.2); opacity: 1; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `}} />
        </section>
    );
};

export default HowItWorks;
