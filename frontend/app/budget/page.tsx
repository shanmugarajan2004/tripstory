"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const CATEGORIES = [
  { emoji: "🏨", name: "Accommodation", amount: 980, pct: 42, color: "#3dba9e" },
  { emoji: "✈️", name: "Transport", amount: 620, pct: 26, color: "#6b7bf7" },
  { emoji: "🍜", name: "Food & Drink", amount: 480, pct: 20, color: "#c9a84c" },
  { emoji: "🎭", name: "Activities", amount: 180, pct: 8, color: "#e8634a" },
  { emoji: "🛍️", name: "Shopping", amount: 80, pct: 4, color: "#d4b896" },
];

const DAILY = [
  { day: "Apr 1", amount: 320 }, { day: "Apr 2", amount: 195 }, { day: "Apr 3", amount: 170 },
  { day: "Apr 4", amount: 245 }, { day: "Apr 5", amount: 390 }, { day: "Apr 6", amount: 145 },
  { day: "Apr 7", amount: 220 }, { day: "Apr 8", amount: 490 },
];

const EXPENSES = [
  { icon: "🏨", name: "Park Hyatt Tokyo", desc: "4 nights · Apr 1–5", date: "Apr 1", amount: -780 },
  { icon: "✈️", name: "Shinkansen Pass", desc: "14-day JR Pass", date: "Apr 1", amount: -440 },
  { icon: "🍜", name: "Sukiyabashi Jiro", desc: "Omakase dinner · 2 pax", date: "Apr 2", amount: -240 },
  { icon: "🎭", name: "TeamLab Planets", desc: "Museum · 2 tickets", date: "Apr 3", amount: -68 },
  { icon: "🛍️", name: "Harajuku Shopping", desc: "Souvenirs & streetwear", date: "Apr 4", amount: -80 },
  { icon: "🏨", name: "Hakone Ryokan", desc: "2 nights · Traditional inn", date: "Apr 5", amount: -320 },
];

