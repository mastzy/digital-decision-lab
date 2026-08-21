import React, { useState } from "react";

const weeklyData = [
  { day: "Mon", score: 58, simulations: 1 },
  { day: "Tue", score: 62, simulations: 2 },
  { day: "Wed", score: 61, simulations: 0 },
  { day: "Thu", score: 68, simulations: 2 },
  { day: "Fri", score: 72, simulations: 1 },
  { day: "Sat", score: 75, simulations: 3 },
  { day: "Sun", score: 78, simulations: 2 },
];

// Diselaraskan dengan 4 pemicu utama PRD (Urgency, Fear, Authority, Greed) + Trust
const improvements = [
  { trait: "Urgency Resistance", before: 28, after: 42, color: "#ef4444" },
  { trait: "Greed Resistance", before: 22, after: 35, color: "#ef4444" },
  { trait: "Trust Resistance", before: 40, after: 55, color: "#f59e0b" },
  { trait: "Fear Resistance", before: 48, after: 65, color: "#f59e0b" },
  { trait: "Authority Resistance", before: 60, after: 78, color: "#22c55e" },
];

const badges = [
  { icon: "🕵️", name: "Phishing Detective", desc: "Identified 10 phishing attempts", earned: true, date: "Aug 15" },
  { icon: "🧘", name: "Calm Under Pressure", desc: "Resisted 5 urgency scenarios", earned: true, date: "Aug 18" },
  { icon: "✅", name: "Verification Expert", desc: "Chose verification 8 times in a row", earned: true, date: "Aug 20" },
  { icon: "🛡️", name: "Authority Guardian", desc: "100% success on authority scenarios", earned: false, date: null },
  { icon: "🏆", name: "Cyber Champion", desc: "Score above 90 for 7 days", earned: false, date: null },
  { icon: "🌟", name: "Consistency Star", desc: "14-day learning streak", earned: false, date: null },
];

const challenges = [
  { title: "Spot the Urgency Trap", desc: "Identify time-pressure tactics in 3 messages", progress: 67, xp: 50, time: "2h left" },
  { title: "Greed Resistance Drill", desc: "Decline 5 reward-based social engineering attempts", progress: 40, xp: 75, time: "1d left" },
  { title: "Authority Verification", desc: "Verify authority through alternate channels 4 times", progress: 100, xp: 60, time: "Completed" },
];

const maxScore = Math.max(...weeklyData.map((d) => d.score));
const minScore = Math.min(...weeklyData.map((d) => d.score));

