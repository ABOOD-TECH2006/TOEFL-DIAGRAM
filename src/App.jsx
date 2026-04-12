import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "./components/style/stylee.css";
import { toeflData } from "./data/toeflUnified";
import { Link } from "react-router-dom";

// 🖼️ Import images
import reading1 from "./assets/reading1.jpg";
import reading2 from "./assets/reading2.jpg";
import reading3 from "./assets/reading3.jpg";
import reading4 from "./assets/reading4.jpg";
import reading5 from "./assets/reading5.jpg";
import reading6 from "./assets/reading6.jpg";
import reading7 from "./assets/reading7.jpg";
import reading8 from "./assets/reading8.jpg";
import reading9 from "./assets/reading9.jpg";
import reading10 from "./assets/reading10.jpg";
import reading11 from "./assets/reading11.jpg";
import reading12 from "./assets/reading12.jpg";
import reading13 from "./assets/reading13.jpg";
import reading14 from "./assets/reading14.jpg";
import reading15 from "./assets/reading15.jpg";
import reading16 from "./assets/reading16.jpg";
import reading17 from "./assets/reading17.jpg";
import reading18 from "./assets/reading4.jpg";

import listening1 from "./assets/listening1.jpg";
import listening2 from "./assets/listening2.jpg";
import listening3 from "./assets/listening3.jpg";
import listening4 from "./assets/listening4.jpg";
import listening5 from "./assets/listening5.jpg";
import listening6 from "./assets/listening6.jpg";
import listening7 from "./assets/listening7.jpg";
import listening8 from "./assets/listening8.jpg";
import listening9 from "./assets/listening9.jpg";
import listening10 from "./assets/listening10.jpg";
import listening11 from "./assets/listening11.jpg";
import listening12 from "./assets/listening12.jpg";
import listening13 from "./assets/listening13.jpg";
import listening14 from "./assets/listening14.jpg";

import speaking1 from "./assets/speaking1.jpg";
import speaking2 from "./assets/speaking2.jpg";
import speaking3 from "./assets/speaking3.jpg";
import speaking4 from "./assets/speaking4.jpg";

import writing1 from "./assets/writing1.jpg";
import writing2 from "./assets/writing2.jpg";
import writing3 from "./assets/writing3.jpg";
import writing4 from "./assets/writing4.jpg";
import writing5 from "./assets/writing5.jpg";
import writing6 from "./assets/writing6.jpg";
import writing7 from "./assets/writing7.jpg";
import writing8 from "./assets/writing8.jpg";
import writing9 from "./assets/writing9.jpg";
import writing11 from "./assets/writing11.jpg";
import writing12 from "./assets/writing12.jpg";
import writing13 from "./assets/writing13.jpg";
import writing14 from "./assets/writing14.jpg";
import writing15 from "./assets/writing15.jpg";
import writing16 from "./assets/writing16.jpg";
import writing17 from "./assets/writing17.jpg";
import writing18 from "./assets/writing18.jpg";
import writing19 from "./assets/writing19.jpg";
import writing20 from "./assets/writing20.jpg";

import Loading from "./components/Loading";

// ─── Academic vocabulary list ───────────────────────────────────────────────
const VOCAB_DATA = [
  { word: "Albeit",        type: "conj.",  def: "Although; even though" },
  { word: "Ambiguous",     type: "adj.",   def: "Open to more than one interpretation" },
  { word: "Analogous",     type: "adj.",   def: "Comparable in certain respects" },
  { word: "Anticipate",    type: "verb",   def: "Expect or predict something" },
  { word: "Assumption",    type: "noun",   def: "A thing accepted as true without proof" },
  { word: "Augment",       type: "verb",   def: "Make greater; increase" },
  { word: "Coherent",      type: "adj.",   def: "Logical and consistent" },
  { word: "Comprehend",    type: "verb",   def: "Understand fully" },
  { word: "Consequently",  type: "adv.",   def: "As a result; therefore" },
  { word: "Constitute",    type: "verb",   def: "Be or form a part of something" },
  { word: "Contradict",    type: "verb",   def: "Deny or oppose a statement" },
  { word: "Elaborate",     type: "verb",   def: "Develop or explain in detail" },
  { word: "Empirical",     type: "adj.",   def: "Based on observation or experiment" },
  { word: "Facilitate",    type: "verb",   def: "Make an action easier" },
  { word: "Hypothesis",    type: "noun",   def: "A proposed explanation to be tested" },
  { word: "Implication",   type: "noun",   def: "A conclusion that can be drawn" },
  { word: "Integral",      type: "adj.",   def: "Essential or fundamental" },
  { word: "Mitigate",      type: "verb",   def: "Lessen the severity of something" },
  { word: "Nevertheless",  type: "adv.",   def: "In spite of that; however" },
  { word: "Prevalent",     type: "adj.",   def: "Widespread; common" },
  { word: "Profound",      type: "adj.",   def: "Very great or intense" },
  { word: "Subsequent",    type: "adj.",   def: "Coming after in time or order" },
  { word: "Substantiate",  type: "verb",   def: "Provide evidence to support a claim" },
  { word: "Trivial",       type: "adj.",   def: "Of little importance or value" },
];

