'use client'
import React, { useState, useMemo } from 'react'
import { Search, Menu, X, RotateCcw, Link, ArrowLeft } from 'lucide-react'
import PublicProductModal from '@/components/site/PublicProductModal'
import Image from 'next/image'
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Ensures no cache at all

export default function AllProductsClient({ products = [], company }: { products: any[], company: any }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Safe category extraction
  const types = useMemo(() => {
    if (!products) return ['All'];
    return ['All', ...Array.from(new Set(products.map(p => p.category?.name || p.hairType).filter(Boolean)))]
  }, [products])

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter(p => {
      const pCategory = p.category?.name || p.hairType
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === 'All' || pCategory === filterType
      return matchesSearch && matchesType
    })
  }, [searchTerm, filterType, products])

  const resetFilters = () => {
    setFilterType('All')
    setSearchTerm('')
    setIsSidebarOpen(false)
  }

  return (
    <div className="relative bg-[#2d2520] min-h-screen">
      
      <div className="sticky top-0 z-40 bg-[#3d342a]/95 backdrop-blur-md border-b border-[#d4a574]/20 p-4 md:p-6 mb-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 items-center">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d4a574]/50" size={18} />
            <input 
              type="text"
              placeholder="Search the vault..."
              className="w-full bg-[#2d2520] border border-[#d4a574]/20 rounded-none py-4 pl-12 pr-6 text-sm text-[#f5f1ed] placeholder:text-[#8b6545] focus:border-[#d4a574] outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Mobile Filter Trigger */}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden w-full flex items-center justify-center gap-3 bg-[#d4a574] text-[#3d342a] px-8 py-4 rounded-none font-black text-[10px] uppercase tracking-widest active:bg-[#f5f1ed] transition-colors"
          >
            <Menu size={18} /> Filter Categories
          </button>

          {/* Desktop Category Selector */}
          <div className="hidden lg:flex items-center gap-8 px-6 border-l border-[#d4a574]/20">
             <div className="flex flex-col">
               <span className="text-[8px] uppercase tracking-[0.3em] text-[#d4a574] font-black mb-1">Collection</span>
               <select 
                 value={filterType} 
                 onChange={(e)=>setFilterType(e.target.value)} 
                 className="bg-transparent text-[#f5f1ed] text-xs font-bold uppercase tracking-widest outline-none cursor-pointer hover:text-[#d4a574] transition-colors"
               >
                  {types.map(cat => <option key={cat} value={cat} className="bg-[#3d342a]">{cat}</option>)}
               </select>
             </div>

             {searchTerm || filterType !== 'All' ? (
               <button onClick={resetFilters} className="text-[#d4a574] hover:rotate-180 transition-transform duration-500">
                 <RotateCcw size={18}/>
               </button>
             ) : null}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        {/* --- RESULTS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer" onClick={() => setSelectedProduct(product)}>
              
              {/* Image Container - SHARP (rounded-none) */}
              <div className="aspect-[4/5] overflow-hidden bg-[#3d342a] mb-6 border border-[#d4a574]/10 relative shadow-xl transition-all group-hover:border-[#d4a574]/40 rounded-none">
                
                {/* Sale Badge */}
                {product.isOnSale && (
                  <div className="absolute top-0 left-0 z-20 bg-red-700 text-[#f5f1ed] text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2">
                    Sale
                  </div>
                )}
                {/* Origin Badge */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-[#3d342a]/80 backdrop-blur-md border border-[#d4a574]/20 text-[8px] text-[#d4a574] uppercase tracking-widest font-black z-10">
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
                  <div className="w-full h-full flex items-center justify-center text-[#8b6545] italic font-serif">
                    Image Pending
                  </div>
                )}
                
                {/* Subtle Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d2520]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Product Details */}
              <div className="space-y-3">
                  <span className="text-[#d4a574] text-[10px] uppercase tracking-[0.4em] font-black opacity-80 block">
                      {product.texture || product.hairType}
                  </span>
                  
                  <h3 className="text-[#f5f1ed] text-xl font-serif italic group-hover:text-[#d4a574] transition-colors leading-tight">
                      {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-5 pt-1">
                    <p className="text-[#f5f1ed] text-2xl font-serif font-light italic">
                      ${(product.price / 100).toFixed(2)}
                    </p>
                    
                    {product.isOnSale && product.previousPrice && (
                      <p className="text-[#8b6545] text-lg line-through decoration-red-900/50 font-light italic">
                        ${(product.previousPrice / 100).toFixed(2)}
                      </p>
                    )}
                  </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-40 text-center border border-[#d4a574]/10 bg-[#3d342a]/20">
            <p className="text-[#8b6545] font-serif text-3xl italic tracking-widest opacity-60 lowercase">
              no matching pieces found in our vault...
            </p>
          </div>
        )}
      </div>

      {/* --- MOBILE SIDEBAR DRAWER (SHARP) --- */}
      <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isSidebarOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-[#2d2520]/90 backdrop-blur-md transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsSidebarOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-[#3d342a] border-l border-[#d4a574]/20 p-10 shadow-2xl transition-transform duration-500 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-[#f5f1ed] font-serif text-3xl italic">Archive.</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="text-[#d4a574] hover:text-[#f5f1ed] transition-colors">
              <X size={32} />
            </button>
          </div>

          <div className="space-y-12">
            <div className="space-y-6">
              <label className="text-[10px] uppercase tracking-[0.4em] text-[#d4a574] font-black">Browse Collections</label>
              <div className="flex flex-col gap-px bg-[#d4a574]/10">
                {types.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => {setFilterType(cat); setIsSidebarOpen(false);}}
                    className={`py-6 px-8 text-[11px] text-left uppercase tracking-[0.2em] transition-all ${filterType === cat ? 'bg-[#d4a574] text-[#3d342a] font-black' : 'bg-[#3d342a] text-[#8b6545] hover:text-[#f5f1ed]'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={resetFilters} className="w-full py-5 border border-[#d4a574]/20 text-[#d4a574] text-[10px] uppercase tracking-[0.5em] font-black flex items-center justify-center gap-3 hover:bg-[#d4a574] hover:text-[#3d342a] transition-all">
              <RotateCcw size={14} /> Reset Vault
            </button>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <PublicProductModal 
          product={selectedProduct} 
          company={company}
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  )
}