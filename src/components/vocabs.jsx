import React, { useState, useEffect } from "react";
import vocab from "../data/vocabs";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// ── Design tokens (inline) ────────────────────────────────────────────────────
const t = {
  blue50:   "#E6F1FB",
  blue100:  "#B5D4F4",
  blue200:  "#85B7EB",
  blue400:  "#378ADD",
  blue600:  "#185FA5",
  blue800:  "#0C447C",
  blue900:  "#042C53",
  gray50:   "#F8FAFD",
  gray100:  "#EEF2F7",
  gray200:  "#DDE4EE",
  gray400:  "#8898AA",
  gray600:  "#4A5568",
  gray900:  "#1A202C",
  white:    "#ffffff",
  red400:   "#E24B4A",
  red50:    "#FCEBEB",
  red800:   "#791F1F",
  purple50: "#EEEDFE",
  purple400:"#7F77DD",
  purple800:"#3C3489",
  amber50:  "#FAEEDA",
  amber400: "#BA7517",
  amber800: "#633806",
  teal50:   "#E1F5EE",
  teal400:  "#1D9E75",
  teal800:  "#085041",
  fontDisplay: "'DM Serif Display', serif",
  fontBody:    "'Sora', sans-serif",
};

// ── CEFR level badge colors ────────────────────────────────────────────────────
const levelStyle = (level) => {
  const map = {
    B2: { bg: t.blue50,   color: t.blue800   },
    C1: { bg: t.purple50, color: t.purple800 },
    C2: { bg: t.red50,    color: t.red800    },
  };
  return map[level] || { bg: t.amber50, color: t.amber800 };
};

// ── Sub-components ─────────────────────────────────────────────────────────────

