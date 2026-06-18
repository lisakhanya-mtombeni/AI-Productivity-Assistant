import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard,
  Mail,
  FileText,
  ListChecks,
  Search,
  MessageSquare,
  Clock,
  Zap,
  Shield,
  Send,
  AlertTriangle,
  Flower2,
  Sparkles,
} from "lucide-react";

function Blossoms() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      <Flower2 className="absolute -top-6 -right-4 text-pink-300/10" size={220} strokeWidth={1} />
      <Flower2 className="absolute top-1/3 -left-10 text-rose-300/[0.06]" size={180} strokeWidth={1} />
      <Flower2 className="absolute bottom-8 right-10 text-pink-200/10" size={140} strokeWidth={1} />
      <Flower2 className="absolute bottom-1/3 left-1/2 text-fuchsia-300/[0.05]" size={110} strokeWidth={1} />
    </div>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Workly AI by CAPACITI" },
      { name: "description", content: "Your AI workplace assistant — emails, notes, tasks, research, and chat in one workspace." },
    ],
  }),
  component: WorklyApp,
});

type View = "dashboard" | "email" | "notes" | "tasks" | "research" | "chat";
type Tone = "Formal" | "Friendly" | "Persuasive";

const EMAIL_TEXT: Record<Tone, string> = {
  Formal: `Subject: Urgent Update: 24-Hour Schedule Adjustment for Data Analysis Report

Dear Sarah,

I am writing to formally inform you of a brief delay regarding the final data analysis report. Due to an unexpected system outage during the final compilation phase, we are currently experiencing a temporary processing halt.

Our technical team is actively resolving the issue, and we are working diligently to finalize the dataset. Consequently, the submission timeline will be adjusted by 24 hours. We are fully confident that the revised deadline will be met without further complications.

Thank you for your patience and understanding. Please let me know if you require any interim data points in the meantime.

Kind regards,

[Your Name]`,
  Friendly: `Subject: Quick heads-up: Brief delay on the data analysis report!

Hi Sarah,

Hope your day is going well! Quick heads-up regarding the final data analysis report—our systems hit an unexpected snag and suffered a minor outage right while we were compiling everything.

The team is already all over it and working hard to get everything back on track. We'll need about an extra 24 hours to cross the finish line, but we'll absolutely hit that new mark.

Thanks so much for understanding, and sorry for the slight hiccup! Let me know if you have any questions.

Best,

[Your Name]`,
  Persuasive: `Subject: Exclusive Invitation: Optimizing Your Workflow with Workly AI

Dear Mr. Ndlovu,

It was a pleasure having you join our digital transformation webinar last week. I noticed your keen interest in our workflow automation segments, and I am confident your team can see immediate efficiency gains by implementing these practices.

To help you get started, I would love to invite you to a complimentary, 15-minute strategy consultation. During this brief session, we will look directly at your current operational bottlenecks and map out a tailored roadmap to accelerate your team's output.

Spaces are highly limited for this week's consultation block. Please let me know if you are available for a quick sync on Tuesday at 10:00 AM, or feel free to suggest an alternative time.

Warm regards,

[Your Name]`,
};

const NOTES_TEXT = `📋 Meeting Summary: Q3 Project Alignment Sync

Executive Summary:

The core frontend framework for the dashboard is finalized, with the data pipeline migration tracking at 80% stability. Operational focus has shifted entirely to unblocking dependency bottlenecks and securing pre-launch clearances to protect the targeted July 1st deployment deadline.

Action Items & Deadlines:

• Lerato: Compile, polish, and distribute the complete backend API documentation. (Deadline: This Friday, COB)

• Omphile: Coordinate and execute the final compliance and security audit on the data pipeline. (Priority: High)

• Sipho: Secure a dedicated system penetration testing window immediately upon receipt of Lerato's API docs.

Critical Decisions & Risk Factors:

• Timeline at Risk: The July 1st deployment schedule remains highly sensitive to any scheduling friction or delivery delays regarding the API documentation or the pending security audit.`;

