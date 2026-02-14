import React from 'react';
import { X } from 'lucide-react';

interface LegalProps {
    type: 'privacy' | 'terms';
    onClose: () => void;
}

const Legal: React.FC<LegalProps> = ({ type, onClose }) => {
    const title = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service';
    
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col animate-fade-in-up">
                <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-white sticky top-0 z-10">
                    <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                    >
                        <X size={24} className="text-slate-600" />
                    </button>
                </div>
                
                <div className="p-8 overflow-y-auto">
                    <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed">
                        <p className="mb-6 font-medium text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
                        {type === 'privacy' ? (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">1. Information We Collect</h3>
                                    <p>We collect information that you provide directly to us, including when you fill out a form, request a quote, or communicate with us via third-party platforms. This may include your name, email address, and project details.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">2. How We Use Your Information</h3>
                                    <p>We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to communicate with you about your projects and our services.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">3. Data Security</h3>
                                    <p>We implement enterprise-grade security measures to protect the confidentiality of your images and personal information. All client assets are handled under strict NDA protocols.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">1. Acceptance of Terms</h3>
                                    <p>By accessing or using our services, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our services.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">2. Service Description</h3>
                                    <p>Snapiums provides premium image editing and AI post-production services. We reserve the right to modify, suspend, or discontinue any service at any time without notice.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">3. Intellectual Property</h3>
                                    <p>You retain all rights to your original images. You grant us a limited, non-exclusive license to use the images solely for the purpose of performing the requested services.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Legal;