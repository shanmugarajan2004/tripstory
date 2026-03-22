"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Map, BookOpen, Wallet, Calendar, Compass, Users, ArrowRight, Shield } from "lucide-react";

const FEATURES = [
  { icon: Map, title: "Interactive Route Maps", text: "Visualize your entire journey on an interactive map. Draw routes, add stops, and see distances calculated in real time.", color: "text-primary bg-primary/10 border-primary/20" },
  { icon: BookOpen, title: "Rich Travel Stories", text: "Document every moment with photos, descriptions, and location tags. Create a beautiful travel journal others can explore.", color: "text-cyan bg-cyan/10 border-cyan/20" },
  { icon: Wallet, title: "Budget Tracking", text: "Track every expense by category with beautiful charts. Manage your travel budget and never get caught overspending.", color: "text-coral bg-coral/10 border-coral/20" },
  { icon: Calendar, title: "Itinerary Planner", text: "Plan each day of your trip with a drag-and-drop timeline. Add activities, restaurants, and accommodations effortlessly.", color: "text-purple bg-purple/10 border-purple/20" },
  { icon: Compass, title: "Discover Destinations", text: "Explore trending trips, filter by country, and bookmark destinations shared by thousands of travelers worldwide.", color: "text-primary bg-primary/10 border-primary/20" },
  { icon: Users, title: "Community & Following", text: "Follow travelers whose style inspires you. Like, comment, and save stories. Build your travel community.", color: "text-cyan bg-cyan/10 border-cyan/20" },
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
          ✦ The World Is Waiting
        </motion.div>
        
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
          Document Every <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan to-purple">
            Journey
          </span> <br className="hidden md:block" />
          You Take
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg md:text-xl text-muted max-w-2xl text-balance leading-relaxed mb-10">
          Plan routes, share stories, track expenses, and relive your travels — all in one beautifully crafted platform.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4">
          <Link href="/signup" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold overflow-hidden transition-all hover:scale-105 shadow-cyanGlow">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
            <span className="relative">Start Your Story</span>
            <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/stories" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-foreground font-medium transition-all backdrop-blur-sm">
            Explore Trips
          </Link>
        </motion.div>

        {/* STATS MATRIX */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-white/5">
          {[
            { v: "42k+", l: "Stories Shared" },
            { v: "180+", l: "Countries Covered" },
            { v: "8.4k", l: "Active Travelers" }
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
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan mb-4 block">Everything You Need</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">Travel smarter,<br />share richer stories</h2>
          <p className="text-muted text-lg max-w-xl mx-auto text-balance">From route planning to expense tracking, TripStory gives you every tool to document your adventures.</p>
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

      {/* CTA */}
      <section className="py-20 px-12 relative z-10">
        <div className="max-w-3xl mx-auto rounded-[32px] p-20 text-center relative overflow-hidden border border-white/5 bg-white/5 glass-panel">
          <div className="absolute rounded-full pointer-events-none" style={{ width: 384, height: 384, background: "radial-gradient(circle,rgba(59,130,246,0.15),transparent)", top: -96, right: -96 }} />
          <div className="absolute rounded-full pointer-events-none" style={{ width: 288, height: 288, background: "radial-gradient(circle,rgba(139,92,246,0.1),transparent)", bottom: -64, left: -48 }} />
          <h2 className="font-serif font-bold text-white relative mb-4" style={{ fontSize: "clamp(36px,4vw,56px)", letterSpacing: "-1.5px" }}>
            Your next adventure<br />starts with a story
          </h2>
          <p className="text-lg relative mb-10" style={{ color: "rgba(255,255,255,0.6)" }}>
            Join 8,400+ travelers documenting journeys around the world.
          </p>
          <div className="flex gap-4 justify-center flex-wrap relative">
            <Link href="/signup"
              className="px-10 py-5 rounded-full font-semibold transition-all hover:-translate-y-1 shadow-glow"
              style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", color: "#fff" }}
            >
              Create Free Account
            </Link>
            <Link href="/stories"
              className="px-10 py-5 rounded-full font-medium transition-colors backdrop-blur-md"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}
            >
              Browse Stories
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 bg-background/50 backdrop-blur-lg pt-16 pb-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="font-serif text-xl font-bold flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary" /> TripStory
            </div>
            <p className="text-xs text-muted max-w-xs leading-relaxed">The travel platform for explorers who want to document, share, and relive every journey.</p>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li className="hover:text-cyan cursor-pointer transition-colors">Explore Stories</li>
              <li className="hover:text-cyan cursor-pointer transition-colors">Trip Planner</li>
              <li className="hover:text-cyan cursor-pointer transition-colors">Route Maps</li>
              <li className="hover:text-cyan cursor-pointer transition-colors">Budget Tracker</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li className="hover:text-cyan cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-cyan cursor-pointer transition-colors">Blog</li>
              <li className="hover:text-cyan cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-cyan cursor-pointer transition-colors">Press</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li className="hover:text-cyan cursor-pointer transition-colors">Privacy</li>
              <li className="hover:text-cyan cursor-pointer transition-colors">Terms</li>
              <li className="hover:text-cyan cursor-pointer transition-colors">Cookies</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between pt-8 border-t border-white/10 text-xs text-muted">
          <span>© 2026 TripStory. Made with ❤️ for explorers.</span>
          <span className="flex items-center gap-2 mt-4 md:mt-0 font-medium">✦ Live Your Journey</span>
        </div>
      </footer>
    </div>
  );
}
