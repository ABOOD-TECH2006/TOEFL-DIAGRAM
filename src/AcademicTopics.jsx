// File: src/ToeflTopics.jsx
import React, { useEffect } from "react";

const CSS_ID = "toefl-topics-component-styles";
const CSS = `
.toefl-root {
  max-width: 1100px;
  margin: 20px auto;
  padding: 24px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  font-family: system-ui, Arial;
}

.toefl-header {
  text-align: center;
  padding-bottom: 14px;
  border-bottom: 2px solid #cce0ff;
}

.toefl-header h1 {
  margin: 0;
  font-size: 28px;
  color: #1a73e8;
  font-weight: 800;
}

.toefl-header p {
  color: #555;
  margin-top: 6px;
  font-size: 15px;
}

.topic-grid {
  margin-top: 24px;
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.topic-card {
  padding: 18px;
  border-radius: 14px;
  border: 1px solid #d6e3ff;
  background: #f5f8ff;
  transition: 0.3s ease, transform 0.3s ease;
}

.topic-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 6px 18px rgba(26,115,232,0.18);
}

.topic-title {
  font-size: 20px;
  font-weight: 700;
  color: #1a73e8;
  margin-bottom: 10px;
}

.topic-list {
  margin-left: 22px;
  color: #444;
  line-height: 1.6;
}

.topic-badge {
  display: inline-block;
  margin-bottom: 10px;
  padding: 4px 10px;
  font-size: 13px;
  border-radius: 8px;
  font-weight: 600;
  background: #e3ecff;
  color: #1a4fc4;
}

.footer {
  text-align: center;
  margin-top: 20px;
  color: #555;
  font-size: 14px;
}
`;

function ensureCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById(CSS_ID)) {
    const tag = document.createElement("style");
    tag.id = CSS_ID;
    tag.innerHTML = CSS;
    document.head.appendChild(tag);
  }
}

export default function ToeflTopics() {
  useEffect(() => ensureCSS(), []);

  const topics = [
    {
      title: "Biology & Life Sciences",
      badge: "Very Frequent",
      details: [
        "Evolution & natural selection",
        "Animal behavior (migration, communication)",
        "Ecosystems & climate effects",
        "Cells, DNA, microorganisms",
        "Human anatomy",
        "Plant biology",
      ],
    },
    {
      title: "Earth Science & Environment",
      badge: "Super Common",
      details: [
        "Volcanoes & earthquakes",
        "Plate tectonics",
        "Climate change",
        "Glaciers, deserts, oceans",
        "Weather systems",
      ],
    },
    {
      title: "Physical Science",
      badge: "Frequent",
      details: [
        "Energy & motion",
        "Chemical reactions",
        "Astronomy & space",
        "Waves & light",
      ],
    },
    {
      title: "Social Sciences",
      badge: "Very Frequent",
      details: [
        "Psychology: Memory, learning, behavior",
        "Sociology & anthropology",
        "Economics: Supply & demand",
        "Cultural development",
      ],
    },
    {
      title: "History & Civilization",
      badge: "Common in Reading",
      details: [
        "Ancient civilizations",
        "American history",
        "Trade routes",
        "Technological inventions",
      ],
    },
    {
      title: "Arts & Humanities",
      badge: "Common in Listening",
      details: [
        "Architecture",
        "Art movements",
        "Music history",
        "Theater & literature",
        "Photography",
      ],
    },
  ];

  return (
    <div className="toefl-root">
      <header className="toefl-header">
        <h1>TOEFL 2025 — Most Common Academic Topics</h1>
        <p>
          All major academic categories that appear in TOEFL Reading, Listening,
          Speaking, and Writing.
        </p>
      </header>

      <div className="topic-grid">
        {topics.map((topic, i) => (
          <div key={i} className="topic-card">
            <div className="topic-badge">{topic.badge}</div>
            <h2 className="topic-title">{topic.title}</h2>
            <ul className="topic-list">
              {topic.details.map((d, index) => (
                <li key={index}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer">
        © 2025 ABOOD | TOEFL Topics Overview — Updated & Styled
      </div>
    </div>
  );
}
