'use client'
import React, { useState, useEffect, useMemo } from 'react'
import { X, MessageCircle, ChevronLeft, ChevronRight, Palette, Ruler, Info } from 'lucide-react'

export default function PublicProductModal({ product, company, onClose }: { product: any, company: any, onClose: () => void }) {
  const [activeImage, setActiveImage] = useState(0)
  
  // States to track selection
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedInch, setSelectedInch] = useState<string | null>(null)

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'unset' }
  }, [])

  if (!product) return null

  const images = product.images || []
  const colors = product.colors || [] 
  const inches = product.inches || []
  const categoryName = product.category?.name || 'Collection'
  
  const whatsappNumber = company?.whatsapp?.replace(/\D/g, '') || ''

  // --- BUNDLE DETECTION LOGIC ---
  const isBundle = useMemo(() => {
    return categoryName.toLowerCase().includes('bundle');
  }, [categoryName]);

  // --- DYNAMIC PRICE CALCULATION ---
  const selectedInchData = inches.find((i: any) => i.inches.toString() === selectedInch)
  const selectedColorData = colors.find((c: any) => c.color === selectedColor)
  
  const inchExtra = selectedInchData?.additionalPrice || 0
  const colorExtra = selectedColorData?.additionalPrice || 0
  
  const totalPrice = product.price + inchExtra + colorExtra
  const displayPrice = (totalPrice / 100).toFixed(2)

  const generateWhatsAppLink = () => {
    const baseUrl = `https://wa.me/${whatsappNumber}`
    const intro = `Hi Charis Store! ✨%0A%0AI am interested in ordering the following piece from your vault:%0A%0A`
    const itemName = `*Product:* ${product.name}%0A`
    const categoryPart = `*Category:* ${categoryName}%0A`
    const colorPart = selectedColor ? `*Color:* ${selectedColor}%0A` : `*Color:* Not selected%0A`
    const inchPart = selectedInch ? `*Length:* ${selectedInch}"%0A` : `*Length:* Not selected%0A`
    const pricePart = `*Final Price:* $${displayPrice}%0A`
    const footer = `%0APlease let me know the availability.`
    
    return `${baseUrl}?text=${intro}${itemName}${categoryPart}${colorPart}${inchPart}${pricePart}${footer}`
  }

  const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length)
  const prevImage = () => setActiveImage((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#37241d]/98 backdrop-blur-xl" onClick={onClose} />
      
      {/* MAIN MODAL CONTAINER */}
      <div className="relative bg-[#f5f1ed] w-full h-full md:h-[90vh] md:max-w-6xl rounded-none overflow-y-auto no-scrollbar shadow-2xl flex flex-col animate-in fade-in zoom-in duration-300">
        
        {/* FIXED CLOSE BUTTON */}
        <button 
          onClick={onClose} 
          className="fixed md:absolute top-5 right-5 text-[#37241d] z-[120] bg-white/90 backdrop-blur-md p-3 rounded-none shadow-xl border border-[#8b6545]/10 active:scale-90"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row min-h-full">
          
          {/* TOP/LEFT: IMAGE SECTION */}
          <div className="w-full md:w-3/5 relative bg-[#e5e1dd] flex flex-col border-b md:border-b-0 md:border-r border-[#8b6545]/10">
            <div className="relative w-full aspect-[4/5] md:aspect-auto md:flex-1 overflow-hidden group">
              <img 
                src={images[activeImage]?.imageUrl} 
                className="w-full h-full object-cover transition-all duration-700" 
                alt={product.name} 
              />

              {images.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 text-[#37241d] rounded-none backdrop-blur-md md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    <ChevronLeft size={28} />
                  </button>
                  <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 text-[#37241d] rounded-none backdrop-blur-md md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={28} />
                  </button>
                </>
              )}

              {product.isOnSale && (
                <div className="absolute top-0 left-0 bg-red-700 text-white text-[9px] font-black uppercase tracking-widest px-5 py-2 shadow-2xl">
                  Sale
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex gap-3 p-4 md:p-6 bg-white/40 border-t border-[#8b6545]/10 overflow-x-auto no-scrollbar scroll-smooth">
                {images.map((img: any, idx: number) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(idx)} 
                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded-none overflow-hidden flex-shrink-0 border-2 transition-all ${
                      activeImage === idx ? 'border-[#d4a574] scale-105' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={img.imageUrl} className="w-full h-full object-cover" alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* BOTTOM/RIGHT: CONTENT SECTION */}
          <div className="w-full md:w-2/5 p-6 md:p-14 flex flex-col bg-white">
            <div className="space-y-10 flex-1">
              
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[#8b6545] text-[9px] uppercase tracking-[0.4em] font-black border-r border-[#8b6545]/20 pr-4">
                    {categoryName}
                  </span>
                  <span className="text-[#d4a574] text-[8px] font-black uppercase tracking-widest">
                    {product.availability === 'in_hand' ? '● In Stock' : '○ Pre-Order'}
                  </span>
                </div>
                <h2 className="font-serif text-3xl md:text-5xl text-[#37241d] mb-4 italic lowercase leading-tight">{product.name}</h2>
                <div className="flex items-baseline gap-4 transition-all duration-500">
                  <p className="text-[#37241d] font-serif text-3xl font-light italic">
                    ${displayPrice}
                  </p>
                  {product.isOnSale && product.previousPrice && (
                    <p className="text-gray-400 text-base line-through italic font-light">
                      ${((product.previousPrice + inchExtra + colorExtra) / 100).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>

              {isBundle && (
                <div className="bg-[#8b6545]/5 border border-[#8b6545]/10 p-5 rounded-none space-y-4">
                  <div className="flex items-center gap-2 text-[#8b6545]">
                    <Info size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Bundle Pack Guide</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-white p-3 border border-[#8b6545]/10 shadow-sm">
                      <p className="text-[#8b6545] text-[8px] uppercase font-bold mb-1">3 Bundles</p>
                      <p className="text-lg text-[#37241d] font-serif italic">${(parseFloat(displayPrice) * 3).toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-3 border border-[#8b6545]/10 shadow-sm">
                      <p className="text-[#8b6545] text-[8px] uppercase font-bold mb-1">4 Bundles</p>
                      <p className="text-lg text-[#37241d] font-serif italic">${(parseFloat(displayPrice) * 4).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-y-6 md:gap-y-8 py-8 border-y border-[#8b6545]/10">
                 <InfoRow label="Origin" value={product.origin} />
                 <InfoRow label="Texture" value={product.texture} />
                 <InfoRow label="Processing" value={product.processing} />
                 <InfoRow label="Details" value={product.options} />
              </div>
              <div>
                <h4 className="text-[9px] text-[#8b6545] uppercase tracking-widest mb-4 font-black flex items-center gap-2">
                    <Palette size={12} className="text-[#d4a574]" /> Select Shade
                  </h4>
<div className="flex flex-wrap gap-2 md:gap-3">
  
  {colors.map((c: any) => {
    const isAvailable = c.isRestocked !== false;
    return (
      <button 
        key={c.id} 
        disabled={!isAvailable}
        onClick={() => setSelectedColor(c.color)}
        className={`min-h-[44px] px-5 py-2 text-[10px] uppercase tracking-widest transition-all border relative overflow-hidden rounded-none ${
          !isAvailable 
          ? 'bg-[#e5e1dd] border-[#8b6545]/20 text-[#37241d]/50 cursor-not-allowed' // Visible but "disabled" look
          : selectedColor === c.color 
            ? 'bg-[#37241d] text-[#d4a574] border-[#37241d] font-bold shadow-lg' 
            : 'bg-transparent border-[#8b6545]/20 text-[#37241d] hover:border-[#37241d]'
        }`}
      >
        {/* Diagonal Strike-through for unavailable items */}
        {!isAvailable && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[120%] h-px bg-[#8b6545]/40 -rotate-[25deg]"></div>
          </div>
        )}

        <span className={!isAvailable ? 'line-through decoration-[#37241d]/30' : ''}>
          {c.color}
        </span>
        
        {isAvailable && c.additionalPrice > 0 && (
          <span className="block text-[8px] mt-0.5 opacity-70">
            +${(c.additionalPrice / 100).toFixed(2)}
          </span>
        )}

        {/* Small "Sold Out" indicator if you want to be extra clear */}
        {!isAvailable && (
          <span className="absolute bottom-0.5 left-0 w-full text-[6px] font-black text-[#8b6545]/60 text-center uppercase tracking-tighter">
            Sold Out
          </span>
        )}
      </button>
    )
  })}
  </div>
</div>
              {/* LENGTH SELECTOR */}
              {inches.length > 0 && (
                <div>
                  <h4 className="text-[9px] text-[#8b6545] uppercase tracking-widest mb-4 font-black flex items-center gap-2">
                    <Ruler size={12} className="text-[#d4a574]" /> Select Length
                  </h4>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {inches.map((i: any) => (
                      <button 
                        key={i.id} 
                        onClick={() => setSelectedInch(i.inches.toString())}
                        className={`min-h-[44px] min-w-[55px] px-4 py-2 text-[12px] transition-all border rounded-none ${
                          selectedInch === i.inches.toString() 
                          ? 'bg-[#37241d] text-[#d4a574] border-[#37241d] font-bold shadow-lg' 
                          : 'border-[#8b6545]/20 text-[#37241d]'
                        }`}
                      >
                        {i.inches}"
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-12 mb-10 md:mb-0 space-y-5">
              <a 
                href={generateWhatsAppLink()}
                target="_blank"
                className={`w-full font-black py-5 md:py-6 text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 transition-all shadow-2xl active:scale-95 rounded-none ${
                  selectedColor && selectedInch 
                  ? 'bg-[#37241d] text-[#d4a574]' 
                  : 'bg-gray-100 text-gray-400 border border-gray-200 opacity-60'
                }`}
              >
                <MessageCircle size={18} /> Order via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[8px] uppercase tracking-widest text-[#8b6545] mb-2 font-bold">{label}</span>
      <span className="text-[#37241d] text-sm font-serif italic leading-tight">{value || 'Signature'}</span>
    </div>
  )
}