import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const DetectionShuffler = () => {
    const [cards, setCards] = useState([
        { id: 1, text: "Figma Pro Detected / $15/mo", color: "bg-white" },
        { id: 2, text: "Spotify Renewal in 3 days", color: "bg-cream" },
        { id: 3, text: "Adobe Trial Ending Soon", color: "bg-white" }
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCards(prev => {
                const newCards = [...prev];
                const last = newCards.pop();
                if (last) newCards.unshift(last);
                return newCards;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-48 flex items-center justify-center perspective-[1000px]">
            {cards.map((card, index) => {
                const isTop = index === 0;
                const scale = 1 - index * 0.05;
                const translateY = index * 12;
                const zIndex = 30 - index;
                const opacity = 1 - index * 0.2;

                return (
                    <div
                        key={card.id}
                        className={`absolute w-full max-w-[280px] p-5 rounded-2xl shadow-xl border border-charcoal/5 ${card.color}`}
                        style={{
                            transform: `translateY(${translateY}px) scale(${scale})`,
                            zIndex,
                            opacity,
                            transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-charcoal/5 flex items-center justify-center">
                                <div className={`w-2 h-2 rounded-full ${isTop ? 'bg-primary animate-pulse' : 'bg-midgrey'}`}></div>
                            </div>
                            <p className="font-mono text-sm font-semibold text-charcoal">{card.text}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const TelemetryTypewriter = () => {
    const phrases = [
        "Checkout page detected...",
        "New subscription found: Notion Pro $16/mo",
        "Free trial ending in 7 days. Reminder set."
    ];
    const [text, setText] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const typingSpeed = isDeleting ? 30 : 60;
        const currentPhrase = phrases[phraseIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting && text === currentPhrase) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setPhraseIndex((prev) => (prev + 1) % phrases.length);
            } else {
                setText(currentPhrase.substring(0, text.length + (isDeleting ? -1 : 1)));
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, phraseIndex]);

    return (
        <div className="w-full h-48 bg-charcoal rounded-2xl p-6 border border-white/10 font-mono text-xs text-cream flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-white/40 uppercase tracking-widest text-[10px]">Live Telemetry</span>
            </div>
            <div className="flex-1 mt-4">
                <p className="text-white/80 leading-relaxed">
                    <span className="text-white/30 mr-2">{'>'}</span>
                    {text}
                    <span className="inline-block w-1.5 h-3.5 bg-primary ml-1 animate-[ping_1s_steps(2,start)_infinite]"></span>
                </p>
            </div>
        </div>
    );
};

const MockSubscriptionManager = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<SVGSVGElement>(null);
    const rowRef = useRef<HTMLDivElement>(null);
    const detailsRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            // Cursor enters and hovers row
            tl.set(cursorRef.current, { x: 150, y: 120, opacity: 0 })
                .to(cursorRef.current, { opacity: 1, duration: 0.3 })
                .to(cursorRef.current, { x: 20, y: 60, duration: 1, ease: "power2.inOut" })
                .to(rowRef.current, { backgroundColor: 'rgba(255,255,255,0.05)', duration: 0.2 })
                // Click and expand
                .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
                .to(detailsRef.current, { height: 'auto', opacity: 1, duration: 0.4, ease: "power2.out", autoAlpha: 1 })
                // Move to counter
                .to(cursorRef.current, { x: 180, y: 10, duration: 1, ease: "power2.inOut", delay: 0.5 })
                // Counter tick up mock
                .to(counterRef.current, { textContent: '94', duration: 0.5, snap: { textContent: 1 }, ease: "none" })
                // Reset
                .to(cursorRef.current, { opacity: 0, duration: 0.3, delay: 1 })
                .to(detailsRef.current, { height: 0, autoAlpha: 0, duration: 0.3 })
                .to(rowRef.current, { backgroundColor: 'transparent', duration: 0.2 })
                .set(counterRef.current, { textContent: '79' });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-48 bg-[#151515] rounded-2xl p-4 border border-white/5 overflow-hidden font-sans">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-white/80 text-xs font-bold">Active Subscriptions</h4>
                <div className="flex bg-white/5 rounded-full px-2 py-1 items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-[9px] text-white/50 uppercase">0 missed</span>
                </div>
            </div>

            <div className="flex flex-col gap-1 relative">
                <div ref={rowRef} className="flex justify-between items-center p-2 rounded-lg cursor-pointer transition-colors border border-transparent">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center text-[10px] text-white">N</div>
                        <span className="text-xs text-white/90 font-medium">Netflix 4K</span>
                    </div>
                    <span className="text-xs text-white/50 font-mono">$22.99</span>
                </div>
                <div ref={detailsRef} className="overflow-hidden h-0 opacity-0 px-2 pl-9">
                    <div className="text-[10px] text-white/40 pb-2">Renews Oct 14 / Personal</div>
                </div>

                <div className="flex justify-between items-center p-2 opacity-50">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center text-[10px] text-white">C</div>
                        <span className="text-xs text-white font-medium">ChatGPT Plus</span>
                    </div>
                    <span className="text-xs text-white/50 font-mono">$20.00</span>
                </div>
            </div>

            <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <span className="text-[10px] text-white/40">Monthly Total</span>
                <span className="text-sm font-mono font-bold text-white">$<span ref={counterRef}>79</span>/mo</span>
            </div>

            {/* SVG Cursor */}
            <svg ref={cursorRef} className="absolute w-5 h-5 text-white z-50 drop-shadow-xl pointer-events-none" viewBox="0 0 24 24" fill="currentColor" stroke="black" strokeWidth="1">
                <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 01.35-.15h6.42c.45 0 .67-.54.35-.85L6.35 2.85a.5.5 0 00-.85.36z" />
            </svg>
        </div>
    );
};

const Features = () => {
    return (
        <section id="features" className="w-full bg-charcoal text-cream py-16 md:py-32 px-4 md:px-6 relative z-10 rounded-t-[2rem] md:rounded-t-[3rem] mt-[-2rem] md:mt-[-3rem]">
            <div className="max-w-7xl mx-auto w-full">
                <div className="mb-10 md:mb-20 max-w-2xl">
                    <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight mb-4 md:mb-6">
                        The Precision <span className="font-serif italic text-primary font-medium">Micro-UI</span> Dashboard.
                    </h2>
                    <p className="text-base md:text-lg text-cream/70 font-sans leading-relaxed">
                        SOVA runs as a silent layer in your browser. It replaces manual spreadsheet tracking with live, interactive components that process your page data locally and give you real-time awareness.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {/* Card 1: Auto-Detection */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-[#1A1A1A] rounded-3xl p-2 border border-white/5 relative group overflow-hidden h-[280px] flex flex-col items-center justify-center">
                            <DetectionShuffler />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold font-sans mb-2">Automated Detection</h3>
                            <p className="text-sm text-cream/50 font-sans leading-relaxed">
                                SOVA's content script scans checkout pages for payment forms and recurring billing signals, all within your browser.
                            </p>
                        </div>
                    </div>

                    {/* Card 2: Live Extension Feed */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-[#1A1A1A] rounded-3xl p-2 border border-white/5 relative group overflow-hidden h-[280px] flex flex-col items-center justify-center">
                            <TelemetryTypewriter />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold font-sans mb-2">Live Telemetry</h3>
                            <p className="text-sm text-cream/50 font-sans leading-relaxed">
                                Watch SOVA's detection engine work in real time. The extension feed shows exactly what's being identified as you browse.
                            </p>
                        </div>
                    </div>

                    {/* Card 3: Web Dashboard Overview */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-[#1A1A1A] rounded-3xl p-2 border border-white/5 relative group overflow-hidden h-[280px] flex flex-col items-center justify-center">
                            <MockSubscriptionManager />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold font-sans mb-2">Proactive Management</h3>
                            <p className="text-sm text-cream/50 font-sans leading-relaxed">
                                From a centralized dashboard, SOVA tracks your billing cycles and alerts you before free trials convert to paid charges.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
