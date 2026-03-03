import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const Pricing = () => {
    const container = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.stack-card') as HTMLElement[];

            cards.forEach((card, i) => {
                if (i === cards.length - 1) return; // Skip last card

                gsap.to(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top top',
                        end: 'max',
                        pin: true,
                        pinSpacing: false,
                        scrub: true,
                    },
                    scale: 0.9,
                    opacity: 0.5,
                    filter: 'blur(20px)',
                    ease: 'none'
                });
            });

            // Animations inside artifacts
            // Radar animation
            gsap.to('.radar-ring', { scale: 3, opacity: 0, duration: 2, repeat: -1, stagger: 0.5, ease: 'power2.out' });

            // Graph animation
            gsap.to('.graph-line', { strokeDashoffset: 0, duration: 2, repeat: -1, ease: 'power1.inOut', yoyo: true });

            // Lock rotation
            gsap.to('.lock-icon', { rotateY: 360, duration: 8, repeat: -1, ease: 'linear' });
            gsap.to('.orbit-ring', { rotation: 360, duration: 20, repeat: -1, ease: 'linear', transformOrigin: 'center center' });

        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="relative w-full bg-charcoal text-charcoal pb-40">

            {/* Card 1: Free */}
            <div className="stack-card sticky top-0 w-full h-[100dvh] bg-cream flex items-center justify-center p-6 border-b border-charcoal/10 rounded-b-[3rem] z-10 origin-top">
                <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-lg font-mono text-primary font-bold mb-4 tracking-widest uppercase">Pricing 01</h3>
                        <h2 className="text-5xl md:text-7xl font-sans font-bold mb-6">Free.</h2>
                        <p className="text-xl font-sans text-midgrey mb-8 max-w-md leading-relaxed">
                            Core detection, up to 10 subscriptions, and basic renewal alerts. Essential vigilance for the modern user.
                        </p>
                        <div className="space-y-4 font-sans font-medium mb-10">
                            <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Core Detection</div>
                            <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Up to 10 Subscriptions</div>
                            <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Standard Alerts</div>
                        </div>
                        <button className="bg-charcoal text-cream px-8 py-4 rounded-full font-sans font-bold text-lg hover:scale-105 transition-transform">
                            Install Extension
                        </button>
                    </div>
                    <div className="flex justify-center h-full items-center">
                        {/* Artifact: Pulsing Radar */}
                        <div className="relative w-64 h-64 flex items-center justify-center bg-white rounded-full shadow-2xl border border-charcoal/5">
                            <div className="absolute w-2 h-2 bg-primary rounded-full z-10" />
                            <div className="radar-ring absolute w-16 h-16 border border-primary rounded-full" />
                            <div className="radar-ring absolute w-16 h-16 border border-primary rounded-full" />
                            <div className="radar-ring absolute w-16 h-16 border border-primary rounded-full" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Card 2: Pro */}
            <div className="stack-card sticky top-0 w-full h-[100dvh] bg-primary text-cream flex items-center justify-center p-6 rounded-t-[3rem] rounded-b-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.3)] z-20 origin-top">
                <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-lg font-mono text-charcoal/50 font-bold mb-4 tracking-widest uppercase">Pricing 02</h3>
                        <h2 className="text-5xl md:text-7xl font-sans font-bold mb-6 text-white">Pro.</h2>
                        <p className="text-xl font-sans text-cream/80 mb-8 max-w-md leading-relaxed">
                            Unlimited subscriptions, smart reminders, full spend analytics, and priority support.
                        </p>
                        <div className="space-y-4 font-sans font-medium mb-10 opacity-90">
                            <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-white" /> Unlimited Tracking</div>
                            <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-white" /> Smart Reminders</div>
                            <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-white" /> Full Spend Analytics</div>
                        </div>
                        {/* Clay button */}
                        <button className="bg-white/20 backdrop-blur-md text-white border border-white/50 px-8 py-4 rounded-full font-sans font-bold text-lg shadow-[inset_0px_2px_4px_rgba(255,255,255,0.3),_0_10px_20px_rgba(0,0,0,0.2)] hover:bg-white/30 transition-colors">
                            Upgrade to Pro — $5/mo
                        </button>
                    </div>
                    <div className="flex justify-center h-full items-center">
                        {/* Artifact: Live spend graph */}
                        <div className="relative w-full max-w-md h-64 bg-black/20 rounded-3xl p-6 backdrop-blur-sm border border-white/10 flex items-end overflow-hidden">
                            <svg className="w-full h-full absolute inset-0 preserve-3d" viewBox="0 0 400 200" preserveAspectRatio="none">
                                <path
                                    className="graph-line"
                                    d="M 0 180 C 50 160, 100 170, 150 120 C 200 70, 250 100, 300 50 C 350 0, 400 20, 400 20"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.8)"
                                    strokeWidth="4"
                                    strokeDasharray="600"
                                    strokeDashoffset="600"
                                    style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' }}
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card 3: Lifetime */}
            <div className="stack-card sticky top-0 w-full h-[100dvh] bg-charcoal text-cream flex items-center justify-center p-6 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-30 origin-top">
                <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-lg font-mono text-primary font-bold mb-4 tracking-widest uppercase">Pricing 03</h3>
                        <h2 className="text-5xl md:text-7xl font-sans font-bold mb-6 text-white italic font-serif">Lifetime.</h2>
                        <p className="text-xl font-sans text-cream/50 mb-8 max-w-md leading-relaxed">
                            One-time payment. All Pro features forever. Early access to new algorithms. For the committed.
                        </p>
                        <div className="space-y-4 font-sans font-medium mb-10 text-cream/70">
                            <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Pay Once, Use Forever</div>
                            <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> All Pro Features</div>
                            <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Early Beta Access</div>
                        </div>
                        <button className="bg-primary text-white px-8 py-4 rounded-full font-sans font-bold text-lg hover:bg-accent transition-colors shadow-lg shadow-primary/20">
                            Unlock Lifetime — $99
                        </button>
                    </div>
                    <div className="flex justify-center h-full items-center perspective-[1000px]">
                        {/* Artifact: Rotating Lock */}
                        <div className="relative w-64 h-64 flex items-center justify-center">
                            <svg className="orbit-ring absolute w-full h-full text-white/10" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                                <circle cx="50" cy="50" r="48" strokeDasharray="2 4" />
                                <circle cx="50" cy="2" r="4" fill="currentColor" />
                                <circle cx="98" cy="50" r="4" fill="currentColor" />
                            </svg>
                            <div className="w-24 h-24 bg-gradient-to-tr from-midgrey to-[#333] rounded-2xl flex items-center justify-center shadow-2xl relative lock-icon transform-style-3d border border-white/5">
                                <div className="w-10 h-10 border-4 border-white rounded-t-xl absolute -top-8 -z-10 bg-[#1A1A1A]"></div>
                                <div className="w-4 h-4 bg-white rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Pricing;
