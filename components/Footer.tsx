import React from 'react';
import { Box, Mail, Camera, Briefcase, Hash, Send, MapPin, ChevronRight } from 'lucide-react';

interface FooterProps {
    onOpenService: (id: string) => void;
    onOpenLegal: (type: 'privacy' | 'terms') => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenService, onOpenLegal }) => {
    const companyLinks = [
        { name: 'About Us', href: '#process' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Careers', href: '#contact' },
        { name: 'Contact', href: '#contact' },
    ];
    
    // Map footer labels to data.ts service IDs
    const serviceLinks = [
        { label: 'E-commerce Packshots', id: 'ecommerce-packshots' },
        { label: 'Ghost Mannequin', id: 'ghost-mannequin' },
        { label: 'AI Fashion Models', id: 'ai-fashion-models' },
        { label: 'Jewelry Retouching', id: 'signature-refinement' },
        { label: 'Video Production', id: 'model-to-video' },
    ];

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.getElementById(href.replace('#', ''));
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-gradient-to-b from-white to-slate-50 border-t border-black/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent-teal/5 rounded-full blur-[150px] -translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent-gold/5 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2"></div>

            <div className="relative mx-auto max-w-7xl px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-primary/10">
                                <Box size={24} />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900">Snapiums</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            Premium e-commerce image editing & AI post-production. Transforming fashion and jewelry photography with expert precision.
                        </p>
                        <div className="flex items-center gap-3">
                            {[Mail, Camera, Briefcase, Hash].map((Icon, i) => (
                                <a key={i} href="#" onClick={(e) => e.preventDefault()} className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-6">Services</h4>
                        <ul className="space-y-3">
                            {serviceLinks.map((item) => (
                                <li key={item.id}>
                                    <button 
                                        onClick={() => onOpenService(item.id)}
                                        className="text-slate-600 hover:text-primary transition-colors duration-200 flex items-center gap-2 group text-left w-full"
                                    >
                                        <ChevronRight size={16} className="text-slate-400 group-hover:text-primary transition-colors" />
                                        <span>{item.label}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-6">Company</h4>
                        <ul className="space-y-3">
                            {companyLinks.map((item) => (
                                <li key={item.name}>
                                    <a 
                                        href={item.href} 
                                        onClick={(e) => handleScroll(e, item.href)}
                                        className="text-slate-600 hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                                    >
                                        <ChevronRight size={16} className="text-slate-400 group-hover:text-primary transition-colors" />
                                        <span>{item.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-6">Stay Updated</h4>
                        <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                            Subscribe to get the latest updates and offers.
                        </p>
                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Enter your email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm" required />
                            <button type="submit" className="w-full h-11 px-6 rounded-lg bg-primary text-white font-semibold hover:bg-slate-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.02]">
                                <Send size={18} />
                                Subscribe
                            </button>
                        </form>
                        <div className="mt-6 pt-6 border-t border-slate-200">
                            <div className="flex items-center gap-3 text-sm mb-3">
                                <Mail size={16} className="text-slate-400" />
                                <a href="mailto:hello@snapiums.com" className="text-slate-600 hover:text-primary">hello@snapiums.com</a>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <MapPin size={16} className="text-slate-400" />
                                <span className="text-slate-600">New York, NY 10001</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm text-center md:text-left">
                        © 2024 Snapiums Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                        <button onClick={() => onOpenLegal('privacy')} className="text-slate-500 hover:text-primary transition-colors">Privacy Policy</button>
                        <button onClick={() => onOpenLegal('terms')} className="text-slate-500 hover:text-primary transition-colors">Terms of Service</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;