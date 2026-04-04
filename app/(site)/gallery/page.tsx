import { getGalleryImages } from "@/services/gallery.service";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function FullGalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="min-h-screen bg-[#f5f1ed]">
      {/* --- HERO HEADER --- */}
      <section className="bg-[#3d342a] pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-3 text-[#d4a574] hover:text-white transition-all group uppercase text-[10px] tracking-[0.4em] font-bold"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
              Return Home
            </Link>
            
            <h1 className="font-serif text-6xl md:text-9xl text-white italic lowercase leading-none tracking-tighter">
              the archive.
            </h1>
          </div>
          
          <p className="text-[#d4a574] text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold border-l border-[#d4a574]/30 pl-6 py-2">
            Visual Record of <br /> Luxury Transformations
          </p>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto py-24 px-6">
        
        {/* Dynamic Grid: 4 in a row on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {images.map((img) => (
            <div key={img.id} className="group cursor-default">
              <div className="relative aspect-[3/4] overflow-hidden border border-[#8b6545]/10 bg-[#e5e1dd] shadow-2xl transition-all duration-700 hover:border-[#d4a574]/40">
                <img 
                  src={img.imageUrl} 
                  className="w-full h-full object-cover  opacity-80  transition-all duration-1000 group-hover:scale-105" 
                  alt={img.title} 
                />
                
                {/* Elegant Minimalist Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3d342a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                   <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                      <span className="text-[#d4a574] text-[9px] uppercase tracking-[0.3em] font-bold mb-2 block">
                        Masterpiece Look
                      </span>
                      <h3 className="text-white font-serif text-2xl italic leading-tight">
                        {img.title}
                      </h3>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {images.length === 0 && (
          <div className="py-40 text-center border border-dashed border-[#8b6545]/20 rounded-[4rem]">
            <p className="text-[#8b6545] font-serif text-2xl italic tracking-widest opacity-60">
              The archive is being curated...
            </p>
          </div>
        )}
      </div>

      {/* --- FOOTER DECORATION --- */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
         <div className="w-full h-px bg-gradient-to-r from-transparent via-[#8b6545]/20 to-transparent" />
         <p className="text-center mt-10 text-[9px] uppercase tracking-[0.5em] text-[#8b6545] opacity-50">
            Charis Store Canada • Global Boutique
         </p>
      </div>
    </div>
  );
}