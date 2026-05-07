import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { PHOTOS } from '../data/constants';

export function Gallery() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);

  return (
    <div className="py-20 px-4 md:px-8 bg-blue-50/50">
      <h2 className="text-5xl md:text-6xl font-heading text-center text-blue-500 mb-10 drop-shadow-sm">Beautiful Memories 📸</h2>
      
      <div className="max-w-4xl mx-auto overflow-hidden" ref={emblaRef}>
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
                    className="w-full h-64 md:h-96 object-cover rounded-sm border hover:border-pink-300 bg-gray-100"
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
    </div>
  );
}
