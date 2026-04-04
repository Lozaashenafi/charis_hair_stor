import { getDashboardStats } from "@/services/product.service";
import { ShoppingBag, Box, DollarSign, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-10 pb-20 px-4 md:px-0">
      {/* Welcome Header */}
      <header className="pt-6">
        <h1 className="font-serif text-4xl md:text-6xl text-[#37241d] italic lowercase">
          Overview.
        </h1>
        <p className="text-[#8b6545] text-[10px] uppercase tracking-[0.5em] mt-4 font-bold border-l-2 border-[#d4a574] pl-4">
          Charis Store Global Analytics
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard 
          title="Curated Masterpieces" 
          value={stats.totalProducts} 
          icon={<ShoppingBag className="text-[#d4a574]" size={22} />} 
          subtitle="Unique hair textures"
        />
        <StatCard 
          title="In Hand Inventory" 
          value={stats.inHandCount} 
          icon={<Box className="text-[#d4a574]" size={22} />} 
          subtitle="Ready for immediate shipping"
        />
        <StatCard 
          title="Inventory Value" 
          value={`$${stats.inventoryValue.toLocaleString()}`} 
          icon={<DollarSign className="text-[#d4a574]" size={22} />} 
          subtitle="Estimated Stock Worth (AUD)"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {/* Inventory Card */}
        <div className="bg-[#37241d] border border-[#8b6545]/30 p-10 rounded-[2rem] shadow-2xl relative overflow-hidden group">
          <div className="relative z-10">
            <div className="text-[#d4a574] mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
               <Box size={32} />
            </div>
            <h3 className="text-white font-serif text-3xl italic mb-4">The Vault</h3>
            <p className="text-[#f5f1ed]/60 text-sm mb-8 max-w-xs leading-relaxed font-light">
              Manage textures, update pricing, and curate your luxury human hair collections.
            </p>
            <Link href="/admin/products" className="inline-flex items-center gap-3 text-[#d4a574] text-[11px] uppercase tracking-widest font-bold group-hover:gap-6 transition-all bg-white/5 px-6 py-3 rounded-full border border-[#d4a574]/20">
              Manage Products <ArrowRight size={14} />
            </Link>
          </div>
          {/* Watermark Icon */}
          <div className="absolute -top-10 -right-10 p-10 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
             <ShoppingBag size={250} className="text-white" />
          </div>
        </div>

        {/* Brand Card */}
        <div className="bg-[#8b6545] border border-white/10 p-10 rounded-[2rem] shadow-2xl relative overflow-hidden group">
          <div className="relative z-10">
             <div className="text-[#37241d] mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
               <ShieldCheck size={32} />
            </div>
            <h3 className="text-white font-serif text-3xl italic mb-4">Brand Presence</h3>
            <p className="text-white/70 text-sm mb-8 max-w-xs leading-relaxed font-light">
              Keep your social links and contact points synchronized with your boutique storefront.
            </p>
            <Link href="/admin/profile" className="inline-flex items-center gap-3 text-white text-[11px] uppercase tracking-widest font-bold group-hover:gap-6 transition-all bg-black/10 px-6 py-3 rounded-full border border-white/20">
              Update Identity <ArrowRight size={14} />
            </Link>
          </div>
          {/* Watermark Icon */}
          <div className="absolute -top-10 -right-10 p-10 opacity-[0.05] group-hover:scale-110 transition-transform duration-1000">
             <DollarSign size={250} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, subtitle }: any) {
  return (
    <div className="bg-[#d1c1b5] border border-[#8b6545]/10 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-[#d4a574]/40 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-8">
        <div className="p-4 bg-[#37241d] rounded-2xl shadow-inner group-hover:bg-[#2d2520] transition-colors">
          {icon}
        </div>
        <div className="flex flex-col items-end">
           <span className="text-[9px] uppercase tracking-widest text-[#8b6545] font-black">Status</span>
           <span className="text-[10px] text-green-600 font-bold flex items-center gap-1">
             <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div> Verified
           </span>
        </div>
      </div>
      
      <h3 className="text-[#8b6545] text-[11px] uppercase tracking-[0.2em] font-bold mb-2">{title}</h3>
      <div className="flex items-baseline gap-2">
        <p className="text-[#37241d] text-5xl font-serif italic">{value}</p>
      </div>
      
      <div className="mt-6 pt-6 border-t border-[#8b6545]/5">
        <p className="text-[#8b6545]/60 text-[10px] uppercase tracking-wider font-medium">{subtitle}</p>
      </div>
    </div>
  );
}