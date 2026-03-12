"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useStories } from "@/hooks/useQueries";
import { FeedCard, StoryCardSkeleton } from "@/components/StoryCard";

const TAGS = ["All", "🏔️ Adventure", "🌸 Culture", "🍜 Food", "🏖️ Beach", "🌿 Nature", "🏙️ City", "🎒 Backpacking", "👨‍👩‍👧 Family"];

const MOCK_STORIES = [
  { id: "1", title: "28 Days Chasing Cherry Blossoms Across Japan", location: "Tokyo, Kyoto, Osaka", image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&q=80", author: "Aiko Tanaka", duration: "28 days · $3,200", tag: "🇯🇵 Japan", likes: 482, comments: 34, excerpt: "From Shinjuku chaos to Kyoto temple serenity — this trip changed everything." },
  { id: "2", title: "Fjord Chasing: A 10-Day Norwegian Road Trip", location: "Bergen, Geirangerfjord", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80", author: "Marcus Lund", duration: "10 days · $4,800", tag: "🇳🇴 Norway", likes: 891, comments: 67, excerpt: "Renting a campervan and driving through waterfalls, exactly as it should be." },
  { id: "3", title: "La Dolce Vita: Italian Love Story in 3 Cities", location: "Venice, Florence, Rome", image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80", author: "Sofia Romano", duration: "12 days · $3,600", tag: "🇮🇹 Italy", likes: 623, comments: 45, excerpt: "Art, pasta, gelato, and crumbling beauty at every corner. Italy haunts you forever." },
  { id: "4", title: "Morocco in 2 Weeks: Medinas, Dunes & Blue Cities", location: "Marrakech, Sahara, Chefchaouen", image: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=600&q=80", author: "James Kim", duration: "14 days · $2,100", tag: "🇲🇦 Morocco", likes: 445, comments: 29, excerpt: "Colors, souks, and the silence of the Sahara at midnight." },
  { id: "5", title: "Bali on $60/Day: A Digital Nomad's Full Guide", location: "Ubud, Canggu, Nusa Penida", image: "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=600&q=80", author: "Luna Verde", duration: "21 days · $1,260", tag: "🇮🇩 Bali", likes: 1200, comments: 112, excerpt: "Co-working by day, cliff sunset sessions by evening — Bali delivers." },
  { id: "6", title: "7 Days in Paradise: Overwater Bungalows", location: "Malé, Baa Atoll, Maldives", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80", author: "Priya & Dev", duration: "7 days · $6,800", tag: "🇲🇻 Maldives", likes: 738, comments: 58, excerpt: "Worth every penny. The kind of place that ruins all other beaches forever." },
];

export default function StoriesPage() {
  const [activeTag, setActiveTag] = useState("All");
  const [search, setSearch] = useState("");
  const { data, isLoading } = useStories({ tag: activeTag === "All" ? undefined : activeTag, search: search || undefined });

  const stories = data?.stories?.length ? data.stories : MOCK_STORIES;

  return (
    <div className="min-h-screen pt-[72px]">
      {/* Header */}
      <div className="relative bg-ink py-20 px-12 text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600&q=80')" }}
        />
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-6xl font-bold text-white tracking-tight mb-3"
          >
            Travel Stories
          </motion.h1>
          <p className="text-white/60 text-lg mb-8">Discover 42,000+ real travel experiences from around the world</p>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/15 rounded-full px-6 py-3 max-w-md mx-auto">
            <span className="text-white/50">🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search destinations, stories..."
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 px-12 py-5 overflow-x-auto border-b border-mist-2 bg-white">
        {TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
              activeTag === tag
                ? "bg-ink text-white border-ink"
                : "bg-white text-ink-3 border-mist-2 hover:border-ink-3 hover:text-ink"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Stories grid */}
      <div className="max-w-6xl mx-auto px-12 py-12">
        <div className="flex justify-between items-center mb-7">
          <p className="text-sm text-ink-3">Showing <strong className="text-ink">{stories.length}</strong> stories</p>
          <select className="px-4 py-2 rounded-full border border-mist-2 text-sm bg-white outline-none cursor-pointer">
            <option>Most Recent</option>
            <option>Most Liked</option>
            <option>Trending</option>
          </select>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <StoryCardSkeleton key={i} />)
            : stories.map((story: any) => <FeedCard key={story.id} story={story} />)
          }
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 rounded-full border border-mist-2 text-sm font-medium text-ink-3 hover:border-ink-3 hover:text-ink transition-all">
            Load More Stories
          </button>
        </div>
      </div>
    </div>
  );
}
