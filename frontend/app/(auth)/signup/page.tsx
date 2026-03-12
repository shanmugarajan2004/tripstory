"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";

export default function SignupPage() {
  const router = useRouter();
  const { setAuth } = useStore();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/auth/signup`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }
      );
      if (res.ok) {
        const { user, token } = await res.json();
        setAuth(user, token);
        router.push("/dashboard");
        return;
      }
    } catch { /* backend offline — use demo mode */ }

    setAuth({ id: "demo-1", name: form.name || form.email.split("@")[0], email: form.email }, "demo-token");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="relative hidden md:block overflow-hidden" style={{background:"#0a0a0f"}}>
        <div className="absolute inset-0 bg-cover bg-center opacity-35" style={{backgroundImage:"url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80')"}} />
        <div className="absolute inset-0" style={{background:"linear-gradient(to bottom,rgba(10,10,15,0.5),rgba(10,10,15,0.8))"}} />
        <div className="relative z-10 p-16 h-full flex flex-col justify-between">
          <Link href="/" className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full inline-block" style={{background:"#c9a84c"}} />TripStory
          </Link>
          <div>
            {["Unlimited trip stories","Interactive route maps","Budget tracker & analytics","Global community"].map(item=>(
              <div key={item} className="flex items-center gap-3 mb-4 text-sm" style={{color:"rgba(255,255,255,0.8)"}}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{background:"#2d8f7b"}}>✓</div>
                {item}
              </div>
            ))}
            <p className="font-serif text-2xl text-white font-medium italic leading-snug mt-6 pt-6" style={{borderTop:"1px solid rgba(255,255,255,0.1)"}}>
              &ldquo;Every journey deserves to be remembered beautifully.&rdquo;
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center px-8 py-16" style={{background:"#faf8f4"}}>
        <motion.div initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} className="w-full max-w-md">
          <Link href="/" className="text-sm mb-8 inline-block" style={{color:"#2e2e42"}}>← Back to Home</Link>
          <h1 className="font-serif text-4xl font-bold mb-2" style={{letterSpacing:"-1px"}}>Start your story</h1>
          <p className="mb-10" style={{color:"#2e2e42"}}>Create a free account in seconds</p>
          {error && <div className="text-sm px-4 py-3 rounded-xl mb-5" style={{background:"rgba(232,99,74,0.1)",border:"1px solid rgba(232,99,74,0.2)",color:"#e8634a"}}>{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{color:"#2e2e42"}}>Full name</label>
              <input type="text" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Alex Journey" required
                className="w-full px-4 py-3.5 rounded-xl text-sm outline-none" style={{border:"1.5px solid #ede9e3",background:"white",color:"#0a0a0f"}} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{color:"#2e2e42"}}>Email address</label>
              <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@email.com" required
                className="w-full px-4 py-3.5 rounded-xl text-sm outline-none" style={{border:"1.5px solid #ede9e3",background:"white",color:"#0a0a0f"}} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{color:"#2e2e42"}}>Password</label>
              <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Min 6 characters" required
                className="w-full px-4 py-3.5 rounded-xl text-sm outline-none" style={{border:"1.5px solid #ede9e3",background:"white",color:"#0a0a0f"}} />
            </div>
            <p className="text-xs" style={{color:"#2e2e42"}}>
              By signing up you agree to our <Link href="#" style={{color:"#2d8f7b"}}>Terms</Link> and <Link href="#" style={{color:"#2d8f7b"}}>Privacy Policy</Link>.
            </p>
            <button type="submit" disabled={loading} className="w-full py-4 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2"
              style={{background:"#0a0a0f",opacity:loading?0.7:1}}>
              {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating account...</> : "Create Free Account 🚀"}
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
            Already have an account? <Link href="/login" className="font-medium" style={{color:"#2d8f7b"}}>Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
