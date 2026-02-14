import React, { useState, useEffect, useRef } from 'react';
import { PlayCircle, Wand2, MoveHorizontal, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { siteData } from '../data';

const Hero: React.FC = () => {
    const { hero, trust } = siteData;
    const [compareValue, setCompareValue] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const [currentPairIndex, setCurrentPairIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);

    // Access explicit comparison pairs from data.ts
    const comparisonPairs = hero.comparisonPairs || [];
    const currentPair = comparisonPairs[currentPairIndex] || { before: '', after: '', label: '' };

    // Handle Image Comparison Slider Drag
    const handleMove = (clientX: number) => {
        if (sliderRef.current) {
            const rect = sliderRef.current.getBoundingClientRect();
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            const percentage = (x / rect.width) * 100;
            setCompareValue(percentage);
        }
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);
    
    useEffect(() => {
        const handleGlobalMove = (e: MouseEvent) => {
            if (isDragging) handleMove(e.clientX);
        };
        const handleGlobalUp = () => setIsDragging(false);

        window.addEventListener('mousemove', handleGlobalMove);
        window.addEventListener('mouseup', handleGlobalUp);
        return () => {
            window.removeEventListener('mousemove', handleGlobalMove);
            window.removeEventListener('mouseup', handleGlobalUp);
        };
    }, [isDragging]);

    const handleTouchMove = (e: React.TouchEvent) => {
        handleMove(e.touches[0].clientX);
    };

    // Navigation Handlers
    const changePair = (direction: 'next' | 'prev') => {
        if (isAnimating || comparisonPairs.length <= 1) return;
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300); // Animation duration

        setCurrentPairIndex((prev) => {
            if (direction === 'next') return (prev + 1) % comparisonPairs.length;
            return (prev - 1 + comparisonPairs.length) % comparisonPairs.length;
        });
    };

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative w-full overflow-hidden min-h-screen flex flex-col justify-center">
            {/* Background Media */}
            <div className="absolute inset-0 z-0">
                {hero.videoUrl ? (
                    <video 
                        autoPlay 
                        muted 
                        loop 
                        playsInline 
                        className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
                        poster={hero.poster}
                    >
                        <source src={hero.videoUrl} type="video/mp4" />
                    </video>
                ) : (
                    <img 
                        src={hero.poster} 
                        alt="Background" 
                        className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
                    />
                )}
                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-background-base/90 via-background-base/40 to-background-base"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.8)_100%)]"></div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-accent-teal/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-accent-gold/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 pt-32 pb-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Text Column */}
                    <div className="text-center lg:text-left order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm px-4 py-1.5 text-xs font-bold text-accent-teal uppercase tracking-widest shadow-sm mb-8 animate-fade-in-up">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-teal opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-teal"></span>
                            </span>
                            AI-Powered Precision
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
                            Perfecting <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-teal">Every Pixel.</span>
                        </h1>
                        
                        <p className="text-lg text-slate-600 leading-relaxed mb-10 font-medium max-w-xl mx-auto lg:mx-0">
                            Snapiums combines expert human artistry with cutting-edge AI to deliver commercial-grade imagery at scale.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-16 lg:mb-0">
                            <a 
                                href="#contact"
                                onClick={(e) => handleScroll(e, 'contact')}
                                className="w-full sm:w-auto inline-flex items-center justify-center h-14 px-8 rounded-full bg-primary text-white font-bold hover:bg-slate-800 transition-all shadow-xl shadow-primary/20 hover:-translate-y-1 gap-2 group"
                            >
                                <Wand2 size={20} className="group-hover:rotate-12 transition-transform" />
                                Start Free Trial
                            </a>
                            <a 
                                href="#portfolio"
                                onClick={(e) => handleScroll(e, 'portfolio')}
                                className="w-full sm:w-auto inline-flex items-center justify-center h-14 px-8 rounded-full bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all gap-2 shadow-sm hover:shadow-md hover:-translate-y-1"
                            >
                                <PlayCircle size={20} />
                                View Work
                            </a>
                        </div>
                        
                        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-500 mt-12">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={16} className="text-accent-teal" />
                                <span>24h Turnaround</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={16} className="text-accent-teal" />
                                <span>Enterprise Security</span>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Comparison Column */}
                    <div className="relative w-full max-w-2xl mx-auto lg:max-w-none order-1 lg:order-2">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-[8px] border-white bg-slate-100 aspect-[4/3] group select-none">
                            
                            {/* Navigation Buttons (Overlay) */}
                            {comparisonPairs.length > 1 && (
                                <>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); changePair('prev'); }}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-lg backdrop-blur-sm transition-all hover:scale-110 active:scale-95"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); changePair('next'); }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-lg backdrop-blur-sm transition-all hover:scale-110 active:scale-95"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}

                            {/* Comparison Slider Container */}
                            <div 
                                ref={sliderRef}
                                className={`relative w-full h-full cursor-ew-resize transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}
                                onMouseDown={handleMouseDown}
                                onTouchMove={handleTouchMove}
                            >
                                {/* After Image (Base) */}
                                <img 
                                    src={currentPair.after} 
                                    alt="Edited Result" 
                                    className="absolute inset-0 w-full h-full object-cover"
                                    draggable={false}
                                />
                                <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-md z-10 shadow-lg pointer-events-none">
                                    EDITED
                                </div>

                                {/* Before Image (Clipped) */}
                                <div 
                                    className="absolute inset-0 overflow-hidden border-r-2 border-white/50 bg-slate-200"
                                    style={{ width: `${compareValue}%` }}
                                >
                                    <img 
                                        src={currentPair.before} 
                                        alt="Raw Input" 
                                        className="absolute top-0 left-0 max-w-none h-full object-cover"
                                        style={{ width: sliderRef.current?.offsetWidth || '100%' }}
                                        draggable={false}
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1 rounded-md shadow-lg pointer-events-none">
                                        RAW
                                    </div>
                                </div>

                                {/* Handle */}
                                <div 
                                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_20px_rgba(0,0,0,0.5)] z-20 flex items-center justify-center"
                                    style={{ left: `${compareValue}%` }}
                                >
                                    <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary border-4 border-slate-100 transform transition-transform hover:scale-110 active:scale-95">
                                        <MoveHorizontal size={20} />
                                    </div>
                                </div>
                                
                                {/* Label & Dots Overlay */}
                                <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none z-20">
                                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20">
                                        {currentPair.label}
                                    </span>
                                    {comparisonPairs.length > 1 && (
                                        <div className="flex gap-1.5">
                                            {comparisonPairs.map((_, i) => (
                                                <div 
                                                    key={i} 
                                                    className={`h-1.5 rounded-full shadow-sm transition-all duration-300 ${i === currentPairIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                                                ></div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 hidden sm:block animate-bounce-slow z-20">
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Editor" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                                <div className="text-xs">
                                    <p className="font-bold text-slate-900">Expert Review</p>
                                    <p className="text-slate-500">Human in the loop</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust Section - Integrated seamlessly */}
            <div className="relative border-t border-slate-200 bg-white/50 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                    <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Trusted by Global Brands</p>
                    <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {trust.map((logo, i) => (
                            <img 
                                key={i}
                                src={logo} 
                                alt="Brand Partner" 
                                className="h-8 w-auto object-contain hover:opacity-100 hover:scale-110 transition-all cursor-pointer" 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;