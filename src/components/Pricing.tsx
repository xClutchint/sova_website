import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Check } from 'lucide-react';

const Pricing = () => {
    const container = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Radar animation
            gsap.to('.radar-ring', { scale: 3, opacity: 0, duration: 2, repeat: -1, stagger: 0.5, ease: 'power2.out' });
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} id="pricing" className="relative w-full bg-cream text-charcoal py-20 md:py-32">
            <div className="max-w-5xl mx-auto px-4 md:px-6 w-full">

                {/* Header */}
                <div className="text-center mb-12 md:mb-20">
                    <span className="text-[10px] md:text-xs font-mono font-bold text-primary tracking-widest mb-4 md:mb-6 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 inline-block">PRICING</span>
                    <h2 className="text-3xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight mt-6 mb-4">
                        Simple. <span className="font-serif italic text-primary font-medium">Generous.</span>
                    </h2>
                    <p className="text-base md:text-xl font-sans text-midgrey max-w-xl mx-auto">
                        Everything SOVA offers, completely free for a limited time.
                    </p>
                </div>

                {/* Single Pricing Card */}
                <div className="max-w-lg mx-auto">
                    <div className="bg-charcoal text-cream rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">

                        {/* Background Radar */}
                        <div className="absolute top-8 right-8 w-32 h-32 opacity-10 pointer-events-none">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="absolute w-2 h-2 bg-primary rounded-full z-10" />
                                <div className="radar-ring absolute w-8 h-8 border border-primary rounded-full" />
                                <div className="radar-ring absolute w-8 h-8 border border-primary rounded-full" />
                                <div className="radar-ring absolute w-8 h-8 border border-primary rounded-full" />
                            </div>
                        </div>

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold font-mono uppercase tracking-wider mb-6">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                            Limited Time
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-2">
                            <span className="text-5xl md:text-7xl font-sans font-bold text-white">Free</span>
                        </div>
                        <div className="flex items-center gap-2 mb-8">
                            <span className="text-lg md:text-xl font-mono text-cream/40 line-through">$4.99/mo</span>
                            <span className="text-sm font-sans text-primary font-bold">$0 while in early access</span>
                        </div>

                        {/* Features */}
                        <div className="space-y-4 mb-10">
                            {[
                                "Unlimited subscription tracking",
                                "Automatic checkout detection",
                                "Smart trial and renewal reminders",
                                "Full spend analytics dashboard",
                                "Encrypted cross-device sync",
                                "Cancellation link finder (300+ services)",
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm md:text-base font-sans">
                                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                        <Check className="w-3 h-3 text-primary" />
                                    </div>
                                    <span className="text-cream/80">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <a href="#/onboarding" className="block w-full bg-primary text-white py-4 rounded-full font-sans font-bold text-lg hover:bg-accent transition-colors shadow-lg shadow-primary/20 text-center no-underline">
                            Install SOVA for Free
                        </a>

                        <p className="text-center text-xs text-cream/30 mt-4 font-sans">
                            No credit card required. Works instantly after install.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
