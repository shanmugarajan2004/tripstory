"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { Hexagon } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => { logout(); router.push("/"); };

  return (
    <motion.nav
      initial={{ y: -72 }} animate={{ y: 0 }} transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent border-b border-transparent"
      }`}
    >
      <Link href="/" className="font-serif text-xl font-bold flex items-center gap-2 group">
        <Hexagon className="w-6 h-6 text-primary group-hover:text-cyan transition-colors" />
        <span className="hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">TripStory</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {[
          { href: "/", label: "Home" },
          { href: "/stories", label: "Explore" },
          { href: "/planner", label: "Planner" },
          { href: "/budget", label: "Budget" },
          { href: "/map", label: "Maps" },
        ].map(item => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={`text-sm font-medium transition-colors ${
              active ? "text-cyan drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" : "text-muted hover:text-foreground"
            }`}>
              {item.label}
            </Link>
          )
        })}
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link href="/dashboard" className="text-sm font-medium text-muted hover:text-foreground transition-colors px-2 py-2">
              Dashboard
            </Link>
            <div
              onClick={() => router.push("/profile")}
              className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-purple flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:shadow-cyanGlow transition-shadow border border-white/10"
            >
              {user.name?.[0]?.toUpperCase()}
            </div>
            <button onClick={handleLogout} className="text-xs font-semibold uppercase tracking-widest text-muted hover:text-coral transition-colors">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm font-medium text-muted hover:text-foreground transition-colors px-4 py-2 rounded-full hover:bg-white/5">
              Login
            </Link>
            <Link href="/signup" className="text-sm font-bold text-white px-5 py-2 rounded-full bg-primary hover:bg-primary/90 shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all">
              Start for Free
            </Link>
          </>
        )}
      </div>
    </motion.nav>
  );
}
