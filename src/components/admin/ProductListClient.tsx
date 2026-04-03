'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Edit2, Eye, Package, MapPin, Hash, ChevronRight } from 'lucide-react'
import ProductDetailsModal from '@/components/admin/ProductDetailsModal'
import DeleteProductButton from '@/components/admin/DeleteProductButton'

export default function ProductListClient({ products }: { products: any[] }) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  return (
    <>
      {/* MOBILE VIEW: Luxury Cards */}
      <div className="grid grid-cols-1 gap-6 md:hidden">
        {products.map((product) => (
          <div key={product.id} className="bg-white border border-[#8b6545]/10 p-6 rounded-[2rem] shadow-sm space-y-5">
            <div className="flex gap-5">
              <div className="w-24 h-24 bg-[#f5f1ed] rounded-2xl overflow-hidden border border-[#8b6545]/5 flex-shrink-0 shadow-inner">
                {product.images?.[0] ? (
                  <img src={product.images[0].imageUrl} className="w-full h-full object-cover" alt={product.name} />
                ) : <Package className="w-full h-full p-6 text-[#8b6545]/20" />}
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-[9px] text-[#8b6545] uppercase tracking-widest font-bold mb-1 italic">
                  {product.hairType}
                </span>
                <h3 className="text-[#3d342a] font-serif text-lg leading-tight mb-2">{product.name}</h3>
                <p className="text-[#8b6545] font-serif text-2xl font-light italic">
                  ${(product.price / 100).toFixed(2)}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2 pt-4 border-t border-[#8b6545]/5">
              <button 
                onClick={() => setSelectedProduct(product)} 
                className="flex-1 bg-[#f5f1ed] text-[#3d342a] py-3.5 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest border border-[#8b6545]/10 hover:bg-white transition-all"
              >
                <Eye size={14} /> View
              </button>
              <Link 
                href={`/admin/products/${product.id}/edit`} 
                className="flex-1 bg-[#3d342a] text-[#d4a574] py-3.5 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:bg-[#2d2520] transition-all"
              >
                <Edit2 size={14} /> Edit
              </Link>
              <DeleteProductButton id={product.id} />
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP VIEW: High-End Vault Table */}
      <div className="hidden md:block bg-[#3d342a] border border-[#8b6545]/20 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-black/20 border-b border-white/5">
              <tr className="text-[10px] uppercase tracking-[0.3em] text-[#d4a574] font-bold">
                <th className="px-10 py-8">Masterpiece</th>
                <th className="px-6 py-8">Investment</th>
                <th className="px-6 py-8">Specifications</th>
                <th className="px-6 py-8">Status</th>
                <th className="px-10 py-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-white/[0.03] transition-all group">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-black/40 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0 shadow-xl group-hover:scale-105 transition-transform duration-500">
                        {product.images?.[0] && (
                          <img src={product.images[0].imageUrl} className="w-full h-full object-cover" alt={product.name} />
                        )}
                      </div>
                      <div>
                        <div className="text-white font-serif text-xl italic leading-tight mb-1">{product.name}</div>
                        <div className="text-[10px] text-[#d4a574] uppercase tracking-widest font-bold opacity-80">{product.hairType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-white font-serif text-3xl font-light italic">
                      ${(product.price / 100).toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-[11px] text-white/80 flex items-center gap-2">
                        <MapPin size={12} className="text-[#d4a574]"/> {product.origin}
                      </span>
                      <span className="text-[10px] text-white/40 flex items-center gap-2 uppercase tracking-widest font-bold">
                        <Hash size={12}/> {product.texture}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-5 py-2 rounded-full text-[9px] uppercase tracking-[0.2em] font-black border flex items-center justify-center w-fit gap-2 ${
                      product.availability === 'in_hand' 
                      ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                      : 'bg-[#d4a574]/10 text-[#d4a574] border-[#d4a574]/20'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${product.availability === 'in_hand' ? 'bg-green-400 animate-pulse' : 'bg-[#d4a574]'}`}></div>
                      {product.availability === 'in_hand' ? 'In Stock' : 'Pre-Order'}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                       <button onClick={() => setSelectedProduct(product)} className="p-3.5 bg-white/5 rounded-xl text-white hover:bg-[#d4a574] hover:text-[#3d342a] border border-white/10 transition-all">
                         <Eye size={18} />
                       </button>
                       <Link href={`/admin/products/${product.id}/edit`} className="p-3.5 bg-white/5 rounded-xl text-white hover:bg-[#d4a574] hover:text-[#3d342a] border border-white/10 transition-all">
                         <Edit2 size={18} />
                       </Link>
                       <DeleteProductButton id={product.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {products.length === 0 && (
          <div className="p-20 text-center">
            <Package className="mx-auto text-white/10 mb-4" size={64} />
            <p className="text-white/40 text-sm uppercase tracking-[0.3em]">The Vault is currently empty</p>
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </>
  )
}