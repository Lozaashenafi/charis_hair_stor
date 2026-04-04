import Link from 'next/link';
import Image from 'next/image';
import { 
   
  MessageCircle, 
  Truck, 
  ShieldCheck, 
  Mail, 
  MapPin, 
  ArrowUpRight 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#37241d] text-[#f5f1ed] pt-20 pb-10 border-t border-[#8b6545]/20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="inline-block">
              <div className="bg-[#8b6f47] p-3 rounded shadow-xl border border-white/10">
                <span className="text-white font-bold text-xs tracking-[0.3em] uppercase">Charis Store</span>
              </div>
            </Link>
            <p className="text-[#d4a574] font-serif text-2xl italic leading-relaxed max-w-md">
              "elevating modern beauty through premium, ethically sourced luxury hair."
            </p>
            <div className="flex gap-6">
              <SocialLink icon={<MessageCircle size={20} />} href="#" label="WhatsApp" />
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
                <span className="w-8 h-px bg-white/20"></span> Follow Our Story
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-[#d4a574]">The Vault</h4>
              <ul className="space-y-4 text-sm font-light text-white/60">
                <li><Link href="/" className="hover:text-[#d4a574] transition-colors">Home</Link></li>
                <li><Link href="/products" className="hover:text-[#d4a574] transition-colors">Collections</Link></li>
                <li><Link href="/products" className="hover:text-[#d4a574] transition-colors">Bundles</Link></li>
                <li><Link href="/products" className="hover:text-[#d4a574] transition-colors">Wigs</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-[#d4a574]">Company</h4>
              <ul className="space-y-4 text-sm font-light text-white/60">
                <li><Link href="/about" className="hover:text-[#d4a574] transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-[#d4a574] transition-colors">FAQ</Link></li>
                <li><Link href="#" className="hover:text-[#d4a574] transition-colors">Shipping</Link></li>
                <li><Link href="#" className="hover:text-[#d4a574] transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-[#d4a574]">Get in Touch</h4>
            <div className="space-y-4">
              <ContactItem icon={<Mail size={16} />} text="hello@charisstore.com" />
              <ContactItem icon={<MessageCircle size={16} />} text="+1 (234) 567-890" />
              <ContactItem icon={<MapPin size={16} />} text="Canada & USA - Worldwide Shipping" />
            </div>
            
            {/* Newsletter Mini-Form */}
            <div className="pt-6 border-t border-white/5">
              <p className="text-[10px] uppercase tracking-widest mb-4 opacity-40">Join the Elite List</p>
              <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-transparent border-none outline-none flex-1 px-4 text-xs font-light"
                />
                <button className="bg-[#d4a574] text-[#3d342a] p-2 rounded-full hover:bg-white transition-colors">
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-white/5 mb-10">
          <TrustBadge 
            icon={<Truck className="text-[#d4a574]" size={24} />} 
            title="Global Shipping" 
            desc="Free delivery in Canada & USA" 
          />
          <TrustBadge 
            icon={<ShieldCheck className="text-[#d4a574]" size={24} />} 
            title="6 Month Warranty" 
            desc="Guaranteed quality masterpieces" 
          />
          <TrustBadge 
            icon={<Image src="/logo.png" width={20} height={20} alt="" className="opacity-40" />} 
            title="100% Human Hair" 
            desc="Ethically sourced & curated" 
          />
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
          <p className="text-[10px] uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Charis Store Canada. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em]">
             <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
             <Link href="#" className="hover:text-white transition-colors">Terms</Link>
             <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ icon, href, label }: { icon: any, href: string, label: string }) {
  return (
    <a 
      href={href} 
      aria-label={label}
      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:border-[#d4a574] hover:text-[#d4a574] hover:bg-[#d4a574]/5 transition-all"
    >
      {icon}
    </a>
  );
}

function ContactItem({ icon, text }: { icon: any, text: string }) {
  return (
    <div className="flex items-center gap-4 group cursor-default">
      <div className="text-[#d4a574] opacity-60 group-hover:opacity-100 transition-opacity">
        {icon}
      </div>
      <span className="text-sm font-light text-white/60 group-hover:text-white transition-colors tracking-wide">
        {text}
      </span>
    </div>
  );
}

function TrustBadge({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-4 p-4">
      <div className="mt-1">{icon}</div>
      <div>
        <h5 className="text-[10px] uppercase tracking-widest font-black text-white">{title}</h5>
        <p className="text-xs text-white/40 font-light mt-1 italic">{desc}</p>
      </div>
    </div>
  );
}