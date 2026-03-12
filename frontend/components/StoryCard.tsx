"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// ── StoryCard ─────────────────────────────────────────────

interface StoryCardProps {
  story: {
    id: string;
    title: string;
    location: string;
    duration?: string;
    budget?: number;
    image: string;
    author: string;
    tag?: string;
    likes?: number;
    excerpt?: string;
  };
  dark?: boolean;
}

export function StoryCard({ story, dark }: StoryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`rounded-2xl overflow-hidden cursor-pointer aspect-[3/4] relative group ${dark ? "" : "border border-mist-2"}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${story.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/90 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {story.tag && (
          <span className="inline-block bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white/90 uppercase tracking-wide mb-2">
            {story.tag}
          </span>
        )}
        <h3 className="font-serif text-xl font-bold text-white leading-tight mb-2">{story.title}</h3>
        <div className="flex items-center gap-3 text-xs text-white/60">
          <span className="w-5 h-5 rounded-full bg-gold flex items-center justify-center text-[9px] font-bold text-ink">
            {story.author[0]}
          </span>
          {story.author}
          {story.duration && <span>· {story.duration}</span>}
          {story.budget && <span>· ${story.budget.toLocaleString()}</span>}
        </div>
      </div>
    </motion.div>
  );
}

// ── FeedCard (full story card for feed page) ──────────────

export function FeedCard({ story }: { story: any }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(story.likes || 0);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked(!liked);
    setLikes((prev: number) => liked ? prev - 1 : prev + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl overflow-hidden border border-mist-2 cursor-pointer shadow-sm hover:shadow-hard hover:border-transparent transition-all"
    >
      <Link href={`/stories/${story.id}`}>
        <div className="h-56 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
            style={{ backgroundImage: `url(${story.image || story.images?.[0]})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/40 to-transparent" />
          {story.tag && (
            <div className="absolute top-3 left-3 bg-[#0a0a0f]/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white font-medium">
              {story.tag}
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center gap-1 text-xs text-teal font-semibold mb-2">
            📍 {story.location}
          </div>
          <h3 className="font-serif text-xl font-bold text-ink leading-snug mb-2 tracking-tight">
            {story.title}
          </h3>
          <p className="text-sm text-ink-3 leading-relaxed mb-4 line-clamp-2">
            {story.excerpt || story.content?.slice(0, 120) + "..."}
          </p>
          <div className="flex justify-between items-center pt-3 border-t border-mist">
            <div className="flex items-center gap-2 text-xs text-ink-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal to-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">
                {story.user?.name?.[0] || story.author?.[0] || "?"}
              </div>
              {story.user?.name || story.author} · {story.duration || ""}
            </div>
            <div className="flex gap-3 text-sm text-ink-3">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 transition-colors ${liked ? "text-coral" : "hover:text-coral"}`}
              >
                ❤️ {likes}
              </button>
              <span className="flex items-center gap-1">💬 {story.comments || 0}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── FeatureCard ───────────────────────────────────────────

export function FeatureCard({ icon, title, text, color, delay = 0 }: any) {
  const bgMap: Record<string, string> = {
    teal: "bg-teal/10",
    gold: "bg-gold/10",
    coral: "bg-coral/10",
    indigo: "bg-indigo-500/10",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl p-10 border border-mist-2 transition-all hover:shadow-hard hover:border-transparent relative overflow-hidden group"
    >
      <div className={`w-14 h-14 rounded-xl ${bgMap[color] || "bg-mist"} flex items-center justify-center text-2xl mb-6`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-ink mb-2">{title}</h3>
      <p className="text-sm text-ink-3 leading-relaxed">{text}</p>
    </motion.div>
  );
}

// ── BudgetDonutChart ──────────────────────────────────────

const COLORS = ["#3dba9e", "#6b7bf7", "#c9a84c", "#e8634a", "#d4b896"];

export function BudgetDonutChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(v: any) => `$${v}`} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function DailySpendingChart({ data }: { data: { day: string; amount: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
        <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#2e2e42" }} axisLine={false} tickLine={false} />
        <YAxis hide />
        <Tooltip formatter={(v: any) => `$${v}`} />
        <Bar dataKey="amount" fill="#3dba9e" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── LoadingSkeleton ───────────────────────────────────────

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`bg-mist-2 animate-pulse rounded-lg ${className}`} />
  );
}

export function StoryCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-mist-2">
      <Skeleton className="h-56 rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  );
}
