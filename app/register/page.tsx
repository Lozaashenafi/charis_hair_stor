"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, Loader2, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { register } from '../auth/actions'; // Adjust path if needed

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const result = await register(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      // Success! 
      // Note: If Supabase Email Confirmation is ON, the user must click the link in their email first.
      alert("Registration initiated! Please check your email to confirm your account.");
      router.push('/login');
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f1ed] flex flex-col items-center justify-center p-4">
      <Link href="/login" className="mb-6 flex items-center gap-2 text-[#37241d] hover:text-[#8b6f47] transition-colors self-start max-w-md mx-auto w-full px-2">
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back to Login</span>
      </Link>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#d4a574]/20">
        <div className="bg-[#8b6545] p-10 flex flex-col items-center text-center">
          {/* IMAGE FIXED: No more warnings */}
          <div className="relative w-[140px] h-[50px] mb-4">
                      <Image src="/logo.png" alt="Charis Logo" width={140} height={50} className="mb-4 object-contain" />
            
          </div>
          <h1 className="text-white text-2xl font-serif tracking-tight">Create Account</h1>
          <p className="text-white/70 text-sm mt-1 uppercase tracking-widest">Join the Charis Family</p>
        </div>

        {/* IMPORTANT: Use 'action' prop with formData */}
        <form action={handleSubmit} className="p-8 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-[#37241d]/60 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b6f47]" size={18} />
              <input
                name="displayName" // Must match actions.ts
                type="text"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8b6f47] outline-none transition text-[#37241d]"
                placeholder="Jane Doe"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-[#37241d]/60 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b6f47]" size={18} />
              <input
                name="email" // Must match actions.ts
                type="email"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8b6f47] outline-none transition text-[#37241d]"
                placeholder="jane@example.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-[#37241d]/60 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b6f47]" size={18} />
              <input
                name="password" // Must match actions.ts
                type="password"
                required
                minLength={6}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8b6f47] outline-none transition text-[#37241d]"
                placeholder="Minimum 6 characters"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8b6545] hover:bg-[#37241d] text-white font-bold py-4 rounded-xl mt-4 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "CREATE ACCOUNT"}
          </button>

          <p className="text-center text-sm text-gray-500 pt-2">
            Already have an account?{" "}
            <Link href="/login" className="text-[#8b6545] font-bold hover:underline">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}