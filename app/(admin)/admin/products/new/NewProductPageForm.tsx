'use client'
import { useState, useMemo } from 'react'
import { createHairProduct } from '@/services/product.service'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/components/admin/ImageUpload'
import { Plus, Trash2, Info } from 'lucide-react'

interface Category {
  id: number;
  name: string;
}

export default function NewProductPageForm({ categories }: { categories: Category[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [selectedCatId, setSelectedCatId] = useState<string>("")
  const [basePrice, setBasePrice] = useState<string>("0")
  
  const [inchesList, setInchesList] = useState([{ inches: '', additionalPrice: '0' }])

  const addInchRow = () => setInchesList([...inchesList, { inches: '', additionalPrice: '0' }])
  const removeInchRow = (index: number) => setInchesList(inchesList.filter((_, i) => i !== index))

  // Logic to detect Bundle category
  const isBundleCategory = useMemo(() => {
    const cat = categories.find(c => c.id.toString() === selectedCatId);
    return cat?.name.toLowerCase().includes('bundle');
  }, [selectedCatId, categories]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (imageUrls.length === 0) return alert("Please upload at least one image")
    
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const priceInCents = Math.round(parseFloat(basePrice) * 100)

    const payload = {
      name: formData.get('name'),
      categoryId: selectedCatId ? parseInt(selectedCatId) : null,
      texture: formData.get('texture'),
      hairType: formData.get('hairType'),
      origin: formData.get('origin'),
      processing: formData.get('processing'),
      price: priceInCents,
      isOnSale: formData.get('isOnSale') === 'on',
      availability: 'in_hand',
      quantityInHand: parseInt(formData.get('quantityInHand') as string || '0'),
      colors: formData.get('colors')?.toString().split(',').filter(Boolean).map((s: string) => s.trim()),
      inches: inchesList
        .filter(i => i.inches !== '')
        .map(i => ({ 
          value: i.inches, 
          extra: Math.round(parseFloat(i.additionalPrice) * 100) 
        })),
      images: imageUrls,
    }

    const res = await createHairProduct(payload)
    if (res.success) {
      router.push('/admin/products')
      router.refresh()
    } else {
      alert("Error saving product")
    }
    setLoading(false)
  }

  const inputClass = "w-full bg-zinc-800 border border-zinc-500 p-4 rounded-xl text-sm text-white placeholder:text-zinc-400 outline-none focus:border-[#d4a574] transition-all";
  const labelClass = "text-xs uppercase tracking-widest text-white font-black block mb-2";

  return (
    <div className="max-w-6xl mx-auto pb-20 px-4">
      <header className="mb-10 mt-6 text-center lg:text-left">
        <h1 className="font-serif text-4xl md:text-6xl text-[#37241d] italic lowercase">New Masterpiece.</h1>
        <p className="text-[#8b6545] text-[10px] uppercase tracking-[0.4em] font-black mt-4">Archive to Luxury Vault</p>
      </header>
      
      <form onSubmit={handleSubmit} className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#37241d] border border-[#8b6545]/20 p-6 rounded-[2.5rem] shadow-2xl">
             <ImageUpload 
                urls={imageUrls} 
                onUploadComplete={(url) => setImageUrls(prev => [...prev, url])} 
                onRemove={(url) => setImageUrls(prev => prev.filter(item => item !== url))} 
              />
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8 bg-[#37241d] p-6 md:p-12 border border-[#8b6545]/20 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl">
          
          {/* Section 1: Identity & Pricing */}
          <div className="space-y-6">
            <h3 className="text-[#d4a574] text-[10px] uppercase font-black border-b border-white/5 pb-3 tracking-widest">Basic Identity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Product Name</label>
                <input name="name" type="text" className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Category</label>
                <select 
                  name="categoryId" 
                  className={inputClass}
                  value={selectedCatId}
                  onChange={(e) => setSelectedCatId(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories?.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>{isBundleCategory ? "Single Bundle Price ($)" : "Base Price ($)"}</label>
                <input 
                  name="price" 
                  type="number" 
                  step="0.01" 
                  className={inputClass} 
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                  required 
                />
              </div>
              <div className="flex items-end pb-1">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 w-full">
                  <input type="checkbox" name="isOnSale" id="isOnSale" className="w-6 h-6 accent-[#d4a574]" />
                  <label htmlFor="isOnSale" className="text-xs text-white font-bold uppercase cursor-pointer">On Sale</label>
                </div>
              </div>
            </div>

            {/* BUNDLE CALCULATION DISPLAY */}
            {isBundleCategory && (
              <div className="bg-[#8b6545]/20 border border-[#d4a574]/30 p-6 rounded-2xl animate-in fade-in zoom-in duration-300">
                <div className="flex items-center gap-2 mb-4 text-[#d4a574]">
                  <Info size={16} />
                  <h4 className="text-[10px] uppercase font-black tracking-widest">Bundle Pricing Preview</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                    <p className="text-white/50 text-[9px] uppercase font-bold mb-1">3 Bundle Price</p>
                    <p className="text-2xl text-white font-serif italic">${(parseFloat(basePrice || "0") * 3).toFixed(2)}</p>
                  </div>
                  <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                    <p className="text-white/50 text-[9px] uppercase font-bold mb-1">4 Bundle Price</p>
                    <p className="text-2xl text-white font-serif italic">${(parseFloat(basePrice || "0") * 4).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Full Specs (RESTORED) */}
          <div className="space-y-6">
            <h3 className="text-[#d4a574] text-[10px] uppercase font-black border-b border-white/5 pb-3 tracking-widest">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className={labelClass}>Origin</label>
                  <input list="origins" name="origin" className={inputClass} />
                  <datalist id="origins">
                    <option value="Brazilian"/><option value="Peruvian"/><option value="Chinese"/><option value="Malaysian"/><option value="Indian"/><option value="Vietnamese"/>
                  </datalist>
               </div>
               <div>
                  <label className={labelClass}>Texture</label>
                  <input list="textures" name="texture" className={inputClass} />
                  <datalist id="textures">
                    <option value="Straight"/><option value="Body Wave"/><option value="Deep Wave"/><option value="Curly Wave"/><option value="Loose Wave"/><option value="Kinky Curly"/>
                  </datalist>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div>
                  <label className={labelClass}>Hair Type</label>
                  <input name="hairType" placeholder="e.g. 13x4 Lace Wig" className={inputClass} />
               </div>
               <div>
                  <label className={labelClass}>Processing</label>
                  <select name="processing" className={inputClass}>
                    <option value="Raw Hair">Raw Hair</option>
                    <option value="Processed">Processed</option>
                  </select>
               </div>
               <div>
                  <label className={labelClass}>Inventory (Stock)</label>
                  <input name="quantityInHand" type="number" className={inputClass} placeholder="0" />
               </div>
            </div>
          </div>

          {/* Section 3: Lengths & Colors */}
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="text-[#d4a574] text-[10px] uppercase tracking-widest font-black">Inch Pricing (Dynamic)</h3>
              <button type="button" onClick={addInchRow} className="flex items-center gap-2 text-[#d4a574] text-[10px] font-bold border border-[#d4a574]/30 px-3 py-1 rounded-full hover:bg-[#d4a574]/10">
                <Plus size={12} /> Add Length
              </button>
            </div>
            
            <div className="space-y-3">
              {inchesList.map((row, index) => (
                <div key={index} className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="text-[9px] text-white/40 uppercase font-bold mb-1 block">Inches</label>
                    <input type="number" placeholder="22" className={inputClass} value={row.inches} onChange={(e) => {
                      const newList = [...inchesList];
                      newList[index].inches = e.target.value;
                      setInchesList(newList);
                    }} />
                  </div>
                  <div className="flex-1">
                    <label className="text-[9px] text-white/40 uppercase font-bold mb-1 block">Extra Price ($)</label>
                    <input type="number" step="0.01" placeholder="0.00" className={inputClass} value={row.additionalPrice} onChange={(e) => {
                      const newList = [...inchesList];
                      newList[index].additionalPrice = e.target.value;
                      setInchesList(newList);
                    }} />
                  </div>
                  <button type="button" onClick={() => removeInchRow(index)} className="p-4 text-red-400 bg-red-400/10 rounded-xl hover:bg-red-400 hover:text-white transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className={labelClass}>Available Colors</label>
            <input name="colors" type="text" className={inputClass} placeholder="Natural Black, #613, #1B (Comma separated)" />
          </div>

          <button disabled={loading} className="w-full bg-[#d4a574] text-[#37241d] font-black py-6 rounded-2xl shadow-2xl active:scale-95 transition-all uppercase tracking-widest text-xs">
            {loading ? 'SYNCHRONIZING...' : 'CREATE MASTERPIECE'}
          </button>
        </div>
      </form>
    </div>
  )
}