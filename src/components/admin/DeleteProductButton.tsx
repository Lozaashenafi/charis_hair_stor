'use client'
import { useState } from 'react'
import { deleteProduct } from '@/services/product.service'
import { Trash2 } from 'lucide-react'

export default function DeleteProductButton({ id }: { id: number }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (confirm("Are you sure you want to remove this piece from the collection?")) {
      setLoading(true)
      const res = await deleteProduct(id)
      if (!res.success) {
        alert("Error deleting product")
        setLoading(false)
      }
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
                className="flex-1 bg-[#f5f1ed] text-[#3d342a] py-3.5 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest border border-[#8b6545]/10 hover:bg-white transition-all"
    >
      <Trash2 size={16} />
    </button>
  )
}