"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useStories } from "@/hooks/useQueries";
import { FeedCard, StoryCardSkeleton } from "@/components/StoryCard";

const TAGS = ["All", "North India", "South India", "Heritage", "Nature", "Adventure", "Spiritual"];

const MOCK_STORIES = [
  { id: "1", title: "Sunrise at the Taj Mahal & Agra Fort", location: "Agra, Uttar Pradesh", image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80", author: "Rahul M.", duration: "3 days · ₹15,000", tag: "North India", likes: 1482, comments: 134, excerpt: "Witnessing the marble monument at dawn is an experience that transcends time." },
  { id: "2", title: "Cruising the Backwaters in a Houseboat", location: "Alleppey, Kerala", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80", author: "Sneha P.", duration: "4 days · ₹22,000", tag: "South India", likes: 891, comments: 67, excerpt: "Gliding through tranquil palm-fringed canals, eating fresh catch, pure bliss." },
  { id: "3", title: "The Royal Palaces of the Pink City", location: "Jaipur, Rajasthan", image: "https://images.unsplash.com/photo-1477587635293-85f0ef3dbe26?w=600&q=80", author: "Karan S.", duration: "5 days · ₹18,000", tag: "North India", likes: 1623, comments: 145, excerpt: "Amber Fort, Hawa Mahal, and endless cups of cutting chai in the bazaars." },
  { id: "4", title: "Ancient Ruins and Boulder Landscapes", location: "Hampi, Karnataka", image: "https://images.unsplash.com/photo-1620766165457-a80fe59217ca?w=600&q=80", author: "James K.", duration: "4 days · ₹12,000", tag: "South India", likes: 1445, comments: 129, excerpt: "Cycling through the Vijayanagara ruins feels like discovering a lost civilization." },
  { id: "5", title: "Spiritual Awakening on the Ghats", location: "Varanasi, Uttar Pradesh", image: "https://images.unsplash.com/photo-1561359313-0639aad3ca84?w=600&q=80", author: "Luna V.", duration: "3 days · ₹10,000", tag: "North India", likes: 1200, comments: 112, excerpt: "The Ganga Aarti at dusk and the boat rides at dawn... absolutely magical." },
  { id: "6", title: "Tea Gardens and Misty Mountains", location: "Munnar, Kerala", image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&q=80", author: "Dev P.", duration: "5 days · ₹25,000", tag: "South India", likes: 1738, comments: 158, excerpt: "Waking up to endless rolling hills of green tea plantations above the clouds." },
];

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
