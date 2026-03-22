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
            <button
              type="button"
              onClick={() => window.location.href = "https://accounts.google.com/signin"}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-gray-50 hover:cursor-pointer"
              style={{ border: "1.5px solid #ede9e3", background: "white" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="18px" height="18px">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              onClick={() => window.location.href = "https://appleid.apple.com/sign-in"}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-gray-50 hover:cursor-pointer"
              style={{ border: "1.5px solid #ede9e3", background: "white" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18px" height="18px">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
              Apple
            </button>
          </div>
          <p className="text-center text-sm mt-6" style={{color:"#2e2e42"}}>
            Already have an account? <Link href="/login" className="font-medium" style={{color:"#2d8f7b"}}>Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
