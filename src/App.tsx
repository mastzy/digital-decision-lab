import React, { useState } from "react";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import PhishSim from "./screens/PhishSim";
import BehavioralProfile from "./screens/BehavioralProfile";
import PhishShield from "./screens/PhishShield";
import LearningProgress from "./screens/LearningProgress";
import Settings from "./screens/Settings";

export type Screen =
  | "dashboard"
  | "phishsim"
  | "profile"
  | "phishshield"
  | "learning"
  | "settings";

const navItems: { id: Screen; label: string; icon: string; badge?: number }[] =
  [
    { id: "dashboard", label: "Dashboard", icon: "⬡" },
    { id: "phishsim", label: "PhishSim", icon: "◎", badge: 3 },
    { id: "profile", label: "Behavioral Profile", icon: "◈" },
    { id: "phishshield", label: "PhishShield", icon: "◆" },
    { id: "learning", label: "Learning Progress", icon: "◐" },
  ];

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [active, setActive] = useState<Screen>("dashboard");

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  const screenMap: Record<Screen, React.ReactNode> = {
    dashboard: <Dashboard onNavigate={setActive} />,
    phishsim: <PhishSim />,
    profile: <BehavioralProfile onNavigate={setActive} />,
    phishshield: <PhishShield />,
    learning: <LearningProgress />,
    settings: <Settings />,
  };

  return (
    <div
      className="flex flex-col lg:flex-row h-screen w-full overflow-hidden"
      style={{ fontFamily: "var(--font-body)", background: "#0f1629" }}
    >
      {/* Sidebar Desktop (Tampil pada layar lg) */}
      <aside
        className="hidden lg:flex flex-col w-64 .flex-shrink-0 {
 flex-shrink: 0;
} border-r"
        style={{
          background: "#060d1f",
          borderColor: "#162035",
        }}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b" style={{ borderColor: "#162035" }}>
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center .flex-shrink-0 {
 flex-shrink: 0;
}"
              style={{ background: "#3b82f6" }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9 1L16 4.5V9C16 13 12.5 16.5 9 17C5.5 16.5 2 13 2 9V4.5L9 1Z"
                  fill="white"
                  fillOpacity="0.15"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <path
                  d="M6 9L8 11L12 7"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div
                className="text-sm font-bold leading-tight text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Digital Decision
              </div>
              <div
                className="text-xs font-semibold leading-tight"
                style={{
                  color: "#3b82f6",
                  fontFamily: "var(--font-display)",
                }}
              >
                Lab
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 @media (hover: hover) {
 .hover\:bg-\[\#162035\]\/60:hover {
 background-color: color-mix(in oklab, #162035 60%, transparent);
 }
}"
                style={{
                  background: isActive ? "#162035" : "transparent",
                  borderLeft: isActive
                    ? "2px solid #3b82f6"
                    : "2px solid transparent",
                }}
              >
                <span
                  className="text-base"
                  style={{ color: isActive ? "#60a5fa" : "#526380" }}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <span
                  className="text-sm font-medium flex-1"
                  style={{ color: isActive ? "#e2e8f0" : "#7b90ad" }}
                >
                  {item.label}
                </span>
                {item.badge && (
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
                    style={{
                      background: "#1d4ed8",
                      color: "#93c5fd",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Bottom (Settings & User Profile) */}
        <div className="px-3 pb-4 space-y-1 border-t pt-3" style={{ borderColor: "#162035" }}>
          <button
            type="button"
            onClick={() => setActive("settings")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 @media (hover: hover) {
 .hover\:bg-\[\#162035\]\/60:hover {
 background-color: color-mix(in oklab, #162035 60%, transparent);
 }
}"
            style={{
              background: active === "settings" ? "#162035" : "transparent",
              borderLeft:
                active === "settings"
                  ? "2px solid #3b82f6"
                  : "2px solid transparent",
            }}
          >
            <span
              className="text-base"
              style={{
                color: active === "settings" ? "#60a5fa" : "#526380",
              }}
              aria-hidden="true"
            >
              ⚙
            </span>
            <span
              className="text-sm font-medium"
              style={{
                color: active === "settings" ? "#e2e8f0" : "#7b90ad",
              }}
            >
              Settings
            </span>
          </button>

          {/* User Profile Card */}
          <div
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg mt-2 justify-between"
            style={{ background: "#0f1629" }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white .flex-shrink-0 {
 flex-shrink: 0;
}"
                style={{ background: "#1d4ed8" }}
              >
                AR
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white truncate">
                  Alex Rivera
                </div>
                <div className="text-xs" style={{ color: "#526380" }}>
                  Level 4 · Analyst
                </div>
              </div>
            </div>
            <button
              type="button"
              title="Logout"
              onClick={() => setLoggedIn(false)}
              className="text-xs text-slate-500 hover:text-red-400 p-1 transition-colors"
              aria-label="Log out"
            >
              ✕
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header
          className="flex items-center justify-between px-4 lg:px-8 py-3 lg:py-4 border-b .flex-shrink-0 {
 flex-shrink: 0;
}"
          style={{ borderColor: "#162035", background: "#060d1f" }}
        >
          <div className="flex items-center gap-3">
            {/* Logo Singkat Mobile */}
            <div className="lg:hidden w-7 h-7 rounded-md flex items-center justify-center bg-blue-600">
              <span className="text-xs font-bold text-white">D</span>
            </div>
            <div>
              <h1
                className="text-base lg:text-lg font-bold text-white capitalize"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {navItems.find((n) => n.id === active)?.label ??
                  active.charAt(0).toUpperCase() + active.slice(1)}
              </h1>
              <p className="text-[10px] lg:text-xs" style={{ color: "#526380" }}>
                Friday, August 21, 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            {/* Streak */}
            <div
              className="flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-3 py-1 lg:py-1.5 rounded-lg"
              style={{ background: "#162035" }}
            >
              <span className="text-xs lg:text-sm" role="img" aria-label="streak fire">🔥</span>
              <span className="text-xs font-semibold" style={{ color: "#fcd34d" }}>
                5-day streak
              </span>
            </div>

            {/* Overall Score */}
            <div
              className="flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-3 py-1 lg:py-1.5 rounded-lg"
              style={{ background: "#162035" }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "#22c55e" }}
              />
              <span
                className="text-xs font-semibold"
                style={{ color: "#86efac", fontFamily: "var(--font-mono)" }}
              >
                78/100
              </span>
            </div>

            {/* Notification bell */}
            <button
              type="button"
              aria-label="Notifications"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors @media (hover: hover) {
 .hover\:bg-\[\#162035\]\/60:hover {
 background-color: color-mix(in oklab, #162035 60%, transparent);
 }
}"
              style={{ background: "#162035", color: "#7b90ad" }}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path
                  d="M7.5 1C7.5 1 4 3 4 8v2l-1 1v1h9v-1l-1-1V8c0-5-3.5-7-3.5-7Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M6 12.5C6 13.3 6.7 14 7.5 14s1.5-.7 1.5-1.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <circle cx="10" cy="3.5" r="2" fill="#ef4444" />
              </svg>
            </button>
          </div>
        </header>

        {/* Screen Content */}
        <div className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          {screenMap[active]}
        </div>
      </main>

      {/* Bottom Navigation Bar Mobile (Hanya Tampil pada Layar HP) */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around py-2 px-2 border-t backdrop-blur-lg"
        style={{ background: "rgba(6, 13, 31, 0.95)", borderColor: "#162035" }}
      >
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              className="flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors"
              style={{ color: isActive ? "#60a5fa" : "#526380" }}
            >
              <span className="text-lg leading-none">{item.icon}</span>
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setActive("settings")}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors"
          style={{ color: active === "settings" ? "#60a5fa" : "#526380" }}
        >
          <span className="text-lg leading-none">⚙</span>
          <span className="text-[10px] mt-1 font-medium">Settings</span>
        </button>
      </nav>
    </div>
  );
}