import Link from 'next/link';
import Image from 'next/image';
import { 
  MessageCircle, 
  Truck, 
  ShieldCheck, 
  Mail, 
  MapPin, 
  ArrowUpRight,
  Music2, // Used for TikTok
  User
} from 'lucide-react';
import { getCompanyProfile } from '@/services/company.service';

export default async function Footer() {
  const company = await getCompanyProfile();

  // Fallback values if database is empty
  const brandName = company?.name || "Charis Store";
  const email = company?.email || "hello@charisstore.com";
  const whatsapp = company?.whatsapp || "";
  const location = company?.location || "Canada & USA - Worldwide Shipping";
  
  // Format WhatsApp link
  const whatsappLink = `https://wa.me/${whatsapp.replace(/\D/g, '')}`;

  return (
    <footer className="bg-[#37241d] text-[#f5f1ed] pt-20 pb-10 border-t border-[#d4a574]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="inline-block">
              <div className="bg-[#8b6f47] p-3 border border-white/10 rounded-none shadow-xl">
                <span className="text-white font-bold text-xs tracking-[0.3em] uppercase">
                  {brandName}
                </span>
              </div>
            </Link>
            <p className="text-[#d4a574] font-serif text-2xl italic leading-relaxed max-w-md lowercase">
              "elevating modern beauty through premium, ethically sourced luxury hair."
            </p>
            <div className="flex gap-4">
             
              {company?.whatsapp && (
                <SocialLink icon={<MessageCircle size={20} />} href={whatsappLink} label="WhatsApp" />
              )}
              {company?.tiktok && (
                <SocialLink icon={<Music2 size={20} />} href={company.tiktok} label="TikTok" />
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-[#d4a574]">The Vault</h4>
              <ul className="space-y-4 text-sm font-light text-white/60 lowercase italic">
                <li><Link href="/" className="hover:text-[#d4a574] transition-colors">home</Link></li>
                <li><Link href="/products" className="hover:text-[#d4a574] transition-colors">collections</Link></li>
                <li><Link href="/gallery" className="hover:text-[#d4a574] transition-colors">the archive</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-[#d4a574]">Company</h4>
              <ul className="space-y-4 text-sm font-light text-white/60 lowercase italic">
                <li><Link href="/about" className="hover:text-[#d4a574] transition-colors">about us</Link></li>
                <li><Link href="/contact" className="hover:text-[#d4a574] transition-colors">contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-[#d4a574]">Get in Touch</h4>
            <div className="space-y-5">
              <ContactItem icon={<Mail size={16} />} text={email} />
              <ContactItem icon={<MessageCircle size={16} />} text={company?.phone || whatsapp} />
              <ContactItem icon={<MapPin size={16} />} text={location} />
            </div>
            
            {/* Newsletter */}
            <div className="pt-6 border-t border-white/5">
              <p className="text-[10px] uppercase tracking-widest mb-4 opacity-40 italic">Join the Elite List</p>
              <div className="flex bg-[#2d2520] p-1 border border-white/10 rounded-none">
                <input 
                  type="email" 
                  placeholder="email address" 
                  className="bg-transparent border-none outline-none flex-1 px-4 text-xs font-light lowercase"
                />
                <button className="bg-[#d4a574] text-[#3d342a] p-2 rounded-none hover:bg-white transition-colors">
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-y border-white/10 mb-10 divide-y md:divide-y-0 md:divide-x divide-white/10">
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
            icon={<User className="text-[#d4a574]" size={24} />} 
            title="100% Human Hair" 
            desc="Ethically sourced & curated" 
          />
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 opacity-30">
          <p className="text-[9px] uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} {brandName} Canada. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[9px] uppercase tracking-[0.3em]">
             <Link href="#" className="hover:text-white">Privacy</Link>
             <Link href="#" className="hover:text-white">Terms</Link>
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
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 border border-white/10 rounded-none flex items-center justify-center text-white/60 hover:border-[#d4a574] hover:text-[#d4a574] transition-all bg-[#2d2520]/50"
    >
      {icon}
    </a>
  );
}

function ContactItem({ icon, text }: { icon: any, text: string }) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="text-[#d4a574] opacity-60">
        {icon}
      </div>
      <span className="text-xs font-light text-white/60 tracking-wider lowercase">
        {text}
      </span>
    </div>
  );
}

function TrustBadge({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left gap-3 p-8">
      <div className="p-3 bg-[#2d2520] border border-white/5">{icon}</div>
      <div>
        <h5 className="text-[10px] uppercase tracking-[0.2em] font-black text-white">{title}</h5>
        <p className="text-[10px] text-white/40 font-light mt-1 italic lowercase">{desc}</p>
      </div>
    </div>
  );
}