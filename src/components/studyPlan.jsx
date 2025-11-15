// File: src/StudyPlan.jsx
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const CSS_ID = "studyplan-component-styles";
const CSS = `
* { box-sizing: border-box; }
body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; margin: 0; padding: 0; background: #f0f2f8; }
.study-root { max-width: 1100px; margin: 18px auto; padding: 20px; border-radius: 14px; background: #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
.study-header { border-bottom: 2px solid #cce0ff; padding-bottom: 16px; }
.study-header h1 { margin: 0 0 6px 0; font-size: 24px; color: #1a73e8; }
.muted { color: #555; font-size: 14px; margin: 0 0 10px 0; }
.controls { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.controls label { font-size: 14px; color: #333; }
.controls select { padding: 6px 10px; border-radius: 6px; border: 1px solid #bbb; }
.btn { background: #1a73e8; color: #fff; border: none; padding: 10px 14px; border-radius: 10px; cursor: pointer; transition: all 0.3s ease; }
.btn:hover { transform: translateY(-3px); box-shadow: 0 6px 18px rgba(26,115,232,0.3); }
.btn-ghost { background: transparent; border: 1px solid #1a73e8; color: #1a73e8; }
.btn-download { background: #0f9d58; }
.small { padding: 6px 10px; border-radius: 6px; border: none; cursor: pointer; background: #d0e3ff; transition: all 0.3s ease; }
.small:hover { background: #a8caff; transform: scale(1.05); }
.study-main { display: flex; gap: 18px; margin-top: 18px; }
.weeks-sidebar { width: 180px; }
.week-card { padding: 14px; border-radius: 12px; border: 1px solid #cce0ff; margin-bottom: 12px; cursor: pointer; background: #e6f0ff; transition: all 0.3s ease; }
.week-card:hover { transform: translateX(4px) scale(1.02); box-shadow: 0 4px 12px rgba(26,115,232,0.2); }
.week-card.active { background: linear-gradient(90deg,#f0f7ff,#ffffff); border-color: #1a73e8; box-shadow: 0 6px 16px rgba(26,115,232,0.25); }
.week-summary { font-size: 13px; color: #444; margin-top: 6px; }
.week-plan { flex: 1; }
.days-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; margin-top: 16px; }
.day-card { border-radius: 14px; padding: 16px; border: 1px solid #dbe4ff; background: #f5f8ff; transition: all 0.3s ease, transform 0.4s ease-in-out; }
.day-card:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 6px 16px rgba(26,115,232,0.15); }
.day-card.done { opacity: 0.75; border-style: dashed; background: #dfffe0; }
.day-head { display: flex; justify-content: space-between; align-items: start; }
.day-title { font-weight: 700; color: #1a73e8; font-size: 15px; }
.day-sub { font-size: 12px; color: #555; margin-top: 2px; }
.day-actions .small { padding: 6px 10px; border-radius: 6px; border: none; cursor: pointer; background: #1c2c75ff; }
.day-actions .small:hover { background: #85b3fcff; transform: scale(1.05); }
.task-list { margin: 12px 0 0 22px; }
.notes { margin-top: 22px; padding: 16px; border-radius: 12px; background: #eef4ff; border: 1px solid #dbe4ff; }
.study-footer { text-align: center; margin-top: 18px; color: #333; font-size: 14px; font-weight: 500; }
@media (max-width: 860px) { .study-main { flex-direction: column; } .weeks-sidebar { width: 100%; display: flex; gap: 8px; overflow-x: auto; } .week-card { min-width: 120px; }}
`;

function ensureInjectedCSS() { if (typeof document === "undefined") return; if (!document.getElementById(CSS_ID)) { const s=document.createElement("style"); s.id=CSS_ID; s.innerHTML=CSS; document.head.appendChild(s); }}

function generatePlan(startDate) {
  const weeks = 8;
  const daysPerWeek = 7;
  const topics = [
    "Grammar review & Core vocabulary",
    "Reading practice: Main idea & details",
    "Listening practice: Lectures & conversations",
    "Speaking practice: Independent tasks",
    "Writing practice: Integrated task",
    "Timed full-section practice",
    "Review, rest, and weak-point focus",
  ];
  const plan = [];
  for (let w = 0; w < weeks; w++) {
    const week = { weekNumber: w+1, days: [] };
    for (let d = 0; d < daysPerWeek; d++) {
      const dayIndex = d % topics.length;
      const dayDate = new Date(startDate);
      dayDate.setDate(dayDate.getDate() + w*7 + d);
      const day = {
        id: `w${w+1}d${d+1}`,
        week: w+1,
        dayOfWeek: dayDate.toLocaleDateString('en-US', { weekday: 'short' }),
        dateString: dayDate.toLocaleDateString(),
        title: `Week ${w+1} — ${topics[dayIndex]}`,
        tasks: generateTasksForTopic(topics[dayIndex]),
        completed: false
      };
      week.days.push(day);
    }
    plan.push(week);
  }
  return plan;
}