// ─── Speaking / Writing templates ───────────────────────────────────────────
const TEMPLATES = [
  {
    id: "t1",
    icon: "🎤",
    title: "Speaking — Task 1 (Independent)",
    sub: "60-second personal response",
    steps: [
      { label: "State position (5s)", text: 'Say "I personally believe / prefer [X] because…"' },
      { label: "Reason 1 + Example (20s)", text: '"First of all, [reason]. For instance, [specific example from personal experience]."' },
      { label: "Reason 2 + Detail (20s)", text: '"Additionally, [reason]. This means that [elaboration]."' },
      { label: "Conclusion (5s)", text: '"For these reasons, I strongly believe [restate position]."' },
    ],
  },
  {
    id: "t2",
    icon: "🎤",
    title: "Speaking — Tasks 2–4 (Integrated)",
    sub: "Reading + Lecture response",
    steps: [
      { label: "Introduce topic (5s)", text: '"The reading/conversation discusses [topic]."' },
      { label: "Reading point (15s)", text: '"According to the reading, [main claim/problem]."' },
      { label: "Lecture point (25s)", text: '"However, the professor explains/argues that [lecture point + detail]."' },
      { label: "Connection (5s)", text: '"This shows that [how they relate — contrast or support]."' },
    ],
  },
  {
    id: "t3",
    icon: "✍️",
    title: "Writing — Integrated Essay",
    sub: "~250 words · 20 minutes",
    steps: [
      { label: "Intro", text: '"The reading argues [X]. However, the professor challenges this by [Y]."' },
      { label: "Body 1", text: '"First, the reading claims [point 1]. The lecture refutes this by stating [counter-point + detail]."' },
      { label: "Body 2", text: '"Second, the reading suggests [point 2]. In contrast, the professor argues [counter-point]."' },
      { label: "Body 3", text: '"Finally, the reading states [point 3]. The professor casts doubt on this by [counter-point]."' },
      { label: "Conclusion (optional)", text: '"In sum, the professor effectively challenges all three claims in the reading."' },
    ],
  },
  {
    id: "t4",
    icon: "✍️",
    title: "Writing — Academic Discussion",
    sub: "~150 words · 10 minutes",
    steps: [
      { label: "Agree/Disagree + Reason", text: '"I agree/disagree with [student name] that [topic] because [your reason]."' },
      { label: "Expand with evidence", text: '"For example, [specific evidence or scenario that supports your view]."' },
      { label: "Address counterpoint", text: '"While [other student]\'s point about [X] is valid, [your rebuttal]."' },
      { label: "Conclude", text: '"Therefore, [restate your position concisely in 1 sentence]."' },
    ],
  },
];

