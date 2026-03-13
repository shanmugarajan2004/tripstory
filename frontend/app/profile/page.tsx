"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";

const TRIPS = [
  { name: "North India Tour 2026", dates: "Apr 2026 · 5 stops", img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80" },
  { name: "Kerala Backwaters 2025", dates: "Sep 2025 · 6 stops", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80" },
  { name: "Goa Escape 2025", dates: "Jul 2025 · 4 stops", img: "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=400&q=80" },
  { name: "Rajasthan Road Trip", dates: "May 2025 · 8 stops", img: "https://images.unsplash.com/photo-1477587635293-85f0ef3dbe26?w=400&q=80" },
  { name: "Andaman Islands", dates: "Mar 2025 · 4 stops", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80" },
];

const TABS = ["Trips", "Stories", "Routes", "Saved", "Stats"];

export default function ProfilePage() {
  const { user, logout } = useStore();
  const [tab, setTab] = useState("Trips");
  const name = user?.name || "Alex Journey";
  const initial = name[0]?.toUpperCase();

  return (
    <div className="min-h-screen pt-[72px]" style={{ background: "#faf8f4" }}>
      {/* Cover */}
      <div className="relative h-56 overflow-hidden" style={{ background: "#0a0a0f" }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=80')" }} />
      </div>

      <div className="max-w-4xl mx-auto px-10">
        {/* Top row */}
        <div className="flex items-end gap-6 -mt-12 mb-5">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-3xl border-4 shadow-xl flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#2d8f7b,#4a5aef)", borderColor: "#faf8f4" }}>
            {initial}
          </motion.div>
          <div className="pb-2 flex-1">
            <h1 className="font-serif text-3xl font-bold" style={{ letterSpacing: "-0.5px" }}>{name}</h1>
            <p className="text-sm mt-1" style={{ color: "#2e2e42" }}>@{name.toLowerCase().replace(" ", "")} · Joined Jan 2023</p>
          </div>
          <div className="flex gap-3 pb-2">
            <button className="px-5 py-2.5 rounded-xl text-sm font-medium border" style={{ borderColor: "#ede9e3" }}>Edit Profile</button>
            <Link href="/planner" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "#0a0a0f" }}>+ New Trip</Link>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-10 mb-6">
          {[["23", "Trips"], ["18", "Stories"], ["31", "Countries"], ["1.2k", "Followers"], ["348", "Following"], ["4.8k", "Likes"]].map(([n, l]) => (
            <div key={l}>
              <div className="font-serif text-2xl font-bold" style={{ letterSpacing: "-0.5px" }}>{n}</div>
              <div className="text-xs mt-0.5" style={{ color: "#2e2e42" }}>{l}</div>
            </div>
          ))}
        </div>

        <p className="text-sm leading-relaxed mb-4 max-w-xl" style={{ color: "#2e2e42" }}>
          Digital nomad & travel storyteller. Chasing sunsets, street food, and stories worth telling. Currently based in Mumbai 🇮🇳 · Next: North India 🇮🇳
        </p>

        <div className="flex gap-5 mb-8 text-sm flex-wrap" style={{ color: "#2e2e42" }}>
          <span>📍 Mumbai, India</span>
          <span>🔗 alexjourney.com</span>
          <span>📸 @alex.journey</span>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-8" style={{ borderColor: "#ede9e3" }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-6 py-3.5 text-sm font-medium transition-all"
              style={{
                color: tab === t ? "#0a0a0f" : "#2e2e42",
                borderBottom: `2px solid ${tab === t ? "#0a0a0f" : "transparent"}`,
                marginBottom: -1
              }}>
              {t}
            </button>
          ))}
        </div>

        {/* Trips grid */}
        {tab === "Trips" && (
          <div className="grid grid-cols-3 gap-5 pb-12">
            {TRIPS.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="rounded-xl overflow-hidden cursor-pointer relative group" style={{ aspectRatio: "4/3" }}>
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${t.img})` }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4"
                  style={{ background: "rgba(10,10,15,0.55)" }}>
                  <div>
                    <div className="font-serif text-lg font-bold text-white">{t.name}</div>
                    <div className="text-xs text-white/70 mt-1">{t.dates}</div>
                  </div>
                </div>
              </motion.div>
            ))}
            <Link href="/planner"
              className="rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer transition-colors" style={{ aspectRatio: "4/3", borderColor: "#ede9e3" }}>
              <div className="text-center" style={{ color: "#2e2e42" }}>
                <div className="text-3xl mb-2">+</div>
                <div className="text-sm font-medium">New Trip</div>
              </div>
            </Link>
          </div>
        )}

        {tab !== "Trips" && (
          <div className="text-center py-20" style={{ color: "#2e2e42" }}>
            <div className="text-4xl mb-3">🚧</div>
            <p className="text-sm">{tab} tab coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}
