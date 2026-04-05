"use client";

import { useState, useEffect } from 'react'; // Added useEffect
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; // Added usePathname
import { User, Menu, X, ChevronRight } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // Get current URL

  // LOGIC: Close the sidebar whenever the URL changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="bg-[#37241d] text-[#f5f1ed] sticky top-0 z-50">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-4 h-20 border-b border-[#5d4e42]">
          
          {/* Mobile: Hamburger */}
          <div className="flex-1 md:hidden">
            <button onClick={() => setMenuOpen(true)} aria-label="Open Menu">
              <Menu size={24} />
            </button>
          </div>

          {/* Logo Section */}
          <div className="flex justify-center md:justify-start md:flex-1">
            <Link href="/">
              <Image 
                src="/logo.png" // Using string path is safer for aspect ratio logic
                alt="Charis Logo"
                width={90} 
                height={40}
                style={{ width: '90px', height: 'auto' }} // FIXED IMAGE WARNING
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium lowercase">
            <Link href="/" className="hover:text-[#d4a574] transition">Home</Link>
            <Link href="/products" className="hover:text-[#d4a574] transition">Charis Human Hair</Link>
            <Link href="/gallery" className="hover:text-[#d4a574] transition">Gallery</Link>
            <Link href="/faq" className="hover:text-[#d4a574] transition">FAQ</Link>
            <Link href="/contact" className="hover:text-[#d4a574] transition">Contact</Link>
            <Link href="/aboutus" className="hover:text-[#d4a574] transition">About us</Link>
          </nav>

          <div className="flex items-center justify-end gap-4 flex-1">
<Link href="/login" className="flex items-center gap-3 text-sm hover:opacity-80">
            <User size={20} />
            Account Login
          </Link>          </div>
        </div>

        {/* Welcome Banner */}
        <div className="text-center py-2 text-[10px] uppercase tracking-widest bg-[#2d2520] text-[#d4a574]">
          Welcome to our store
        </div>
      </header>

      {/* --- MOBILE SIDEBAR DRAWER --- */}
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/70 z-[60] backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Sidebar Content */}
      <aside 
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[350px] bg-[#8b6545] text-white z-[70] transform transition-transform duration-500 ease-in-out shadow-2xl ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 flex items-center border-b border-white/10">
          <button onClick={() => setMenuOpen(false)} className="hover:rotate-90 transition-transform">
            <X size={28} />
          </button>
        </div>

        <nav className="flex flex-col py-4">
          {/* Use onClick as a backup to ensure closure */}
          <Link href="/" className="px-8 py-5 text-lg border-b border-white/5 hover:bg-black/10 transition-colors">Home</Link>
          <Link href="/products" className="px-8 py-5 text-lg border-b border-white/5 hover:bg-black/10 flex items-center justify-between transition-colors">
            Charis Human Hair
            <ChevronRight size={18} className="opacity-70" />
          </Link>
          <Link href="/gallery" className="px-8 py-5 text-lg border-b border-white/5 hover:bg-black/10 transition-colors">Gallery</Link>
          <Link href="/faq" className="px-8 py-5 text-lg border-b border-white/5 hover:bg-black/10 transition-colors">FAQ</Link>
          <Link href="/contact" className="px-8 py-5 text-lg border-b border-white/5 hover:bg-black/10 transition-colors">Contact</Link>
          <Link href="/aboutus" className="px-8 py-5 text-lg border-b border-white/5 hover:bg-black/10 transition-colors">About us</Link>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-10 left-0 w-full px-8 space-y-6">
          <Link href="/login" className="flex items-center gap-3 text-sm hover:opacity-80">
            <User size={20} />
            Account Login
          </Link>
          <p className="text-[10px] uppercase tracking-widest text-white/40">
            Charis Store Canada
          </p>
        </div>
      </aside>
    </>
  );
}