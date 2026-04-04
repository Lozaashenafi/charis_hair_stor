'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Plus, Minus, ArrowLeft } from 'lucide-react'

const faqData = [
  {
    question: "is your hair 100% human hair?",
    answer: "yes. charis store only provides 100% ethically sourced human hair. our pieces are curated from single donors to ensure cuticle alignment, minimizing tangling and shedding for a masterpiece finish."
  },
  {
    question: "can i color or bleach the hair?",
    answer: "absolutely. as our hair is raw and unprocessed, it can be lifted to high blonde shades (#613) and colored to your preference. we recommend professional coloring to maintain the integrity of the hair fibers."
  },
  {
    question: "how long does charis hair last?",
    answer: "with proper boutique-level care, our bundles and wigs can last between 1 to 3 years. luxury hair is an investment; we provide a care guide with every purchase to ensure longevity."
  },
  {
    question: "what is the difference between raw and virgin hair?",
    answer: "raw hair is completely unprocessed and has never been steamed or chemically treated for texture. virgin hair is often steamed to achieve specific patterns like 'body wave' while remaining chemically pure."
  },
  {
    question: "how many bundles do i need for a full look?",
    answer: "for lengths 12-18\", we recommend 2-3 bundles. for lengths 20-30\", we recommend 3-4 bundles to maintain fullness from root to tip. for our bundle deals, 3 bundles is the industry standard."
  },
 
  {
    question: "can i return or exchange my order?",
    answer: "due to the hygienic nature of our products and federal health regulations, we only accept returns or exchanges on items that have not been opened, worn, or tampered with, including the security seal."
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <main className="min-h-screen bg-[#2d2520] text-[#f5f1ed]">
      
      {/* --- HERO HEADER --- */}
      <section className="bg-[#3d342a] pt-32 pb-20 px-6 border-b border-[#d4a574]/20">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-3 text-[#d4a574] hover:text-white transition-all group uppercase text-[10px] tracking-[0.4em] font-bold mb-8"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
            return home
          </Link>
          
          <h1 className="font-serif text-6xl md:text-8xl italic lowercase leading-none tracking-tighter">
            frequently <br /> asked.
          </h1>
          <p className="text-[#d4a574] text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold mt-8 border-l border-[#d4a574]/30 pl-6">
            Charis Store Concierge & Care
          </p>
        </div>
      </section>

      {/* --- FAQ CONTENT --- */}
      <section className="max-w-4xl mx-auto py-24 px-6">
        <div className="space-y-px bg-[#d4a574]/10 border border-[#d4a574]/10 shadow-2xl">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className="group bg-[#3d342a] transition-all duration-500"
            >
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-8 md:p-10 text-left outline-none"
              >
                <span className={`text-lg md:text-xl font-serif italic lowercase transition-colors duration-300 ${openIndex === index ? 'text-[#d4a574]' : 'text-white'}`}>
                  {faq.question}
                </span>
                <div className={`transition-transform duration-500 text-[#d4a574] ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                   {openIndex === index ? <Minus size={20} strokeWidth={1} /> : <Plus size={20} strokeWidth={1} />}
                </div>
              </button>

              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 md:px-10 pb-10">
                  <div className="w-12 h-px bg-[#d4a574]/30 mb-6" />
                  <p className="text-[#8b6545] leading-relaxed text-sm md:text-base font-light italic">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- BOTTOM CALL TO ACTION --- */}
        <div className="mt-24 text-center space-y-8">
           <h3 className="text-white font-serif text-2xl italic lowercase">still have questions?</h3>
           <Link 
            href="/contact" 
            className="inline-flex items-center gap-6 bg-[#d4a574] text-[#3d342a] px-12 py-5 rounded-none text-[11px] uppercase tracking-[0.5em] font-black hover:bg-white transition-all shadow-xl active:scale-95"
           >
             Contact Concierge
           </Link>
        </div>
      </section>

      {/* --- FOOTER DECORATION --- */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
         <div className="w-full h-px bg-gradient-to-r from-transparent via-[#d4a574]/20 to-transparent" />
         <p className="text-center mt-10 text-[9px] uppercase tracking-[0.5em] text-[#8b6545] opacity-50">
            Charis Store • The Boutique Standard
         </p>
      </div>
    </main>
  )
}