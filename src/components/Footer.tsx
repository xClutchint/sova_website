
const Footer = () => {
    return (
        <footer className="w-full bg-[#111111] text-cream rounded-t-[4rem] pt-24 pb-12 px-6 relative z-40 mt-[-4rem]">
            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3 text-2xl font-bold font-sans tracking-tight mb-6">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-cream"></div>
                        </div>
                        SOVA
                    </div>
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full w-fit mt-4">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                        <span className="font-mono text-xs text-white/70 uppercase tracking-widest">System Active</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-8 md:gap-12 font-sans text-sm font-medium text-cream/70">
                    <div className="flex flex-col gap-4">
                        <a href="#" className="hover:text-white transition-colors">Chrome Web Store</a>
                        <a href="#" className="hover:text-white transition-colors">Dashboard Login</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <a href="#" className="hover:text-white transition-colors">GitHub</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto w-full mt-24 pt-8 border-t border-white/10 flex justify-between items-center text-xs font-sans text-cream/40">
                <p>© 2026 SOVA Intelligence. All rights reserved.</p>
                <p className="font-mono uppercase">Vigilant Minimal</p>
            </div>
        </footer>
    );
};

export default Footer;
