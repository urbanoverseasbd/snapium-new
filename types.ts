export interface Service {
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    icon: string;
    image: string;
    tags: string[];
    deliverables: string[];
}

export interface Project {
    id: string;
    category: string;
    title: string;
    description: string;
    coverImage: string;
    images: string[];
    videos?: string[];
    type: 'image' | 'video';
}

export interface Testimonial {
    id: number;
    quote: string;
    author: string;
    role: string;
    metrics: string[];
}

export interface PricingItem {
    name: string;
    price: string;
}

export interface PricingCategory {
    title: string;
    icon: string;
    items: PricingItem[];
}

export interface ComparisonPair {
    label: string;
    before: string;
    after: string;
}

export interface SiteData {
    hero: {
        title: string;
        subtitle: string;
        videoUrl: string;
        poster: string;
        comparisonPairs: ComparisonPair[];
    };
    trust: string[];
    services: Service[];
    projects: Project[];
    testimonials: Testimonial[];
    pricing: PricingCategory[];
}