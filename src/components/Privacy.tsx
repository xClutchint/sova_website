import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Shield, Fingerprint, MousePointer2 } from 'lucide-react';

const Privacy = () => {
    const container = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Split text reveal approximation since SplitText is a premium plugin
            // We'll use lines wrapped in spans
            gsap.from('.manifesto-text', {
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top 60%',
                },
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
            });

            // Pillars stagger
            gsap.from('.pillar', {
                scrollTrigger: {
                    trigger: '.pillars-container',
                    start: 'top 75%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'back.out(1.7)'
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="w-full bg-charcoal text-cream py-32 px-6 flex flex-col items-center justify-center relative z-20 pt-10">
            <div className="max-w-5xl mx-auto w-full text-center">
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans font-bold tracking-tight leading-tight mb-24 max-w-4xl mx-auto">
                    <span className="manifesto-text block text-cream/30">Other apps want your bank account.</span>
                    <span className="manifesto-text block font-serif italic text-white mt-4">SOVA only reads what's already on your screen.</span>
                </h2>

                <div className="pillars-container grid grid-cols-1 md:grid-cols-3 gap-12 text-left mt-16 max-w-4xl mx-auto">
                    <div className="pillar flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                            <Shield className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold font-sans mb-3 text-white">100% Local Processing</h3>
                        <p className="text-cream/50 font-sans text-sm leading-relaxed">
                            Detection models run completely within your browser. Nothing communicates with external servers.
                        </p>
                    </div>

                    <div className="pillar flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                            <Fingerprint className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold font-sans mb-3 text-white">Zero Financial Data</h3>
                        <p className="text-cream/50 font-sans text-sm leading-relaxed">
                            We never ask for your plaid credentials or bank statements.
                        </p>
                    </div>

                    <div className="pillar flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                            <MousePointer2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold font-sans mb-3 text-white">No Manual Input Ever</h3>
                        <p className="text-cream/50 font-sans text-sm leading-relaxed">
                            If it’s on your screen, it’s tracked. Sit back and let algorithms manage the spreadsheet.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Privacy;
