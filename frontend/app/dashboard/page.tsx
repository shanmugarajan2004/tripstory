"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { useTrips, useUserStats } from "@/hooks/useQueries";
import { Skeleton } from "@/components/StoryCard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function StatCard({ icon, value, label, change, up }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 border border-mist-2 shadow-sm hover:-translate-y-1 hover:shadow-soft transition-all"
    >
      <div className="text-3xl mb-4">{icon}</div>
      <div className="font-serif text-4xl font-bold text-ink tracking-tight leading-none">{value}</div>
      <div className="text-xs text-ink-3 uppercase tracking-wide mt-2">{label}</div>
      {change && (
        <span className={`inline-block mt-3 text-xs font-semibold px-2 py-1 rounded-full ${up ? "bg-teal/10 text-teal" : "bg-coral/10 text-coral"}`}>
          {change}
        </span>
      )}
    </motion.div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useStore();
  const { data: tripsData, isLoading } = useTrips();
  const { data: stats } = useUserStats();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  if (!user) return null;

  const trips = tripsData?.trips || [];
  const now = new Date();
  const greeting = now.getHours() < 12 ? "Good morning" : now.getHours() < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-mist pt-[72px] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-mist-2 fixed left-0 top-[72px] bottom-0 overflow-y-auto flex flex-col">
        <nav className="p-4 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-3 px-3 mb-2 mt-4">Main</p>
          {[
            { icon: "🏠", label: "Dashboard", href: "/dashboard", active: true },
            { icon: "📖", label: "My Stories", href: "/stories" },
            { icon: "🗺️", label: "Trip Planner", href: "/planner" },
            { icon: "📍", label: "Route Maps", href: "/map" },
            { icon: "💰", label: "Budget", href: "/budget" },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-1 transition-all ${
                item.active ? "bg-ink text-white" : "text-ink-3 hover:bg-mist hover:text-ink"
              }`}
            >
              <span className="text-lg">{item.icon}</span> {item.label}
            </Link>
          ))}
          <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-3 px-3 mb-2 mt-6">Discover</p>
          {[
            { icon: "🔍", label: "Explore", href: "/stories" },
            { icon: "🌍", label: "Trending", href: "/stories?sort=trending" },
            { icon: "🔖", label: "Bookmarked", href: "/saved" },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-1 text-ink-3 hover:bg-mist hover:text-ink transition-all"
            >
              <span className="text-lg">{item.icon}</span> {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-mist-2">
          <Link href="/profile" className="flex items-center gap-3 p-3 rounded-xl hover:bg-mist transition-all">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal to-indigo-500 flex items-center justify-center text-white font-bold">
              {user.name[0]}
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">{user.name}</p>
              <p className="text-xs text-ink-3">View profile</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 flex-1 p-10">
        <div className="flex justify-between items-start mb-9">
          <div>
            <h1 className="font-serif text-4xl font-bold tracking-tight">{greeting}, {user.name.split(" ")[0]} ✈️</h1>
            <p className="text-sm text-ink-3 mt-1">{now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
          <Link href="/planner" className="px-6 py-3 bg-ink text-white rounded-xl text-sm font-medium hover:-translate-y-px hover:shadow-lg transition-all">
            + New Trip
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-5 mb-8">
          <StatCard icon="✈️" value={stats?.trips ?? 23} label="Trips Taken" change="↑ 3 this year" up />
          <StatCard icon="🌍" value={stats?.countries ?? 31} label="Countries" change="↑ 4 new" up />
          <StatCard icon="📖" value={stats?.stories ?? 18} label="Stories" change="↑ 892 likes" up />
          <StatCard icon="💵" value="$2.4k" label="Avg Budget" change="↑ 8% vs last yr" />
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-[1fr_320px] gap-6">
          <div className="space-y-6">
            {/* My Trips */}
            <div className="bg-white rounded-2xl p-7 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-base font-semibold">My Trips</h2>
                <Link href="/planner" className="text-sm text-teal font-medium">+ New</Link>
              </div>
              {isLoading ? (
                <div className="space-y-4">{[1, 2, 3].map(i => <Skeleton key={i} className="h-16" />)}</div>
              ) : trips.length === 0 ? (
                <div className="text-center py-10">
                  <div className="text-4xl mb-3">🗺️</div>
                  <p className="text-ink-3 text-sm">No trips yet. <Link href="/planner" className="text-teal">Plan your first one!</Link></p>
                </div>
              ) : (
                <div className="space-y-0">
                  {trips.slice(0, 5).map((trip: any) => (
                    <Link key={trip.id} href={`/planner?trip=${trip.id}`}
                      className="flex items-center gap-4 py-4 border-b border-mist last:border-0 hover:translate-x-1 transition-transform"
                    >
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal to-indigo-500 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{trip.title}</p>
                        <p className="text-xs text-ink-3 mt-1">
                          📅 {new Date(trip.startDate).toLocaleDateString()} · 💰 ${trip.totalBudget.toLocaleString()}
                        </p>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        trip.status === "ACTIVE" ? "bg-teal/10 text-teal" :
                        trip.status === "PLANNED" ? "bg-indigo-500/10 text-indigo-500" :
                        "bg-mist text-ink-3"
                      }`}>
                        {trip.status}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Budget preview */}
            <div className="bg-white rounded-2xl p-7 shadow-sm">
              <h2 className="text-base font-semibold mb-6">Budget Overview — 2026</h2>
              {[
                { label: "🏨 Accommodation", spent: 1240, total: 2000, color: "from-teal to-teal-light" },
                { label: "✈️ Transport", spent: 2100, total: 3000, color: "from-indigo-400 to-indigo-500" },
                { label: "🍜 Food & Dining", spent: 680, total: 1500, color: "from-gold to-gold-light" },
                { label: "🎭 Activities", spent: 340, total: 800, color: "from-coral to-coral-light" },
              ].map((item) => (
                <div key={item.label} className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-ink-3">${item.spent.toLocaleString()} / ${item.total.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-mist rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.spent / item.total) * 100}%` }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-base font-semibold mb-5">Recent Activity</h2>
              {[
                { icon: "📖", text: "You published \"First 48 Hours in Jaipur\"", time: "2h ago" },
                { icon: "🗺️", text: "Route saved for North India 2026", time: "Yesterday" },
                { icon: "💬", text: "Maya commented on your Goa story", time: "2 days ago" },
                { icon: "❤️", text: "Kerala story reached 500 likes!", time: "3 days ago" },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 py-3 border-b border-mist last:border-0">
                  <div className="w-9 h-9 rounded-full bg-mist flex items-center justify-center text-base flex-shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-sm text-ink-3 leading-snug">{item.text}</p>
                    <p className="text-xs text-ink-3 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-teal to-indigo-500 rounded-2xl p-6 text-white">
              <p className="text-xs uppercase tracking-widest opacity-70 mb-2">Next Adventure</p>
              <h3 className="font-serif text-xl font-bold mb-1">North India Tour 2026</h3>
              <p className="text-sm opacity-80 mb-4">April 1–14 · 5 cities · $3,800</p>
              <div className="bg-white/15 rounded-lg px-4 py-2 inline-block text-sm">
                🗓️ Starts in 20 days
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "🗺️ Plan Trip", href: "/planner" },
                  { label: "📖 New Story", href: "/stories/new" },
                  { label: "💰 Expenses", href: "/budget" },
                  { label: "📍 Routes", href: "/map" },
                ].map((a) => (
                  <Link key={a.href} href={a.href}
                    className="px-3 py-3 rounded-xl text-sm font-medium text-center bg-mist hover:bg-mist-2 transition-colors"
                  >
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
