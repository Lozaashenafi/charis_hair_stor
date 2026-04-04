import React from 'react';
import Link from 'next/link';
import { getGalleryImages } from '@/services/gallery.service';
import { ArrowRight } from 'lucide-react';

const GallerySection = async () => {
  const images = await getGalleryImages();
  
  // Logic preserved: Show ONLY the top 4 images
  const featuredGallery = images.slice(0, 4);

  return (
    <section id="gallery" className="relative bg-[#2d2520] py-32 px-6 overflow-hidden">
      
      {/* --- SUBTLE BOUTIQUE AMBIANCE --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft Golden Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#d4a574]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#8b6545]/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4a574]/30 bg-[#d4a574]/10 mb-4 backdrop-blur-sm">
                <span className="text-[#d4a574] text-xs font-serif italic">✦</span>
                <span className="text-[9px] uppercase tracking-[0.4em] font-black text-[#d4a574]">
                  Inspiration Archive
                </span>
            </div>
            <h2 className="font-serif text-5xl md:text-8xl text-white italic lowercase leading-tight">
              Styled Looks.
            </h2>
          </div>
          
          <p className="text-[#f5f1ed]/60 max-w-sm text-sm leading-relaxed font-light italic">
            "Observe the transformation. From sleek silhouettes to voluminous textures, your masterpiece awaits."
          </p>
        </header>

        {/* Dynamic Grid: 4 columns on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredGallery.map((item) => (
            <div 
              key={item.id} 
              className="group relative w-full aspect-[3/4]  overflow-hidden border border-white/5 bg-black/20 shadow-2xl transition-all duration-700 hover:border-[#d4a574]/30"
            >
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              
              {/* Elegant Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3d342a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                <span className="text-[#d4a574] text-[9px] uppercase tracking-[0.4em] font-black mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  Piece Details
                </span>
                <h3 className="text-white font-serif text-2xl italic leading-tight translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-75">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation to Full Gallery */}
        <div className="flex justify-center mt-24">
          <Link 
            href="/gallery" 
            className="group flex items-center gap-6 bg-[#d4a574] text-[#3d342a] px-16 py-6 rounded-full text-[11px] uppercase tracking-[0.5em] font-black hover:bg-white transition-all shadow-2xl active:scale-95"
          >
            Explore Full Archive 
            <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;