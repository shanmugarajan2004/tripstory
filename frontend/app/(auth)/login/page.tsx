"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { useGoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/auth/google`,
          { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: tokenResponse.access_token }) }
        );
        if (res.ok) {
          const { user, token } = await res.json();
          setAuth(user, token);
          router.push("/dashboard");
        } else {
          setError("Google login failed");
          setLoading(false);
        }
      } catch (err: any) {
        setError(`Network error: ${err.message}. Fetch URL: ${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}`);
        setLoading(false);
      }
    },
    onError: () => setError("Google login failed"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/auth/login`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) }
      );
      if (res.ok) {
        const { user, token } = await res.json();
        setAuth(user, token);
        router.push("/dashboard");
        return;
      }
    } catch { /* backend offline — use demo mode */ }

    if (email && password.length >= 3) {
      setAuth({ id: "demo-1", name: email.split("@")[0] || "Traveler", email }, "demo-token");
      router.push("/dashboard");
    } else {
      setError("Enter your email and a password to continue.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="relative hidden md:block overflow-hidden" style={{background:"#0a0a0f"}}>
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{backgroundImage:"url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80')"}} />
        <div className="absolute inset-0" style={{background:"linear-gradient(to bottom,rgba(10,10,15,0.5),rgba(10,10,15,0.8))"}} />
        <div className="relative z-10 p-16 h-full flex flex-col justify-between">
          <Link href="/" className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full inline-block" style={{background:"#c9a84c"}} />TripStory
          </Link>
          <div>
            <p className="font-serif text-3xl text-white font-medium italic leading-snug mb-4">&ldquo;Not all those who wander are lost — but all who use TripStory know exactly where they&apos;ve been.&rdquo;</p>
            <p className="text-sm" style={{color:"rgba(255,255,255,0.5)"}}>Welcome back, explorer.</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center px-8 py-16" style={{background:"#faf8f4"}}>
        <motion.div initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} className="w-full max-w-md">
          <Link href="/" className="text-sm mb-8 inline-block" style={{color:"#2e2e42"}}>← Back to Home</Link>
          <h1 className="font-serif text-4xl font-bold mb-2" style={{letterSpacing:"-1px"}}>Welcome back</h1>
          <p className="mb-10" style={{color:"#2e2e42"}}>Sign in to continue your journey</p>
          {error && <div className="text-sm px-4 py-3 rounded-xl mb-5" style={{background:"rgba(232,99,74,0.1)",border:"1px solid rgba(232,99,74,0.2)",color:"#e8634a"}}>{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{color:"#2e2e42"}}>Email address</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" required
                className="w-full px-4 py-3.5 rounded-xl text-sm outline-none" style={{border:"1.5px solid #ede9e3",background:"white",color:"#0a0a0f"}} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{color:"#2e2e42"}}>Password</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required
                className="w-full px-4 py-3.5 rounded-xl text-sm outline-none" style={{border:"1.5px solid #ede9e3",background:"white",color:"#0a0a0f"}} />
            </div>
            <button type="submit" disabled={loading} className="w-full py-4 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2"
              style={{background:"#0a0a0f",opacity:loading?0.7:1}}>
              {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in...</> : "Sign In"}
            </button>
          </form>
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px" style={{background:"#ede9e3"}} />
            <span className="text-xs uppercase tracking-wide" style={{color:"#2e2e42"}}>or</span>
            <div className="flex-1 h-px" style={{background:"#ede9e3"}} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleGoogleLogin()}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-gray-50 hover:cursor-pointer"
              style={{ border: "1.5px solid #ede9e3", background: "white" }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setAuth({ id: "demo-apple", name: "Apple User", email: "apple@demo.com" }, "demo-token");
                  router.push("/dashboard");
                }, 800);
              }}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-gray-50 hover:cursor-pointer"
              style={{ border: "1.5px solid #ede9e3", background: "white" }}
            >
              <svg viewBox="0 0 384 512" width="18" height="18" fill="#0a0a0f" xmlns="http://www.w3.org/2000/svg">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
              Apple
            </button>
          </div>
          <p className="text-center text-sm mt-6" style={{color:"#2e2e42"}}>
            No account? <Link href="/signup" className="font-medium" style={{color:"#2d8f7b"}}>Create one free</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
