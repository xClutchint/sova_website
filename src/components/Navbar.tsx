import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Navbar = () => {
    const navRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            ScrollTrigger.create({
                start: 'top -50',
                end: 99999,
                onUpdate: (self) => {
                    if (!navRef.current) return;
                    if (self.progress > 0) {
                        gsap.to(navRef.current, {
                            backgroundColor: 'rgba(245, 242, 236, 0.8)',
                            backdropFilter: 'blur(12px)',
                            borderColor: 'rgba(220, 38, 38, 0.2)',
                            color: '#1A1A1A',
                            padding: '0.75rem 1.5rem',
                            duration: 0.3,
                            ease: 'power2.out',
                        });
                    } else {
                        gsap.to(navRef.current, {
                            backgroundColor: 'transparent',
                            backdropFilter: 'blur(0px)',
                            borderColor: 'transparent',
                            color: '#1A1A1A',
                            padding: '1rem 1.5rem',
                            duration: 0.3,
                            ease: 'power2.out',
                        });
                    }
                },
            });
        }, navRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full z-50 flex justify-center mt-6 px-4 pointer-events-none">
            <nav
                ref={navRef}
                className="pointer-events-auto flex items-center justify-between w-full max-w-4xl rounded-full border border-transparent transition-all duration-300"
            >
                <div className="flex items-center gap-2 font-outfit font-bold text-xl tracking-tight">
                    <div className="w-5 h-5 rounded-full bg-primary relative flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-cream"></div>
                    </div>
                    SOVA
                </div>

                <div className="hidden md:flex items-center gap-8 font-sans text-sm font-medium opacity-80">
                    <a href="#features" className="hover:opacity-100 transition-opacity">Features</a>
                    <a href="#how-it-works" className="hover:opacity-100 transition-opacity">How it Works</a>
                    <a href="#pricing" className="hover:opacity-100 transition-opacity">Pricing</a>
                </div>

                <button className="relative overflow-hidden group bg-charcoal text-cream px-5 py-2 rounded-full text-sm font-medium font-sans">
                    <span className="relative z-10">Try for Free</span>
                    <div className="absolute inset-0 h-full w-full bg-primary transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-in-out z-0"></div>
                </button>
            </nav>
        </div>
    );
};

export default Navbar;
