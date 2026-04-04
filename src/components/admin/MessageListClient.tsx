'use client'
import React, { useState } from 'react'
import { Mail, Trash2, Calendar, User, Info, MessageSquare } from 'lucide-react'
import { deleteMessage } from '../../../app/auth/actions'

export default function MessageListClient({ initialMessages }: { initialMessages: any[] }) {
  const [messages, setMessages] = useState(initialMessages)

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to remove this inquiry?")) return
    const res = await deleteMessage(id)
    if (res.success) {
      setMessages(prev => prev.filter(m => m.id !== id))
    }
  }

  return (
    <div className="space-y-8">
      {/* MOBILE VIEW: Sharp Cards */}
      <div className="grid grid-cols-1 gap-6 md:hidden">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-white border border-[#8b6545]/20 p-6 rounded-none shadow-sm space-y-4">
            <div className="flex justify-between items-start border-b border-[#f5f1ed] pb-4">
              <div>
                <p className="text-[10px] uppercase font-black text-[#d4a574] tracking-widest mb-1">From</p>
                <h3 className="text-[#3d342a] font-bold text-sm">{msg.name}</h3>
                <p className="text-[#8b6545] text-xs lowercase">{msg.email}</p>
              </div>
              <button onClick={() => handleDelete(msg.id)} className="text-red-400 p-2">
                <Trash2 size={18} />
              </button>
            </div>
            <div className="space-y-2">
               <p className="text-[10px] uppercase font-black text-[#d4a574] tracking-widest italic">{msg.subject}</p>
               <p className="text-[#3d342a] text-sm leading-relaxed font-light">{msg.message}</p>
            </div>
            <p className="text-[9px] text-[#8b6545]/50 uppercase tracking-widest text-right">
              {new Date(msg.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* DESKTOP VIEW: High-End Vault Table */}
      <div className="hidden md:block bg-[#3d342a] border border-[#8b6545]/20 rounded-none shadow-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black/20 border-b border-white/5">
            <tr className="text-[10px] uppercase tracking-[0.3em] text-[#d4a574] font-bold">
              <th className="px-10 py-8">Sender</th>
              <th className="px-8 py-8">Topic</th>
              <th className="px-8 py-8">Content</th>
              <th className="px-8 py-8">Date</th>
              <th className="px-10 py-8 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {messages.map((msg) => (
              <tr key={msg.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-10 py-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#8b6545]/20 border border-[#d4a574]/30 flex items-center justify-center text-[#d4a574]">
                      <User size={18} />
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm tracking-wide">{msg.name}</div>
                      <div className="text-[10px] text-[#8b6545] lowercase font-medium">{msg.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-8">
                   <span className="text-[#d4a574] text-[10px] uppercase tracking-widest font-black italic">
                    {msg.subject || 'General'}
                   </span>
                </td>
                <td className="px-8 py-8 max-w-xs">
                  <p className="text-white/60 text-xs line-clamp-2 leading-relaxed font-light italic">
                    "{msg.message}"
                  </p>
                </td>
                <td className="px-8 py-8">
                  <span className="text-[#8b6545] text-[10px] uppercase tracking-[0.2em] font-bold">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </td>
                <td className="px-10 py-8 text-right">
                   <button 
                    onClick={() => handleDelete(msg.id)}
                    className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                   >
                     <Trash2 size={16} />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {messages.length === 0 && (
          <div className="py-32 text-center">
            <MessageSquare size={48} className="mx-auto text-white/5 mb-4" />
            <p className="text-white/30 text-[10px] uppercase tracking-[0.4em]">The Inbox is Empty</p>
          </div>
        )}
      </div>
    </div>
  )
}