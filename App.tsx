import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Legal from './components/Legal';
import { Timer, Repeat, Lock, ShieldCheck } from 'lucide-react';
import { Service } from './types';
import { siteData } from './data';

const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [legalPage, setLegalPage] = useState<'privacy' | 'terms' | null>(null);

  const features = [
      { icon: <Timer size={24} />, title: '24-Hour Turnaround', text: 'Next-day delivery for standard e-commerce batches.', color: 'text-green-700 bg-green-50' },
      { icon: <Repeat size={24} />, title: 'Unlimited Revisions', text: 'We work until the image meets your exact vision.', color: 'text-blue-700 bg-blue-50' },
      { icon: <Lock size={24} />, title: '100% Data Privacy', text: 'Enterprise-grade security and confidentiality agreements.', color: 'text-slate-700 bg-slate-100' },
      { icon: <ShieldCheck size={24} />, title: 'Expert Manual QC', text: 'Every AI output is polished by senior human editors.', color: 'text-accent-gold bg-accent-gold/10' },
  ];

  const handleOpenService = (id: string) => {
    const service = siteData.services.find(s => s.id === id);
    if (service) {
        setSelectedService(service);
        // Optional: Scroll to services section if opened from footer
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-display overflow-x-hidden w-full">
      <Navbar />
      <main className="relative flex min-h-screen w-full flex-col">
        <Hero />
        <Services 
            selectedService={selectedService}
            onSelectService={setSelectedService}
            onCloseModal={() => setSelectedService(null)}
        />
        <Portfolio />
        
        {/* Difference Section - Linked as "Process" */}
        <section className="py-24 bg-background-base border-t border-black/5 scroll-mt-28" id="process">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-5 gap-12 items-center">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">The Snapiums Difference</h2>
                        <p className="text-slate-500 text-lg mb-8">While generic AI tools fail on complex details, our hybrid agency model guarantees commercial perfection every time.</p>
                        <a className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-primary text-white font-bold hover:bg-slate-800 transition-all shadow-lg shadow-primary/10" href="#contact">
                            Partner With Us
                        </a>
                    </div>
                    <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6">
                        {features.map((feature, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white premium-border soft-shadow flex gap-4 items-start">
                                <div className={`flex-shrink-0 size-10 rounded-full flex items-center justify-center ${feature.color}`}>
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">{feature.title}</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">{feature.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        <Testimonials />
        <Pricing />
        <Contact />
      </main>
      <Footer 
        onOpenService={handleOpenService}
        onOpenLegal={setLegalPage}
      />

      {/* Legal Modal */}
      {legalPage && (
          <Legal type={legalPage} onClose={() => setLegalPage(null)} />
      )}
    </div>
  );
};

export default App;