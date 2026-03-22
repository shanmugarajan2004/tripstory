"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { useGoogleLogin } from '@react-oauth/google';
import { Database, Lock, Mail, User, Loader2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { setAuth } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true); setError("");
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/auth/google`, {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: tokenResponse.access_token })
        });
        if (res.ok) {
          const { user, token } = await res.json();
          setAuth(user, token); router.push("/dashboard");
        } else { setError("Node registration failure."); setLoading(false); }
      } catch (err: any) { setError(`SYS.ERR: ${err.message}`); setLoading(false); }
    },
    onError: () => setError("Google OAuth proxy disconnected."),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/auth/signup`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, password })
      });
      if (res.ok) {
        const { user, token } = await res.json();
        setAuth(user, token); router.push("/dashboard"); return;
      }
    } catch { /* ignored */ }
    
    if (email && password.length >= 3 && name) {
      setAuth({ id: "demo-new", name, email }, "demo-token");
      router.push("/dashboard");
    } else { setError("Invalid node parameters."); setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-background flex text-foreground selection:bg-purple/30">
      {/* LEFT GLOW */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center border-r border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="relative z-10 text-center flex flex-col items-center">
          <Database className="w-24 h-24 text-purple mx-auto mb-8 opacity-80" />
          <h2 className="font-serif text-4xl font-bold tracking-tight mb-4">Node Registry</h2>
          <p className="text-muted max-w-sm text-balance">Create a dedicated cluster on the global travel intelligence network.</p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-16 relative">
        <Link href="/" className="absolute top-8 left-8 text-[10px] font-bold tracking-widest uppercase text-muted hover:text-foreground transition-colors">
          ← Abort Sequence
        </Link>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm">
          <h1 className="font-serif text-3xl font-bold mb-2">Deploy Cluster</h1>
          <p className="text-sm text-muted mb-8">Establish a new operational account</p>

          {error && <div className="text-xs font-mono p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 mb-6">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Node Alias</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input type="text" value={name} onChange={e=>setName(e.target.value)} required className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple/50 focus:bg-white/10 transition-all text-sm placeholder:text-muted/50 font-mono" placeholder="Commander Shepard" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Communication Link</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple/50 focus:bg-white/10 transition-all text-sm placeholder:text-muted/50 font-mono" placeholder="sysadmin@example.com" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Passcode</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple/50 focus:bg-white/10 transition-all text-sm placeholder:text-muted/50 font-mono" placeholder="••••••••" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-3.5 mt-2 rounded-xl bg-purple text-white text-sm font-semibold hover:bg-purple/90 shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all flex justify-center items-center gap-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Deploy Protocol"}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
            <div className="relative flex justify-center text-[10px]"><span className="bg-background px-2 text-muted uppercase tracking-widest font-bold">External SSO</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <button type="button" onClick={() => handleGoogleLogin()} className="flex justify-center items-center gap-2 px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium hover:border-white/20">
              <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg> Google
            </button>
            <button type="button" onClick={() => { setLoading(true); setTimeout(() => { setAuth({ id: "demo-a", name: "Apple User", email: "apple@demo.com" }, "token"); router.push("/dashboard"); }, 800) }} className="flex justify-center items-center gap-2 px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium hover:border-white/20">
              <svg viewBox="0 0 384 512" width="16" height="16" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg> Apple
            </button>
          </div>
          
          <p className="text-center text-xs text-muted mt-8 pt-8 border-t border-white/5">Active operational account? <Link href="/login" className="text-purple hover:text-cyan transition-colors font-semibold">Initialize session</Link></p>
        </motion.div>
      </div>
    </div>
  );
}