function generateTasksForTopic(topic) {
  switch(topic){
    case "Grammar review & Core vocabulary": return ["30 min: Grammar","20 min: Learn 12 academic words","20 min: Quick reading"];
    case "Reading practice: Main idea & details": return ["1 reading passage","Identify main idea/details","10 min review"];
    case "Listening practice: Lectures & conversations": return ["1 lecture + summarize","Practice note-taking","10 comprehension Qs"];
    case "Speaking practice: Independent tasks": return ["4 recorded responses","Use template: intro/2 supports/conclusion","Listen & timestamp"];
    case "Writing practice: Integrated task": return ["Integrated writing 20min","Independent essay 30min","Revise structure"];
    case "Timed full-section practice": return ["Full timed section","Review mistakes","10 min vocab review"];
    case "Review, rest, and weak-point focus": return ["Review error log","Light practice on weak skill","Rest & active recall"];
    default: return ["Practice & review"];
  }
}

export default function StudyPlan() {
  useEffect(()=>{ensureInjectedCSS();},[]);
  const today = new Date();
  const [plan,setPlan] = useState(()=>{
    const raw = typeof window!=='undefined'?window.localStorage.getItem('toeflStudyPlan_v1'):null;
    if(raw){ try{ return JSON.parse(raw); } catch(e){ return generatePlan(today);} }
    return generatePlan(today);
  });

  const [selectedWeek,setSelectedWeek]=useState(1);
  const [filter,setFilter]=useState('all');

  useEffect(()=>{ if(typeof window!=='undefined') window.localStorage.setItem('toeflStudyPlan_v1',JSON.stringify(plan)); },[plan]);

  const toggleComplete=(dayId)=>{ setPlan(plan.map(w=>({ ...w, days: w.days.map(d=>d.id===dayId?{...d,completed:!d.completed}:d)})));};
  const markWeekComplete=(weekNum)=>{ setPlan(plan.map(w=>w.weekNumber===weekNum?{...w,days:w.days.map(d=>({...d,completed:true}))}:w));};
  const resetProgress=()=>{ setPlan(plan.map(w=>({...w,days:w.days.map(d=>({...d,completed:false}))})));};
  const downloadPlan=()=>{ const dataStr="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(plan,null,2)); const el=document.createElement('a'); el.setAttribute('href',dataStr); el.setAttribute('download',`toefl-study-plan-${new Date().toISOString().slice(0,10)}.json`); document.body.appendChild(el); el.click(); el.remove(); };

  const weeks = plan;
  const currentWeek = weeks.find(w=>w.weekNumber===selectedWeek)||weeks[0];
  const filteredDays = days=>filter==='all'?days:filter==='completed'?days.filter(d=>d.completed):days.filter(d=>!d.completed);

  return (
    <div className="study-root">
      <Helmet>
        <title>ABOOD | Study Plan </title>
        <meta name="description" content="The  Study Plan For Toefl" />
      </Helmet>
      <header className="study-header">
        <h1>TOEFL 8-Week Study Plan (Starting Today)</h1>
        <p className="muted">
          Daily organized plan with dates & enhanced animations
        </p>
        <div className="controls">
          <label>Select Week:</label>
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(Number(e.target.value))}
          >
            {weeks.map((w) => (
              <option key={w.weekNumber} value={w.weekNumber}>
                Week {w.weekNumber}
              </option>
            ))}
          </select>
          <label>Filter:</label>
          <select
            style={{ outline: "none" }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <button
            className="btn"
            onClick={() => markWeekComplete(selectedWeek)}
          >
            Mark week complete
          </button>
          <button className="btn btn-ghost" onClick={resetProgress}>
            Reset progress
          </button>
          <button className="btn btn-download" onClick={downloadPlan}>
            Download JSON
          </button>
        </div>
      </header>
      <main className="study-main">
        <aside className="weeks-sidebar">
          {weeks.map((w) => (
            <div
              key={w.weekNumber}
              className={`week-card ${
                w.weekNumber === selectedWeek ? "active" : ""
              }`}
              onClick={() => setSelectedWeek(w.weekNumber)}
            >
              <strong>Week {w.weekNumber}</strong>
              <div className="week-summary">
                {w.days.filter((d) => d.completed).length}/{w.days.length}{" "}
                completed
              </div>
            </div>
          ))}
        </aside>
        <section className="week-plan">
          <h2>Week {currentWeek.weekNumber} — Daily Plan</h2>
          <div className="days-grid">
            {filteredDays(currentWeek.days).map((d) => (
              <article
                key={d.id}
                className={`day-card ${d.completed ? "done" : ""}`}
              >
                <div className="day-head">
                  <div>
                    <div className="day-title">
                      {d.dayOfWeek} ({d.dateString}) — {d.title}
                    </div>
                    <div className="day-sub">Day ID: {d.id}</div>
                  </div>
                  <div className="day-actions">
                    <button
                      className="small"
                      onClick={() => toggleComplete(d.id)}
                    >
                      {d.completed ? "Unmark" : "Done"}
                    </button>
                  </div>
                </div>
                <ul className="task-list">
                  {d.tasks.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>
      <footer className="study-footer">
        <p>
          &copy; 2025 ABOOD | JAMAL TOEFL TEST. Automatically generated — adjust
          tasks to your level. Good luck!
        </p>
      </footer>
    </div>
  );
}