function VocabCard({ item, isLoved, onToggleLove, onSpeak }) {
  const [hovered, setHovered] = useState(false);
  const ls = item.level ? levelStyle(item.level) : null;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: t.white,
        border: `1px solid ${hovered ? t.blue200 : t.gray200}`,
        borderRadius: 16,
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? `0 4px 20px rgba(55,138,221,0.10)` : "none",
        cursor: "default",
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{
          fontFamily: t.fontDisplay,
          fontSize: 18,
          color: t.blue900,
          letterSpacing: "-0.3px",
          fontWeight: 400,
        }}>
          {item.word}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Love button */}
          <button
            onClick={() => onToggleLove(item)}
            style={{
              background: isLoved ? t.red50 : t.gray100,
              border: "none",
              borderRadius: 8,
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: isLoved ? t.red400 : t.gray400,
              fontSize: 14,
              transition: "all 0.2s",
            }}
            title={isLoved ? "Remove from saved" : "Save word"}
          >
            {isLoved ? "♥" : "♡"}
          </button>
          {/* Speak button */}
          <button
            onClick={() => onSpeak(item.word)}
            style={{
              background: t.blue50,
              border: "none",
              borderRadius: 8,
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: t.blue800,
              fontSize: 13,
              transition: "all 0.2s",
            }}
            title="Pronounce word"
          >
            ▶
          </button>
        </div>
      </div>

      {/* CEFR badge */}
      {ls && (
        <span style={{
          display: "inline-block",
          alignSelf: "flex-start",
          fontSize: 11,
          fontWeight: 600,
          padding: "3px 9px",
          borderRadius: 100,
          background: ls.bg,
          color: ls.color,
          letterSpacing: "0.4px",
          fontFamily: t.fontBody,
        }}>
          {item.level}
        </span>
      )}

      {/* Arabic meaning */}
      <p style={{
        fontFamily: t.fontBody,
        fontSize: 15,
        color: t.gray900,
        direction: "rtl",
        textAlign: "right",
        margin: 0,
        lineHeight: 1.5,
        fontWeight: 500,
      }}>
        {item.arabic}
      </p>

      {/* Arabic example */}
      {item.arabic_example && (
        <p style={{
          fontFamily: t.fontBody,
          fontSize: 12,
          color: t.gray400,
          direction: "rtl",
          textAlign: "right",
          margin: 0,
          lineHeight: 1.5,
          borderTop: `1px solid ${t.gray100}`,
          paddingTop: 8,
        }}>
          {item.arabic_example}
        </p>
      )}

      {/* English meaning */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${t.gray100}`, paddingTop: 8 }}>
        <p style={{
          fontFamily: t.fontBody,
          fontSize: 13,
          color: t.gray600,
          margin: 0,
          lineHeight: 1.5,
          flex: 1,
        }}>
          {item.english}
        </p>
        <button
          onClick={() => onSpeak(item.english)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: t.gray400,
            fontSize: 13,
            padding: "4px",
            marginLeft: 6,
          }}
          title="Pronounce definition"
        >
          ▶
        </button>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function Vocab() {
  const [activeBatch, setActiveBatch] = useState("batch1");
  const [lovedVocabs, setLovedVocabs] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const batches = Object.keys(vocab);

  const allDisplayed =
    activeBatch === "all"
      ? Object.values(vocab).flat()
      : vocab[activeBatch] || [];

  const displayedWords = searchQuery
    ? allDisplayed.filter(
        (w) =>
          w.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (w.english && w.english.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : allDisplayed;

  useEffect(() => {
    const saved = localStorage.getItem("lovedVocabs");
    if (saved) setLovedVocabs(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("lovedVocabs", JSON.stringify(lovedVocabs));
  }, [lovedVocabs]);

  const toggleLove = (wordObj) => {
    const alreadyLoved = lovedVocabs.find((w) => w.word === wordObj.word);
    setLovedVocabs(
      alreadyLoved
        ? lovedVocabs.filter((w) => w.word !== wordObj.word)
        : [...lovedVocabs, wordObj]
    );
  };

  const speakWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: t.fontBody, background: t.gray50, minHeight: "100vh" }}>
      <Helmet>
        <title>TOEFL Vocabulary Hub</title>
        <meta name="description" content="TOEFL vocabulary by section — with Arabic meanings and CEFR levels" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />
      </Helmet>

      {/* ── NAV ── */}
      <nav style={{
        background: t.white,
        borderBottom: `1px solid ${t.gray200}`,
        padding: "0 2rem",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36,
            background: t.blue600,
            borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: t.white,
            fontFamily: t.fontDisplay,
            fontSize: 16, fontWeight: 700,
          }}>T</div>
          <span style={{ fontFamily: t.fontDisplay, fontSize: 20, color: t.blue900, letterSpacing: "-0.3px" }}>
            Vocabulary Hub
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link to="/" style={{
            padding: "7px 16px",
            background: t.blue50,
            color: t.blue800,
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 500,
            textDecoration: "none",
            fontFamily: t.fontBody,
          }}>
            ← Home
          </Link>
          <button
            onClick={() => setShowCart(!showCart)}
            style={{
              padding: "7px 16px",
              background: lovedVocabs.length > 0 ? t.red50 : t.gray100,
              color: lovedVocabs.length > 0 ? t.red400 : t.gray600,
              border: "none",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: t.fontBody,
              display: "flex", alignItems: "center", gap: 6,
            }}
          >
            ♥ Saved ({lovedVocabs.length})
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header style={{
        background: t.white,
        borderBottom: `1px solid ${t.gray200}`,
        padding: "48px 2rem 40px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${t.blue50} 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: t.blue50, color: t.blue800,
          border: `1px solid ${t.blue100}`,
          borderRadius: 100, padding: "5px 14px",
          fontSize: 12, fontWeight: 500,
          marginBottom: 16, letterSpacing: "0.3px",
          position: "relative",
        }}>
          <span style={{ width: 6, height: 6, background: t.blue400, borderRadius: "50%", display: "inline-block" }} />
          TOEFL iBT Word Bank
        </div>
        <h1 style={{
          fontFamily: t.fontDisplay,
          fontSize: "clamp(30px, 5vw, 50px)",
          color: t.blue900,
          letterSpacing: "-1.2px",
          lineHeight: 1.1,
          margin: "0 0 12px",
          position: "relative",
        }}>
          Vocabulary <em style={{ fontStyle: "italic", color: t.blue600 }}>Hub</em>
        </h1>
        <p style={{
          fontSize: 15,
          color: t.gray400,
          maxWidth: 420,
          margin: "0 auto 32px",
          lineHeight: 1.6,
          fontWeight: 300,
          position: "relative",
        }}>
          Master your TOEFL words — with Arabic meanings, CEFR levels, and pronunciation.
        </p>

        {/* Stats */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 32, position: "relative" }}>
          {[
            { num: Object.values(vocab).flat().length + "+", label: "Total words" },
            { num: batches.length, label: "Sections" },
            { num: lovedVocabs.length, label: "Saved" },
          ].map((s, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div style={{ width: 1, height: 36, background: t.gray200 }} />}
              <div style={{ textAlign: "center" }}>
                <span style={{ fontFamily: t.fontDisplay, fontSize: 26, color: t.blue900, display: "block", letterSpacing: "-0.5px" }}>{s.num}</span>
                <span style={{ fontSize: 12, color: t.gray400 }}>{s.label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </header>

      {/* ── CONTROLS ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 2rem 0" }}>
        {/* Search */}
        <div style={{ position: "relative", marginBottom: 20 }}>
          <span style={{
            position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
            color: t.gray400, fontSize: 14, pointerEvents: "none",
          }}>🔍</span>
          <input
            type="text"
            placeholder="Search words or meanings…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "11px 16px 11px 42px",
              border: `1px solid ${t.gray200}`,
              borderRadius: 12,
              fontSize: 14,
              background: t.white,
              color: t.gray900,
              fontFamily: t.fontBody,
              outline: "none",
              boxSizing: "border-box",
            }}
            onFocus={(e) => { e.target.style.borderColor = t.blue400; e.target.style.boxShadow = `0 0 0 3px rgba(55,138,221,0.1)`; }}
            onBlur={(e)  => { e.target.style.borderColor = t.gray200;  e.target.style.boxShadow = "none"; }}
          />
        </div>

        {/* Batch buttons */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          background: t.white,
          border: `1px solid ${t.gray200}`,
          borderRadius: 16,
          padding: 6,
          marginBottom: 28,
        }}>
          {[{ key: "all", label: "All Sections" }, ...batches.map((b) => ({ key: b, label: b.replace("batch", "Section ") }))].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveBatch(key)}
              style={{
                padding: "8px 16px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                fontFamily: t.fontBody,
                background: activeBatch === key ? t.blue600 : "transparent",
                color: activeBatch === key ? t.white : t.gray400,
                transition: "all 0.2s",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Result count */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.2px", color: t.blue400, margin: 0 }}>
            {activeBatch === "all" ? "All sections" : activeBatch.replace("batch", "Section ")}
          </p>
          <span style={{ fontSize: 12, color: t.gray400 }}>{displayedWords.length} words</span>
        </div>
      </div>

      {/* ── VOCAB GRID ── */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem 60px" }}>
        {displayedWords.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: t.gray400, fontSize: 15 }}>
            No words found for "{searchQuery}"
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 12,
          }}>
            {displayedWords.map((item, index) => (
              <VocabCard
                key={index}
                item={item}
                isLoved={lovedVocabs.some((w) => w.word === item.word)}
                onToggleLove={toggleLove}
                onSpeak={speakWord}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── SAVED WORDS PANEL (slide-in simulation via inline show/hide) ── */}
      {showCart && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 200,
          display: "flex", alignItems: "flex-end", justifyContent: "flex-end",
          pointerEvents: "none",
        }}>
          {/* Backdrop */}
          <div
            onClick={() => setShowCart(false)}
            style={{
              position: "absolute", inset: 0,
              background: "rgba(4,44,83,0.2)",
              pointerEvents: "auto",
            }}
          />
          {/* Panel */}
          <div style={{
            position: "relative",
            width: 340,
            height: "100vh",
            background: t.white,
            borderLeft: `1px solid ${t.gray200}`,
            display: "flex",
            flexDirection: "column",
            pointerEvents: "auto",
            overflow: "hidden",
          }}>
            {/* Panel header */}
            <div style={{
              padding: "20px 20px 16px",
              borderBottom: `1px solid ${t.gray100}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <div>
                <p style={{ fontFamily: t.fontDisplay, fontSize: 18, color: t.blue900, margin: 0 }}>Saved words</p>
                <p style={{ fontSize: 12, color: t.gray400, margin: "2px 0 0" }}>{lovedVocabs.length} words saved</p>
              </div>
              <button
                onClick={() => setShowCart(false)}
                style={{ background: t.gray100, border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 14, color: t.gray600 }}
              >✕</button>
            </div>

            {/* Panel body */}
            <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
              {lovedVocabs.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: t.gray400, fontSize: 14 }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>♡</div>
                  No saved words yet
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {lovedVocabs.map((word, i) => (
                    <div key={i} style={{
                      background: t.gray50,
                      border: `1px solid ${t.gray200}`,
                      borderRadius: 10,
                      padding: "10px 12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                    }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 600, fontSize: 14, color: t.blue900, margin: 0, fontFamily: t.fontBody }}>{word.word}</p>
                        <p style={{ fontSize: 12, color: t.gray400, margin: "2px 0 0", direction: "rtl", textAlign: "right" }}>{word.arabic}</p>
                      </div>
                      <div style={{ display: "flex", gap: 4 }}>
                        <button
                          onClick={() => speakWord(word.word)}
                          style={{ background: t.blue50, border: "none", borderRadius: 6, width: 26, height: 26, cursor: "pointer", color: t.blue800, fontSize: 11 }}
                        >▶</button>
                        <button
                          onClick={() => toggleLove(word)}
                          style={{ background: t.red50, border: "none", borderRadius: 6, width: 26, height: 26, cursor: "pointer", color: t.red400, fontSize: 11 }}
                        >✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer style={{
        background: t.white,
        borderTop: `1px solid ${t.gray200}`,
        padding: "24px 2rem",
        textAlign: "center",
      }}>
        <p style={{ fontSize: 13, color: t.gray400, margin: 0 }}>
          © 2025 <strong style={{ color: t.blue800 }}>TOEFL Companion</strong> · Built by Abood &amp; Jamal 💙
        </p>
      </footer>
    </div>
  );
}