'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import PublicProductModal from '@/components/site/PublicProductModal'
export const revalidate = 0; // Ensures no cache at all

interface ProductGridProps {
  products: any[];
  company: any;
}
export const dynamic = 'force-dynamic';
export default function ProductGrid({ products, company }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  return (
    <section className="py-10">
      {/* --- DYNAMIC GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="group cursor-pointer" 
            onClick={() => setSelectedProduct(product)}
          >
            {/* Image Container */}
            <div className="aspect-[4/5] overflow-hidden bg-[#1a1a1a] mb-6 border border-white/5 relative shadow-2xl transition-all group-hover:border-[#C5A059]/30">
              
              {/* Sale Badge */}
              {product.isOnSale && (
                <div className="absolute top-5 left-5 z-20 bg-red-600 text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg animate-pulse">
                  Sale
                </div>
              )}

              {/* Origin Badge */}
              <div className="absolute top-5 right-5 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-[#C5A059]/20 text-[8px] text-[#C5A059] uppercase tracking-widest font-black z-10">
                {product.origin || 'Premium'}
              </div>

              {/* Product Image */}
              {product.images && product.images[0] ? (
                <Image 
                  src={product.images[0].imageUrl} 
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-800">
                  No Image
                </div>
              )}
              
              {/* Subtle Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Product Details */}
            <div className="space-y-2 px-2">
                <span className="text-[#C5A059] text-[9px] uppercase tracking-[0.4em] font-black opacity-80">
                    {product.texture || product.hairType}
                </span>
                
                <h3 className="text-white text-xl font-serif italic group-hover:text-[#C5A059] transition-colors leading-tight">
                    {product.name}
                </h3>
                
                <div className="flex items-center gap-4 pt-1">
                  <p className="text-white text-2xl font-serif font-medium">
                    ${(product.price / 100).toFixed(2)}
                  </p>
                  
                  {product.isOnSale && product.previousPrice && (
                    <p className="text-zinc-600 text-sm line-through decoration-red-600/40 italic font-light">
                      ${(product.previousPrice / 100).toFixed(2)}
                    </p>
                  )}
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="py-20 text-center border border-dashed border-white/10 rounded-[3rem]">
          <p className="text-gray-500 font-serif text-xl italic tracking-widest">No pieces found in the collection...</p>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <PublicProductModal 
          product={selectedProduct} 
          company={company}
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </section>
  )
}