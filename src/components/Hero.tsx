import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { Radar, MousePointer2, BarChart2, Clock, Check } from 'lucide-react';
import clsx from 'clsx';

const SonarTicker = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute w-2 h-2 bg-primary rounded-full z-10" />
        <div className="absolute w-12 h-12 border border-primary rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
        <div className="absolute w-24 h-24 border border-primary/50 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite_0.4s]" />
    </div>
);

const SmartPopupTicker = () => (
    <div className="w-full max-w-[150px] bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 shadow-xl opacity-0 animate-[fastSlideUpDown_4s_cubic-bezier(0.34,1.56,0.64,1)_infinite]">
        <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-bold font-sans text-cream">Figma Pro</span>
            <span className="text-[10px] font-mono text-primary">$15/mo</span>
        </div>
        <div className="flex gap-1.5">
            <div className="h-5 flex-1 bg-white/5 rounded text-[8px] flex items-center justify-center text-white/50">Ignore</div>
            <div className="h-5 flex-[1.5] bg-primary rounded flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
            </div>
        </div>
    </div>
);

const SpendChartTicker = () => (
    <div className="flex items-end justify-center h-24 w-full gap-2 px-2 pb-2">
        <div className="w-4 bg-white/10 rounded-t-sm h-[30%] animate-[barGrow_3s_ease-out_infinite]"></div>
        <div className="w-4 bg-white/10 rounded-t-sm h-[50%] animate-[barGrow_3s_ease-out_infinite_0.2s]"></div>
        <div className="w-4 bg-white/10 rounded-t-sm h-[40%] animate-[barGrow_3s_ease-out_infinite_0.4s]"></div>
        <div className="w-4 bg-primary/40 rounded-t-sm h-[80%] animate-[barGrow_3s_ease-out_infinite_0.6s]"></div>
        <div className="w-4 bg-primary rounded-t-sm h-[100%] animate-[barGrow_3s_ease-out_infinite_0.8s] relative flex justify-center">
            <div className="absolute -top-6 text-[10px] font-mono font-bold text-white bg-primary/90 px-1 rounded opacity-0 animate-[fadeIn_3s_ease-out_infinite_1.5s] whitespace-nowrap shadow-[0_0_10px_rgba(239,68,68,0.5)]">$94/mo</div>
        </div>
    </div>
);

const CountdownTicker = () => {
    const [count, setCount] = useState(3);
    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => prev === 0 ? 3 : prev - 1);
        }, 750); // 3 seconds per full cycle
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <span className="text-4xl font-mono font-bold text-cream mb-1 tracking-tight">0{count}</span>
            <span className="text-[10px] font-sans text-cream/50 uppercase tracking-widest mb-3">Days Left</span>
            <div className="px-3 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full transition-all duration-300"
                style={{
                    backgroundColor: count === 0 ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)',
                    color: count === 0 ? 'white' : 'rgba(255,255,255,0.3)',
                    border: count === 0 ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    boxShadow: count === 0 ? '0 0 15px rgba(239,68,68,0.5)' : 'none',
                    transform: count === 0 ? 'scale(1.1)' : 'scale(1)'
                }}>
                Action Required
            </div>
        </div>
    );
};