function WeeklyChart() {
  const chartH = 100;
  const chartW = 380;
  const pad = 20;
  const denominator = (maxScore - minScore + 10) || 1; // Mencegah pembagian dengan nol
  const w = (chartW - pad * 2) / Math.max(weeklyData.length - 1, 1);

  const points = weeklyData.map((d, i) => ({
    x: pad + i * w,
    y: chartH - pad - ((d.score - minScore + 5) / denominator) * (chartH - pad * 2),
    ...d,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartH} L ${points[0].x} ${chartH} Z`;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full" role="img" aria-label="Weekly Awareness Progress Chart">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#chartGrad)" />
        <path d={pathD} stroke="#3b82f6" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="#3b82f6" stroke="#060d1f" strokeWidth="2" />
            <text x={p.x} y={chartH - 4} textAnchor="middle" fontSize="8" fill="#526380">
              {p.day}
            </text>
            <text x={p.x} y={p.y - 8} textAnchor="middle" fontSize="8" fill="#60a5fa" fontFamily="DM Mono, monospace">
              {p.score}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function LearningProgress() {
  const [activeTab, setActiveTab] = useState<"week" | "month">("week");

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Overall Readiness Score", value: "78", sub: "+20 from start", color: "#60a5fa", suffix: "/100" },
          { label: "Simulations Done", value: "12", sub: "this month", color: "#86efac", suffix: "" },
          { label: "Learning Streak", value: "5", sub: "days in a row", color: "#fcd34d", suffix: " days" },
          { label: "Badges Earned", value: "3", sub: "of 6 available", color: "#c084fc", suffix: "" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl p-5"
            style={{ background: "#060d1f", border: "1px solid #162035" }}
          >
            <div
              className="text-3xl font-bold mb-1"
              style={{ color: stat.color, fontFamily: "var(--font-display)" }}
            >
              {stat.value}
              <span className="text-lg">{stat.suffix}</span>
            </div>
            <div className="text-xs font-semibold text-white">{stat.label}</div>
            <div className="text-xs mt-0.5" style={{ color: "#526380" }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly chart */}
        <div
          className="lg:col-span-7 rounded-2xl p-5 sm:p-6"
          style={{ background: "#060d1f", border: "1px solid #162035" }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3
                className="text-sm font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Awareness Score Progress
              </h3>
              <p className="text-xs mt-0.5" style={{ color: "#526380" }}>
                +20 points improvement this week
              </p>
            </div>
            <div
              className="flex rounded-lg overflow-hidden"
              style={{ border: "1px solid #162035" }}
            >
              {(["week", "month"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className="px-3 py-1.5 text-xs font-medium transition-colors capitalize"
                  style={{
                    background: activeTab === tab ? "#162035" : "transparent",
                    color: activeTab === tab ? "#e2e8f0" : "#526380",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <WeeklyChart />
        </div>

        {/* Behavioral improvements */}
        <div
          className="lg:col-span-5 rounded-2xl p-5 sm:p-6"
          style={{ background: "#060d1f", border: "1px solid #162035" }}
        >
          <h3
            className="text-sm font-bold text-white mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Behavioral Improvements
          </h3>
          <div className="space-y-4">
            {improvements.map((imp) => (
              <div key={imp.trait}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs" style={{ color: "#7b90ad" }}>{imp.trait}</span>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs"
                      style={{ color: "#526380", fontFamily: "var(--font-mono)" }}
                    >
                      {imp.before}%
                    </span>
                    <span className="text-xs" style={{ color: "#526380" }}>→</span>
                    <span
                      className="text-xs font-bold"
                      style={{ color: imp.color, fontFamily: "var(--font-mono)" }}
                    >
                      {imp.after}%
                    </span>
                  </div>
                </div>
                <div className="relative h-2.5 rounded-full overflow-hidden" style={{ background: "#162035" }}>
                  {/* Before */}
                  <div
                    className="absolute h-full rounded-full opacity-30"
                    style={{ width: `${Math.min(Math.max(imp.before, 0), 100)}%`, background: imp.color }}
                  />
                  {/* After */}
                  <div
                    className="absolute h-full rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(Math.max(imp.after, 0), 100)}%`, background: imp.color }}
                  />
                </div>
                <div className="text-xs mt-1" style={{ color: "#526380" }}>
                  +{imp.after - imp.before} points gained
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Badges */}
      <div
        className="rounded-2xl p-5 sm:p-6"
        style={{ background: "#060d1f", border: "1px solid #162035" }}
      >
        <h3
          className="text-sm font-bold text-white mb-5"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Achievements
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.name}
              className="rounded-xl p-4 text-center transition-all hover:border-blue-500/30"
              style={{
                background: badge.earned ? "rgba(59,130,246,0.06)" : "#0f1629",
                border: badge.earned ? "1px solid rgba(59,130,246,0.2)" : "1px solid #162035",
                opacity: badge.earned ? 1 : 0.5,
              }}
            >
              <div className="text-3xl mb-2" style={{ filter: badge.earned ? "none" : "grayscale(1)" }}>
                {badge.icon}
              </div>
              <div
                className="text-xs font-bold text-white mb-1 leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {badge.name}
              </div>
              <div className="text-xs leading-tight" style={{ color: "#526380" }}>
                {badge.earned ? badge.date : badge.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily challenges */}
      <div
        className="rounded-2xl p-5 sm:p-6"
        style={{ background: "#060d1f", border: "1px solid #162035" }}
      >
        <h3
          className="text-sm font-bold text-white mb-5"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Active Challenges
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {challenges.map((c) => (
            <div
              key={c.title}
              className="rounded-xl p-4"
              style={{
                background: c.progress === 100 ? "rgba(34,197,94,0.06)" : "#0f1629",
                border: c.progress === 100 ? "1px solid rgba(34,197,94,0.2)" : "1px solid #162035",
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <h4
                  className="text-xs font-bold text-white leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {c.title}
                </h4>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-semibold ml-2"
                  style={{
                    background: c.progress === 100 ? "rgba(34,197,94,0.15)" : "rgba(59,130,246,0.15)",
                    color: c.progress === 100 ? "#86efac" : "#60a5fa",
                  }}
                >
                  +{c.xp} XP
                </span>
              </div>
              <p className="text-xs mb-3" style={{ color: "#7b90ad" }}>{c.desc}</p>
              <div className="h-1.5 rounded-full overflow-hidden mb-1" style={{ background: "#162035" }}>
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(Math.max(c.progress, 0), 100)}%`,
                    background: c.progress === 100 ? "#22c55e" : "#3b82f6",
                  }}
                />
              </div>
              <div className="flex justify-between">
                <span className="text-xs" style={{ color: "#526380" }}>
                  {c.progress}%
                </span>
                <span
                  className="text-xs"
                  style={{ color: c.progress === 100 ? "#86efac" : "#526380" }}
                >
                  {c.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}