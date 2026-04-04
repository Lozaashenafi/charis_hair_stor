'use client'
import React, { useState } from 'react'
import { sendContactMessage } from '../../auth/actions'
import { Mail, MessageCircle, Send, Loader2, MapPin, Globe } from 'lucide-react'

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{ success?: string; error?: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    const formData = new FormData(e.currentTarget);
    const result = await sendContactMessage(formData);
    
    setResponse(result);
    setLoading(false);
    if (result.success) (e.target as HTMLFormElement).reset();
  }

  const inputClass = "w-full bg-white border border-[#8b6545]/20 p-5 rounded-2xl text-sm text-[#3d342a] placeholder:text-[#8b6545]/30 outline-none focus:border-[#d4a574] transition-all focus:ring-1 focus:ring-[#d4a574]";
  const labelClass = "text-[10px] uppercase tracking-[0.4em] text-[#8b6545] font-black block mb-3 ml-1";

  return (
    <div className="bg-[#f5f1ed]">
      {/* --- HERO HEADER SECTION --- */}
      <section className="bg-[#37241d] pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-8xl text-white italic lowercase leading-tight">
            Contact.
          </h1>
          <p className="text-[#d4a574] text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold mt-6">
            The Charis Concierge Service
          </p>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* LEFT: INFORMATION & CHANNELS */}
          <div className="w-full lg:w-5/12 space-y-16">
            <div className="space-y-6">
              <h2 className="text-[#3d342a] font-serif text-3xl italic">Inquiries & Feedback</h2>
              <p className="text-[#8b6545] text-sm font-light leading-relaxed max-w-sm">
                Whether you are seeking a specific hair masterpiece or wish to share your experience, our specialists are ready to assist you.
              </p>
            </div>

            <div className="space-y-10">
              <ContactChannel 
                icon={<Mail size={22} />} 
                title="Email Support" 
                detail="hello@charisstore.com" 
              />
              <ContactChannel 
                icon={<MessageCircle size={22} />} 
                title="WhatsApp Direct" 
                detail="+1 (234) 567-890" 
              />
              <ContactChannel 
                icon={<Globe size={22} />} 
                title="Global Shipping" 
                detail="Express from Canada & USA" 
              />
            </div>

            <div className="pt-10 border-t border-[#8b6545]/10">
              <h4 className="text-[10px] uppercase tracking-widest text-[#8b6545] font-bold mb-4">Availability</h4>
              <p className="text-xs text-[#3d342a]/60 leading-loose">
                Monday — Friday: 09:00 — 18:00 EST<br />
                Saturday: 10:00 — 14:00 EST
              </p>
            </div>
          </div>

          {/* RIGHT: THE MESSAGE FORM */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white/50 backdrop-blur-sm p-8 md:p-12 rounded-[3rem] border border-white">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Status Messages */}
                {response?.success && (
                  <div className="p-5 bg-green-50 border border-green-200 text-green-700 text-sm rounded-2xl animate-in fade-in slide-in-from-top-2">
                    {response.success}
                  </div>
                )}
                {response?.error && (
                  <div className="p-5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl">
                    {response.error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input name="name" type="text" placeholder="Jane Doe" className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <input name="email" type="email" placeholder="jane@example.com" className={inputClass} required />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Subject</label>
                  <input name="subject" type="text" placeholder="Product Inquiry / Feedback" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Message</label>
                  <textarea 
                    name="message" 
                    rows={6} 
                    placeholder="Tell us how we can elevate your experience..." 
                    className={inputClass + " resize-none"} 
                    required 
                  />
                </div>

                <div className="pt-4">
                  <button 
                    disabled={loading}
                    className="w-full bg-[#3d342a] text-[#d4a574] font-black py-6 rounded-full shadow-2xl hover:bg-[#2d2520] transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50 tracking-[0.4em] text-[11px]"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <>SEND MESSAGE <Send size={16} /></>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactChannel({ icon, title, detail }: { icon: any, title: string, detail: string }) {
  return (
    <div className="flex items-start gap-6 group">
      <div className="mt-1 text-[#d4a574]">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-[#8b6545] font-bold mb-1">{title}</p>
        <p className="text-sm text-[#3d342a] font-medium transition-colors hover:text-[#d4a574] cursor-pointer">
          {detail}
        </p>
      </div>
    </div>
  );
}