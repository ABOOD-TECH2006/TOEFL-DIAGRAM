import React, { useState, useEffect } from "react";
import { prefixes, suffixes } from "../data/prefixesAndSuffixes";
import { Helmet } from "react-helmet-async";

const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; background: #f0f5ff; color: #1a1a2e; min-height: 100vh; }

  .hub-header { background: linear-gradient(135deg, #1855c8 0%, #2563eb 60%, #3b82f6 100%); padding: 40px 32px 32px; position: relative; overflow: hidden; }
  .hub-header::before { content: ''; position: absolute; top: -60px; right: -60px; width: 260px; height: 260px; border-radius: 50%; background: rgba(255,255,255,.06); pointer-events: none; }
  .hub-header::after { content: ''; position: absolute; bottom: -40px; left: 30%; width: 180px; height: 180px; border-radius: 50%; background: rgba(255,255,255,.04); pointer-events: none; }
  .hub-header h1 { color: #fff; font-size: 26px; font-weight: 700; letter-spacing: -.5px; margin-bottom: 6px; position: relative; }
  .hub-header p { color: rgba(255,255,255,.75); font-size: 14px; margin-bottom: 24px; position: relative; }

  .stats-row { display: flex; gap: 12px; margin-bottom: 22px; flex-wrap: wrap; position: relative; }
  .stat-pill { background: rgba(255,255,255,.15); border: 1px solid rgba(255,255,255,.22); border-radius: 20px; padding: 6px 14px; color: #fff; font-size: 13px; font-weight: 500; backdrop-filter: blur(8px); }
  .stat-pill span { font-weight: 700; }

  .search-wrap { position: relative; margin-bottom: 20px; }
  .search-input { width: 100%; padding: 12px 48px 12px 16px; border-radius: 12px; border: none; font-size: 14px; background: rgba(255,255,255,.92); color: #1a1a2e; outline: none; box-shadow: 0 2px 12px rgba(0,0,0,.12); }

  .filter-bar { display: flex; gap: 8px; flex-wrap: wrap; position: relative; }
  .filter-btn { padding: 8px 20px; border-radius: 20px; border: 1.5px solid rgba(255,255,255,.35); background: transparent; color: #fff; font-size: 13px; font-weight: 500; cursor: pointer; transition: all .2s; }
  .filter-btn.active, .filter-btn:hover { background: #fff; color: #1855c8; border-color: #fff; box-shadow: 0 2px 12px rgba(0,0,0,.12); }

  .hub-main { padding: 28px 24px; max-width: 1200px; margin: 0 auto; }
  .section-title { font-size: 18px; font-weight: 700; color: #1855c8; margin-bottom: 18px; display: flex; align-items: center; gap: 8px; }
  .count-badge { background: #dbeafe; color: #1855c8; border-radius: 10px; padding: 2px 10px; font-size: 12px; font-weight: 700; }

  .vocab-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 18px; }

  .vocab-card { background: #fff; border-radius: 16px; border: 1.5px solid #dbeafe; box-shadow: 0 4px 24px rgba(24,85,200,.10); transition: all .25s; position: relative; overflow: hidden; cursor: default; }
  .vocab-card:hover { transform: translateY(-4px) scale(1.01); box-shadow: 0 8px 32px rgba(24,85,200,.18); border-color: #93c5fd; }
  .vocab-card.loved { border-color: #3b82f6; }
  .card-accent { position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: linear-gradient(180deg, #1855c8, #3b82f6); }

  .card-top { padding: 16px 18px 12px 22px; display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid #f0f5ff; }
  .word-badge { font-size: 18px; font-weight: 800; color: #1855c8; letter-spacing: -.5px; }
  .type-tag { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .8px; padding: 3px 9px; border-radius: 8px; background: #eff6ff; color: #2563eb; margin-top: 5px; display: inline-block; }
  .card-icons { display: flex; gap: 8px; align-items: center; margin-top: 4px; }
  .icon-btn { width: 32px; height: 32px; border-radius: 50%; border: 1.5px solid #dbeafe; background: #f8faff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all .18s; font-size: 14px; }
  .icon-btn:hover { background: #dbeafe; border-color: #93c5fd; transform: scale(1.1); }
  .icon-btn.heart.active { background: #fee2e2; border-color: #fca5a5; color: #ef4444; }

  .card-body { padding: 14px 18px 16px 22px; }
  .card-field { margin-bottom: 8px; font-size: 13px; color: #374151; line-height: 1.5; }
  .field-label { font-weight: 700; color: #1855c8; margin-right: 5px; }
  .example-row { display: flex; align-items: center; gap: 8px; margin-top: 10px; background: #eff6ff; border-radius: 8px; padding: 8px 10px; }
  .example-text { font-size: 13px; color: #2563eb; font-style: italic; flex: 1; font-weight: 500; }
  .arabic-ex { font-size: 13px; color: #374151; margin-top: 8px; line-height: 1.5; direction: rtl; text-align: right; font-weight: 500; background: #f8faff; border-radius: 8px; padding: 6px 10px; }

  .no-results { text-align: center; padding: 60px 20px; color: #9ca3af; }

  /* Favorites FAB */
  .fav-fab { position: fixed; bottom: 28px; right: 24px; background: linear-gradient(135deg, #1855c8, #3b82f6); color: #fff; border: none; border-radius: 24px; padding: 12px 22px; font-size: 14px; font-weight: 700; cursor: pointer; box-shadow: 0 6px 24px rgba(24,85,200,.35); display: flex; align-items: center; gap: 8px; z-index: 100; transition: all .2s; }
  .fav-fab:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(24,85,200,.45); }
  .fav-count { background: rgba(255,255,255,.25); border-radius: 12px; padding: 1px 9px; font-size: 12px; }

  .panel-overlay { position: fixed; inset: 0; background: rgba(24,85,200,.12); backdrop-filter: blur(4px); z-index: 200; opacity: 0; pointer-events: none; transition: opacity .25s; }
  .panel-overlay.show { opacity: 1; pointer-events: auto; }
  .fav-panel { position: fixed; right: 0; top: 0; height: 100%; width: 340px; background: #fff; box-shadow: -8px 0 40px rgba(24,85,200,.18); z-index: 201; transform: translateX(100%); transition: transform .3s cubic-bezier(.4,0,.2,1); display: flex; flex-direction: column; }
  .fav-panel.show { transform: translateX(0); }
  .panel-header { background: linear-gradient(135deg, #1855c8, #2563eb); padding: 24px 20px 20px; color: #fff; position: relative; }
  .panel-header h3 { font-size: 17px; font-weight: 700; margin-bottom: 4px; }
  .panel-close { position: absolute; top: 16px; right: 16px; width: 30px; height: 30px; border-radius: 50%; background: rgba(255,255,255,.2); border: none; color: #fff; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; }
  .panel-body { flex: 1; overflow-y: auto; padding: 16px; }
  .panel-empty { text-align: center; padding: 40px 20px; color: #9ca3af; font-size: 14px; }
  .fav-item { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 10px; border: 1px solid #dbeafe; margin-bottom: 8px; background: #f8faff; transition: all .18s; }
  .fav-item:hover { border-color: #93c5fd; background: #eff6ff; }
  .fav-word { font-weight: 700; color: #1855c8; font-size: 14px; }
  .fav-root { font-size: 12px; color: #6b7280; }
  .fav-mic { width: 28px; height: 28px; border-radius: 50%; background: #dbeafe; border: none; cursor: pointer; font-size: 12px; display: flex; align-items: center; justify-content: center; transition: all .15s; flex-shrink: 0; color: #1855c8; }
  .fav-mic:hover { background: #93c5fd; transform: scale(1.1); }
  .fav-remove { width: 24px; height: 24px; border-radius: 50%; background: #fee2e2; border: none; cursor: pointer; font-size: 11px; color: #ef4444; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all .15s; }
  .fav-remove:hover { background: #fca5a5; transform: scale(1.1); }

  .hub-footer { background: #fff; border-top: 1px solid #dbeafe; text-align: center; padding: 20px; color: #6b7280; font-size: 13px; margin-top: 20px; }
  .hub-footer .brand { color: #1855c8; font-weight: 700; }
`;

export default function PrefixesAndSuffixes() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lovedItems, setLovedItems] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const allItems = [...prefixes, ...suffixes];

  useEffect(() => {
    const saved = localStorage.getItem("lovedAffixes_v2");
    if (saved) setLovedItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("lovedAffixes_v2", JSON.stringify(lovedItems));
  }, [lovedItems]);

  useEffect(() => {
    if (!document.getElementById("hub-styles")) {
      const style = document.createElement("style");
      style.id = "hub-styles";
      style.innerHTML = styles;
      document.head.appendChild(style);
    }
  }, []);

  const filteredItems = allItems
    .filter((item) => {
      if (activeCategory === "Prefixes") return item.type === "Prefix";
      if (activeCategory === "Suffixes") return item.type === "Suffix";
      return true;
    })
    .filter((item) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.word.toLowerCase().includes(q) ||
        item.root.toLowerCase().includes(q) ||
        item.rootMeaning.toLowerCase().includes(q) ||
        item.example.toLowerCase().includes(q)
      );
    });

  const toggleLove = (item) => {
    const exists = lovedItems.find((w) => w.word === item.word);
    if (exists) {
      setLovedItems(lovedItems.filter((w) => w.word !== item.word));
    } else {
      setLovedItems([...lovedItems, item]);
    }
  };

  const isLoved = (word) => lovedItems.some((w) => w.word === word);

  const speakWord = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  const categories = ["Prefixes", "Suffixes"];

  return (
    <>
      <Helmet>
        <title>ABOOD | Pre-Suf</title>
        <meta name="description" content="TOEFL Prefixes & Suffixes Hub" />
      </Helmet>

      {/* Header */}
      <div className="hub-header">
        <h1>TOEFL Prefixes &amp; Suffixes Hub</h1>
        <p>Understand how prefixes and suffixes build meaning — master TOEFL word formation!</p>

        <div className="stats-row">
          <div className="stat-pill">📚 <span>{allItems.length}</span> Total</div>
          <div className="stat-pill">🔤 <span>{prefixes.length}</span> Prefixes</div>
          <div className="stat-pill">🔠 <span>{suffixes.length}</span> Suffixes</div>
          <div className="stat-pill">❤️ <span>{lovedItems.length}</span> Loved</div>
        </div>

        <div className="search-wrap">
          <input
            className="search-input"
            type="text"
            placeholder="🔍  Search by word, root, or meaning..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-bar">
          <button
            className={`filter-btn${activeCategory === "All" ? " active" : ""}`}
            onClick={() => setActiveCategory("All")}
          >
            ⊞ Show All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn${activeCategory === cat ? " active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === "Prefixes" ? "🔤 " : "🔠 "}{cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="hub-main">
        <div className="section-title">
          {activeCategory === "All" ? "All Prefixes & Suffixes" : activeCategory}
          <span className="count-badge">{filteredItems.length} items</span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="no-results">
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔎</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#374151", marginBottom: 6 }}>No results found</div>
            <div>Try a different search term</div>
          </div>
        ) : (
          <div className="vocab-grid">
            {filteredItems.map((item, index) => {
              const loved = isLoved(item.word);
              return (
                <div key={index} className={`vocab-card${loved ? " loved" : ""}`}>
                  <div className="card-accent" />
                  <div className="card-top">
                    <div>
                      <div className="word-badge">{item.word}</div>
                      <div className="type-tag">{item.type}</div>
                    </div>
                    <div className="card-icons">
                      <button
                        className={`icon-btn heart${loved ? " active" : ""}`}
                        onClick={() => toggleLove(item)}
                        title={loved ? "Remove from favorites" : "Add to favorites"}
                      >
                        {loved ? "❤️" : "🤍"}
                      </button>
                      <button
                        className="icon-btn"
                        onClick={() => speakWord(item.example)}
                        title="Listen to example"
                      >
                        🔊
                      </button>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="card-field">
                      <span className="field-label">Arabic name:</span>
                      {item.affixNameArabic}
                    </div>
                    <div className="card-field">
                      <span className="field-label">Root:</span>
                      {item.root} — <em>{item.rootMeaning}</em>
                    </div>
                    <div className="example-row">
                      <div className="example-text">📖 {item.example}</div>
                      <button
                        className="icon-btn"
                        style={{ flexShrink: 0 }}
                        onClick={() => speakWord(item.example)}
                      >
                        🔊
                      </button>
                    </div>
                    <div className="arabic-ex">🌙 {item.arabicExample}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FAB */}
      <button className="fav-fab" onClick={() => setShowPanel(true)}>
        ❤️ My Loved <span className="fav-count">{lovedItems.length}</span>
      </button>

      {/* Overlay */}
      <div
        className={`panel-overlay${showPanel ? " show" : ""}`}
        onClick={() => setShowPanel(false)}
      />

      {/* Favorites Panel */}
      <div className={`fav-panel${showPanel ? " show" : ""}`}>
        <div className="panel-header">
          <h3>❤️ Loved Words</h3>
          <p style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>Your personal vocabulary vault</p>
          <button className="panel-close" onClick={() => setShowPanel(false)}>✕</button>
        </div>
        <div className="panel-body">
          {lovedItems.length === 0 ? (
            <div className="panel-empty">
              💔<br /><br />No favorites yet!<br />
              <span style={{ fontSize: 12 }}>Tap the heart on any card</span>
            </div>
          ) : (
            lovedItems.map((item, i) => (
              <div key={i} className="fav-item">
                <div style={{ flex: 1 }}>
                  <div className="fav-word">{item.word}</div>
                  <div className="fav-root">{item.root} — {item.rootMeaning}</div>
                </div>
                <button className="fav-mic" onClick={() => speakWord(item.word)}>🔊</button>
                <button className="fav-remove" onClick={() => toggleLove(item)}>✕</button>
              </div>
            ))
          )}
        </div>
      </div>

      <footer className="hub-footer">
        <p>© 2025 <span className="brand">ABOOD | JAMAL</span> — Master TOEFL Word Formation!</p>
      </footer>
    </>
  );
}