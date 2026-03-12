"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const TRIP = {
  title: "Japan Spring 2026",
  dates: "Apr 1 – Apr 14",
  budget: 3800,
  stops: [
    { num: 1, city: "Tokyo 🇯🇵", dates: "Apr 1–5 · 4 nights", color: "#2d8f7b", activities: ["🌸 Shinjuku Gyoen", "🏯 Senso-ji Temple", "🍣 Tsukiji Market"] },
    { num: 2, city: "Hakone ⛰️", dates: "Apr 5–7 · 2 nights", color: "#6b7bf7", activities: ["🌋 Mt. Fuji Views", "♨️ Onsen Ryokan"] },
    { num: 3, city: "Kyoto 🏯", dates: "Apr 7–10 · 3 nights", color: "#c9a84c", activities: ["⛩️ Fushimi Inari", "🎋 Arashiyama Bamboo", "🍵 Tea Ceremony"] },
    { num: 4, city: "Nara 🦌", dates: "Apr 10–11 · 1 night", color: "#e8634a", activities: ["🦌 Nara Deer Park", "🏛️ Todai-ji Temple"] },
    { num: 5, city: "Osaka 🌃", dates: "Apr 11–14 · 3 nights", color: "#2e2e42", activities: ["🏰 Osaka Castle", "🍜 Dotonbori Food Tour", "🎡 Universal Studios"] },
  ],
  budget_items: [
    { label: "Flights", amount: 1200 },
    { label: "Accommodation", amount: 1400 },
    { label: "Activities", amount: 600 },
    { label: "Food & Transport", amount: 600 },
  ],
};

