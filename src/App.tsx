import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Privacy from './components/Privacy';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import PrivacyPage from './components/PrivacyPage';
import Onboarding from './components/Onboarding';

gsap.registerPlugin(ScrollTrigger);

function getPage(hash: string) {
    if (hash === '#/privacy') return 'privacy';
    if (hash === '#/onboarding') return 'onboarding';
    return 'home';
}

function App() {
    const [page, setPage] = useState(() => getPage(window.location.hash));

    useEffect(() => {
        const onHash = () => {
            setPage(getPage(window.location.hash));
            window.scrollTo(0, 0);
        };
        window.addEventListener('hashchange', onHash);
        return () => window.removeEventListener('hashchange', onHash);
    }, []);

    if (page === 'privacy') {
        return (
            <>
                <div className="noise-overlay" />
                <PrivacyPage />
            </>
        );
    }

    if (page === 'onboarding') {
        return (
            <>
                <div className="noise-overlay" />
                <Onboarding />
            </>
        );
    }

    return (
        <>
            <div className="noise-overlay" />
            <div className="relative min-h-screen bg-cream selection:bg-primary/20">
                <Navbar />
                <main>
                    <Hero />
                    <HowItWorks />
                    <Features />
                    <Privacy />
                    <Pricing />
                </main>
                <Footer />
            </div>
        </>
    );
}

export default App;
