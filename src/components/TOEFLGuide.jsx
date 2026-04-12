import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; background: #f0f5ff; min-height: 100vh; color: #1a1a2e; }

  .tg-hero { background: linear-gradient(135deg, #1855c8 0%, #2563eb 50%, #3b82f6 100%); padding: 48px 32px 36px; text-align: center; position: relative; overflow: hidden; }
  .tg-hero::before, .tg-hero::after { content: ''; position: absolute; border-radius: 50%; background: rgba(255,255,255,.05); }
  .tg-hero::before { width: 320px; height: 320px; top: -100px; left: -80px; }
  .tg-hero::after { width: 240px; height: 240px; bottom: -80px; right: -40px; }
  .tg-hero-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,.15); border: 1px solid rgba(255,255,255,.3); border-radius: 20px; padding: 5px 16px; color: #fff; font-size: 12px; font-weight: 600; letter-spacing: .5px; text-transform: uppercase; margin-bottom: 18px; }
  .tg-hero h1 { color: #fff; font-size: 28px; font-weight: 800; letter-spacing: -.5px; margin-bottom: 10px; position: relative; }
  .tg-hero h1 span { color: #93c5fd; }
  .tg-hero p { color: rgba(255,255,255,.75); font-size: 15px; margin-bottom: 28px; max-width: 600px; margin-left: auto; margin-right: auto; position: relative; }
  .tg-search-wrap { max-width: 480px; margin: 0 auto; }
  .tg-search { width: 100%; padding: 13px 48px 13px 18px; border-radius: 14px; border: none; font-size: 14px; background: rgba(255,255,255,.95); color: #1a1a2e; outline: none; box-shadow: 0 4px 20px rgba(0,0,0,.15); }

  .tg-main { max-width: 1200px; margin: 0 auto; padding: 32px 24px; }
  .tg-heading { font-size: 22px; font-weight: 800; color: #1855c8; margin-bottom: 6px; }
  .tg-subheading { font-size: 14px; color: #6b7280; margin-bottom: 24px; }

  /* Estimator */
  .tg-estimator { background: #fff; border-radius: 18px; border: 1.5px solid #dbeafe; padding: 28px; margin-bottom: 48px; box-shadow: 0 4px 20px rgba(24,85,200,.08); }
  .tg-estim-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 20px; margin-top: 20px; }
  .tg-estim-item label { font-size: 12px; font-weight: 700; color: #1855c8; display: block; margin-bottom: 6px; }
  .tg-estim-item input[type=range] { width: 100%; accent-color: #2563eb; }
  .tg-estim-val { font-size: 20px; font-weight: 800; color: #1855c8; margin-top: 4px; }
  .tg-estim-total { background: linear-gradient(135deg, #1855c8, #3b82f6); border-radius: 14px; padding: 20px 24px; color: #fff; display: flex; align-items: center; justify-content: space-between; margin-top: 20px; flex-wrap: wrap; gap: 12px; }
  .tg-total-label { font-size: 14px; opacity: .85; }
  .tg-total-score { font-size: 32px; font-weight: 900; }
  .tg-band { font-size: 13px; background: rgba(255,255,255,.2); border-radius: 8px; padding: 4px 12px; font-weight: 600; }

  /* Section cards */
  .tg-sections-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 22px; margin-bottom: 48px; }
  .tg-section-card { background: #fff; border-radius: 18px; border: 1.5px solid #dbeafe; box-shadow: 0 4px 20px rgba(24,85,200,.08); transition: all .25s; overflow: hidden; }
  .tg-section-card:hover { transform: translateY(-5px); box-shadow: 0 12px 36px rgba(24,85,200,.15); border-color: #93c5fd; }
  .tg-color-bar { height: 5px; width: 100%; }
  .tg-card-inner { padding: 22px 20px 18px; }
  .tg-card-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 14px; }
  .tg-meta { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
  .tg-meta-pill { background: #eff6ff; color: #2563eb; border-radius: 8px; padding: 3px 10px; font-size: 11px; font-weight: 700; }
  .tg-card-title { font-size: 17px; font-weight: 800; color: #1855c8; margin-bottom: 8px; }
  .tg-card-desc { font-size: 13px; color: #374151; line-height: 1.6; margin-bottom: 16px; }

  /* Bars */
  .tg-bars { margin-bottom: 16px; }
  .tg-bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .tg-bar-label { font-size: 11px; font-weight: 600; color: #374151; width: 80px; flex-shrink: 0; }
  .tg-bar-track { flex: 1; background: #dbeafe; border-radius: 6px; height: 8px; overflow: hidden; }
  .tg-bar-fill { height: 100%; border-radius: 6px; background: linear-gradient(90deg, #1855c8, #3b82f6); transition: width .6s cubic-bezier(.4,0,.2,1); }
  .tg-bar-num { font-size: 11px; font-weight: 700; color: #1855c8; width: 28px; text-align: right; flex-shrink: 0; }

  .tg-toggle-btn { width: 100%; padding: 9px; border-radius: 10px; border: 1.5px solid #dbeafe; background: #f8faff; color: #1855c8; font-size: 13px; font-weight: 600; cursor: pointer; transition: all .2s; text-align: center; }
  .tg-toggle-btn:hover, .tg-toggle-btn.open { background: #eff6ff; border-color: #93c5fd; }

  .tg-q-list { margin-top: 12px; }
  .tg-q-item { border-radius: 10px; border: 1px solid #dbeafe; margin-bottom: 8px; overflow: hidden; background: #f8faff; }
  .tg-q-header { padding: 10px 14px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 13px; font-weight: 600; color: #374151; transition: background .15s; }
  .tg-q-header:hover { background: #eff6ff; }
  .tg-q-explain { padding: 0 14px; overflow: hidden; max-height: 0; transition: max-height .2s ease, padding .2s; }
  .tg-q-explain.open { max-height: 120px; padding: 0 14px 10px; }
  .tg-q-explain p { font-size: 12px; color: #374151; line-height: 1.6; background: #eff6ff; border-radius: 8px; padding: 8px 10px; margin-top: 4px; }
  .tg-tips { margin-top: 14px; background: #eff6ff; border-left: 3px solid #3b82f6; border-radius: 0 10px 10px 0; padding: 10px 13px; font-size: 12px; color: #2563eb; font-weight: 500; }
  .tg-tips-label { font-weight: 800; color: #1855c8; margin-right: 5px; }

  /* Motivation */
  .tg-motiv-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; margin-bottom: 48px; }
  .tg-motiv-card { background: #fff; border-radius: 14px; border: 1.5px solid #dbeafe; padding: 22px 20px; transition: all .25s; position: relative; overflow: hidden; }
  .tg-motiv-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(24,85,200,.12); border-color: #93c5fd; }
  .tg-motiv-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #1855c8, #3b82f6); }
  .tg-motiv-quote { font-size: 14px; color: #374151; line-height: 1.65; margin-bottom: 12px; font-style: italic; }
  .tg-motiv-author { font-size: 11px; color: #93c5fd; font-weight: 700; text-transform: uppercase; letter-spacing: .5px; }

  /* Advice */
  .tg-advice-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; margin-bottom: 48px; }
  .tg-advice-card { background: linear-gradient(135deg, #1855c8, #2563eb); border-radius: 14px; padding: 22px 20px; color: #fff; transition: all .25s; cursor: default; }
  .tg-advice-card:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 12px 36px rgba(24,85,200,.3); }
  .tg-advice-icon { font-size: 26px; margin-bottom: 10px; }
  .tg-advice-title { font-size: 14px; font-weight: 800; margin-bottom: 8px; }
  .tg-advice-msg { font-size: 12px; opacity: .85; line-height: 1.6; }

  .tg-no-results { text-align: center; padding: 60px 20px; color: #9ca3af; }

  .tg-footer { background: #fff; border-top: 1px solid #dbeafe; text-align: center; padding: 20px; color: #6b7280; font-size: 13px; }
  .tg-footer .brand { color: #1855c8; font-weight: 700; }
`;

const SECTIONS = [
  {
    id: "reading", icon: "📖", color: "linear-gradient(90deg,#1855c8,#3b82f6)", bg: "#eff6ff",
    time: "35 min", questions: "20 questions", title: "Reading Section",
    desc: "2 academic passages (~700 words each). Tests comprehension, inference, vocabulary, and detail understanding.",
    types: [
      { name: "Vocabulary questions", exp: "Identify meanings of words or phrases in context." },
      { name: "Inference questions", exp: "Deduce information not directly stated but implied." },
      { name: "Main idea questions", exp: "Determine the central concept or purpose of the passage." },
      { name: "Reference & detail questions", exp: "Locate specific information and connect it to meaning." },
    ],
    tips: "Read for main ideas first, then scan for details. Skim the first paragraph quickly.",
    bars: [{ label: "Vocab", v: 25 }, { label: "Inference", v: 20 }, { label: "Main idea", v: 30 }, { label: "Detail", v: 25 }],
  },
  {
    id: "listening", icon: "🎧", color: "linear-gradient(90deg,#0f766e,#0d9488)", bg: "#f0fdfa",
    time: "36 min", questions: "28–39 questions", title: "Listening Section",
    desc: "Lectures and conversations about academic topics. Tests main ideas, details, and implied meanings.",
    types: [
      { name: "Main idea & detail", exp: "Identify the central theme and supporting information in audio." },
      { name: "Function & attitude", exp: "Recognize tone, intent, and the speaker's attitude or purpose." },
      { name: "Inference questions", exp: "Understand implied meanings and logical conclusions." },
      { name: "Organization questions", exp: "Identify how the lecture or conversation is structured logically." },
    ],
    tips: "Take short notes and focus on transitions. Recognize tone and speaker attitude.",
    bars: [{ label: "Main idea", v: 28 }, { label: "Function", v: 22 }, { label: "Inference", v: 30 }, { label: "Org.", v: 20 }],
  },
  {
    id: "speaking", icon: "🎤", color: "linear-gradient(90deg,#9333ea,#a855f7)", bg: "#faf5ff",
    time: "16 min", questions: "4 tasks", title: "Speaking Section",
    desc: "Express opinions and summarize reading/listening materials. Record answers in 45–60 seconds.",
    types: [
      { name: "Independent speaking task", exp: "Express personal opinions on a familiar topic within 45 seconds." },
      { name: "Integrated R+L task", exp: "Read a short passage, listen to a talk, and summarize both." },
      { name: "Integrated L+S task", exp: "Listen to a conversation or lecture and respond orally." },
      { name: "Campus situation task", exp: "Comment on student life or university situations in short dialogues." },
    ],
    tips: "Use template: intro → 2 supports → example → conclusion. Practice every day!",
    bars: [{ label: "Independent", v: 25 }, { label: "R+L integ.", v: 28 }, { label: "L+S integ.", v: 28 }, { label: "Campus", v: 19 }],
  },
  {
    id: "writing", icon: "✍️", color: "linear-gradient(90deg,#d97706,#f59e0b)", bg: "#fffbeb",
    time: "29 min", questions: "2 tasks", title: "Writing Section",
    desc: "Two essays: one summarizing reading/listening content, and one giving your personal opinion on a topic.",
    types: [
      { name: "Integrated writing (R+L+W)", exp: "Read and listen to materials, then summarize the relationship between them." },
      { name: "Independent essay task", exp: "Write an essay expressing your viewpoint on a familiar issue." },
    ],
    tips: "Plan before writing. Aim for clear structure, coherent paragraphs, and strong examples.",
    bars: [{ label: "Integrated", v: 50 }, { label: "Independent", v: 50 }],
  },
];

const MOTIVATIONS = [
  { quote: "Every section mastered brings you one step closer to your dream university.", author: "ETS Mentor" },
  { quote: "Your TOEFL score opens doors to over 11,000 universities worldwide!", author: "Global Education Board" },
  { quote: "Study with persistence. Real success comes from consistency, not intensity.", author: "Language Expert" },
  { quote: "The TOEFL is not just a test — it is a passport to global opportunity.", author: "Scholar Abroad" },
];

const ADVICES = [
  { icon: "🎯", title: "Focus on Skills, Not Tricks", msg: "Develop real academic English — reading, listening, writing. Skills outlast shortcuts every time." },
  { icon: "🕐", title: "Time Management is Key", msg: "Practice with timers. Learn to read quickly, think clearly, and speak within the limit." },
  { icon: "📖", title: "Integrate Your Practice", msg: "Combine all four skills daily. TOEFL rewards the ability to connect reading, listening, and writing." },
  { icon: "💬", title: "Speak Every Day", msg: "Don't memorize — communicate naturally. Record yourself, listen back, and refine." },
];

export default function TOEFLGuide() {
  const [query, setQuery] = useState("");
  const [openSection, setOpenSection] = useState(null);
  const [openQuestion, setOpenQuestion] = useState({});
  const [scores, setScores] = useState({ r: 22, l: 20, s: 18, w: 19 });

  useEffect(() => {
    if (!document.getElementById("tg-styles")) {
      const style = document.createElement("style");
      style.id = "tg-styles";
      style.innerHTML = styles;
      document.head.appendChild(style);
    }
  }, []);

  const total = scores.r + scores.l + scores.s + scores.w;
  const band = total >= 100 ? "Advanced" : total >= 80 ? "Upper-Intermediate" : total >= 60 ? "Intermediate" : "Foundation";

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
    setOpenQuestion({});
  };

  const toggleQuestion = (sectionId, index) => {
    setOpenQuestion((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId] === index ? null : index,
    }));
  };

  const filteredSections = SECTIONS.filter((s) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return s.title.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q);
  });

  return (
    <>
      <Helmet>
        <title>ABOOD | TOEFL Guide</title>
        <meta name="description" content="TOEFL Mastery Guide" />
      </Helmet>

      <div className="tg-hero">
        <div className="tg-hero-badge">🧠 Official TOEFL Overview</div>
        <h1>TOEFL <span>Mastery Hub</span></h1>
        <p>Get acquainted with every section in minutes — strategies, question types, and expert advice.</p>
        <div className="tg-search-wrap">
          <input
            className="tg-search"
            type="text"
            placeholder="🔍  Search sections, question types..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="tg-main">

        {/* Score Estimator */}
        <div className="tg-estimator">
          <div className="tg-heading" style={{ fontSize: 17 }}>🎯 Score Estimator</div>
          <div className="tg-subheading" style={{ marginBottom: 0 }}>Drag sliders to estimate your current TOEFL total score</div>
          <div className="tg-estim-grid">
            {[
              { key: "r", label: "Reading (0–30)" },
              { key: "l", label: "Listening (0–30)" },
              { key: "s", label: "Speaking (0–30)" },
              { key: "w", label: "Writing (0–30)" },
            ].map(({ key, label }) => (
              <div key={key} className="tg-estim-item">
                <label>{label}</label>
                <input
                  type="range" min="0" max="30"
                  value={scores[key]}
                  onChange={(e) => setScores((prev) => ({ ...prev, [key]: +e.target.value }))}
                />
                <div className="tg-estim-val">{scores[key]}</div>
              </div>
            ))}
          </div>
          <div className="tg-estim-total">
            <div>
              <div className="tg-total-label">Estimated Total Score</div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>TOEFL iBT (0–120)</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="tg-total-score">{total}</div>
              <div className="tg-band">{band}</div>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="tg-heading">📚 Section Breakdown</div>
        <div className="tg-subheading">Click any section to explore question types and expert tips</div>

        {filteredSections.length === 0 ? (
          <div className="tg-no-results">🔎 No sections found. Try a different search.</div>
        ) : (
          <div className="tg-sections-grid">
            {filteredSections.map((s) => (
              <div key={s.id} className="tg-section-card">
                <div className="tg-color-bar" style={{ background: s.color }} />
                <div className="tg-card-inner">
                  <div className="tg-card-icon" style={{ background: s.bg }}>{s.icon}</div>
                  <div className="tg-meta">
                    <span className="tg-meta-pill">⏱ {s.time}</span>
                    <span className="tg-meta-pill">📝 {s.questions}</span>
                  </div>
                  <div className="tg-card-title">{s.title}</div>
                  <div className="tg-card-desc">{s.desc}</div>
                  <div className="tg-bars">
                    {s.bars.map((b) => (
                      <div key={b.label} className="tg-bar-row">
                        <span className="tg-bar-label">{b.label}</span>
                        <div className="tg-bar-track">
                          <div className="tg-bar-fill" style={{ width: `${b.v}%` }} />
                        </div>
                        <span className="tg-bar-num">{b.v}%</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className={`tg-toggle-btn${openSection === s.id ? " open" : ""}`}
                    onClick={() => toggleSection(s.id)}
                  >
                    {openSection === s.id ? "▼ Hide Question Types" : "▶ Show Question Types"}
                  </button>

                  {openSection === s.id && (
                    <div className="tg-q-list">
                      {s.types.map((t, i) => (
                        <div key={i} className="tg-q-item">
                          <div className="tg-q-header" onClick={() => toggleQuestion(s.id, i)}>
                            <span>🧩 {t.name}</span>
                            <span>{openQuestion[s.id] === i ? "▲" : "▶"}</span>
                          </div>
                          <div className={`tg-q-explain${openQuestion[s.id] === i ? " open" : ""}`}>
                            <p>{t.exp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="tg-tips">
                    <span className="tg-tips-label">💡 Tip:</span>{s.tips}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Motivation */}
        <div className="tg-heading">🌟 Motivation Corner</div>
        <div className="tg-subheading">Stay inspired throughout your TOEFL journey</div>
        <div className="tg-motiv-grid">
          {MOTIVATIONS.map((m, i) => (
            <div key={i} className="tg-motiv-card">
              <div className="tg-motiv-quote">"{m.quote}"</div>
              <div className="tg-motiv-author">— {m.author}</div>
            </div>
          ))}
        </div>

        {/* Advice */}
        <div className="tg-heading">💬 Expert Advice</div>
        <div className="tg-subheading">Strategies from top TOEFL mentors</div>
        <div className="tg-advice-grid">
          {ADVICES.map((a, i) => (
            <div key={i} className="tg-advice-card">
              <div className="tg-advice-icon">{a.icon}</div>
              <div className="tg-advice-title">{a.title}</div>
              <div className="tg-advice-msg">{a.msg}</div>
            </div>
          ))}
        </div>

      </div>

      <footer className="tg-footer">
        <p>© 2025 <span className="brand">ABOOD | JAMAL</span> — Consistency beats intensity. Study smart!</p>
      </footer>
    </>
  );
}