// ─── Section config ──────────────────────────────────────────────────────────
const SECTIONS = [
  {
    key: "Reading",
    icon: "📖",
    title: "Reading Section",
    sub: "3–4 passages · 54–72 min",
    iconBg: "#E6F1FB",
    pillBg: "#E6F1FB",
    pillColor: "#0C447C",
    dotBg: "#E6F1FB",
    dotColor: "#042C53",
    tips: [
      "Skim the passage first to understand the overall structure and main idea before reading questions.",
      "Pay attention to transition words (however, therefore, furthermore) — they signal relationships.",
      "For vocabulary questions, use context clues from surrounding sentences.",
      'The "insert a sentence" question: test the sentence before and after the insertion point.',
      "For summary questions, eliminate answers that are minor details or contradictions.",
    ],
  },
  {
    key: "Listening",
    icon: "🎧",
    title: "Listening Section",
    sub: "3–4 lectures · 41–57 min",
    iconBg: "#E1F5EE",
    pillBg: "#E1F5EE",
    pillColor: "#0F6E56",
    dotBg: "#E1F5EE",
    dotColor: "#085041",
    tips: [
      "Take notes on the main idea, key points, and any examples or contrast the speaker gives.",
      'Listen for the speaker\'s attitude — words like "surprisingly" or "unfortunately" signal tone.',
      "For campus conversations, identify the student's problem and how it gets resolved.",
      'Mark organizational cues: "The first point is…", "In contrast…", "To summarize…"',
      "Don't panic if you miss a word — focus on the overall meaning and flow of the lecture.",
    ],
  },
  {
    key: "Speaking",
    icon: "🎤",
    title: "Speaking Section",
    sub: "4 tasks · 17 min total",
    iconBg: "#FAECE7",
    pillBg: "#FAECE7",
    pillColor: "#993C1D",
    dotBg: "#FAECE7",
    dotColor: "#712B13",
    tips: [
      "Use the preparation time to jot a quick outline — topic, 2 key points, brief conclusion.",
      "Speak at a natural pace — don't rush. Clarity and coherence matter more than speed.",
      "Always use specific examples to support your opinion in Task 1 (independent).",
      "For integrated tasks, summarize both the reading/listening and explain the relationship.",
      'Use discourse markers: "First of all", "Additionally", "To conclude" for fluency.',
    ],
  },
  {
    key: "Writing",
    icon: "✍️",
    title: "Writing Section",
    sub: "2 tasks · 29 min total",
    iconBg: "#EEEDFE",
    pillBg: "#EEEDFE",
    pillColor: "#3C3489",
    dotBg: "#EEEDFE",
    dotColor: "#26215C",
    tips: [
      "Integrated: The lecture always contradicts or qualifies the reading — highlight each cast point.",
      "Never express your own opinion in the integrated essay — only summarize the sources.",
      "Academic Discussion: Be direct, take a clear position, and support it within 10 minutes.",
      "Vary your sentence structure — mix simple, compound, and complex sentences.",
      "Leave 2 minutes to proofread for grammar, spelling, and punctuation errors.",
    ],
  },
];

// ─── Score tracker config ────────────────────────────────────────────────────
const TRACKER_CONFIG = [
  { key: "reading",   label: "Reading",   icon: "📖", iconBg: "#E6F1FB", barColor: "#378ADD", defaultScore: 30 },
  { key: "listening", label: "Listening", icon: "🎧", iconBg: "#E1F5EE", barColor: "#1D9E75", defaultScore: 28 },
  { key: "speaking",  label: "Speaking",  icon: "🎤", iconBg: "#FAECE7", barColor: "#D85A30", defaultScore: 25 },
  { key: "writing",   label: "Writing",   icon: "✍️", iconBg: "#EEEDFE", barColor: "#7F77DD", defaultScore: 27 },
];

