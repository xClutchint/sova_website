import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Privacy from './components/Privacy';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
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
