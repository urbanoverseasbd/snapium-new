import React from 'react';
import { Shirt, Gem, Check, ArrowRight, Zap } from 'lucide-react';
import { siteData } from '../data';

const Pricing: React.FC = () => {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="py-32 bg-slate-50 scroll-mt-28 relative overflow-hidden" id="pricing">
            {/* Background Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                 <div className="absolute top-40 -left-64 w-96 h-96 bg-accent-teal/5 rounded-full blur-3xl"></div>
                 <div className="absolute bottom-20 -right-64 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 shadow-sm">
                        <Zap size={12} className="text-accent-gold fill-accent-gold" />
                        Transparent Rates
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Simple, Flat-Rate Pricing</h2>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        Scalable costs for growing brands. No hidden fees or complicated credits—just professional per-image rates.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                    {siteData.pricing.map((category) => {
                        const isJewelry = category.title === 'Jewelry';
                        return (
                            <div 
                                key={category.title} 
                                className={`relative rounded-3xl p-8 sm:p-10 transition-all duration-300 hover:-translate-y-2 flex flex-col ${
                                    isJewelry 
                                        ? 'bg-white shadow-xl shadow-accent-gold/5 border border-accent-gold/20 ring-1 ring-accent-gold/10' 
                                        : 'bg-white shadow-lg border border-slate-100'
                                }`}
                            >
                                {isJewelry && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                                        Premium Retouching
                                    </div>
                                )}

                                <div className="flex items-start justify-between mb-8">
                                    <div className={`p-4 rounded-2xl ${
                                        isJewelry ? 'bg-accent-gold/10 text-accent-gold' : 'bg-accent-teal/10 text-accent-teal'
                                    }`}>
                                        {isJewelry ? <Gem size={32} /> : <Shirt size={32} />}
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Starting from</p>
                                        <p className="text-3xl font-bold text-slate-900">{category.items[0].price}</p>
                                    </div>
                                </div>
                                
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">{category.title}</h3>
                                <p className="text-slate-500 text-sm mb-8">
                                    {isJewelry 
                                        ? "Specialized high-end retouching for diamonds, gemstones, and precious metals. Includes focus stacking."
                                        : "Standard to advanced retouching for apparel, accessories, and ghost mannequins. Fast turnaround."
                                    }
                                </p>

                                <div className="space-y-0 mb-10 bg-slate-50/50 rounded-2xl p-1 border border-slate-100">
                                    {category.items.map((item) => (
                                        <div 
                                            key={item.name} 
                                            className="flex justify-between items-center p-4 hover:bg-white rounded-xl transition-all duration-200 group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`size-1.5 rounded-full ${isJewelry ? 'bg-accent-gold' : 'bg-accent-teal'} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                                                <span className="text-slate-600 font-medium group-hover:text-slate-900 transition-colors">{item.name}</span>
                                            </div>
                                            <span className="font-bold text-slate-900">{item.price}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto">
                                    <a 
                                        href="#contact"
                                        onClick={handleScroll}
                                        className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all ${
                                            isJewelry
                                                ? 'bg-primary text-white hover:bg-slate-800 shadow-xl shadow-primary/20'
                                                : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-primary hover:text-primary'
                                        }`}
                                    >
                                        Get Started
                                        <ArrowRight size={18} />
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                {/* Trust/Guarantee */}
                <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 text-sm font-medium text-slate-500 opacity-90">
                   <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                        <Check size={16} className="text-primary" />
                        <span>Volume Discounts (1000+ images)</span>
                   </div>
                   <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                        <Check size={16} className="text-primary" />
                        <span>Free Trial (3 Images)</span>
                   </div>
                   <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                        <Check size={16} className="text-primary" />
                        <span>Monthly Billing Available</span>
                   </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;