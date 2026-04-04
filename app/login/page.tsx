"use client";

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client'; // Adjust path to your browser client file
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, Loader2, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f1ed] flex flex-col items-center justify-center p-4">
      <Link href="/" className="mb-6 flex items-center gap-2 text-[#37241d] hover:text-[#8b6f47] transition-colors self-start max-w-md mx-auto w-full px-2">
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back to Shop</span>
      </Link>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#d4a574]/20">
        {/* Aesthetic Header */}
        <div className="bg-[#37241d] p-10 flex flex-col items-center text-center">
          <Image src="/logo.png" alt="Charis Logo"   style={{ width: '120px', height: 'auto' }} // This line stops the warning
 className="mb-4 object-contain" />
          <h1 className="text-[#d4a574] text-2xl font-serif tracking-tight">Welcome Back</h1>
          <p className="text-[#f5f1ed]/50 text-sm mt-1 uppercase tracking-widest">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100 animate-shake">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-[#37241d]/60 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b6f47]" size={18} />
              <input
                type="email"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8b6f47] focus:bg-white outline-none transition text-[#37241d]"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-[#37241d]/60 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b6f47]" size={18} />
              <input
                type="password"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8b6f47] focus:bg-white outline-none transition text-[#37241d]"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#37241d] hover:bg-[#2d2520] text-[#d4a574] font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "SIGN IN"}
          </button>

          {/* <div className="text-center pt-2">
            <p className="text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#8b6f47] font-bold hover:underline decoration-2">
                Create one now
              </Link>
            </p>
          </div> */}
        </form>
      </div>
    </div>
  );
}