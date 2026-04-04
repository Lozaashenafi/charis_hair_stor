"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, ShoppingBag, Menu, X, ChevronRight, ChevronDown } from 'lucide-react';
import image from '../../../public/logo.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-[#37241d] text-[#f5f1ed] sticky top-0 z-50">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-4 h-20 border-b border-[#5d4e42]">
          
          {/* Mobile: Hamburger / Desktop: Hidden */}
          <div className="flex-1 md:hidden">
            <button onClick={() => setMenuOpen(true)} aria-label="Open Menu">
              <Menu size={24} />
            </button>
          </div>

          {/* Logo Section - Uses image from /public folder */}
          <div className="flex justify-center md:justify-start md:flex-1">
            <Link href="/">
              <Image 
                src={image}
                alt="Charis Logo"
                width={90} 
                height={40}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-[#d4a574] transition">Home</Link>
            <Link href="/products" className="hover:text-[#d4a574] transition">Charis Human Hair</Link>
            <Link href="/gallery" className="hover:text-[#d4a574] transition">Gallery</Link>
            <Link href="/faq" className="hover:text-[#d4a574] transition">FAQ</Link>
            <Link href="/contact" className="hover:text-[#d4a574] transition">Contact</Link>
            <Link href="/aboutus" className="hover:text-[#d4a574] transition">About us</Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center justify-end gap-4 flex-1">
           
          </div>
        </div>

        {/* Welcome Banner */}
        <div className="text-center py-2 text-[10px] uppercase tracking-widest bg-[#2d2520] text-[#d4a574]">
          Welcome to our store
        </div>
      </header>

      {/* --- MOBILE SIDEBAR DRAWER --- */}
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Sidebar Content */}
      <aside 
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[350px] bg-[#8b6545] text-white z-[70] transform transition-transform duration-300 ease-in-out shadow-2xl ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-4 flex items-center border-b border-white/10">
          <button onClick={() => setMenuOpen(false)} className="hover:rotate-90 transition-transform">
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col py-2">
          <Link href="/" className="px-6 py-4 text-lg border-b border-white/5 hover:bg-black/10">Home</Link>
          
          <Link href="/products" className="px-6 py-4 text-lg border-b border-white/5 hover:bg-black/10 flex items-center justify-between">
            Charis Human Hair
            <ChevronRight size={18} className="opacity-70" />
          </Link>
          
          <Link href="/gallery" className="px-6 py-4 text-lg border-b border-white/5 hover:bg-black/10">Gallery</Link>
          <Link href="/faq" className="px-6 py-4 text-lg border-b border-white/5 hover:bg-black/10">FAQ</Link>
          <Link href="/contact" className="px-6 py-4 text-lg border-b border-white/5 hover:bg-black/10">Contact</Link>
          <Link href="/aboutus" className="px-6 py-4 text-lg border-b border-white/5 hover:bg-black/10">About us</Link>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-10 left-0 w-full px-6 space-y-6">
          <Link href="/login" className="flex items-center gap-3 text-sm hover:opacity-80">
            <User size={20} />
            Account
          </Link>
          
          {/* <div className="flex items-center gap-2 text-sm opacity-80 cursor-pointer">
            Australia | AUD $
            <ChevronDown size={14} />
          </div> */}
        </div>
      </aside>
    </>
  );
}