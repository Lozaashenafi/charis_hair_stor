'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '../lib/supabase/client'
import { User } from '@supabase/supabase-js'

const AuthContext = createContext<{ user: User | null; loading: boolean }>({
  user: null,
  loading: true,
})
console.log("DEBUG - URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("DEBUG - KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "EXISTS" : "MISSING");
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
useEffect(() => {
  let isMounted = true; // Prevents state updates on unmounted components

  const fetchUser = async () => {
    try {
      // Use getSession first, it's faster for initial load
      const { data: { session } } = await supabase.auth.getSession();
      
      if (isMounted) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    } catch (err) {
      console.error("Auth fetch error", err);
      if (isMounted) setLoading(false);
    }
  };

  fetchUser();

  // Listen for changes (Login/Logout)
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    if (isMounted) {
      setUser(session?.user ?? null);
      setLoading(false);
    }
  });

  return () => {
    isMounted = false;
    subscription.unsubscribe();
  };
}, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)