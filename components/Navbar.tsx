import React, { useState, useEffect } from 'react';
import { Menu, X, Box } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', href);
        }
    };

    const navLinks = [
        { name: 'Services', href: '#services' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Process', href: '#process' },
        { name: 'Pricing', href: '#pricing' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-black/5 ${
            isScrolled || mobileMenuOpen ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent border-transparent'
        }`}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div 
                        className="flex items-center gap-3 cursor-pointer" 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-primary/10">
                            <Box size={20} />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">Snapiums</span>
                    </div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <a 
                                key={link.name} 
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">Login</a>
                        <a 
                            href="#contact"
                            onClick={(e) => scrollToSection(e, '#contact')} 
                            className="flex h-11 items-center justify-center rounded-full bg-primary px-8 text-sm font-bold text-white shadow-lg shadow-primary/10 transition-all hover:bg-slate-800 hover:shadow-primary/20 hover:scale-105 active:scale-95"
                        >
                            Get Started
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden flex items-center justify-center p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden bg-white border-b border-black/5 shadow-lg transition-all duration-300 overflow-hidden ${
                mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
                <div className="px-6 py-4 space-y-3">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name}
                            href={link.href}
                            className="block py-2 text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
                            onClick={(e) => scrollToSection(e, link.href)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="border-t border-slate-200 pt-3 mt-3">
                        <a href="#" onClick={(e) => e.preventDefault()} className="block py-2 text-sm font-semibold text-slate-600 hover:text-primary transition-colors">Login</a>
                        <a 
                            href="#contact" 
                            onClick={(e) => scrollToSection(e, '#contact')}
                            className="block w-full h-11 flex items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-lg shadow-primary/10 transition-all hover:bg-slate-800 mt-2"
                        >
                            Get Started
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;