// ─── Study timeline ──────────────────────────────────────────────────────────
const TIMELINE = [
  { icon: "📖", title: "Week 1 — Reading & Vocabulary",   desc: "Master passage analysis techniques, build academic vocabulary, practice all question types daily.", tag: "Foundation" },
  { icon: "🎧", title: "Week 2 — Listening & Note-taking", desc: "Develop shorthand notes system, listen to academic lectures, practice summarizing key points.", tag: "Comprehension" },
  { icon: "🎤", title: "Week 3 — Speaking & Writing",      desc: "Practice all 4 speaking tasks, drill integrated and independent writing with timed sessions.", tag: "Production" },
  { icon: "🏁", title: "Week 4 — Full Mock Tests",         desc: "Take complete timed practice tests under real conditions, review every mistake, simulate test day.", tag: "Test Readiness" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function ScoreTracker({ scores, onEdit }) {
  return (
    <div className="tracker-section">
      <p className="section-label">Your score tracker</p>
      <div className="tracker-grid">
        {TRACKER_CONFIG.map((cfg) => {
          const val = scores[cfg.key];
          const pct = Math.round((val / 30) * 100);
          return (
            <div
              className="tracker-card"
              key={cfg.key}
              style={{ "--card-color": cfg.barColor }}
              onClick={() => onEdit(cfg.key)}
            >
              <div className="tracker-card-header">
                <div className="tracker-icon" style={{ background: cfg.iconBg }}>{cfg.icon}</div>
                <span className="tracker-score-badge">{val}/30</span>
              </div>
              <div className="tracker-card-title">{cfg.label}</div>
              <div className="tracker-card-value">{val}</div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${pct}%`, background: cfg.barColor }}
                />
              </div>
              <div className="tracker-target">Target: 30 pts</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScoreEditor({ activeKey, scores, onSave, onClose }) {
  const [draft, setDraft] = useState(scores[activeKey] ?? 0);

  useEffect(() => {
    setDraft(scores[activeKey] ?? 0);
  }, [activeKey, scores]);

  if (!activeKey) return null;
  const cfg = TRACKER_CONFIG.find((c) => c.key === activeKey);

  return (
    <div className="score-editor">
      <p className="score-editor-label">
        Edit score for <strong>{cfg?.label}</strong>
      </p>
      <div className="score-editor-row">
        <input
          type="range"
          min="0"
          max="30"
          step="1"
          value={draft}
          onChange={(e) => setDraft(Number(e.target.value))}
          style={{ flex: 1 }}
        />
        <span className="score-editor-val">{draft}</span>
        <button className="btn-save" onClick={() => onSave(activeKey, draft)}>Save</button>
        <button className="btn-cancel" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}

function SectionCard({ section, imgSrc }) {
  return (
    <div className="section-card">
      <div className="section-card-header">
        <div className="section-header-left">
          <div className="section-icon-wrap" style={{ background: section.iconBg }}>
            {section.icon}
          </div>
          <div>
            <div className="section-title">{section.title}</div>
            <div className="section-subtitle">{section.sub}</div>
          </div>
        </div>
        <span className="section-pill" style={{ background: section.pillBg, color: section.pillColor }}>
          30 pts
        </span>
      </div>
      <div className="tips-list">
        {section.tips.map((tip, i) => (
          <div className="tip-item" key={i} style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="tip-dot" style={{ background: section.dotBg, color: section.dotColor }}>
              {i + 1}
            </div>
            <div className="tip-text">{tip}</div>
          </div>
        ))}
      </div>
      {imgSrc && (
        <div className="section-card-img">
          <img src={imgSrc} alt={`${section.key} illustration`} className="fade-in" />
        </div>
      )}
    </div>
  );
}

function TemplateAccordion({ templates }) {
  const [openId, setOpenId] = useState(null);
  return (
    <div className="templates-list">
      {templates.map((tpl) => (
        <div className="template-card" key={tpl.id}>
          <div
            className="template-header"
            onClick={() => setOpenId(openId === tpl.id ? null : tpl.id)}
          >
            <div className="template-header-left">
              <span className="template-icon">{tpl.icon}</span>
              <div>
                <div className="template-title">{tpl.title}</div>
                <div className="template-sub">{tpl.sub}</div>
              </div>
            </div>
            <div className={`template-toggle ${openId === tpl.id ? "open" : ""}`}>▼</div>
          </div>
          {openId === tpl.id && (
            <div className="template-body open">
              {tpl.steps.map((step, i) => (
                <div className="template-step" key={i}>
                  <div className="step-num">{i + 1}</div>
                  <div className="step-text">
                    <strong>{step.label}:</strong> {step.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function VocabTab() {
  const [query, setQuery] = useState("");
  const filtered = VOCAB_DATA.filter(
    (v) =>
      v.word.toLowerCase().includes(query.toLowerCase()) ||
      v.def.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="vocab-tab">
      <div className="vocab-search-wrap">
        <span className="search-icon">🔍</span>
        <input
          className="vocab-search"
          type="text"
          placeholder="Search academic vocabulary…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="vocab-grid">
        {filtered.map((v) => (
          <div className="vocab-card" key={v.word}>
            <div className="vocab-word">{v.word}</div>
            <div className="vocab-type">{v.type}</div>
            <div className="vocab-def">{v.def}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudyPlanTab() {
  const today = new Date();
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dayOffset = today.getDay() === 0 ? 6 : today.getDay() - 1; // 0 = Mon
  const weekDates = weekDays.map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - dayOffset + i);
    return d;
  });

  return (
    <div className="study-tab">
      <div className="week-card">
        <p className="section-label">This week</p>
        <div className="plan-grid">
          {weekDays.map((day, i) => {
            const d = weekDates[i];
            const isToday = d.toDateString() === today.toDateString();
            const isPast = d < today && !isToday;
            return (
              <div
                key={day}
                className={`day-card ${isToday ? "today" : isPast ? "done" : ""}`}
              >
                <div className="day-label">{day}</div>
                <div className="day-num">{d.getDate()}</div>
                <div className="day-check">{isToday ? "Today" : isPast ? "✓" : "—"}</div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="section-label" style={{ marginTop: 24 }}>4-week study timeline</p>
      <div className="timeline">
        {TIMELINE.map((item, i) => (
          <div className="timeline-item" key={i}>
            <div className="timeline-dot-wrap">
              <div className="timeline-dot">{item.icon}</div>
              {i < TIMELINE.length - 1 && <div className="timeline-line" />}
            </div>
            <div className="timeline-content">
              <div className="timeline-title">{item.title}</div>
              <div className="timeline-desc">{item.desc}</div>
              <span className="timeline-tag">{item.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function ToeflCompanion() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [editKey, setEditKey] = useState(null);
  const [scores, setScores] = useState({
    reading: 30,
    listening: 28,
    speaking: 25,
    writing: 27,
  });

  // Image rotation state
  const sectionImages = {
    Reading:   [reading1, reading2, reading3, reading4, reading5, reading6, reading7, reading8, reading9, reading10, reading11, reading12, reading13, reading14, reading15, reading16, reading17, reading18],
    Listening: [listening1, listening2, listening3, listening4, listening5, listening6, listening7, listening8, listening9, listening10, listening11, listening12, listening13, listening14],
    Speaking:  [speaking1, speaking2, speaking3, speaking4],
    Writing:   [writing1, writing2, writing3, writing4, writing5, writing6, writing7, writing8, writing9, writing11, writing12, writing13, writing14, writing15, writing16, writing17, writing18, writing19, writing20],
  };

  const [currentImageIndex, setCurrentImageIndex] = useState({
    Reading: 0, Listening: 0, Speaking: 0, Writing: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => ({
        Reading:   (prev.Reading   + 1) % sectionImages.Reading.length,
        Listening: (prev.Listening + 1) % sectionImages.Listening.length,
        Speaking:  (prev.Speaking  + 1) % sectionImages.Speaking.length,
        Writing:   (prev.Writing   + 1) % sectionImages.Writing.length,
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSaveScore = (key, val) => {
    setScores((prev) => ({ ...prev, [key]: val }));
    setEditKey(null);
  };

  const handleEditScore = (key) => {
    setEditKey((prev) => (prev === key ? null : key));
  };

  // PDF generation
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("TOEFL Study Plan", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(toeflData.studyMap.intro, 20, 30, { maxWidth: 170 });

    let y = 45;

    toeflData.toeflTips.forEach((section) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${section.section} Section`, 20, y);
      doc.setFont("helvetica", "normal");
      y += 7;
      section.tips.forEach((tip) => {
        const splitTip = doc.splitTextToSize(`- ${tip}`, 170);
        splitTip.forEach((line) => { doc.text(line, 25, y); y += 7; });
      });
      y += 5;
    });

    doc.setFont("helvetica", "bold");
    doc.text("Speaking Template:", 20, y);
    doc.setFont("helvetica", "normal");
    y += 7;
    toeflData.speakingTemplate.forEach((line) => {
      const splitLine = doc.splitTextToSize(`- ${line}`, 170);
      splitLine.forEach((text) => { doc.text(text, 25, y); y += 7; });
    });

    y += 5;
    doc.setFont("helvetica", "bold");
    doc.text("Writing Integrated Template:", 20, y);
    doc.setFont("helvetica", "normal");
    y += 7;
    toeflData.writingIntegratedTemplate.forEach((line) => {
      const splitLine = doc.splitTextToSize(`- ${line}`, 170);
      splitLine.forEach((text) => { doc.text(text, 25, y); y += 7; });
    });

    y += 5;
    doc.setFont("helvetica", "bold");
    doc.text("Writing Independent Template:", 20, y);
    doc.setFont("helvetica", "normal");
    y += 7;
    toeflData.writingIndependentTemplate.forEach((line) => {
      const splitLine = doc.splitTextToSize(`- ${line}`, 170);
      splitLine.forEach((text) => { doc.text(text, 25, y); y += 7; });
    });

    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text("© 2025 TOEFL Companion | Designed to help you achieve your dream score!", 20, y + 10);
    doc.save("TOEFL_Study_Plan.pdf");
  };

  const TABS = [
    { id: "overview",   label: "Overview",    icon: "📋" },
    { id: "study",      label: "Study Plan",  icon: "📅" },
    { id: "templates",  label: "Templates",   icon: "📝" },
    { id: "vocab",      label: "Vocabulary",  icon: "📚" },
  ];

  if (loading) return <Loading />;

  return (
    <div className="app-wrapper-v2">

      {/* ── NAV ── */}
      <nav className="nav-v2">
        <div className="nav-brand">
          <div className="nav-logo">T</div>
          <span className="nav-title">TOEFL Companion</span>
        </div>
        <div className="nav-links">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`nav-link ${activeTab === t.id ? "active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
          <Link to="/vocabs"         className="nav-link">Vocabs</Link>
          <Link to="/Topics"         className="nav-link">Topics</Link>
          <Link to="/AcademicTopics" className="nav-link">Academic</Link>
          <Link to="/pre-suf"        className="nav-link">Prefix/Suffix</Link>
          <Link to="/TOEFLGuide"     className="nav-link">Guide</Link>
        </div>
        <button className="nav-cta" onClick={generatePDF}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
            <path d="M8 2v8M4 7l4 4 4-4M3 12h10" />
          </svg>
          Download PDF
        </button>
      </nav>

      {/* ── HERO ── */}
      <header className="hero-v2">
        <div className="hero-badge">
          <div className="hero-badge-dot" />
          TOEFL iBT Preparation
        </div>
        <h1>
          Master the TOEFL<br />
          with <em>confidence</em>
        </h1>
        <p className="hero-subtitle">
          Your complete guide to structure, strategies, templates, and score tracking — all in one place.
        </p>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-number">4</span>
            <span className="hero-stat-label">Sections covered</span>
          </div>
          <div className="hero-divider" />
          <div className="hero-stat">
            <span className="hero-stat-number">50+</span>
            <span className="hero-stat-label">Expert tips</span>
          </div>
          <div className="hero-divider" />
          <div className="hero-stat">
            <span className="hero-stat-number">120</span>
            <span className="hero-stat-label">Max score</span>
          </div>
        </div>
      </header>

      {/* ── SCORE TRACKER ── */}
      <ScoreTracker scores={scores} onEdit={handleEditScore} />
      {editKey && (
        <div className="score-editor-wrap">
          <ScoreEditor
            activeKey={editKey}
            scores={scores}
            onSave={handleSaveScore}
            onClose={() => setEditKey(null)}
          />
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <main className="content-v2">

        {/* Tab bar */}
        <div className="tabs-v2">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab-v2 ${activeTab === t.id ? "active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              <span className="tab-icon">{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <div className="sections-grid">
            {SECTIONS.map((section) => (
              <SectionCard
                key={section.key}
                section={section}
                imgSrc={sectionImages[section.key][currentImageIndex[section.key]]}
              />
            ))}
          </div>
        )}

        {/* ── STUDY PLAN ── */}
        {activeTab === "study" && <StudyPlanTab />}

        {/* ── TEMPLATES ── */}
        {activeTab === "templates" && <TemplateAccordion templates={TEMPLATES} />}

        {/* ── VOCABULARY ── */}
        {activeTab === "vocab" && <VocabTab />}

      </main>

      {/* ── FOOTER ── */}
      <footer className="footer-v2">
        <p className="footer-text">
          © 2025 <strong>TOEFL Companion</strong> · Built by Abood &amp; Jamal · Designed to help you achieve your dream score 💙
        </p>
      </footer>
    </div>
  );
}