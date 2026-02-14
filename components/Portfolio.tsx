import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PlayCircle, ExternalLink, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, X, Image as ImageIcon, Film } from 'lucide-react';
import { siteData } from '../data';
import { Project } from '../types';

const Portfolio: React.FC = () => {
    const [filter, setFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    
    const thumbnailsRef = useRef<HTMLDivElement>(null);

    const categories = [
        { id: 'all', label: 'All Work' },
        ...Array.from(new Set(siteData.projects.map(p => p.category))).map(cat => ({
            id: cat,
            label: cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        }))
    ];

    const filteredProjects = filter === 'all' 
        ? siteData.projects 
        : siteData.projects.filter(p => p.category === filter);

    const openGallery = (project: Project) => {
        setSelectedProject(project);
        setCurrentMediaIndex(0);
        setZoomLevel(1);
        setIsTransitioning(false);
        document.body.style.overflow = 'hidden';
    };

    const closeGallery = useCallback(() => {
        setSelectedProject(null);
        document.body.style.overflow = 'unset';
    }, []);

    const handleZoom = (direction: 'in' | 'out') => {
        setZoomLevel(prev => {
            const newZoom = direction === 'in' ? prev + 0.25 : prev - 0.25;
            return Math.min(Math.max(newZoom, 0.5), 3);
        });
    };

    const getAllMedia = useCallback(() => {
        if (!selectedProject) return [];
        return [
            ...selectedProject.images.map(url => ({ type: 'image' as const, url })),
            ...(selectedProject.videos || []).map(url => ({ type: 'video' as const, url }))
        ];
    }, [selectedProject]);

    const changeMedia = useCallback((index: number) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentMediaIndex(index);
            setZoomLevel(1);
            setIsTransitioning(false);
        }, 200);
    }, []);

    const nextMedia = useCallback(() => {
        if (!selectedProject) return;
        const allMedia = getAllMedia();
        if (currentMediaIndex < allMedia.length - 1) {
            changeMedia(currentMediaIndex + 1);
        }
    }, [selectedProject, currentMediaIndex, getAllMedia, changeMedia]);

    const prevMedia = useCallback(() => {
        if (currentMediaIndex > 0) {
            changeMedia(currentMediaIndex - 1);
        }
    }, [currentMediaIndex, changeMedia]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedProject) return;
            switch (e.key) {
                case 'Escape': closeGallery(); break;
                case 'ArrowLeft': prevMedia(); break;
                case 'ArrowRight': nextMedia(); break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedProject, nextMedia, prevMedia, closeGallery]);

    // Auto-scroll thumbnails
    useEffect(() => {
        if (thumbnailsRef.current && selectedProject) {
            const activeThumb = thumbnailsRef.current.children[currentMediaIndex] as HTMLElement;
            if (activeThumb) {
                activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [currentMediaIndex, selectedProject]);

    const allMedia = getAllMedia();
    const currentMedia = allMedia[currentMediaIndex];

    return (
        <section className="py-32 bg-white scroll-mt-28" id="portfolio">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Master Portfolio Grid</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto mb-12">
                        Witness the world-class quality our expert agency delivers for global luxury brands.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-3 mb-16">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setFilter(cat.id)}
                                className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${
                                    filter === cat.id 
                                        ? 'bg-primary text-white shadow-lg shadow-primary/10' 
                                        : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
                    {filteredProjects.map((project) => (
                        <div 
                            key={project.id}
                            onClick={() => openGallery(project)}
                            className="relative group overflow-hidden rounded-3xl soft-shadow break-inside-avoid premium-border cursor-pointer bg-slate-100"
                        >
                            <img 
                                src={project.coverImage} 
                                alt={project.title}
                                className="w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            {project.type === 'video' && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl">
                                        <PlayCircle size={32} fill="currentColor" className="opacity-90" />
                                    </div>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                                <div className="flex justify-between items-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div>
                                        <p className="text-[10px] font-bold text-accent-teal uppercase tracking-[0.2em] mb-2">
                                            {project.category.replace('-', ' ')}
                                        </p>
                                        <h4 className="text-white font-bold text-xl">{project.title}</h4>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center text-white border border-white/30 hover:bg-white/30 transition-colors">
                                        <ExternalLink size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Gallery Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
                    <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm transition-opacity" onClick={closeGallery}></div>
                    <div className="relative w-full max-w-7xl h-full max-h-[95vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-fade-in-up">
                        
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100 z-10 shrink-0">
                            <div className="flex flex-col">
                                <h3 className="text-xl font-bold text-slate-900">{selectedProject.title}</h3>
                                <p className="text-sm text-slate-500 font-medium">{selectedProject.description}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-500 tracking-wide">
                                    {currentMediaIndex + 1} / {allMedia.length}
                                </span>
                                <button 
                                    onClick={closeGallery} 
                                    className="p-2.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    aria-label="Close gallery"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Main Canvas */}
                        <div className="flex-1 bg-slate-50 relative flex items-center justify-center overflow-hidden w-full group select-none">
                            {/* Navigation Buttons */}
                            <button 
                                onClick={prevMedia}
                                disabled={currentMediaIndex === 0}
                                className="absolute left-4 z-20 p-3 rounded-full bg-white/80 hover:bg-white shadow-lg backdrop-blur-sm text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110 focus:outline-none -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100"
                                aria-label="Previous image"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button 
                                onClick={nextMedia}
                                disabled={currentMediaIndex === allMedia.length - 1}
                                className="absolute right-4 z-20 p-3 rounded-full bg-white/80 hover:bg-white shadow-lg backdrop-blur-sm text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110 focus:outline-none translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100"
                                aria-label="Next image"
                            >
                                <ChevronRight size={24} />
                            </button>

                            {/* Media Display */}
                            <div className={`w-full h-full flex items-center justify-center p-4 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                                {currentMedia?.type === 'image' ? (
                                    <img 
                                        src={currentMedia.url} 
                                        alt={selectedProject.title}
                                        style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.2s ease-out' }}
                                        className="max-h-full max-w-full object-contain drop-shadow-xl"
                                        draggable={false}
                                    />
                                ) : (
                                    <video 
                                        src={currentMedia?.url} 
                                        controls 
                                        autoPlay
                                        className="max-h-full max-w-full object-contain drop-shadow-xl rounded-lg bg-black"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Footer Controls */}
                        <div className="bg-white border-t border-slate-100 px-6 py-4 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-2 order-2 sm:order-1">
                                <button 
                                    onClick={() => handleZoom('in')} 
                                    className="p-2 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-primary transition-colors"
                                    title="Zoom In"
                                >
                                    <ZoomIn size={20} />
                                </button>
                                <button 
                                    onClick={() => handleZoom('out')} 
                                    className="p-2 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-primary transition-colors"
                                    title="Zoom Out"
                                >
                                    <ZoomOut size={20} />
                                </button>
                            </div>

                            {/* Thumbnails */}
                            <div 
                                className="flex gap-3 overflow-x-auto hide-scrollbar px-2 py-1 max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl order-1 sm:order-2"
                                ref={thumbnailsRef}
                            >
                                {allMedia.map((media, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => changeMedia(i)}
                                        className={`relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 ${
                                            i === currentMediaIndex 
                                                ? 'ring-2 ring-primary ring-offset-2 scale-105 opacity-100' 
                                                : 'opacity-50 hover:opacity-80 hover:scale-105'
                                        }`}
                                    >
                                        {media.type === 'video' ? (
                                            <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                                                <Film size={16} className="text-white" />
                                            </div>
                                        ) : (
                                            <img src={media.url} className="w-full h-full object-cover" alt="thumb" />
                                        )}
                                        {i === currentMediaIndex && (
                                            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Info/Badge */}
                            <div className="hidden sm:flex items-center gap-2 order-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                                {selectedProject.type === 'video' ? <Film size={16} /> : <ImageIcon size={16} />}
                                <span>{selectedProject.type}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Portfolio;