export default function PlannerPage() {
  const [showToast, setShowToast] = useState(false);

  const save = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <div className="min-h-screen pt-[72px]" style={{ background: "#f5f4f0" }}>
      {/* Header */}
      <div className="bg-white border-b px-10 py-5 flex justify-between items-center" style={{ borderColor: "#ede9e3" }}>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-xl" style={{ color: "#2e2e42" }}>←</Link>
          <h1 className="font-serif text-2xl font-bold" style={{ letterSpacing: "-0.5px" }}>{TRIP.title}</h1>
          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(74,90,239,0.1)", color: "#4a5aef" }}>Planned</span>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-xl text-sm font-medium border" style={{ borderColor: "#ede9e3" }}>Share</button>
          <button onClick={save} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "#0a0a0f" }}>Save Trip</button>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "380px 1fr", height: "calc(100vh - 72px - 69px)" }}>
        {/* Sidebar */}
        <div className="bg-white border-r overflow-y-auto p-7" style={{ borderColor: "#ede9e3" }}>
          <div className="flex justify-between items-center mb-5">
            <span className="font-semibold text-sm">Itinerary</span>
            <span className="text-xs" style={{ color: "#2e2e42" }}>14 days · 5 stops</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {[["DEPARTURE", "Apr 1, 2026"], ["RETURN", "Apr 14, 2026"]].map(([l, v]) => (
              <div key={l} className="text-center p-3 rounded-xl" style={{ background: "#f5f4f0" }}>
                <div className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color: "#2e2e42" }}>{l}</div>
                <div className="text-sm font-semibold">{v}</div>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div className="space-y-5 mb-6">
            {TRIP.stops.map((stop, i) => (
              <div key={i} className="flex gap-4 relative">
                {i < TRIP.stops.length - 1 && (
                  <div className="absolute left-[18px] top-10 bottom-[-20px] w-0.5" style={{ background: "#ede9e3" }} />
                )}
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: stop.color }}>
                  {stop.num}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm mb-1">{stop.city}</div>
                  <div className="text-xs mb-2" style={{ color: "#2e2e42" }}>{stop.dates}</div>
                  <div className="space-y-1.5">
                    {stop.activities.map(a => (
                      <div key={a} className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg" style={{ background: "#f5f4f0", color: "#2e2e42" }}>
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all"
            style={{ border: "2px dashed #ede9e3", color: "#2e2e42" }}>
            + Add Destination
          </button>

          {/* Budget */}
          <div className="mt-6 p-4 rounded-xl" style={{ background: "rgba(45,143,123,0.08)", border: "1px solid rgba(45,143,123,0.15)" }}>
            <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "#2d8f7b" }}>Trip Budget</div>
            {TRIP.budget_items.map(item => (
              <div key={item.label} className="flex justify-between text-sm mb-2">
                <span style={{ color: "#2e2e42" }}>{item.label}</span>
                <span className="font-semibold">${item.amount.toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between text-base font-bold mt-3 pt-3" style={{ borderTop: "1px solid rgba(45,143,123,0.2)" }}>
              <span>Total</span>
              <span style={{ color: "#2d8f7b" }}>${TRIP.budget.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Map area */}
        <div className="relative overflow-hidden" style={{ background: "linear-gradient(160deg,#0d1f1a,#1a2840,#0f1626)" }}>
          <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
            <defs>
              <radialGradient id="pg1"><stop offset="0%" stopColor="#3dba9e" stopOpacity="0.6"/><stop offset="100%" stopColor="#3dba9e" stopOpacity="0"/></radialGradient>
              <radialGradient id="pg2"><stop offset="0%" stopColor="#c9a84c" stopOpacity="0.6"/><stop offset="100%" stopColor="#c9a84c" stopOpacity="0"/></radialGradient>
            </defs>
            <path d="M 490 180 L 480 240 L 450 300 L 435 330 L 420 370" stroke="#3dba9e" strokeWidth="2.5" fill="none" strokeDasharray="8,5" opacity="0.7"/>
            {[
              { cx:490, cy:180, r:40, grad:"url(#pg1)", fc:"#3dba9e", label:"Tokyo", sub:"Apr 1–5", lx:508, ly:176 },
              { cx:480, cy:240, r:28, grad:"url(#pg1)", fc:"#6b7bf7", label:"Hakone", sub:"Apr 5–7", lx:496, ly:236 },
              { cx:450, cy:300, r:34, grad:"url(#pg2)", fc:"#c9a84c", label:"Kyoto", sub:"Apr 7–10", lx:466, ly:296 },
              { cx:435, cy:330, r:22, grad:"url(#pg1)", fc:"#e8634a", label:"Nara", sub:"Apr 10–11", lx:450, ly:326 },
              { cx:420, cy:370, r:36, grad:"url(#pg1)", fc:"#3dba9e", label:"Osaka", sub:"Apr 11–14", lx:438, ly:366 },
            ].map((m,i)=>(
              <g key={i}>
                <circle cx={m.cx} cy={m.cy} r={m.r} fill={m.grad} opacity="0.5"/>
                <circle cx={m.cx} cy={m.cy} r={i===0?14:10} fill={m.fc} opacity="0.9"/>
                <circle cx={m.cx} cy={m.cy} r={i===0?6:4} fill="white"/>
                <text x={m.lx} y={m.ly} fill="white" fontSize="13" fontFamily="sans-serif" fontWeight="700">{m.label}</text>
                <text x={m.lx} y={m.ly+14} fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="sans-serif">{m.sub}</text>
              </g>
            ))}
          </svg>

          <div className="absolute top-5 left-5 backdrop-blur-md rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>Japan Spring 2026</div>
            <div className="text-base font-semibold text-white">5 Cities · 14 Days</div>
            <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>~2,400 km total</div>
          </div>
        </div>
      </div>

      {showToast && (
        <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-8 right-8 text-white px-5 py-3 rounded-xl flex items-center gap-2 text-sm font-medium"
          style={{ background: "#0a0a0f", boxShadow: "0 20px 60px rgba(10,10,15,0.4)" }}>
          ✅ Trip saved successfully!
        </motion.div>
      )}
    </div>
  );
}
