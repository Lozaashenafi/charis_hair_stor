import { getAdminProducts } from '@/services/product.service'
import ProductListClient from '@/components/admin/ProductListClient'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div className="space-y-10 pb-20 px-4 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-6">
        <div>
          <h1 className="font-serif text-5xl md:text-7xl text-[#37241d] italic lowercase tracking-tighter">
            Vault.
          </h1>
          <p className="text-[#8b6545] text-[10px] uppercase tracking-[0.5em] mt-4 font-bold border-l-2 border-[#d4a574] pl-4">
            Curated Inventory Archives
          </p>
        </div>
        
        <Link 
          href="/admin/products/new" 
          className="w-full md:w-auto bg-[#37241d] text-[#d4a574] px-10 py-5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-[#2d2520] hover:scale-105 transition-all text-center shadow-xl flex items-center justify-center gap-3"
        >
          <Plus size={16} /> Create Masterpiece
        </Link>
      </div>

      <ProductListClient products={products} />
    </div>
  )
}