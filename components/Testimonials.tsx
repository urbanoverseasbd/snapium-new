import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Pause, Play, TrendingUp, CheckCircle2 } from 'lucide-react';
import { siteData } from '../data';

const Testimonials: React.FC = () => {
    const { testimonials } = siteData;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef<number | null>(null);
    const SLIDE_DURATION = 6000;

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setProgress(0);
    }, [testimonials.length]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setProgress(0);
    };

    useEffect(() => {
        if (isPaused) return;

        const startTime = Date.now() - (progress / 100) * SLIDE_DURATION;
        
        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const newProgress = (elapsed / SLIDE_DURATION) * 100;
            
            if (newProgress >= 100) {
                nextSlide();
            } else {
                setProgress(newProgress);
                timerRef.current = requestAnimationFrame(updateProgress);
            }
        };

        timerRef.current = requestAnimationFrame(updateProgress);

        return () => {
            if (timerRef.current) cancelAnimationFrame(timerRef.current);
        };
    }, [isPaused, nextSlide, progress]);

    // Reset progress on manual navigation
    const handleManualChange = (index: number) => {
        setCurrentIndex(index);
        setProgress(0);
    };

    const currentData = testimonials[currentIndex];

    return (
        <section className="py-32 bg-white relative overflow-hidden scroll-mt-28" id="testimonials">
            {/* Ambient Background Elements matching site theme */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(95,158,160,0.03),transparent_40%)]"></div>
            <div className="absolute bottom-20 left-20 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl mix-blend-multiply"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                            <Star size={12} className="text-accent-gold fill-accent-gold" />
                            Client Success Stories
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                            Trusted by <br className="hidden md:block" />
                            Global Retailers
                        </h2>
                    </div>

                    {/* Desktop Controls */}
                    <div className="hidden md:flex items-center gap-3">
                        <button 
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-full border border-slate-200 bg-white text-slate-500 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
                            aria-label="Previous Slide"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button 
                            onClick={() => setIsPaused(!isPaused)}
                            className="w-12 h-12 rounded-full border border-slate-200 bg-white text-slate-500 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
                            aria-label={isPaused ? "Play" : "Pause"}
                        >
                            {isPaused ? <Play size={20} className="ml-0.5" /> : <Pause size={20} />}
                        </button>
                        <button 
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-full border border-slate-200 bg-white text-slate-500 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
                            aria-label="Next Slide"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Premium Dark Card - Primary Brand Color */}
                <div 
                    className="relative bg-primary rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 group"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="grid lg:grid-cols-5 min-h-[500px]">
                        
                        {/* Left Panel: Emotional Content */}
                        <div className="lg:col-span-3 p-10 md:p-16 flex flex-col justify-center relative z-10">
                            {/* Subtle Texture Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                            
                            <div className="relative">
                                {/* Decorative Quote Icon */}
                                <Quote size={80} className="text-white/5 absolute -top-10 -left-10 transform -scale-x-100 rotate-12" />
                                
                                <div className="flex gap-1 mb-8 relative">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} className="fill-accent-gold text-accent-gold" />
                                    ))}
                                </div>

                                <h3 
                                    key={`quote-${currentIndex}`}
                                    className="text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-snug mb-10 animate-fade-in-up"
                                >
                                    "{currentData.quote}"
                                </h3>

                                <div className="flex items-center gap-5">
                                    <div className="size-16 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-white font-bold text-2xl flex items-center justify-center shadow-lg">
                                        {currentData.author.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-xl">{currentData.author}</div>
                                        <div className="text-accent-teal font-medium text-sm flex items-center gap-2">
                                            {currentData.role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Panel: Rational Data (Glassmorphism) */}
                        <div className="lg:col-span-2 bg-slate-900/40 border-l border-white/5 p-10 md:p-16 flex flex-col justify-center backdrop-blur-sm relative">
                            <div className="flex items-center gap-2 mb-8 text-white/60 text-xs font-bold uppercase tracking-widest">
                                <TrendingUp size={16} className="text-accent-teal" />
                                <span>Impact Report</span>
                            </div>

                            <div className="space-y-4 relative z-10">
                                {currentData.metrics.map((metric, idx) => (
                                    <div 
                                        key={`metric-${currentIndex}-${idx}`}
                                        className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors duration-300 animate-fade-in-up group/metric cursor-default"
                                        style={{ animationDelay: `${idx * 150}ms` }}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1 p-1 rounded-full bg-accent-teal/20 text-accent-teal">
                                                <CheckCircle2 size={16} />
                                            </div>
                                            <div>
                                                <p className="text-lg font-bold text-white leading-tight group-hover/metric:text-accent-teal transition-colors">{metric}</p>
                                                <p className="text-white/40 text-[10px] mt-1 font-bold uppercase tracking-wide">Validated Result</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Trust Badge */}
                            <div className="mt-auto pt-10 border-t border-white/5 flex items-center justify-between">
                                <span className="text-xs font-medium text-white/40">Case Study ID: #{currentData.id.toString().padStart(3, '0')}</span>
                                <div className="flex items-center gap-2 text-white/40">
                                    <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-xs font-bold uppercase tracking-wider">Verified</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-900/50">
                        <div 
                            className="h-full bg-accent-teal shadow-[0_0_10px_rgba(95,158,160,0.8)] transition-all duration-[20ms] ease-linear"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Mobile Pagination Dots */}
                <div className="mt-8 flex md:hidden items-center justify-center gap-2">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleManualChange(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                idx === currentIndex 
                                    ? 'w-8 bg-primary' 
                                    : 'w-2 bg-slate-200 hover:bg-slate-300'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;