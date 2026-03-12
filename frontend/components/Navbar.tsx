"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useStore();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => { logout(); router.push("/"); };

  const dark = isHome && !scrolled;

  return (
    <motion.nav
      initial={{ y: -72 }} animate={{ y: 0 }} transition={{ duration: 0.4 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: 72,
        display: "flex", alignItems: "center", padding: "0 48px", justifyContent: "space-between",
        background: dark ? "transparent" : "rgba(250,248,244,0.95)",
        backdropFilter: dark ? "none" : "blur(20px)",
        borderBottom: dark ? "none" : "1px solid rgba(10,10,15,0.06)",
        transition: "all 0.3s",
      }}
    >
      <Link href="/" style={{ fontFamily: "serif", fontSize: 20, fontWeight: 700, color: dark ? "white" : "#0a0a0f", display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#c9a84c", display: "inline-block" }} />
        TripStory
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
        {[
          { href: "/", label: "Home" },
          { href: "/stories", label: "Explore" },
          { href: "/planner", label: "Planner" },
          { href: "/budget", label: "Budget" },
          { href: "/map", label: "Maps" },
        ].map(item => (
          <Link key={item.href} href={item.href} style={{
            fontSize: 13, fontWeight: 500, textDecoration: "none",
            color: pathname === item.href
              ? (dark ? "white" : "#0a0a0f")
              : (dark ? "rgba(255,255,255,0.7)" : "#2e2e42"),
            transition: "color 0.2s"
          }}>
            {item.label}
          </Link>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {user ? (
          <>
            <Link href="/dashboard" style={{ padding: "8px 20px", borderRadius: 99, fontSize: 13, fontWeight: 500, textDecoration: "none", color: dark ? "rgba(255,255,255,0.8)" : "#2e2e42" }}>
              Dashboard
            </Link>
            <div
              onClick={() => router.push("/profile")}
              style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#2d8f7b,#4a5aef)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
            >
              {user.name?.[0]?.toUpperCase()}
            </div>
            <button onClick={handleLogout} style={{ fontSize: 12, color: dark ? "rgba(255,255,255,0.5)" : "#2e2e42", background: "none", border: "none", cursor: "pointer" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" style={{ padding: "8px 20px", borderRadius: 99, fontSize: 13, fontWeight: 500, textDecoration: "none", color: dark ? "rgba(255,255,255,0.8)" : "#2e2e42" }}>
              Login
            </Link>
            <Link href="/signup" style={{
              padding: "10px 22px", borderRadius: 99, fontSize: 13, fontWeight: 600, textDecoration: "none",
              background: dark ? "white" : "#0a0a0f",
              color: dark ? "#0a0a0f" : "white",
              transition: "all 0.2s"
            }}>
              Start for Free
            </Link>
          </>
        )}
      </div>
    </motion.nav>
  );
}
