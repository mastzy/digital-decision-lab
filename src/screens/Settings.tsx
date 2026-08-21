import React, { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [dailyChallenge, setDailyChallenge] = useState(true);
  const [progressEmails, setProgressEmails] = useState(false);
  const [difficulty, setDifficulty] = useState("intermediate");

  function Toggle({
    on,
    onChange,
    label,
  }: {
    on: boolean;
    onChange: (v: boolean) => void;
    label: string;
  }) {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={() => onChange(!on)}
        className="relative rounded-full transition-colors .flex-shrink-0 {
 flex-shrink: 0;
} focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{
          background: on ? "#1d4ed8" : "#1e2d47",
          width: "44px",
          height: "24px",
        }}
      >
        <div
          className="absolute top-0.5 rounded-full transition-all duration-200"
          style={{
            width: "20px",
            height: "20px",
            background: on ? "#ffffff" : "#526380",
            left: on ? "22px" : "2px",
          }}
        />
      </button>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-3xl">
      {/* Profile */}
      <div
        className="rounded-2xl p-5 sm:p-6"
        style={{ background: "#060d1f", border: "1px solid #162035" }}
      >
        <h3
          className="text-sm font-bold text-white mb-5"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Profile
        </h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white .flex-shrink-0 {
 flex-shrink: 0;
}"
            style={{ background: "#1d4ed8" }}
          >
            AR
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-white">Alex Rivera</div>
            <div className="text-xs mt-0.5" style={{ color: "#526380" }}>
              alex.rivera@company.com
            </div>
            <div className="text-xs mt-1" style={{ color: "#3b82f6" }}>
              Level 4 Analyst · Member since July 2026
            </div>
          </div>
          <button
            type="button"
            className="w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-semibold transition-colors hover:bg-[#1f2d47]"
            style={{ background: "#162035", color: "#94a3b8", border: "1px solid #1e2d47" }}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Difficulty */}
      <div
        className="rounded-2xl p-5 sm:p-6"
        style={{ background: "#060d1f", border: "1px solid #162035" }}
      >
        <h3
          className="text-sm font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Simulation Difficulty
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {["beginner", "intermediate", "advanced"].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setDifficulty(level)}
              className="p-4 rounded-xl text-left transition-all hover:border-blue-500/50"
              style={{
                background: difficulty === level ? "rgba(59,130,246,0.1)" : "#0f1629",
                border: `1px solid ${difficulty === level ? "#3b82f6" : "#1e2d47"}`,
              }}
            >
              <div
                className="text-xs font-bold mb-1 capitalize"
                style={{ color: difficulty === level ? "#60a5fa" : "#7b90ad" }}
              >
                {level}
              </div>
              <div className="text-xs" style={{ color: "#526380" }}>
                {level === "beginner"
                  ? "Clear triggers, simple scenarios"
                  : level === "intermediate"
                  ? "Mixed triggers, realistic messages"
                  : "Subtle cues, complex multi-step attacks"}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div
        className="rounded-2xl p-5 sm:p-6"
        style={{ background: "#060d1f", border: "1px solid #162035" }}
      >
        <h3
          className="text-sm font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Notifications
        </h3>
        <div className="space-y-4">
          {[
            {
              label: "Push Notifications",
              desc: "Reminders for daily challenges and streaks",
              value: notifications,
              set: setNotifications,
            },
            {
              label: "Daily Challenge Alerts",
              desc: "Get notified when new challenges are available",
              value: dailyChallenge,
              set: setDailyChallenge,
            },
            {
              label: "Weekly Progress Reports",
              desc: "Email summary of your behavioral improvement",
              value: progressEmails,
              set: setProgressEmails,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-3 border-b last:border-0 gap-4"
              style={{ borderColor: "#162035" }}
            >
              <div>
                <div className="text-sm font-medium text-white">{item.label}</div>
                <div className="text-xs mt-0.5" style={{ color: "#526380" }}>
                  {item.desc}
                </div>
              </div>
              <Toggle on={item.value} onChange={item.set} label={item.label} />
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <div
        className="rounded-2xl p-5 sm:p-6"
        style={{ background: "#060d1f", border: "1px solid #162035" }}
      >
        <h3
          className="text-sm font-bold text-white mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          About Digital Decision Lab
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: "#7b90ad" }}>
          Digital Decision Lab is an interactive behavioral cybersecurity simulation and threat analysis platform built for HackNusa 2026. We believe cybersecurity is not only about recognizing threats — it is about making safer decisions when emotional manipulation (Urgency, Fear, Authority, Greed) is involved[cite: 1].
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-4">
          <span className="text-xs" style={{ color: "#526380" }}>
            Version 1.0.0 (HackNusa 2026 PoC)
          </span>
          <span className="text-xs" style={{ color: "#526380" }}>
            ·
          </span>
          <button type="button" className="text-xs hover:underline" style={{ color: "#3b82f6" }}>
            Privacy Policy
          </button>
          <span className="text-xs" style={{ color: "#526380" }}>
            ·
          </span>
          <button type="button" className="text-xs hover:underline" style={{ color: "#3b82f6" }}>
            Terms of Service
          </button>
        </div>
      </div>
    </div>
  );
}