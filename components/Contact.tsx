import React from 'react';
import { Send } from 'lucide-react';

const Contact: React.FC = () => {
    return (
        <section className="py-32 bg-background-base border-t border-black/5 scroll-mt-28" id="contact">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Get in Touch</h2>
                    <p className="text-slate-500 text-lg">Connect with our professional editing team. Response within 2 hours.</p>
                </div>
                <form className="space-y-6 bg-white p-10 rounded-3xl premium-border soft-shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">First Name</label>
                            <input className="w-full bg-slate-50 border-transparent rounded-xl px-5 py-4 text-slate-900 focus:bg-white focus:ring-2 focus:ring-accent-teal focus:border-transparent outline-none transition-all placeholder:text-slate-300" placeholder="Jane" type="text" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Last Name</label>
                            <input className="w-full bg-slate-50 border-transparent rounded-xl px-5 py-4 text-slate-900 focus:bg-white focus:ring-2 focus:ring-accent-teal focus:border-transparent outline-none transition-all placeholder:text-slate-300" placeholder="Doe" type="text" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Email</label>
                        <input className="w-full bg-slate-50 border-transparent rounded-xl px-5 py-4 text-slate-900 focus:bg-white focus:ring-2 focus:ring-accent-teal focus:border-transparent outline-none transition-all placeholder:text-slate-300" placeholder="jane@brand.com" type="email" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Message</label>
                        <textarea className="w-full bg-slate-50 border-transparent rounded-xl px-5 py-4 text-slate-900 focus:bg-white focus:ring-2 focus:ring-accent-teal focus:border-transparent outline-none transition-all placeholder:text-slate-300" placeholder="Project details..." rows={4}></textarea>
                    </div>
                    <button className="w-full py-5 bg-primary hover:bg-slate-800 text-white font-bold rounded-xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3 transform active:scale-95">
                        <span>Send Message</span>
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;