"use client";

import { useParams, useRouter } from "next/navigation";
import { ALL_INDIA_PLACES } from "@/data";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function StoryDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const story = ALL_INDIA_PLACES.find((p) => p.id === id);
  const [liked, setLiked] = useState(false);
  
  if (!story) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f4f0]">
        <h1 className="font-serif text-4xl font-bold text-[#0a0a0f] mb-4">Story not found</h1>
        <p className="text-lg text-[#2e2e42] mb-8">The story you are looking for does not exist or has been removed.</p>
        <button 
          onClick={() => router.back()}
          className="px-8 py-3 bg-[#0a0a0f] text-white rounded-full font-medium hover:bg-[#2e2e42] transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Fallbacks for duration array parsing in mock data
  const durationParts = story.duration?.split('·') || ["a few days", "a modest budget"];
  const durationTime = durationParts[0]?.trim() || "a few days";
  const durationBudget = durationParts[1]?.trim() || "a modest budget";
  const locationCity = story.location?.split(',')[0] || "this beautiful place";
  const titleMain = story.title?.split('&')[0] || story.title || "local attractions";

  return (
    <div className="min-h-screen bg-[#f5f4f0] pb-24">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full bg-[#0a0a0f]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${story.image})`, opacity: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
        
        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 p-8 pt-24 z-10 max-w-7xl mx-auto">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full w-fit"
          >
            ← Back to Stories
          </button>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-12 max-w-5xl mx-auto z-10 flex flex-col items-start gap-4">
          <div className="flex flex-wrap gap-3">
            {story.tag && (
              <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-white uppercase tracking-wider">
                {story.tag}
              </span>
            )}
            <span className="bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1">
              📍 {story.location}
            </span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          >
            {story.title}
          </motion.h1>
          
          <div className="flex items-center gap-6 text-white/80 text-sm md:text-base mt-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#e8c96a] flex items-center justify-center text-lg font-bold text-[#0a0a0f]">
                {story.author?.[0] || "?"}
              </div>
              <span className="font-medium text-white">{story.author}</span>
            </div>
            {story.duration && (
              <>
                <span>·</span>
                <span>⏱️ {story.duration}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="flex justify-between items-center mb-12 border-b border-[#ede9e3] pb-8">
          <div className="flex gap-6">
            <button 
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 text-lg font-medium transition-colors ${liked ? "text-[#e8634a]" : "text-[#2e2e42] hover:text-[#e8634a]"}`}
            >
              ❤️ {(story.likes || 0) + (liked ? 1 : 0)}
            </button>
            <span className="flex items-center gap-2 text-lg font-medium text-[#2e2e42]">
              💬 {story.comments || 0}
            </span>
          </div>
          <button className="px-6 py-2 border border-[#ede9e3] rounded-full text-sm font-medium hover:bg-white transition-colors flex items-center gap-2 text-[#0a0a0f]">
            ↗ Share Story
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none text-[#2e2e42] leading-relaxed"
        >
          {story.excerpt && (
            <p className="text-2xl font-serif text-[#0a0a0f] mb-8 italic border-l-4 border-[#c9a84c] pl-6">
              &ldquo;{story.excerpt}&rdquo;
            </p>
          )}
          
          <p className="mb-6">
            Welcome to the beautiful lands of <strong className="text-[#0a0a0f]">{story.location}</strong>. Our magnificent journey here, spanning over <strong className="text-[#0a0a0f]">{durationTime}</strong>, was nothing short of spectacular. This part of {story.tag || "the world"} holds secrets waiting to be explored by avid travelers.
          </p>
          
          <p className="mb-6">
            The vivid landscapes and the rich cultural heritage make this an unforgettable experience. As we walked through the historical pathways and interacted with the welcoming locals, we realized how much {locationCity} has to offer. The total expense came around <strong className="text-[#0a0a0f]">{durationBudget}</strong>, making it completely worth every penny.
          </p>
          
          <div className="my-12 p-8 bg-white rounded-2xl border border-[#ede9e3] shadow-sm">
            <h3 className="font-serif text-2xl font-bold mb-4 text-[#0a0a0f]">Trip Highlights</h3>
            <ul className="space-y-3 list-none p-0 m-0">
              <li className="flex items-start gap-3">
                <span className="text-[#3dba9e] font-bold">✓</span>
                Experiencing the enchanting {titleMain}
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#3dba9e] font-bold">✓</span>
                Immersing in the rich local culture of {locationCity}
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#3dba9e] font-bold">✓</span>
                Documenting beautiful memories
              </li>
            </ul>
          </div>
          
          <p>
            Whether you are an adventure seeker, a heritage enthusiast, or someone just looking to unwind, {locationCity} has something for everyone. Stay tuned for my next story!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