const HorizontalFeatureAccordion = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const panels = [
        {
            id: 1, height: "90%", title: "Auto-Detection", icon: Radar,
            description: "SOVA detects subscription checkouts the moment you land on them. No setup needed.",
            tags: ["Instant Detection", "Zero Setup"],
            micro: <SonarTicker />
        },
        {
            id: 2, height: "100%", title: "Smart Popup", icon: MousePointer2,
            description: "A non-intrusive popup appears only when a subscription checkout is detected. One click to track.",
            tags: ["Contextual", "One Click"],
            micro: <SmartPopupTicker />
        },
        {
            id: 3, height: "85%", title: "Spend Dashboard", icon: BarChart2,
            description: "See every subscription you pay for in one clean dashboard, sorted, categorized, and tracked.",
            tags: ["Web Dashboard", "Full Overview"],
            micro: <SpendChartTicker />
        },
        {
            id: 4, height: "80%", title: "Trial Reminders", icon: Clock,
            description: "SOVA reminds you before every free trial ends so you never get charged by surprise.",
            tags: ["Smart Alerts", "Auto-Tracked"],
            micro: <CountdownTicker />
        }
    ];

    return (
        <div className="w-full h-[500px] flex items-end gap-3 perspective-[1200px]" onMouseLeave={() => setHoveredIndex(null)}>
            {panels.map((panel, index) => {
                const isHovered = hoveredIndex === index;
                const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;
                const Icon = panel.icon;

                return (
                    <div
                        key={panel.id}
                        className={clsx(
                            "relative overflow-hidden group cursor-pointer flex flex-col p-4 md:p-5",
                            "bg-[#1A1A1A]/80 border border-primary/10 rounded-[2rem]",
                            "shadow-[0_40px_80px_rgba(0,0,0,0.15),0_8px_24px_rgba(0,0,0,0.1)]",
                            "transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom"
                        )}
                        style={{
                            height: panel.height,
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            flex: isHovered ? '2.5' : (hoveredIndex === null ? '1' : '0.8'),
                            scale: isHovered ? 1.02 : (isOtherHovered ? 0.95 : 1),
                            opacity: isOtherHovered ? 0.6 : 1,
                            transformStyle: 'preserve-3d',
                            transform: isHovered ? 'translateZ(20px)' : (isOtherHovered ? 'translateZ(-10px)' : 'translateZ(0px)')
                        }}
                        onMouseEnter={() => setHoveredIndex(index)}
                    >
                        {/* Top Icon Badge */}
                        <div className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:rotate-15">
                            <Icon className="w-4 h-4 text-cream/70 transition-colors duration-300 group-hover:text-primary fill-transparent group-hover:fill-primary/20" />
                        </div>

                        {/* Always-on Micro Animation */}
                        <div className="flex-1 w-full flex items-center justify-center relative z-10 pt-10 opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                            {panel.micro}
                        </div>

                        {/* Bottom Content Area */}
                        <div className="w-full relative z-20 flex flex-col justify-end min-h-[140px]">
                            {/* Title - Rotated when collapsed, straight when expanded */}
                            <h3
                                className={clsx(
                                    "font-sans font-bold text-cream transition-all duration-500",
                                    isHovered ? "text-xl mb-3" : "absolute text-lg origin-bottom-left -rotate-90 left-2 bottom-8 whitespace-nowrap"
                                )}
                            >
                                {panel.title}
                            </h3>

                            {/* Expandable Text & Tags */}
                            <div
                                className={clsx(
                                    "flex flex-col overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                                    isHovered ? "h-auto opacity-100 translate-y-0" : "h-0 opacity-0 translate-y-4"
                                )}
                            >
                                <p className="font-sans text-sm text-cream/70 leading-relaxed mb-3">
                                    {panel.description}
                                </p>

                                <div className="flex gap-2 flex-wrap">
                                    {panel.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 text-[10px] uppercase tracking-wider font-mono text-primary/80 bg-primary/10 rounded-md border border-primary/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const Hero = () => {
    const container = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Staggered fade-up
            gsap.from('.stagger-text', {
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power4.out',
                delay: 0.2
            });

            // Accordion fade-up
            gsap.from('.accordion-container', {
                x: 40,
                opacity: 0,
                duration: 1.5,
                ease: 'power4.out',
                delay: 0.6
            });

            // Subtle continuous float loop for accordion
            gsap.to('.accordion-float-wrapper', {
                y: -8,
                repeat: -1,
                yoyo: true,
                duration: 3,
                ease: "sine.inOut"
            });

            // Magnetic hover on button
            const magneticBtn = document.querySelector('.magnetic-btn');
            if (magneticBtn) {
                magneticBtn.addEventListener('mouseenter', () => {
                    gsap.to(magneticBtn, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
                });
                magneticBtn.addEventListener('mouseleave', () => {
                    gsap.to(magneticBtn, { scale: 1, duration: 0.3, ease: 'power2.out' });
                });
            }
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="relative w-full min-h-[100dvh] flex items-center overflow-hidden pt-20">
            {/* Background Motif */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none flex items-center justify-center scale-150 transform-gpu">
                <svg viewBox="0 0 100 100" className="w-[80vw] h-[80vw] text-charcoal">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M 50 20 L 50 80 M 20 50 L 80 50" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="10" fill="currentColor" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto w-full px-4 md:px-6 flex flex-col lg:flex-row items-center justify-between z-10 h-full py-16 lg:py-0">

                {/* Left Content */}
                <div className="flex flex-col items-start w-full lg:w-5/12 mt-12 lg:mt-32 relative z-20">
                    <h1 className="flex flex-col gap-1 tracking-tight leading-[0.9]">
                        <span className="stagger-text text-4xl md:text-5xl lg:text-7xl font-sans font-bold text-charcoal">
                            Never Miss a
                        </span>
                        <span className="stagger-text text-[2.75rem] md:text-[5.5rem] lg:text-[7rem] font-serif italic text-primary font-medium tracking-tight pr-4 mt-2">
                            Subscription Again.
                        </span>
                    </h1>

                    <p className="stagger-text mt-6 md:mt-8 text-base md:text-xl font-sans text-midgrey max-w-xl leading-relaxed">
                        SOVA detects subscriptions automatically as you browse. No bank details, no manual entry. Just install and let SOVA do the watching.
                    </p>

                    <div className="stagger-text mt-8 md:mt-10 flex flex-col items-start gap-2">
                        <a href="#/onboarding" className="magnetic-btn relative overflow-hidden group bg-primary text-cream px-6 md:px-8 py-3.5 md:py-4 rounded-full text-base md:text-lg font-medium font-sans flex items-center gap-3 shadow-[0_10px_30px_rgba(239,68,68,0.2)] no-underline">
                            <span className="relative z-10 flex items-center gap-2">
                                Try for Free <span className="text-cream/70 text-sm font-normal hidden sm:inline">/ It's Free</span>
                            </span>
                            <div className="absolute inset-0 h-full w-full bg-accent transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-in-out z-0"></div>
                        </a>
                        <span className="text-sm font-mono text-midgrey/60 ml-2"><span className="line-through">$4.99/mo</span> <span className="text-primary font-sans font-semibold not-italic">Free for a limited time</span></span>
                    </div>
                </div>

                {/* Right Content: Horizontal Feature Accordion with Float Wrapper */}
                <div className="hidden lg:flex w-7/12 justify-end relative h-full items-center pl-8 pr-4 accordion-container z-10">
                    <div className="w-full -translate-y-[40px] accordion-float-wrapper">
                        <HorizontalFeatureAccordion />
                    </div>
                </div>

                {/* Mobile Feature Cards */}
                <div className="flex lg:hidden flex-col gap-4 w-full mt-10 mb-4 stagger-text">
                    {[
                        { icon: Radar, title: "Auto-Detection", desc: "Detects subscription checkouts instantly. Zero setup.", color: "bg-primary/10 text-primary" },
                        { icon: MousePointer2, title: "Smart Popup", desc: "Non-intrusive. One click to track.", color: "bg-primary/10 text-primary" },
                        { icon: BarChart2, title: "Spend Dashboard", desc: "See every subscription in one clean view.", color: "bg-primary/10 text-primary" },
                        { icon: Clock, title: "Trial Reminders", desc: "Get alerted before free trials charge you.", color: "bg-primary/10 text-primary" },
                    ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <div key={i} className="flex items-center gap-4 bg-charcoal/[0.03] border border-charcoal/5 rounded-2xl p-4">
                                <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-sans font-bold text-sm text-charcoal">{item.title}</h3>
                                    <p className="font-sans text-xs text-midgrey mt-0.5">{item.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>

            {/* Custom Keyframes for Accordion Micro-animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fastSlideUpDown {
                    0%, 15% { transform: translateY(30px); opacity: 0; }
                    25%, 70% { transform: translateY(0); opacity: 1; }
                    80%, 100% { transform: translateY(30px); opacity: 0; }
                }
                @keyframes barGrow {
                    0%, 15% { transform: scaleY(0.1); opacity: 0.5; transform-origin: bottom; }
                    30%, 80% { transform: scaleY(1); opacity: 1; transform-origin: bottom; }
                    90%, 100% { transform: scaleY(0.1); opacity: 0.5; transform-origin: bottom; }
                }
                @keyframes fadeIn {
                    0%, 30% { opacity: 0; transform: translate(-50%, 10px); }
                    40%, 80% { opacity: 1; transform: translate(-50%, 0); }
                    90%, 100% { opacity: 0; transform: translate(-50%, 10px); }
                }
            `}} />
        </section>
    );
};

export default Hero;