const TASKS_TEXT = `🗂️ Strategic Task Prioritization Board (Eisenhower Framework)

🔥 Quadrant 1: Urgent & Critical (Do Immediately)

• Stakeholder Presentation Slides: Finalize slide assets for tomorrow's executive presentation.

📅 Quadrant 2: Strategic Focus (Schedule & Plan)

• Legal Compliance Framework Review: Conduct in-depth analysis of legal software frameworks.

⚡ Quadrant 3: Operational Adjustments (Move Fast)

• Urgent Client Email Response: Draft clarification points regarding service access.

• Server Password Rotation: Execute mandatory access security updates.

🌱 Quadrant 4: Administrative / Low Triage (Minimize/Postpone)

• Weekly Team Feedback Drafting: Compile internal notes for distribution.`;

const RESEARCH_TEXT = `🔍 Executive Brief: Regulatory Data Privacy Compliance & Infrastructure Impacts

Core Overview:

Modern data privacy regulations have fundamentally shifted corporate cybersecurity from an insular IT concern to an enterprise-wide legal and operational directive. Compliance frameworks now dictate data architecture baselines, requiring structural adjustments to access control, retention, and storage.

Key Strategic Impact Pillars:

• Structural Decentralization: Compliance protocols heavily incentivize minimizing data footprint size, forcing networks to isolate or completely destroy legacy, non-essential user tracking metrics.

• Zero-Trust Access Architecture: Modern frameworks necessitate strict identity monitoring, shifting boundaries from perimeter security to granular, individual database access tokens.

💡 Strategic Recommendations:

1. Implement automated data purging cycles to automatically drop data past its retention threshold.

2. Transition current access permissions to a role-based access control (RBAC) structure.`;

const CHAT_REPLY = `Take a breath—I completely get it. When everything hits the fan at once, trying to fix it all will just burn you out. Let's regain control of your day by stripping away the noise. Give me the single most critical item that will cause immediate issues if it isn't finished by 17:00 today. We will focus 100% of our energy on getting that done first.`;

const NAV: { id: View; label: string; icon: typeof Mail }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "email", label: "Email Generator", icon: Mail },
  { id: "notes", label: "Notes Summarizer", icon: FileText },
  { id: "tasks", label: "Task Planner", icon: ListChecks },
  { id: "research", label: "Research Assistant", icon: Search },
  { id: "chat", label: "AI Chat", icon: MessageSquare },
];

