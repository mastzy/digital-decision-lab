import React, { useState } from "react";

type Phase = "scenario" | "feedback" | "complete";

export interface ScenarioChoice {
  label: string;
  safe: boolean;
  explanation: string;
}

export interface Scenario {
  id: number;
  trigger: "Urgency" | "Fear" | "Authority" | "Greed";
  triggerColor: string;
  sender: string;
  avatar: string;
  time: string;
  platform: "whatsapp" | "email";
  subject?: string;
  message: string;
  choices: ScenarioChoice[];
  riskyFeedback: string;
  safeFeedback: string;
}

const scenarios: Scenario[] = [
  {
    id: 1,
    trigger: "Urgency",
    triggerColor: "#ef4444",
    sender: "Rian",
    avatar: "R",
    time: "11:42 AM",
    platform: "whatsapp",
    message:
      "Hi, this is Rian. My phone is broken. I urgently need Rp500,000 for emergency doctor fees. Please transfer it to this account now. I'll pay you back tomorrow.",
    choices: [
      { label: "Transfer the money immediately", safe: false, explanation: "You acted under urgency without verifying the sender's identity." },
      { label: "Call the person directly via phone call", safe: true, explanation: "Excellent! Calling directly confirms identity before taking financial action." },
      { label: "Ask for identity verification via voice message", safe: true, explanation: "Smart move — always verify before transferring money." },
      { label: "Ignore or block the unverified contact", safe: true, explanation: "Safe choice. Ignoring unverified urgent requests protects you." },
    ],
    riskyFeedback: "You acted under urgency without verifying identity. Scammers exploit urgency and broken phone stories to prevent callback verification.",
    safeFeedback: "Great instinct! Verifying identity through an alternate channel is the correct response to urgency-based manipulation.",
  },
  {
    id: 2,
    trigger: "Fear",
    triggerColor: "#f59e0b",
    sender: "BRI Alert System",
    avatar: "B",
    time: "2:15 PM",
    platform: "email",
    subject: "⚠️ PERINGATAN: Akun Anda Dibekukan Sementara",
    message:
      "Kami mendeteksi aktivitas mencurigakan pada rekening Anda. Klik tautan berikut segera untuk memulihkan akses, atau rekening Anda akan ditutup permanen dalam 2 jam: http://bri-secure-login.xyz/restore",
    choices: [
      { label: "Click the link immediately to restore access", safe: false, explanation: "The link leads to a phishing site. Real banks never send login links like this." },
      { label: "Call the official bank phone number directly", safe: true, explanation: "Perfect — always use official contact numbers for banking issues." },
      { label: "Check account status via official BRI Mobile App", safe: true, explanation: "Correct! Official mobile apps show real status, not unverified emails." },
      { label: "Forward message to friends/family for advice", safe: false, explanation: "Forwarding phishing links can spread the threat to others." },
    ],
    riskyFeedback: "This message uses fear of account loss and artificial time pressure. The URL 'bri-secure-login.xyz' is a fake domain.",
    safeFeedback: "Well done! You recognized that fear-based threats combined with unofficial URLs are classic phishing patterns.",
  },
  {
    id: 3,
    trigger: "Authority",
    triggerColor: "#a78bfa",
    sender: "IT Security Dept",
    avatar: "IT",
    time: "9:03 AM",
    platform: "email",
    subject: "MANDATORY: Account Credentials Security Check",
    message:
      "Hello, this is Michael from IT Security. We detected a security breach on your account. I need your current password immediately so we can patch your access. This is mandatory — please reply within 10 minutes.",
    choices: [
      { label: "Share your password immediately", safe: false, explanation: "IT staff never need your password — this is a critical red flag." },
      { label: "Ask for employee ID and ticket reference first", safe: true, explanation: "Smart — always verify authority claims through official directories." },
      { label: "Call IT directly through official internal directory", safe: true, explanation: "Correct! Verify using known internal contact info, not theirs." },
      { label: "Comply without question because it's IT Dept", safe: false, explanation: "Legitimate IT teams never ask for raw passwords via email or message." },
    ],
    riskyFeedback: "Authority manipulation is highly effective. Real IT departments use official ticketing systems and never request user passwords.",
    safeFeedback: "Excellent! Recognizing authority impersonation is a vital skill. Always verify credentials through independent channels.",
  },
  {
    id: 4,
    trigger: "Greed",
    triggerColor: "#fbbf24",
    sender: "Promo Festival 2026",
    avatar: "🎁",
    time: "4:30 PM",
    platform: "whatsapp",
    message:
      "Selamat! Nomor WhatsApp Anda terpilih mendapatkan Grand Prize Voucher Belanja Rp10.000.000! Klaim sekarang dengan mengisi data KTP & nomor rekening di: http://promo-klaim-hadiah.win",
    choices: [
      { label: "Fill in personal & banking details to claim", safe: false, explanation: "Sharing sensitive data for prizes leads to identity theft." },
      { label: "Inspect the link and report as spam", safe: true, explanation: "Great job! Unsolicited prize claims asking for bank info are fraud." },
      { label: "Pay the small 'admin fee' to release prize", safe: false, explanation: "Legitimate prizes never ask for advance payments or admin fees." },
      { label: "Delete the message immediately", safe: true, explanation: "Safe choice. Free rewards requiring credentials are greed-trap phishing." },
    ],
    riskyFeedback: "You fell for greed manipulation. Scammers use unrealistically generous offers to trick victims into giving away banking credentials.",
    safeFeedback: "Outstanding! You resisted the temptation of unexpected prizes and identified the credential-harvesting trap.",
  },
];