export default function BudgetPage() {
  const [showAdd, setShowAdd] = useState(false);
  const total = CATEGORIES.reduce((s, c) => s + c.amount, 0);
  const budget = 3800;

  return (
    <div className="min-h-screen pt-[72px]" style={{ background: "#f5f4f0" }}>
      <div className="bg-white border-b px-10 py-5 flex justify-between items-center" style={{ borderColor: "#ede9e3" }}>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-xl" style={{ color: "#2e2e42" }}>←</Link>
          <h1 className="font-serif text-2xl font-bold" style={{ letterSpacing: "-0.5px" }}>Budget Tracker</h1>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2.5 rounded-xl text-sm border outline-none" style={{ borderColor: "#ede9e3", background: "white" }}>
            <option>Japan Spring 2026</option>
            <option>Norway Fjords 2025</option>
          </select>
          <button onClick={() => setShowAdd(true)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "#0a0a0f" }}>
            + Add Expense
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-10 space-y-6">
        {/* Total card */}
        <div className="rounded-2xl p-9 text-white relative overflow-hidden" style={{ background: "#0a0a0f" }}>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 300, height: 300, background: "radial-gradient(circle,rgba(201,168,76,0.2),transparent)", top: -80, right: -60 }} />
          <div className="grid grid-cols-2 gap-8 relative">
            <div>
              <div className="text-xs uppercase tracking-widest mb-2 opacity-50">Total Spent</div>
              <div className="font-serif font-bold mb-1" style={{ fontSize: 52, letterSpacing: "-2px", lineHeight: 1 }}>${total.toLocaleString()}</div>
              <div className="text-sm opacity-50">of ${budget.toLocaleString()} budget</div>
              <div className="h-1.5 rounded-full mt-4 w-64" style={{ background: "rgba(255,255,255,0.1)" }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${(total/budget)*100}%` }} transition={{ delay: 0.3, duration: 0.8 }}
                  className="h-full rounded-full" style={{ background: "linear-gradient(to right,#c9a84c,#e8c96a)" }} />
              </div>
              <div className="text-xs mt-2 opacity-40">{Math.round((total/budget)*100)}% used · ${(budget-total).toLocaleString()} remaining</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[["📅", "Day 8", "of 14 days"], ["💵", "$167", "avg per day"], ["📍", "5", "cities"], ["🏦", "JPY", "currency"]].map(([ic, v, l]) => (
                <div key={l} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="text-2xl mb-2">{ic}</div>
                  <div className="font-serif text-xl font-bold">{v}</div>
                  <div className="text-xs opacity-40 mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-5 gap-4">
          {CATEGORIES.map(c => (
            <motion.div key={c.name} whileHover={{ y: -2 }}
              className="bg-white rounded-xl p-5 border transition-all" style={{ borderColor: "#ede9e3" }}>
              <div className="text-3xl mb-3">{c.emoji}</div>
              <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "#2e2e42" }}>{c.name}</div>
              <div className="font-serif text-2xl font-bold" style={{ letterSpacing: "-0.5px" }}>${c.amount}</div>
              <div className="text-xs mt-1" style={{ color: "#2e2e42" }}>{c.pct}% of budget</div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-7 border" style={{ borderColor: "#ede9e3" }}>
            <h3 className="font-semibold text-sm mb-6">Spending Breakdown</h3>
            <div className="flex items-center gap-6">
              <PieChart width={160} height={160}>
                <Pie data={CATEGORIES} cx={75} cy={75} innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="amount">
                  {CATEGORIES.map((c, i) => <Cell key={i} fill={c.color} />)}
                </Pie>
              </PieChart>
              <div className="flex-1 space-y-2">
                {CATEGORIES.map(c => (
                  <div key={c.name} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
                    <span className="text-xs flex-1" style={{ color: "#2e2e42" }}>{c.name}</span>
                    <span className="text-xs font-semibold">{c.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-7 border" style={{ borderColor: "#ede9e3" }}>
            <h3 className="font-semibold text-sm mb-6">Daily Spending</h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={DAILY} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#2e2e42" }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: any) => [`$${v}`, "Spent"]} />
                <Bar dataKey="amount" fill="#3dba9e" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense list */}
        <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "#ede9e3" }}>
          <div className="flex justify-between items-center px-6 py-5 border-b" style={{ borderColor: "#f5f4f0" }}>
            <h3 className="font-semibold text-sm">Recent Expenses</h3>
            <span className="text-xs" style={{ color: "#2e2e42" }}>6 transactions</span>
          </div>
          {EXPENSES.map((e, i) => (
            <div key={i} className="grid items-center px-6 py-4 border-b transition-colors hover:bg-[#faf8f4]"
              style={{ gridTemplateColumns: "40px 1fr auto auto", gap: 16, borderColor: "#f5f4f0" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: "#f5f4f0" }}>{e.icon}</div>
              <div>
                <div className="text-sm font-medium">{e.name}</div>
                <div className="text-xs mt-0.5" style={{ color: "#2e2e42" }}>{e.desc}</div>
              </div>
              <div className="text-xs" style={{ color: "#2e2e42" }}>{e.date}</div>
              <div className="text-sm font-bold" style={{ color: "#e8634a" }}>{e.amount}</div>
            </div>
          ))}
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "rgba(10,10,15,0.5)" }}
          onClick={() => setShowAdd(false)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <h2 className="font-serif text-2xl font-bold mb-6">Add Expense</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#2e2e42" }}>Description</label>
                <input className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: "1.5px solid #ede9e3" }} placeholder="e.g. Hotel Shibuya" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "#2e2e42" }}>Amount ($)</label>
                  <input type="number" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: "1.5px solid #ede9e3" }} placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "#2e2e42" }}>Category</label>
                  <select className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: "1.5px solid #ede9e3" }}>
                    {CATEGORIES.map(c => <option key={c.name}>{c.emoji} {c.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <button onClick={() => setShowAdd(false)} className="flex-1 py-3 rounded-xl text-sm font-medium border" style={{ borderColor: "#ede9e3" }}>Cancel</button>
                <button onClick={() => setShowAdd(false)} className="flex-1 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: "#0a0a0f" }}>Add Expense</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
