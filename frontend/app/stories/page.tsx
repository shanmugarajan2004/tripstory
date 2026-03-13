"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useStories } from "@/hooks/useQueries";
import { FeedCard, StoryCardSkeleton } from "@/components/StoryCard";
import { ALL_INDIA_PLACES } from "@/data";

const TAGS = ["All", "North India", "South India", "Heritage", "Nature", "Adventure", "Spiritual", "Wildlife", "Beaches", "Mountains", "Pilgrimage"];

const MOCK_STORIES = ALL_INDIA_PLACES;

export default function StoriesPage() {
  const [activeTag, setActiveTag] = useState("All");
  const [search, setSearch] = useState("");
  const { data, isLoading } = useStories({ tag: activeTag === "All" ? undefined : activeTag, search: search || undefined });

  const stories = data?.stories?.length ? data.stories : MOCK_STORIES.filter(s => 
    (activeTag === "All" || s.tag === activeTag) && 
    (search === "" || s.title.toLowerCase().includes(search.toLowerCase()) || s.location.toLowerCase().includes(search.toLowerCase()))
  );

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
          <p className="text-sm text-ink-3">Showing <strong className="text-ink">{stories.length}</strong> of <strong className="text-ink">200</strong> Indian destinations</p>
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
