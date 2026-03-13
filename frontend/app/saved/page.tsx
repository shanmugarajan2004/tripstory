"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { FeedCard } from "@/components/StoryCard";

const SAVED_MOCK_STORIES = [
  { id: "3", title: "The Royal Palaces of the Pink City", location: "Jaipur, Rajasthan", image: "https://images.unsplash.com/photo-1477587635293-85f0ef3dbe26?w=600&q=80", author: "Karan S.", duration: "5 days · ₹18,000", tag: "North India", likes: 1623, comments: 145, excerpt: "Amber Fort, Hawa Mahal, and endless cups of cutting chai in the bazaars." },
  { id: "6", title: "Tea Gardens and Misty Mountains", location: "Munnar, Kerala", image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&q=80", author: "Dev P.", duration: "5 days · ₹25,000", tag: "South India", likes: 1738, comments: 158, excerpt: "Waking up to endless rolling hills of green tea plantations above the clouds." },
];

export default function SavedPage() {
  const { user } = useStore();

  if (!user) {
    return (
      <div className="min-h-screen pt-[72px] flex items-center justify-center bg-mist">
        <div className="text-center p-12 bg-white rounded-3xl shadow-sm max-w-md">
          <div className="text-6xl mb-6">🔒</div>
          <h1 className="font-serif text-3xl font-bold mb-4">Sign in to view saved trips</h1>
          <p className="text-ink-3 mb-8">Save your favorite stories and access them anytime, anywhere.</p>
          <Link href="/login" className="px-8 py-4 bg-ink text-white rounded-full font-medium inline-block w-full">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mist pt-[72px] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-mist-2 fixed left-0 top-[72px] bottom-0 overflow-y-auto flex flex-col">
        <nav className="p-4 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-3 px-3 mb-2 mt-4">Main</p>
          {[
            { icon: "🏠", label: "Dashboard", href: "/dashboard" },
            { icon: "📖", label: "My Stories", href: "/stories" },
            { icon: "🗺️", label: "Trip Planner", href: "/planner" },
            { icon: "📍", label: "Route Maps", href: "/map" },
            { icon: "💰", label: "Budget", href: "/budget" },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-1 transition-all text-ink-3 hover:bg-mist hover:text-ink"
            >
              <span className="text-lg">{item.icon}</span> {item.label}
            </Link>
          ))}
          <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-3 px-3 mb-2 mt-6">Discover</p>
          {[
            { icon: "🔍", label: "Explore", href: "/stories" },
            { icon: "🌍", label: "Trending", href: "/stories?sort=trending" },
            { icon: "🔖", label: "Bookmarked", href: "/saved", active: true },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-1 transition-all ${
                item.active ? "bg-ink text-white" : "text-ink-3 hover:bg-mist hover:text-ink"
              }`}
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

      {/* Main Content */}
      <main className="ml-64 flex-1 p-10">
        <div className="mb-10">
          <h1 className="font-serif text-4xl font-bold tracking-tight mb-2">Bookmarked Stories</h1>
          <p className="text-ink-3">Trips and itineraries you've saved for inspiration.</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {SAVED_MOCK_STORIES.map((story: any) => (
            <FeedCard key={story.id} story={story} />
          ))}
        </div>
        
        {SAVED_MOCK_STORIES.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-mist-2">
            <div className="text-6xl mb-4">🔖</div>
            <h3 className="text-xl font-bold mb-2">No bookmarks yet</h3>
            <p className="text-ink-3 mb-6 max-w-sm mx-auto">Start exploring and save the trips you want to remember for your next adventure.</p>
            <Link href="/stories" className="px-6 py-3 bg-ink text-white rounded-full font-medium inline-block">
              Explore Stories
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
