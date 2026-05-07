import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PHOTOS } from '../data/constants';

export function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="py-20 px-4 md:px-8 bg-blue-50/50">
      <h2 className="text-5xl md:text-6xl font-heading text-center text-blue-500 mb-10 drop-shadow-sm">Beautiful Memories 📸</h2>
      
      <div className="max-w-4xl mx-auto relative group">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {PHOTOS.map((src, index) => (
              <div 
                key={index} 
                className="relative flex-shrink-0 flex-grow-0 w-full min-w-0"
                style={{ flex: '0 0 100%' }}
              >
                <div className="p-4 md:p-8">
                  <div className="bg-white p-4 pb-16 md:p-6 md:pb-20 shadow-xl rounded-sm transform transition hover:-translate-y-2 hover:rotate-1 rotate-[-2deg]">
                    <img
                      src={src}
                      alt={`Memory ${index + 1}`}
                      className="w-full h-64 md:h-96 object-contain rounded-sm border hover:border-pink-300 bg-gray-100"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/800x800/ffd1dc/ffffff?text=Upload+memory-${index + 1}.jpg`;
                      }}
                    />
                    <p className="text-center mt-4 font-heading text-2xl text-gray-600">Sweet memories...</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white text-blue-500 rounded-full shadow-lg backdrop-blur-sm transition z-10 md:-ml-6 opacity-0 group-hover:opacity-100"
          aria-label="Previous image"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white text-blue-500 rounded-full shadow-lg backdrop-blur-sm transition z-10 md:-mr-6 opacity-0 group-hover:opacity-100"
          aria-label="Next image"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}
