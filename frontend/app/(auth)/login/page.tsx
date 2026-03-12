"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
            {["🌐 Google","🍎 Apple"].map(s=>(
              <button key={s} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
                style={{border:"1.5px solid #ede9e3",background:"white"}}>{s}</button>
            ))}
          </div>
          <p className="text-center text-sm mt-6" style={{color:"#2e2e42"}}>
            No account? <Link href="/signup" className="font-medium" style={{color:"#2d8f7b"}}>Create one free</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
