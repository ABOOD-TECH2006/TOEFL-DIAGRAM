import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; background: #f0f5ff; color: #1a1a2e; min-height: 100vh; }

  .sp-header { background: linear-gradient(135deg, #1855c8, #2563eb 55%, #3b82f6); padding: 36px 28px 28px; position: relative; overflow: hidden; }
  .sp-header::before { content: ''; position: absolute; top: -80px; right: -80px; width: 300px; height: 300px; border-radius: 50%; background: rgba(255,255,255,.05); }
  .sp-header h1 { color: #fff; font-size: 22px; font-weight: 800; margin-bottom: 6px; position: relative; }
  .sp-header p { color: rgba(255,255,255,.72); font-size: 13px; margin-bottom: 20px; position: relative; }

  .sp-overview { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; position: relative; }
  .sp-ov-card { background: rgba(255,255,255,.15); border: 1px solid rgba(255,255,255,.22); border-radius: 12px; padding: 12px 18px; color: #fff; min-width: 120px; backdrop-filter: blur(6px); }
  .sp-ov-num { font-size: 24px; font-weight: 900; line-height: 1; }
  .sp-ov-label { font-size: 11px; opacity: .75; margin-top: 3px; font-weight: 500; }

  .sp-controls { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; position: relative; }
  .sp-ctrl-group { display: flex; align-items: center; gap: 7px; }
  .sp-ctrl-label { color: rgba(255,255,255,.8); font-size: 12px; font-weight: 600; }
  .sp-ctrl-select { padding: 7px 12px; border-radius: 9px; border: 1.5px solid rgba(255,255,255,.3); background: rgba(255,255,255,.12); color: #fff; font-size: 13px; outline: none; cursor: pointer; }
  .sp-ctrl-select option { color: #1a1a2e; background: #fff; }
  .sp-btn { padding: 8px 16px; border-radius: 9px; border: none; font-size: 13px; font-weight: 700; cursor: pointer; transition: all .2s; }
  .sp-btn-primary { background: #fff; color: #1855c8; }
  .sp-btn-primary:hover { background: #dbeafe; transform: translateY(-1px); }
  .sp-btn-success { background: #0f9d58; color: #fff; }
  .sp-btn-success:hover { background: #0d8a4e; transform: translateY(-1px); }
  .sp-btn-ghost { background: transparent; border: 1.5px solid rgba(255,255,255,.4); color: #fff; }
  .sp-btn-ghost:hover { background: rgba(255,255,255,.1); }

  .sp-layout { display: flex; min-height: calc(100vh - 260px); }

  .sp-sidebar { width: 200px; flex-shrink: 0; background: #fff; border-right: 1px solid #dbeafe; padding: 16px 12px; overflow-y: auto; }
  .sp-sidebar-title { font-size: 11px; font-weight: 800; color: #9ca3af; text-transform: uppercase; letter-spacing: .8px; margin-bottom: 12px; padding: 0 4px; }
  .sp-week-item { border-radius: 10px; padding: 10px 12px; cursor: pointer; margin-bottom: 6px; transition: all .2s; border: 1.5px solid transparent; }
  .sp-week-item:hover { background: #eff6ff; border-color: #dbeafe; }
  .sp-week-item.active { background: linear-gradient(135deg, #eff6ff, #dbeafe); border-color: #93c5fd; box-shadow: 0 2px 10px rgba(24,85,200,.1); }
  .sp-week-num { font-weight: 800; font-size: 13px; color: #1855c8; }
  .sp-week-bar { width: 100%; height: 4px; background: #dbeafe; border-radius: 3px; margin-top: 6px; overflow: hidden; }
  .sp-week-fill { height: 100%; background: linear-gradient(90deg, #1855c8, #3b82f6); border-radius: 3px; transition: width .4s; }
  .sp-week-frac { font-size: 11px; color: #9ca3af; margin-top: 3px; }

  .sp-content { flex: 1; padding: 20px 24px; overflow-y: auto; }
  .sp-content-title { font-size: 18px; font-weight: 800; color: #1855c8; }
  .sp-content-sub { font-size: 13px; color: #6b7280; margin-top: 2px; margin-bottom: 20px; }

  .sp-chips { display: flex; gap: 7px; margin-bottom: 20px; flex-wrap: wrap; }
  .sp-chip { padding: 6px 14px; border-radius: 20px; border: 1.5px solid #dbeafe; background: #fff; color: #374151; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .18s; }
  .sp-chip.active, .sp-chip:hover { background: #1855c8; color: #fff; border-color: #1855c8; }

  .sp-days-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }

  .sp-day-card { background: #fff; border-radius: 14px; border: 1.5px solid #dbeafe; box-shadow: 0 2px 12px rgba(24,85,200,.06); transition: all .22s; overflow: hidden; }
  .sp-day-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(24,85,200,.12); border-color: #93c5fd; }
  .sp-day-card.done { background: #f0fdf4; border-color: #86efac; }
  .sp-day-card.done .sp-day-title { color: #0f9d58; }
  .sp-top-bar { height: 4px; width: 100%; }
  .sp-day-head { padding: 14px 16px 10px; display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
  .sp-day-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .7px; color: #9ca3af; margin-bottom: 3px; }
  .sp-day-title { font-size: 13px; font-weight: 700; color: #1855c8; line-height: 1.3; }
  .sp-day-id { font-size: 10px; color: #d1d5db; margin-top: 3px; font-family: monospace; }
  .sp-done-btn { flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%; border: 2px solid #dbeafe; background: #f8faff; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px; transition: all .2s; }
  .sp-done-btn:hover { border-color: #93c5fd; background: #eff6ff; transform: scale(1.1); }
  .sp-day-card.done .sp-done-btn { background: #dcfce7; border-color: #86efac; color: #0f9d58; }
  .sp-tasks { padding: 0 16px 14px; }
  .sp-task { display: flex; align-items: flex-start; gap: 7px; padding: 5px 0; border-bottom: 1px solid #f0f5ff; font-size: 12px; color: #374151; line-height: 1.4; }
  .sp-task:last-child { border-bottom: none; }
  .sp-task-dot { width: 6px; height: 6px; border-radius: 50%; background: #3b82f6; flex-shrink: 0; margin-top: 5px; }
  .sp-day-card.done .sp-task-dot { background: #0f9d58; }

  .sp-empty { text-align: center; padding: 60px 20px; color: #9ca3af; }

  .sp-footer { background: #fff; border-top: 1px solid #dbeafe; text-align: center; padding: 18px; color: #6b7280; font-size: 13px; }
  .sp-footer .brand { color: #1855c8; font-weight: 700; }

  @media (max-width: 700px) {
    .sp-layout { flex-direction: column; }
    .sp-sidebar { width: 100%; display: flex; gap: 8px; overflow-x: auto; padding: 12px; border-right: none; border-bottom: 1px solid #dbeafe; }
    .sp-week-item { min-width: 100px; flex-shrink: 0; }
  }
`;

const TOPICS = [
  {
    label: "Grammar & Core Vocabulary", icon: "📝",
    color: "linear-gradient(90deg,#1855c8,#3b82f6)",
    tasks: ["30 min: Grammar review", "20 min: Learn 12 academic words", "20 min: Quick reading passage"],
  },
  {
    label: "Reading: Main Idea & Details", icon: "📖",
    color: "linear-gradient(90deg,#0f766e,#0d9488)",
    tasks: ["1 full academic reading passage", "Identify main idea + key details", "10 min error review"],
  },
  {
    label: "Listening: Lectures & Talks", icon: "🎧",
    color: "linear-gradient(90deg,#7c3aed,#8b5cf6)",
    tasks: ["1 lecture + summarize notes", "Practice active note-taking", "10 comprehension questions"],
  },
  {
    label: "Speaking: Independent Tasks", icon: "🎤",
    color: "linear-gradient(90deg,#b45309,#d97706)",
    tasks: ["4 recorded responses (45 sec each)", "Template: intro → 2 supports → conclusion", "Listen back and timestamp weak spots"],
  },
  {
    label: "Writing: Integrated Task", icon: "✍️",
    color: "linear-gradient(90deg,#be185d,#ec4899)",
    tasks: ["Integrated writing (read + listen + write 20 min)", "Independent essay (30 min)", "Revise structure and transitions"],
  },
  {
    label: "Full Timed Section Practice", icon: "⏱️",
    color: "linear-gradient(90deg,#0369a1,#0ea5e9)",
    tasks: ["Full timed section (choose one skill)", "Review every mistake carefully", "10 min vocabulary review"],
  },
  {
    label: "Review & Rest Day", icon: "🔄",
    color: "linear-gradient(90deg,#374151,#6b7280)",
    tasks: ["Review error log from the week", "Light practice on weakest skill", "Active recall + rest"],
  },
];

function generatePlan() {
  const today = new Date();
  return Array.from({ length: 8 }, (_, w) => ({
    weekNumber: w + 1,
    days: Array.from({ length: 7 }, (_, d) => {
      const t = TOPICS[d % TOPICS.length];
      const date = new Date(today);
      date.setDate(today.getDate() + w * 7 + d);
      return {
        id: `w${w + 1}d${d + 1}`,
        week: w + 1,
        dayOfWeek: date.toLocaleDateString("en-US", { weekday: "short" }),
        dateString: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        title: t.label,
        icon: t.icon,
        color: t.color,
        tasks: t.tasks,
        completed: false,
      };
    }),
  }));
}

export default function StudyPlan() {
  const [plan, setPlan] = useState(() => {
    try {
      const raw = localStorage.getItem("toeflPlan_v3");
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return generatePlan();
  });

  const [selectedWeek, setSelectedWeek] = useState(1);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!document.getElementById("sp-styles")) {
      const style = document.createElement("style");
      style.id = "sp-styles";
      style.innerHTML = styles;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    try { localStorage.setItem("toeflPlan_v3", JSON.stringify(plan)); } catch (e) {}
  }, [plan]);

  const allDays = plan.flatMap((w) => w.days);
  const doneDays = allDays.filter((d) => d.completed).length;
  const totalDays = allDays.length;
  const pct = Math.round((doneDays / totalDays) * 100);

  const computeStreak = () => {
    let streak = 0;
    for (let i = allDays.length - 1; i >= 0; i--) {
      if (allDays[i].completed) streak++;
      else break;
    }
    return streak;
  };

  const currentWeek = plan.find((w) => w.weekNumber === selectedWeek) || plan[0];

  const filteredDays = currentWeek.days.filter((d) => {
    if (filter === "done") return d.completed;
    if (filter === "pending") return !d.completed;
    return true;
  });

  const toggleDay = (id) => {
    setPlan(plan.map((w) => ({
      ...w,
      days: w.days.map((d) => d.id === id ? { ...d, completed: !d.completed } : d),
    })));
  };

  const markWeekDone = () => {
    setPlan(plan.map((w) =>
      w.weekNumber === selectedWeek
        ? { ...w, days: w.days.map((d) => ({ ...d, completed: true })) }
        : w
    ));
  };

  const resetAll = () => {
    if (window.confirm("Reset all progress?")) setPlan(generatePlan());
  };

  const exportJSON = () => {
    const a = document.createElement("a");
    a.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(plan, null, 2));
    a.download = `toefl-plan-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <>
      <Helmet>
        <title>ABOOD | Study Plan</title>
        <meta name="description" content="TOEFL 8-Week Study Plan" />
      </Helmet>

      <div className="sp-header">
        <h1>📅 TOEFL 8-Week Study Plan</h1>
        <p>Personalized daily plan with progress tracking — starting from today</p>

        <div className="sp-overview">
          <div className="sp-ov-card"><div className="sp-ov-num">{doneDays}</div><div className="sp-ov-label">Days Done</div></div>
          <div className="sp-ov-card"><div className="sp-ov-num">{pct}%</div><div className="sp-ov-label">Progress</div></div>
          <div className="sp-ov-card"><div className="sp-ov-num">{computeStreak()}</div><div className="sp-ov-label">Day Streak</div></div>
          <div className="sp-ov-card"><div className="sp-ov-num">{totalDays - doneDays}</div><div className="sp-ov-label">Days Left</div></div>
        </div>

        <div className="sp-controls">
          <div className="sp-ctrl-group">
            <span className="sp-ctrl-label">Week:</span>
            <select
              className="sp-ctrl-select"
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(+e.target.value)}
            >
              {plan.map((w) => (
                <option key={w.weekNumber} value={w.weekNumber}>Week {w.weekNumber}</option>
              ))}
            </select>
          </div>
          <button className="sp-btn sp-btn-primary" onClick={markWeekDone}>✓ Mark Week Done</button>
          <button className="sp-btn sp-btn-success" onClick={exportJSON}>⬇ Export JSON</button>
          <button className="sp-btn sp-btn-ghost" onClick={resetAll}>↺ Reset</button>
        </div>
      </div>

      <div className="sp-layout">
        {/* Sidebar */}
        <div className="sp-sidebar">
          <div className="sp-sidebar-title">8 Weeks</div>
          {plan.map((w) => {
            const done = w.days.filter((d) => d.completed).length;
            const p = Math.round((done / w.days.length) * 100);
            return (
              <div
                key={w.weekNumber}
                className={`sp-week-item${w.weekNumber === selectedWeek ? " active" : ""}`}
                onClick={() => setSelectedWeek(w.weekNumber)}
              >
                <div className="sp-week-num">Week {w.weekNumber}</div>
                <div className="sp-week-bar"><div className="sp-week-fill" style={{ width: `${p}%` }} /></div>
                <div className="sp-week-frac">{done}/{w.days.length} days</div>
              </div>
            );
          })}
        </div>

        {/* Content */}
        <div className="sp-content">
          <div className="sp-content-title">Week {currentWeek.weekNumber} — Daily Plan</div>
          <div className="sp-content-sub">
            {currentWeek.days.filter((d) => d.completed).length} of {currentWeek.days.length} days completed
          </div>

          <div className="sp-chips">
            {[
              { key: "all", label: "All Days" },
              { key: "pending", label: "⏳ Pending" },
              { key: "done", label: "✅ Completed" },
            ].map(({ key, label }) => (
              <div
                key={key}
                className={`sp-chip${filter === key ? " active" : ""}`}
                onClick={() => setFilter(key)}
              >
                {label}
              </div>
            ))}
          </div>

          {filteredDays.length === 0 ? (
            <div className="sp-empty">
              <div style={{ fontSize: 42, marginBottom: 12 }}>✅</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#374151", marginBottom: 6 }}>All caught up!</div>
              <div>No days match this filter</div>
            </div>
          ) : (
            <div className="sp-days-grid">
              {filteredDays.map((d) => (
                <div key={d.id} className={`sp-day-card${d.completed ? " done" : ""}`}>
                  <div className="sp-top-bar" style={{ background: d.color }} />
                  <div className="sp-day-head">
                    <div style={{ flex: 1 }}>
                      <div className="sp-day-label">{d.dayOfWeek} · {d.dateString}</div>
                      <div className="sp-day-title">{d.icon} {d.title}</div>
                      <div className="sp-day-id">{d.id}</div>
                    </div>
                    <button
                      className="sp-done-btn"
                      onClick={() => toggleDay(d.id)}
                      title={d.completed ? "Mark incomplete" : "Mark complete"}
                    >
                      {d.completed ? "✓" : "○"}
                    </button>
                  </div>
                  <div className="sp-tasks">
                    {d.tasks.map((t, i) => (
                      <div key={i} className="sp-task">
                        <div className="sp-task-dot" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="sp-footer">
        <p>© 2025 <span className="brand">ABOOD | JAMAL TOEFL TEST</span> — Automatically generated. Good luck!</p>
      </footer>
    </>
  );
}