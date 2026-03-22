"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Map, BookOpen, Wallet, Calendar, Compass, Users, ArrowRight, Activity, Globe2, Shield } from "lucide-react";

const FEATURES = [
  { icon: Map, title: "Interactive Routing", text: "Map complex routes with real-time distance calculation.", color: "text-primary bg-primary/10 border-primary/20" },
  { icon: BookOpen, title: "Data-Rich Logs", text: "Encrypted journal entries with precision location tagging.", color: "text-cyan bg-cyan/10 border-cyan/20" },
  { icon: Wallet, title: "Budget Algorithms", text: "Advanced expenditure tracking against localized currencies.", color: "text-coral bg-coral/10 border-coral/20" },
  { icon: Calendar, title: "Timeline Sync", text: "Drag-and-drop itinerary blocks fully synchronized.", color: "text-purple bg-purple/10 border-purple/20" },
  { icon: Compass, title: "Global Discovery", text: "Query trending coordinates worldwide via advanced filters.", color: "text-primary bg-primary/10 border-primary/20" },
  { icon: Users, title: "Network Relays", text: "Connect with explorer nodes. Clone verified itineraries.", color: "text-cyan bg-cyan/10 border-cyan/20" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden selection:bg-primary/30">
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)]" />
      </div>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-8 shadow-glow w-max">
          <Activity className="w-3.5 h-3.5" /> Core Systems Online
        </motion.div>
        
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
          Architect Your <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan to-purple">
            Next Expedition.
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg md:text-xl text-muted max-w-2xl text-balance leading-relaxed mb-10">
          Advanced telemetry for global explorers. Plot coordinates, monitor expenditures, and deploy rich travel logs through an ultra-modern interface.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4">
          <Link href="/signup" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold overflow-hidden transition-all hover:scale-105 shadow-cyanGlow">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
            <span className="relative">Initialize Protocol</span>
            <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/stories" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-foreground font-medium transition-all backdrop-blur-sm">
            <Globe2 className="w-4 h-4" /> Scan Global Network
          </Link>
        </motion.div>

        {/* STATS MATRIX */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-white/5">
          {[
            { v: "42.8k", l: "Logs Generated" },
            { v: "185", l: "Countries Mapped" },
            { v: "99.9%", l: "System Uptime" },
            { v: "< 12ms", l: "Query Latency" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col border-l border-white/10 pl-4">
              <span className="font-serif text-3xl font-bold text-foreground">{stat.v}</span>
              <span className="text-[10px] text-muted uppercase tracking-widest mt-1 font-semibold">{stat.l}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* MODULES GRID */}
      <section className="relative z-10 py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">Core Modules</h2>
          <p className="text-muted text-lg max-w-xl mx-auto text-balance">Every framework engineered for maximum operational efficiency in the field.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div key={i} 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group glass-panel rounded-3xl p-8 relative overflow-hidden transition-all hover:border-white/20 hover:shadow-[0_8px_32px_rgba(255,255,255,0.05)]"
            >
              <div className="w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 transition-colors shadow-lg shadow-black/50 backdrop-blur-md bg-white/5 group-hover:bg-white/10">
                <feature.icon className={`w-5 h-5 ${feature.color.split(" ")[0]}`} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 bg-background/50 backdrop-blur-lg pt-16 pb-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="font-serif text-xl font-bold flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary" /> TripStory
            </div>
            <p className="text-xs text-muted max-w-xs leading-relaxed">Secure, global, and seamlessly synced travel intelligence framework. Operating worldwide.</p>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground mb-4">Modules</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li className="hover:text-cyan cursor-pointer transition-colors">Route Mapping</li>
              <li className="hover:text-cyan cursor-pointer transition-colors">Financial Ledger</li>
              <li className="hover:text-cyan cursor-pointer transition-colors">Global Database</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground mb-4">Network</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li className="hover:text-cyan cursor-pointer transition-colors">Global Feed</li>
              <li className="hover:text-cyan cursor-pointer transition-colors">Node Relays</li>
              <li className="hover:text-cyan cursor-pointer transition-colors">System Status</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between pt-8 border-t border-white/10 text-xs text-muted">
          <span>© 2026 TripStory. All systems nominal.</span>
          <span className="flex items-center gap-2 mt-4 md:mt-0 font-medium"><span className="w-2.5 h-2.5 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" /> SYNCED</span>
        </div>
      </footer>
    </div>
  );
}
