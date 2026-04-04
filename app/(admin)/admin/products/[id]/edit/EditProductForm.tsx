'use client'
import { useState, FormEvent, ChangeEvent, useMemo } from 'react'
import { updateHairProduct } from '@/services/product.service'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/components/admin/ImageUpload'
import { Plus, Trash2, Info } from 'lucide-react'

// --- Interfaces ---
interface EditProductFormProps {
  product: ProductWithRelations;
  categories: Category[];
}
interface HairImage { id: number; imageUrl: string; }
interface HairColor { id: number; color: string; }
interface HairInch { id: number; inches: number; additionalPrice: number; }
interface Category { id: number; name: string; }

interface ProductWithRelations {
  id: number;
  name: string;
  categoryId: number | null;
  texture: string | null;
  hairType: string | null;
  origin: string | null;
  processing: string | null;
  options: string | null;
  price: number;
  previousPrice: number | null;
  isOnSale: boolean;
  availability: string;
  quantityInHand: number | null;
  images: HairImage[];
  colors: HairColor[];
  inches: HairInch[];
}

interface InchRow { inches: string; additionalPrice: string; }

export default function EditProductForm({ product, categories }: EditProductFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [imageUrls, setImageUrls] = useState<string[]>(product.images.map((img) => img.imageUrl))
  
  // Tracking states for Bundle logic
  const [selectedCatId, setSelectedCatId] = useState<string>(product.categoryId?.toString() || "")
  const [currentPrice, setCurrentPrice] = useState<string>((product.price / 100).toString())

  const [inchesList, setInchesList] = useState<InchRow[]>(
    product.inches.length > 0 
      ? product.inches.map((i) => ({ 
          inches: i.inches.toString(), 
          additionalPrice: (i.additionalPrice / 100).toString() 
        }))
      : [{ inches: '', additionalPrice: '0' }]
  )

  // Logic to detect Bundle category
  const isBundleCategory = useMemo(() => {
    const cat = categories.find(c => c.id.toString() === selectedCatId);
    return cat?.name.toLowerCase().includes('bundle');
  }, [selectedCatId, categories]);

  const addInchRow = (): void => setInchesList([...inchesList, { inches: '', additionalPrice: '0' }])
  const removeInchRow = (index: number): void => setInchesList(inchesList.filter((_, i) => i !== index))

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    const priceInCents = Math.round(parseFloat(currentPrice) * 100)

    const payload = {
      name: formData.get('name') as string,
      categoryId: selectedCatId ? parseInt(selectedCatId) : null,
      texture: formData.get('texture') as string,
      hairType: formData.get('hairType') as string,
      origin: formData.get('origin') as string,
      processing: formData.get('processing') as string,
      options: formData.get('options') as string,
      price: priceInCents,
      isOnSale: formData.get('isOnSale') === 'on',
      availability: formData.get('availability') as string || 'in_hand',
      quantityInHand: parseInt(formData.get('quantityInHand') as string || '0'),
      colors: formData.get('colors')?.toString().split(',').filter(Boolean).map((s: string) => s.trim()),
      inches: inchesList
        .filter((i: InchRow) => i.inches !== '')
        .map((i: InchRow) => ({ 
          value: i.inches, 
          extra: Math.round(parseFloat(i.additionalPrice || '0') * 100) 
        })),
      images: imageUrls,
    }

    const res = await updateHairProduct(product.id, payload)
    if (res.success) {
      router.push('/admin/products')
      router.refresh()
    } else {
      alert("Error updating masterpiece")
    }
    setLoading(false)
  }

  const inputClass = "w-full bg-zinc-800 border border-zinc-500 p-4 rounded-xl text-sm text-white outline-none focus:border-[#d4a574] transition-all shadow-inner"
  const labelClass = "text-xs uppercase tracking-widest text-white font-black block mb-2 ml-1"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
      
      {/* LEFT: IMAGE MANAGEMENT */}
      <div className="lg:col-span-4 space-y-6 order-1">
        <div className="bg-[#37241d] border border-[#8b6545]/20 p-6 rounded-[2.5rem] shadow-xl">
          <ImageUpload 
            urls={imageUrls} 
            onUploadComplete={(url: string) => setImageUrls(prev => [...prev, url])}
            onRemove={(url: string) => setImageUrls(prev => prev.filter((imgUrl: string) => imgUrl !== url))}
          />
        </div>
      </div>

      {/* RIGHT: PRODUCT DETAILS */}
      <div className="lg:col-span-8 space-y-8 bg-[#37241d] p-6 md:p-12 border border-[#8b6545]/20 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl order-2">
        
        {/* Section 1: Basic Identity */}
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
             <h3 className="text-[#d4a574] text-[10px] uppercase tracking-widest font-black">Basic Identity</h3>
             {product.previousPrice && (
               <span className="text-[9px] text-[#f5f1ed]/50 uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full border border-white/10">
                  Last: ${(product.previousPrice / 100).toFixed(2)}
               </span>
             )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className={labelClass}>Product Name</label>
                <input name="name" defaultValue={product.name} className={inputClass} required />
            </div>
            <div>
                <label className={labelClass}>Category</label>
                <select 
                  name="categoryId" 
                  value={selectedCatId} 
                  onChange={(e) => setSelectedCatId(e.target.value)}
                  className={inputClass}
                >
                  <option value="">None</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className={labelClass}>{isBundleCategory ? "Single Bundle Price ($)" : "Price ($)"}</label>
                <input 
                  name="price" 
                  type="number" 
                  step="0.01" 
                  value={currentPrice} 
                  onChange={(e) => setCurrentPrice(e.target.value)}
                  className={inputClass} 
                  required 
                />
            </div>
            <div className={`flex items-center gap-4 p-5 rounded-2xl border transition-all mt-6 ${product.isOnSale ? 'bg-[#d4a574]/10 border-[#d4a574]/40' : 'bg-white/5 border-white/10'}`}>
               <input type="checkbox" name="isOnSale" id="isOnSale" defaultChecked={product.isOnSale} className="w-6 h-6 accent-[#d4a574] cursor-pointer" />
               <label htmlFor="isOnSale" className="text-sm text-white font-bold cursor-pointer uppercase tracking-tighter">On Sale</label>
            </div>
          </div>

          {/* BUNDLE CALCULATION DISPLAY */}
          {isBundleCategory && (
            <div className="bg-[#8b6545]/20 border border-[#d4a574]/30 p-6 rounded-2xl animate-in fade-in zoom-in duration-300">
              <div className="flex items-center gap-2 mb-4 text-[#d4a574]">
                <Info size={16} />
                <h4 className="text-[10px] uppercase font-black tracking-widest">Bundle Deal Preview</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                  <p className="text-white/50 text-[9px] uppercase font-bold mb-1">3 Bundle Price</p>
                  <p className="text-2xl text-white font-serif italic">${(parseFloat(currentPrice || "0") * 3).toFixed(2)}</p>
                </div>
                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                  <p className="text-white/50 text-[9px] uppercase font-bold mb-1">4 Bundle Price</p>
                  <p className="text-2xl text-white font-serif italic">${(parseFloat(currentPrice || "0") * 4).toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Technical Specifications (ALL RESTORED) */}
        <div className="space-y-6 pt-4 border-t border-white/5">
          <h3 className="text-[#d4a574] text-[10px] uppercase tracking-widest font-black mb-4">Product Specs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Origin</label>
              <input list="origins" name="origin" defaultValue={product.origin || ''} className={inputClass} />
              <datalist id="origins">
                <option value="Brazilian"/><option value="Peruvian"/><option value="Chinese"/><option value="Malaysian"/><option value="Vietnamese"/><option value="Indian"/>
              </datalist>
            </div>
            <div>
              <label className={labelClass}>Texture</label>
              <input list="textures" name="texture" defaultValue={product.texture || ''} className={inputClass} />
              <datalist id="textures">
                <option value="Straight"/><option value="Body Wave"/><option value="Deep Wave"/><option value="Curly Wave"/><option value="Kinky Curly"/><option value="Loose Wave"/>
              </datalist>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <label className={labelClass}>Hair Type</label>
                <input name="hairType" defaultValue={product.hairType || ''} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Processing</label>
              <select name="processing" defaultValue={product.processing || 'Raw Hair'} className={inputClass}>
                <option value="Raw Hair">Raw Hair</option>
                <option value="Processed">Processed</option>
              </select>
            </div>
            <div>
                <label className={labelClass}>Inventory (Stock)</label>
                <input name="quantityInHand" type="number" defaultValue={product.quantityInHand || 0} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Section 3: Dynamic Inches */}
        <div className="space-y-6 pt-4 border-t border-white/5">
          <div className="flex justify-between items-center">
            <h3 className="text-[#d4a574] text-[10px] uppercase tracking-widest font-black">Inch Pricing</h3>
            <button type="button" onClick={addInchRow} className="flex items-center gap-2 text-[#d4a574] text-[10px] font-bold border border-[#d4a574]/30 px-3 py-1 rounded-full hover:bg-[#d4a574]/10">
              <Plus size={12} /> Add Length
            </button>
          </div>
          <div className="space-y-3">
            {inchesList.map((row, index) => (
              <div key={index} className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="text-[9px] text-white/40 uppercase font-bold mb-1 block">Inches</label>
                  <input 
                    type="number" 
                    className={inputClass} 
                    value={row.inches} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const newList = [...inchesList];
                      newList[index].inches = e.target.value;
                      setInchesList(newList);
                    }} 
                  />
                </div>
                <div className="flex-1">
                  <label className="text-[9px] text-white/40 uppercase font-bold mb-1 block">Extra Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    className={inputClass} 
                    value={row.additionalPrice} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const newList = [...inchesList];
                      newList[index].additionalPrice = e.target.value;
                      setInchesList(newList);
                    }} 
                  />
                </div>
                <button type="button" onClick={() => removeInchRow(index)} className="p-4 text-red-400 bg-red-400/10 rounded-xl hover:bg-red-400 hover:text-white transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6 pt-4 border-t border-white/5">
          <h3 className="text-[#d4a574] text-[10px] uppercase tracking-widest font-black">Available Colors</h3>
          <input name="colors" defaultValue={product.colors.map((c) => c.color).join(', ')} className={inputClass} placeholder="Natural Black, #613, #1B" />
        </div>

        <button disabled={loading} className="w-full bg-[#d4a574] text-[#37241d] font-black py-6 rounded-2xl hover:bg-white transition-all tracking-[0.3em] uppercase text-xs mt-6 shadow-2xl">
          {loading ? 'REFINING VAULT...' : 'UPDATE MASTERPIECE'}
        </button>
      </div>
    </form>
  )
}