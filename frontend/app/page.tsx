"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const FEATURES = [
  { icon: "🗺️", title: "Interactive Route Maps", text: "Visualize your entire journey on an interactive map. Draw routes, add stops, and see distances calculated in real time.", color: "bg-teal/10" },
  { icon: "📖", title: "Rich Travel Stories", text: "Document every moment with photos, descriptions, and location tags. Create a beautiful travel journal others can explore.", color: "bg-yellow-100" },
  { icon: "💰", title: "Budget Tracking", text: "Track every expense by category with beautiful charts. Manage your travel budget and never get caught overspending.", color: "bg-red-50" },
  { icon: "📅", title: "Itinerary Planner", text: "Plan each day of your trip with a drag-and-drop timeline. Add activities, restaurants, and accommodations effortlessly.", color: "bg-indigo-50" },
  { icon: "🔍", title: "Discover Destinations", text: "Explore trending trips, filter by country, and bookmark destinations shared by thousands of travelers worldwide.", color: "bg-teal/10" },
  { icon: "🤝", title: "Community & Following", text: "Follow travelers whose style inspires you. Like, comment, and save stories. Build your travel community.", color: "bg-yellow-100" },
];

const STORIES = [
  { title: "The Taj Mahal at Sunrise", location: "Agra, North India", duration: "3 days", budget: 450, image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80", author: "Rahul M.", tag: "Heritage" },
  { title: "Backwaters of Alleppey", location: "Kerala, South India", duration: "5 days", budget: 600, image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80", author: "Sneha P.", tag: "Nature" },
  { title: "Palaces of Jaipur", location: "Rajasthan, North India", duration: "7 days", budget: 850, image: "https://images.unsplash.com/photo-1477587635293-85f0ef3dbe26?w=600&q=80", author: "Karan S.", tag: "Culture" },
];

const TESTIMONIALS = [
  { text: "TripStory completely changed how I document travels. Instead of scattered notes, everything is in one gorgeous place.", author: "Maya Chen", role: "Digital Nomad · 32 countries", initial: "M", gradient: "from-teal to-indigo-500" },
  { text: "The budget tracker alone is worth it. I actually came home from my Kerala trip under budget for the first time ever.", author: "Raj Patel", role: "Backpacker · 18 countries", initial: "R", gradient: "from-orange-400 to-yellow-400" },
  { text: "We use TripStory for every family vacation now. The itinerary planner keeps everyone on the same page.", author: "Sophie Durant", role: "Family Traveler · 24 countries", initial: "S", gradient: "from-indigo-500 to-teal" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#0a0a0f" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&q=80')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.35 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.4) 50%, rgba(10,10,15,0.7) 100%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-12 pt-28 pb-20 w-full">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest mb-7"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "#e8c96a" }}
          >
            ✦ The World Is Waiting
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="font-serif font-bold text-white mb-6"
            style={{ fontSize: "clamp(52px,7vw,96px)", lineHeight: 1, letterSpacing: "-2px" }}
          >
            Document Every<br />
            <em style={{ color: "#e8c96a", fontStyle: "italic" }}>Journey</em><br />
            You Take
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-lg mb-11 max-w-xl" style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}
          >
            Plan routes, share stories, track expenses, and relive your travels — all in one beautifully crafted platform.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex gap-4 flex-wrap"
          >
            <Link href="/signup"
              className="px-10 py-5 rounded-full font-semibold text-base transition-all hover:-translate-y-1"
              style={{ background: "linear-gradient(135deg,#c9a84c,#e8c96a)", color: "#0a0a0f", boxShadow: "0 12px 32px rgba(201,168,76,0.4)" }}
            >
              Start Your Story →
            </Link>
            <Link href="/stories"
              className="px-10 py-5 rounded-full font-medium text-base transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.8)" }}
            >
              Explore Trips
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="flex gap-12 mt-16 pt-12" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            {[["42k+", "Stories Shared"], ["180+", "Countries Covered"], ["8.4k", "Active Travelers"]].map(([n, l]) => (
              <div key={l}>
                <div className="font-serif font-bold text-white" style={{ fontSize: 36, letterSpacing: "-1px", lineHeight: 1 }}>{n}</div>
                <div className="text-xs uppercase tracking-wider mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-12 py-24">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#2d8f7b" }}>Everything You Need</span>
          <h2 className="font-serif font-bold mt-4 mb-3" style={{ fontSize: "clamp(36px,4vw,56px)", letterSpacing: "-1.5px", lineHeight: 1.1 }}>
            Travel smarter,<br />share richer stories
          </h2>
          <p className="text-base max-w-lg" style={{ color: "#2e2e42", lineHeight: 1.6 }}>
            From route planning to expense tracking, TripStory gives you every tool to document your adventures.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-6 mt-16">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-10 border transition-all cursor-default"
              style={{ borderColor: "#ede9e3" }}
            >
              <div className={`w-14 h-14 rounded-xl ${f.color} flex items-center justify-center text-2xl mb-6`}>{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: "#0a0a0f" }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#2e2e42" }}>{f.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TRENDING STORIES */}
      <section className="py-24 px-12" style={{ background: "#0a0a0f" }}>
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#e8c96a" }}>Trending Now</span>
          <h2 className="font-serif font-bold text-white mt-4 mb-14" style={{ fontSize: "clamp(36px,4vw,56px)", letterSpacing: "-1.5px" }}>
            Stories capturing<br />the world&apos;s imagination
          </h2>
          <div className="grid grid-cols-3 gap-5">
            {STORIES.map((s, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }}
                className="rounded-2xl overflow-hidden cursor-pointer relative group"
                style={{ aspectRatio: "3/4" }}
                onClick={() => window.location.href = "/stories"}
              >
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${s.image})` }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,15,0.9), transparent)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 rounded-full text-xs mb-2"
                    style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    {s.tag}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white mb-2" style={{ lineHeight: 1.2 }}>{s.title}</h3>
                  <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                      style={{ background: "#c9a84c", color: "#0a0a0f" }}>{s.author[0]}</div>
                    {s.author} · {s.duration} · ${s.budget.toLocaleString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-11">
            <Link href="/stories"
              className="px-8 py-4 rounded-full text-sm font-medium transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}
            >
              View All Stories →
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-12" style={{ background: "#f5f4f0" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#2d8f7b" }}>Traveler Stories</span>
            <h2 className="font-serif font-bold mt-4" style={{ fontSize: "clamp(36px,4vw,48px)", letterSpacing: "-1.5px" }}>What our community says</h2>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-9 border transition-all"
                style={{ borderColor: "#ede9e3" }}
              >
                <div className="font-serif text-4xl mb-4" style={{ color: "#c9a84c" }}>&ldquo;</div>
                <p className="text-sm leading-relaxed mb-6 italic" style={{ color: "#2e2e42" }}>{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold`}>
                    {t.initial}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "#0a0a0f" }}>{t.author}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#2e2e42" }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-12">
        <div className="max-w-3xl mx-auto rounded-[32px] p-20 text-center relative overflow-hidden" style={{ background: "#0a0a0f" }}>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 384, height: 384, background: "radial-gradient(circle,rgba(201,168,76,0.15),transparent)", top: -96, right: -96 }} />
          <div className="absolute rounded-full pointer-events-none" style={{ width: 288, height: 288, background: "radial-gradient(circle,rgba(45,143,123,0.1),transparent)", bottom: -64, left: -48 }} />
          <h2 className="font-serif font-bold text-white relative mb-4" style={{ fontSize: "clamp(36px,4vw,56px)", letterSpacing: "-1.5px" }}>
            Your next adventure<br />starts with a story
          </h2>
          <p className="text-lg relative mb-10" style={{ color: "rgba(255,255,255,0.6)" }}>
            Join 8,400+ travelers documenting journeys around the world.
          </p>
          <div className="flex gap-4 justify-center flex-wrap relative">
            <Link href="/signup"
              className="px-10 py-5 rounded-full font-semibold transition-all hover:-translate-y-1"
              style={{ background: "linear-gradient(135deg,#c9a84c,#e8c96a)", color: "#0a0a0f" }}
            >
              Create Free Account
            </Link>
            <Link href="/stories"
              className="px-10 py-5 rounded-full font-medium transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}
            >
              Browse Stories
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-12 pt-16 pb-10" style={{ background: "#0a0a0f", color: "rgba(255,255,255,0.5)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-4 gap-12 mb-16">
            <div>
              <div className="font-serif text-xl font-bold text-white flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#c9a84c" }} />TripStory
              </div>
              <p className="text-sm leading-relaxed max-w-[220px]">The travel platform for explorers who want to document, share, and relive every journey.</p>
            </div>
            {[
              { title: "Platform", links: ["Explore Stories", "Trip Planner", "Route Maps", "Budget Tracker"] },
              { title: "Company", links: ["About Us", "Blog", "Careers", "Press"] },
              { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-5">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map(l => <li key={l}><Link href={l === "Explore Stories" ? "/stories" : "#"} className="text-sm hover:text-white transition-colors cursor-pointer">{l}</Link></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-8 text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <span>© 2026 TripStory. Made with ❤️ for explorers.</span>
            <span>✦ Live Your Journey</span>
          </div>
        </div>
      </footer>
    </>
  );
}
