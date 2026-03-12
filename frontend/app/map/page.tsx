"use client";
import { useState } from "react";
import Link from "next/link";

const ROUTES = [
  { id: 1, name: "Japan Spring 2026", stops: 5, km: 2400, dates: "Apr 1–14", active: true },
  { id: 2, name: "Norway Fjords 2025", stops: 6, km: 3200, dates: "Sep 2025", active: false },
  { id: 3, name: "Bali Escape 2025", stops: 4, km: 580, dates: "Jul 2025", active: false },
];

const STOPS = [
  { num: 1, name: "Tokyo", dates: "Apr 1–5", color: "#3dba9e", cx: 490, cy: 180 },
  { num: 2, name: "Hakone", dates: "Apr 5–7", color: "#6b7bf7", cx: 480, cy: 240 },
  { num: 3, name: "Kyoto", dates: "Apr 7–10", color: "#c9a84c", cx: 450, cy: 300 },
  { num: 4, name: "Nara", dates: "Apr 10–11", color: "#e8634a", cx: 435, cy: 335 },
  { num: 5, name: "Osaka", dates: "Apr 11–14", color: "#2e2e42", cx: 420, cy: 370 },
];

export default function MapPage() {
  const [selected, setSelected] = useState(1);

  return (
    <div className="pt-[72px]" style={{ height: "100vh", display: "grid", gridTemplateColumns: "300px 1fr" }}>
      {/* Sidebar */}
      <div className="bg-white border-r overflow-y-auto" style={{ borderColor: "#ede9e3" }}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <Link href="/dashboard" className="text-lg" style={{ color: "#2e2e42" }}>←</Link>
            <h2 className="font-semibold text-base">Route Maps</h2>
          </div>
          <input className="w-full px-4 py-2.5 rounded-xl text-sm outline-none mb-5" style={{ border: "1.5px solid #ede9e3" }} placeholder="Search trips..." />

          <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#2e2e42" }}>My Routes</p>
          <div className="space-y-2 mb-6">
            {ROUTES.map(r => (
              <div key={r.id} onClick={() => setSelected(r.id)}
                className="p-3 rounded-xl cursor-pointer transition-all"
                style={{
                  background: selected === r.id ? "rgba(45,143,123,0.08)" : "transparent",
                  border: `1px solid ${selected === r.id ? "rgba(45,143,123,0.2)" : "#ede9e3"}`
                }}>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: selected === r.id ? "#3dba9e" : "#2e2e42" }} />
                  <div>
                    <div className="text-sm font-semibold">{r.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#2e2e42" }}>{r.stops} stops · {r.km.toLocaleString()} km · {r.dates}</div>
                    {selected === r.id && <div className="text-xs mt-1 font-semibold" style={{ color: "#3dba9e" }}>● Viewing now</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#2e2e42" }}>Japan Route Stops</p>
          <div className="space-y-3">
            {STOPS.map(s => (
              <div key={s.num} className="flex items-center gap-3 cursor-pointer hover:translate-x-1 transition-transform">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: s.color }}>
                  {s.num}
                </div>
                <div>
                  <div className="text-sm font-semibold">{s.name}</div>
                  <div className="text-xs" style={{ color: "#2e2e42" }}>{s.dates}</div>
                </div>
              </div>
            ))}
          </div>

          <Link href="/planner" className="mt-6 w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#2d8f7b,#3dba9e)", marginTop: 24 }}>
            Edit Itinerary →
          </Link>
        </div>
      </div>

      {/* Map */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(160deg,#0d1f1a,#1a2840,#0f1626)" }}>
        <svg width="100%" height="100%" viewBox="0 0 1000 700">
          <defs>
            <radialGradient id="mr1"><stop offset="0%" stopColor="#3dba9e" stopOpacity="0.7"/><stop offset="100%" stopColor="#3dba9e" stopOpacity="0"/></radialGradient>
            <radialGradient id="mr2"><stop offset="0%" stopColor="#c9a84c" stopOpacity="0.7"/><stop offset="100%" stopColor="#c9a84c" stopOpacity="0"/></radialGradient>
          </defs>
          {/* Faint dot grid */}
          {Array.from({length:12}).map((_,row)=>Array.from({length:20}).map((_,col)=>(
            <circle key={`${row}-${col}`} cx={col*55+40} cy={row*55+40} r="1.2" fill="rgba(255,255,255,0.06)"/>
          )))}
          {/* World route path */}
          <path d="M 390 200 Q 450 170 505 215 Q 565 245 655 240" stroke="#3dba9e" strokeWidth="2" fill="none" strokeDasharray="10,6" opacity="0.6"/>
          {/* World stops */}
          <circle cx={390} cy={200} r={28} fill="url(#mr1)" opacity="0.5"/>
          <circle cx={390} cy={200} r={10} fill="#6b7bf7" opacity="0.9"/>
          <circle cx={390} cy={200} r={4} fill="white"/>
          <text x={408} y={196} fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="700">London</text>

          <circle cx={505} cy={215} r={24} fill="url(#mr2)" opacity="0.5"/>
          <circle cx={505} cy={215} r={9} fill="#c9a84c" opacity="0.9"/>
          <circle cx={505} cy={215} r={3.5} fill="white"/>
          <text x={520} y={211} fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="700">Dubai</text>

          <circle cx={655} cy={240} r={38} fill="url(#mr1)" opacity="0.6"/>
          <circle cx={655} cy={240} r={13} fill="#3dba9e" opacity="0.9"/>
          <circle cx={655} cy={240} r={5.5} fill="white"/>
          <text x={673} y={236} fill="white" fontSize="13" fontFamily="sans-serif" fontWeight="700">Tokyo</text>
          <text x={673} y={252} fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="sans-serif">Current Route</text>

          {/* Japan detail route */}
          <path d="M 655 240 L 648 272 L 638 308 L 628 338 L 615 375" stroke="#c9a84c" strokeWidth="1.5" fill="none" strokeDasharray="6,4" opacity="0.5"/>
          {STOPS.slice(1).map((s,i)=>{
            const positions = [{cx:648,cy:272},{cx:638,cy:308},{cx:628,cy:338},{cx:615,cy:375}];
            const p = positions[i];
            return <g key={s.num}>
              <circle cx={p.cx} cy={p.cy} r={6} fill={s.color} opacity="0.8"/>
              <text x={p.cx+12} y={p.cy+4} fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="sans-serif">{s.name}</text>
            </g>;
          })}
        </svg>

        {/* Legend */}
        <div className="absolute top-6 right-6 bg-white rounded-xl p-5 shadow-xl" style={{ minWidth: 180 }}>
          <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "#2e2e42" }}>Japan Spring 2026</p>
          {STOPS.map(s => (
            <div key={s.num} className="flex items-center gap-2 mb-3 last:mb-0">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0" style={{ background: s.color }}>{s.num}</div>
              <div>
                <div className="text-sm font-semibold">{s.name}</div>
                <div className="text-xs" style={{ color: "#2e2e42" }}>{s.dates}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2">
          {["+", "−", "⊕"].map(c => (
            <button key={c} className="w-11 h-11 rounded-full bg-white flex items-center justify-center font-bold text-lg shadow-lg hover:scale-110 transition-transform">
              {c}
            </button>
          ))}
        </div>

        <div className="absolute bottom-6 left-6 backdrop-blur-md rounded-xl px-4 py-3 text-sm text-white"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
          🛣️ Total: 2,400 km · 14 days · $3,800 budget
        </div>
      </div>
    </div>
  );
}
