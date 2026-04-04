"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingBag, Building2, Menu, X, Users, ImageIcon } from 'lucide-react'
import LogoutButton from './LogoutButton'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close sidebar when clicking a link on mobile
  useEffect(() => setIsOpen(false), [pathname])

  const links = [
    { href: '/admin', icon: <LayoutDashboard size={20}/>, label: 'Dashboard' },
    { href: '/admin/products', icon: <ShoppingBag size={20}/>, label: 'Products' },
    { href: '/admin/users', icon: <Users size={20}/>, label: 'Manage Team' },
    { href: '/admin/gallery', icon: <ImageIcon size={20}/>, label: 'Gallery' },
    { href: '/admin/profile', icon: <Building2 size={20}/>, label: 'Brand Info' },
  ]

  return (
    <>
      {/* Mobile Header - Matches your Top Bar */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#37241d] border-b border-white/10 sticky top-0 z-50 shadow-md">
        <Link href="/" className="text-[#d4a574] text-xl font-bold tracking-[0.2em] font-serif uppercase">
          Charis Admin
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="text-[#f5f1ed] p-2 hover:bg-white/10 rounded-lg transition-colors">
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Overlay for mobile - Matches the store drawer overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Drawer - Using the medium brown from your store mobile menu */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#8b6545] border-r border-white/10 transform transition-transform duration-300 ease-in-out shadow-2xl
        lg:relative lg:translate-x-0 flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Desktop Logo Area */}
        <div className="p-8 hidden lg:block border-b border-white/5">
          <Link href="/" className="text-[#f5f1ed] text-xl font-bold tracking-[0.2em] font-serif uppercase block text-center">
            Charis <span className="text-[#d4a574]">Admin</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href}
                href={link.href} 
                className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200 group ${
                  isActive 
                  ? 'bg-[#37241d] text-[#d4a574] shadow-lg shadow-black/20 font-bold translate-x-1' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className={`${isActive ? 'text-[#d4a574]' : 'text-white/60 group-hover:text-white'}`}>
                  {link.icon}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.15em]">{link.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-6 border-t border-white/10 bg-[#37241d]/30">
           <LogoutButton />
           <p className="mt-4 text-[10px] text-white/40 text-center uppercase tracking-widest">
             Charis Store Canada
           </p>
        </div>
      </aside>
    </>
  )
}