function WorklyApp() {
  const [currentView, setCurrentView] = useState<View>("dashboard");

  return (
    <div className="flex min-h-screen bg-[#0d0e12] text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 fixed inset-y-0 left-0 bg-[#090a0f] border-r border-white/5 flex flex-col">
        <div className="px-6 pt-7 pb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            Workly AI
          </h1>
          <p className="text-xs text-slate-500 mt-1">by CAPACITI</p>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {NAV.map(({ id, label, icon: Icon }) => {
            const active = currentView === id;
            return (
              <button
                key={id}
                onClick={() => setCurrentView(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  active
                    ? "bg-gradient-to-r from-orange-500/20 to-pink-600/20 text-white border border-orange-500/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            );
          })}
        </nav>
        <div className="px-6 py-5 text-[10px] tracking-widest text-slate-600 font-semibold">
          POWERED BY CAPACITI
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 flex-1 flex flex-col">
        <div className="sticky top-0 z-10 px-8 pt-5 pb-3 bg-[#0d0e12]/95 backdrop-blur">
          <div className="inline-flex items-center gap-2 bg-[#221314] text-[#ff8082] border border-[#3d1d1f] px-4 py-2 rounded-full text-xs font-medium">
            <AlertTriangle size={14} />
            AI-generated content may require human review.
          </div>
        </div>

        <div className="px-8 pb-12 pt-4 flex-1">
          {currentView === "dashboard" && <Dashboard onNav={setCurrentView} />}
          {currentView === "email" && <EmailView />}
          {currentView === "notes" && <NotesView />}
          {currentView === "tasks" && <TasksView />}
          {currentView === "research" && <ResearchView />}
          {currentView === "chat" && <ChatView />}
        </div>
      </main>
    </div>
  );
}

function Dashboard({ onNav }: { onNav: (v: View) => void }) {
  const metrics = [
    { icon: Clock, value: "8.5h", label: "Hours saved per week" },
    { icon: Zap, value: "12x", label: "Faster response time" },
    { icon: Shield, value: "100%", label: "Editable & private" },
  ];
  const tools: { id: View; title: string; desc: string; icon: typeof Mail }[] = [
    { id: "email", title: "Email Generator", desc: "Draft polished emails in any tone.", icon: Mail },
    { id: "notes", title: "Notes Summarizer", desc: "Turn raw meeting notes into action items.", icon: FileText },
    { id: "tasks", title: "Task Planner", desc: "Auto-prioritize your day with the Eisenhower matrix.", icon: ListChecks },
  ];
  return (
    <div className="max-w-6xl mx-auto">
      <section className="py-10">
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
          Your AI workplace assistant.
        </h2>
        <p className="mt-5 text-lg text-slate-400 max-w-2xl">
          Automate emails, summarize meetings, plan your week, and research smarter — all from one beautifully simple workspace.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => onNav("email")}
            className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-orange-500 to-pink-600 text-white hover:opacity-90 transition"
          >
            Start with Email →
          </button>
          <button
            onClick={() => onNav("chat")}
            className="px-6 py-3 rounded-lg font-semibold border border-white/15 text-slate-200 hover:bg-white/5 transition"
          >
            Open AI Chat
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {metrics.map(({ icon: Icon, value, label }) => (
          <div key={label} className="bg-[#16171d] border border-white/5 rounded-2xl p-6">
            <Icon className="text-orange-400" size={22} />
            <div className="mt-4 text-3xl font-bold">{value}</div>
            <div className="text-sm text-slate-400 mt-1">{label}</div>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <h3 className="text-xl font-semibold mb-4">Productivity tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tools.map(({ id, title, desc, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onNav(id)}
              className="text-left bg-[#16171d] border border-white/5 rounded-2xl p-6 hover:border-orange-500/40 hover:bg-[#1a1b22] transition group"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500/20 to-pink-600/20 flex items-center justify-center mb-4">
                <Icon className="text-orange-400" size={20} />
              </div>
              <div className="font-semibold text-lg">{title}</div>
              <div className="text-sm text-slate-400 mt-1">{desc}</div>
              <div className="mt-4 text-sm text-orange-400 opacity-0 group-hover:opacity-100 transition">
                Open →
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-slate-400 mt-1">{subtitle}</p>
    </div>
  );
}

function Editable({ html, placeholder }: { html: string; placeholder?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.innerText = html;
  }, [html]);
  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      className="whitespace-pre-wrap text-slate-200 text-sm leading-relaxed outline-none min-h-[300px] focus:ring-2 focus:ring-orange-500/30 rounded-md p-1"
      data-placeholder={placeholder}
    />
  );
}

function EmailView() {
  const [tone, setTone] = useState<Tone>("Formal");
  const [output, setOutput] = useState("");
  return (
    <div className="max-w-6xl mx-auto">
      <SectionHeader title="Smart Email Generator" subtitle="Draft a professional email in seconds." />
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-[#16171d] border border-white/5 rounded-2xl p-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-300">What is this email about?</label>
            <textarea
              placeholder="Describe your email context..."
              rows={5}
              className="mt-2 w-full bg-[#0d0e12] border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-orange-500/50"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Recipient / Context</label>
            <input
              placeholder="e.g., Sarah (Project Manager)"
              className="mt-2 w-full bg-[#0d0e12] border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-orange-500/50"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Select Tone</label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {(["Formal", "Friendly", "Persuasive"] as Tone[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`py-2.5 rounded-lg text-sm font-medium transition ${
                    tone === t
                      ? "bg-gradient-to-r from-orange-500 to-pink-600 text-white"
                      : "bg-[#0d0e12] border border-white/10 text-slate-300 hover:border-white/20"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setOutput(EMAIL_TEXT[tone])}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold rounded-lg hover:opacity-90"
          >
            Generate Professional Email
          </button>
        </div>
        <div className="bg-[#16171d] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Generated Draft</h3>
            <span className="text-xs text-slate-500">Editable</span>
          </div>
          <Editable html={output} placeholder="Your draft will appear here..." />
        </div>
      </div>
    </div>
  );
}

function GenericTool({
  title,
  subtitle,
  inputLabel,
  buttonLabel,
  outputTitle,
  outputText,
}: {
  title: string;
  subtitle: string;
  inputLabel: string;
  buttonLabel: string;
  outputTitle: string;
  outputText: string;
}) {
  const [output, setOutput] = useState("");
  return (
    <div className="max-w-6xl mx-auto">
      <SectionHeader title={title} subtitle={subtitle} />
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-[#16171d] border border-white/5 rounded-2xl p-6 space-y-5">
          <label className="text-sm font-medium text-slate-300">{inputLabel}</label>
          <textarea
            rows={12}
            className="w-full bg-[#0d0e12] border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-orange-500/50"
          />
          <button
            onClick={() => setOutput(outputText)}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold rounded-lg hover:opacity-90"
          >
            {buttonLabel}
          </button>
        </div>
        <div className="bg-[#16171d] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">{outputTitle}</h3>
            <span className="text-xs text-slate-500">Editable</span>
          </div>
          <Editable html={output} />
        </div>
      </div>
    </div>
  );
}

function NotesView() {
  return (
    <GenericTool
      title="Meeting Notes Summarizer"
      subtitle="Paste your raw notes and extract action items instantly."
      inputLabel="Paste your meeting notes"
      buttonLabel="Summarize & Extract Action Items"
      outputTitle="Summary"
      outputText={NOTES_TEXT}
    />
  );
}

function TasksView() {
  return (
    <GenericTool
      title="AI Task Planner"
      subtitle="Sort your checklist into a strategic priority matrix."
      inputLabel="Paste a quick checklist"
      buttonLabel="Optimize & Sort Priority Matrix"
      outputTitle="Priority Matrix"
      outputText={TASKS_TEXT}
    />
  );
}

function ResearchView() {
  const [output, setOutput] = useState("");
  return (
    <div className="max-w-6xl mx-auto">
      <SectionHeader title="AI Research Assistant" subtitle="Compile executive-ready briefs in one click." />
      <div className="bg-[#16171d] border border-white/5 rounded-2xl p-6 space-y-4 mb-6">
        <label className="text-sm font-medium text-slate-300">Enter research topic or URL</label>
        <div className="flex gap-3">
          <input
            placeholder="e.g., data privacy compliance"
            className="flex-1 bg-[#0d0e12] border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-orange-500/50"
          />
          <button
            onClick={() => setOutput(RESEARCH_TEXT)}
            className="px-6 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold rounded-lg hover:opacity-90"
          >
            Compile Research Brief
          </button>
        </div>
      </div>
      <div className="bg-[#16171d] border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Research Brief</h3>
          <span className="text-xs text-slate-500">Editable</span>
        </div>
        <Editable html={output} />
      </div>
    </div>
  );
}

type Msg = { role: "user" | "ai" | "loading"; text: string };

function ChatView() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }, { role: "loading", text: "" }]);
    setTimeout(() => {
      setMessages((m) => [...m.filter((x) => x.role !== "loading"), { role: "ai", text: CHAT_REPLY }]);
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-180px)]">
      <SectionHeader title="AI Chat" subtitle="Talk through your workload with Workly AI." />
      <div ref={scrollRef} className="flex-1 bg-[#16171d] border border-white/5 rounded-2xl p-6 overflow-y-auto space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-slate-500 mt-20 text-sm">Start a conversation with Workly AI.</div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "user" && (
              <div className="bg-white/10 text-slate-100 px-4 py-3 rounded-2xl rounded-br-sm max-w-[75%] text-sm">{m.text}</div>
            )}
            {m.role === "ai" && (
              <div className="bg-gradient-to-br from-orange-500/15 to-pink-600/15 border border-orange-500/20 text-slate-100 px-4 py-3 rounded-2xl rounded-bl-sm max-w-[80%] text-sm leading-relaxed">
                <div className="text-xs font-semibold text-orange-400 mb-1">Workly AI</div>
                {m.text}
              </div>
            )}
            {m.role === "loading" && (
              <div className="bg-white/5 px-4 py-3 rounded-2xl text-sm text-slate-400 flex gap-1">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={send} className="mt-4 flex gap-3 sticky bottom-0">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-[#16171d] border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-orange-500/50"
        />
        <button
          type="submit"
          className="px-5 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-lg hover:opacity-90 flex items-center gap-2"
        >
          <Send size={16} /> Send
        </button>
      </form>
    </div>
  );
}
