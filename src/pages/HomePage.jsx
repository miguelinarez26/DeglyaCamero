import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { BookPromoSection } from '../sections/BookPromoSection';
import { PhilosophySection } from '../sections/PhilosophySection';
import { GallerySection } from '../sections/GallerySection';
import { SpecialistsSection } from '../sections/SpecialistsSection';
import { TestimonialsSection } from '../sections/TestimonialsSection';
import { AISection } from '../sections/AISection';
import { PortalSection } from '../sections/PortalSection';

export const HomePage = () => {
    return (
        <>
            <HeroSection />
            <BookPromoSection />
            <PhilosophySection />
            <GallerySection />
            <SpecialistsSection />
            <TestimonialsSection />
            <AISection />
            <PortalSection />
        </>
    );
};
