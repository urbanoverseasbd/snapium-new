import React, { useEffect } from 'react';
import { Camera, Shirt, Sparkles, Video, Workflow, Gem, CheckCircle, ArrowRightLeft, X } from 'lucide-react';
import { siteData } from '../data';
import { Service } from '../types';

const iconMap: Record<string, React.ReactNode> = {
    camera: <Camera size={28} />,
    shirt: <Shirt size={28} />,
    sparkles: <Sparkles size={28} />,
    video: <Video size={28} />,
    workflow: <Workflow size={28} />,
    diamond: <Gem size={28} />,
};

interface ServicesProps {
    selectedService: Service | null;
    onSelectService: (service: Service) => void;
    onCloseModal: () => void;
}

const Services: React.FC<ServicesProps> = ({ selectedService, onSelectService, onCloseModal }) => {
    
    useEffect(() => {
        if (selectedService) {
            document.body.style.overflow = 'hidden';
            
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') onCloseModal();
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                document.body.style.overflow = 'unset';
                window.removeEventListener('keydown', handleKeyDown);
            };
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedService, onCloseModal]);

    return (
        <section className="py-32 bg-background-base scroll-mt-28" id="services">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Expert Retouching Services</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        Our professional editors leverage advanced AI models trained on luxury editorials to deliver consistent, brand-aligned visual assets across your entire catalog.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {siteData.services.map((service) => (
                        <div 
                            key={service.id}
                            onClick={() => onSelectService(service)}
                            className="group p-8 rounded-3xl bg-white premium-border soft-shadow hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
                        >
                            <div className="relative w-full mb-8 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 aspect-square">
                                <img 
                                    src={service.image || "https://picsum.photos/400/400"} 
                                    alt={service.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {service.tags.length > 0 && (
                                    <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                                        <span className="bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                                            {service.tags[0]}
                                        </span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`p-2 rounded-lg ${service.icon === 'diamond' ? 'bg-accent-gold/10 text-accent-gold' : 'bg-accent-teal/10 text-accent-teal'}`}>
                                    {iconMap[service.icon]}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                            </div>
                            
                            <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                                {service.description}
                            </p>
                            
                            <button className="w-full py-4 rounded-xl border border-slate-200 text-slate-700 font-bold group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all flex items-center justify-center gap-2">
                                <ArrowRightLeft size={18} />
                                Compare Results
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedService && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCloseModal}></div>
                    <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto animate-fade-in-up">
                        <button 
                            onClick={onCloseModal}
                            className="absolute top-4 right-4 z-10 size-10 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-all shadow-lg"
                        >
                            <X size={24} />
                        </button>

                        <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
                            <img src={selectedService.image} alt={selectedService.title} className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6 text-white">
                                <h2 className="text-3xl font-bold mb-2">{selectedService.title}</h2>
                                <div className="flex gap-2">
                                    {selectedService.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-bold uppercase tracking-wide">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <p className="text-slate-600 text-lg leading-relaxed mb-6">
                                {selectedService.fullDescription}
                            </p>
                            
                            <h4 className="text-lg font-bold text-slate-900 mb-4">What We Deliver:</h4>
                            <ul className="space-y-3 mb-8">
                                {selectedService.deliverables && selectedService.deliverables.length > 0 ? (
                                    selectedService.deliverables.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle className="text-primary mt-0.5 shrink-0" size={20} />
                                            <span className="text-slate-600">{item}</span>
                                        </li>
                                    ))
                                ) : (
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="text-primary mt-0.5 shrink-0" size={20} />
                                        <span className="text-slate-600">Premium quality assets tailored to your requirements.</span>
                                    </li>
                                )}
                            </ul>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a 
                                    href="#contact" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onCloseModal();
                                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="flex-1 h-12 flex items-center justify-center rounded-full bg-primary text-white font-bold hover:bg-slate-800 transition-all shadow-xl shadow-primary/10"
                                >
                                    Get Quote
                                </a>
                                <button 
                                    onClick={onCloseModal}
                                    className="flex-1 h-12 rounded-full bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Services;