export default function PhishSim() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("scenario");
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);

  const scenario = scenarios[scenarioIndex];
  const progress = (scenarioIndex / scenarios.length) * 100;

  function handleChoice(choiceIndex: number) {
    const choice = scenario.choices[choiceIndex];
    setSelectedChoice(choiceIndex);
    setPhase("feedback");
    if (choice.safe) setScore((s) => s + 25);
    setResults((r) => [...r, choice.safe]);
  }

  function handleNext() {
    if (scenarioIndex < scenarios.length - 1) {
      setScenarioIndex((i) => i + 1);
      setPhase("scenario");
      setSelectedChoice(null);
    } else {
      setPhase("complete");
    }
  }

  const isSafe = selectedChoice !== null && scenario.choices[selectedChoice].safe;

  if (phase === "complete") {
    const passed = results.filter(Boolean).length;
    return (
      <div className="p-4 sm:p-8 flex items-center justify-center min-h-full">
        <div
          className="rounded-2xl p-6 sm:p-10 text-center max-w-lg w-full"
          style={{ background: "#060d1f", border: "1px solid #162035" }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
            style={{ background: passed >= 3 ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)" }}
          >
            {passed >= 3 ? "🛡️" : "⚠️"}
          </div>
          <h2
            className="text-2xl font-bold text-white mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Simulation Complete
          </h2>
          <p className="text-sm mb-6" style={{ color: "#7b90ad" }}>
            You answered {passed} out of {scenarios.length} scenarios correctly
          </p>
          <div
            className="text-4xl font-bold mb-6"
            style={{ color: passed >= 3 ? "#22c55e" : "#ef4444", fontFamily: "var(--font-display)" }}
          >
            {score} pts
          </div>
          <button
            type="button"
            onClick={() => {
              setScenarioIndex(0);
              setPhase("scenario");
              setSelectedChoice(null);
              setScore(0);
              setResults([]);
            }}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:bg-blue-600"
            style={{ background: "#1d4ed8" }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Progress header */}
      <div
        className="rounded-2xl p-5 sm:p-6"
        style={{ background: "#060d1f", border: "1px solid #162035" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <span className="text-xs font-medium" style={{ color: "#526380" }}>
              Scenario {scenarioIndex + 1} of {scenarios.length}
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ background: "#0f1629" }}
            >
              <span className="text-xs" style={{ color: "#526380" }}>Score</span>
              <span
                className="text-sm font-bold"
                style={{ color: "#60a5fa", fontFamily: "var(--font-mono)" }}
              >
                {score}
              </span>
            </div>
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{
                background: `${scenario.triggerColor}15`,
                border: `1px solid ${scenario.triggerColor}30`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: scenario.triggerColor }}
              />
              <span
                className="text-xs font-semibold"
                style={{ color: scenario.triggerColor }}
              >
                Trigger: {scenario.trigger}
              </span>
            </div>
          </div>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#162035" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: "#3b82f6" }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Message card */}
        <div className="lg:col-span-7">
          <div
            className="rounded-2xl p-5 sm:p-6"
            style={{ background: "#060d1f", border: "1px solid #162035" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: "#22c55e" }}
              />
              <span className="text-xs font-medium capitalize" style={{ color: "#526380" }}>
                {scenario.platform === "whatsapp" ? "WhatsApp Simulation" : "Email Inbox Simulation"}
              </span>
            </div>

            {/* Platform UI Simulation */}
            <div
              className="rounded-xl overflow-hidden"
              style={{ background: scenario.platform === "whatsapp" ? "#111b21" : "#0f172a" }}
            >
              {/* Header */}
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{ background: scenario.platform === "whatsapp" ? "#202c33" : "#1e293b" }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white .flex-shrink-0 {
 flex-shrink: 0;
}"
                  style={{ background: scenario.platform === "whatsapp" ? "#1d4ed8" : "#0284c7" }}
                >
                  {scenario.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">
                    {scenario.sender}
                  </div>
                  <div className="text-xs" style={{ color: "#8696a0" }}>
                    {scenario.platform === "whatsapp" ? "online" : "to: me@company.com"}
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="px-4 py-6 min-h-40">
                {scenario.subject && (
                  <div className="text-xs font-bold text-blue-400 mb-2 border-b border-slate-700 pb-2">
                    Subject: {scenario.subject}
                  </div>
                )}
                <div className="flex justify-start">
                  <div
                    className="max-w-md px-4 py-3 rounded-xl rounded-tl-none text-sm text-white leading-relaxed"
                    style={{ background: scenario.platform === "whatsapp" ? "#202c33" : "#1e293b" }}
                  >
                    {scenario.message}
                    <div className="text-right mt-2">
                      <span className="text-xs" style={{ color: "#8696a0" }}>
                        {scenario.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trigger explanation */}
            <div
              className="mt-4 flex items-start gap-3 px-4 py-3 rounded-xl"
              style={{
                background: `${scenario.triggerColor}08`,
                border: `1px solid ${scenario.triggerColor}25`,
              }}
            >
              <span className="text-base .flex-shrink-0 {
 flex-shrink: 0;
}" role="img" aria-label="lightbulb">💡</span>
              <div>
                <div
                  className="text-xs font-semibold mb-0.5"
                  style={{ color: scenario.triggerColor }}
                >
                  Emotional Trigger Detected: {scenario.trigger}
                </div>
                <div className="text-xs" style={{ color: "#7b90ad" }}>
                  Notice how this message creates{" "}
                  {scenario.trigger === "Urgency"
                    ? "time pressure to force a hasty decision"
                    : scenario.trigger === "Fear"
                    ? "anxiety about losing something important"
                    : scenario.trigger === "Authority"
                    ? "deference to a perceived authority figure"
                    : "excitement over unexpected financial gains"}
                  .
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action panel */}
        <div className="lg:col-span-5 space-y-4">
          <div
            className="rounded-2xl p-5 sm:p-6"
            style={{ background: "#060d1f", border: "1px solid #162035" }}
          >
            <h3
              className="text-base font-bold text-white mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What would you do?
            </h3>
            <p className="text-xs mb-5" style={{ color: "#526380" }}>
              Choose your response carefully. Think before acting.
            </p>

            <div className="space-y-3">
              {scenario.choices.map((choice, i) => {
                const isSelected = selectedChoice === i;
                const showResult = phase === "feedback";

                let borderColor = "#1e2d47";
                let bg = "transparent";
                let textColor = "#94a3b8";

                if (showResult && isSelected) {
                  if (choice.safe) {
                    borderColor = "#22c55e";
                    bg = "rgba(34,197,94,0.08)";
                    textColor = "#86efac";
                  } else {
                    borderColor = "#ef4444";
                    bg = "rgba(239,68,68,0.08)";
                    textColor = "#fca5a5";
                  }
                } else if (showResult && !isSelected && choice.safe) {
                  borderColor = "#22c55e40";
                  textColor = "#4ade8080";
                }

                return (
                  <button
                    key={i}
                    type="button"
                    disabled={phase === "feedback"}
                    onClick={() => handleChoice(i)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 hover:border-blue-500/50"
                    style={{
                      border: `1px solid ${borderColor}`,
                      background: bg,
                      opacity: phase === "feedback" && !isSelected && !choice.safe ? 0.4 : 1,
                      cursor: phase === "feedback" ? "default" : "pointer",
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold .flex-shrink-0 {
 flex-shrink: 0;
}"
                      style={{ background: "#162035", color: "#7b90ad" }}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className="text-sm font-medium flex-1" style={{ color: textColor }}>
                      {choice.label}
                    </span>
                    {showResult && isSelected && (
                      <span className="ml-auto text-base .flex-shrink-0 {
 flex-shrink: 0;
}">
                        {choice.safe ? "✓" : "✗"}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback panel */}
          {phase === "feedback" && (
            <div
              className="rounded-2xl p-5 sm:p-6"
              style={{
                background: isSafe ? "rgba(34,197,94,0.06)" : "rgba(239,68,68,0.06)",
                border: `1px solid ${isSafe ? "#22c55e30" : "#ef444430"}`,
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{isSafe ? "✅" : "⚠️"}</span>
                <h4
                  className="text-sm font-bold"
                  style={{ color: isSafe ? "#86efac" : "#fca5a5", fontFamily: "var(--font-display)" }}
                >
                  {isSafe ? "Safe Decision!" : "Risky Decision"}
                </h4>
              </div>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "#94a3b8" }}>
                {isSafe ? scenario.safeFeedback : scenario.riskyFeedback}
              </p>
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:bg-blue-600"
                style={{ background: "#1d4ed8" }}
              >
                {scenarioIndex < scenarios.length - 1
                  ? "Continue to Next Scenario →"
                  : "View Final Results →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}