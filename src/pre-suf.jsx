import React, { useState, useEffect } from "react";
import { prefixes, suffixes } from "./data/prefixesAndSuffixes";
import "./Topics.css";

export default function PrefixesAndSuffixes() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lovedItems, setLovedItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const categories = ["Prefixes", "Suffixes"];

  const displayedItems =
    activeCategory === "All"
      ? [...prefixes, ...suffixes]
      : activeCategory === "Prefixes"
      ? prefixes
      : suffixes;

  useEffect(() => {
    const saved = localStorage.getItem("lovedAffixes");
    if (saved) setLovedItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("lovedAffixes", JSON.stringify(lovedItems));
  }, [lovedItems]);

  const toggleLove = (item) => {
    const exists = lovedItems.find((w) => w.word === item.word);
    if (exists) {
      setLovedItems(lovedItems.filter((w) => w.word !== item.word));
    } else {
      setLovedItems([...lovedItems, item]);
    }
  };

  const speakWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="vocab-wrapper">
      <header className="vocab-header">
        <h1>TOEFL Prefixes & Suffixes Hub</h1>
        <p>Understand how prefixes and suffixes build meaning!</p>
        <div className="batch-buttons">
          <button
            className={`batch-btn ${activeCategory === "All" ? "active" : ""}`}
            onClick={() => setActiveCategory("All")}
          >
            Show All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`batch-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>
      <main className="vocab-content fadeIn">
        <section className="vocab-section">
          <h2 className="batch-title">
            {activeCategory === "All"
              ? "All Prefixes & Suffixes"
              : activeCategory}
          </h2>

          <div className="vocab-grid">
            {displayedItems.map((item, index) => {
              const loved = lovedItems.some((w) => w.word === item.word);
              return (
                <div key={index} className="vocab-card">
                  <div className="card-top">
                    <h3 className="word">{item.word}</h3>
                    <div className="icons">
                      <i
                        className={`fa-heart ${loved ? "fas loved" : "far"} heart-icon`}
                        onClick={() => toggleLove(item)}
                      ></i>
                      <i
                        className="fas fa-microphone mic-icon"
                        onClick={() => speakWord(item.word)}
                      ></i>
                    </div>
                  </div>

                  <div className="card-body">
                    <p>
                      <strong>Affix in Arabic:</strong> {item.affixNameArabic}
                    </p>
                    <p>
                      <strong>Root:</strong> {item.root} ({item.rootMeaning})
                    </p>
                    <div style={{ display: "flex", columnGap: "5px" }}>
                      <p className="english">{item.example}</p>
                      <i
                        className="fas fa-microphone mic-icon"
                        onClick={() => speakWord(item.example)}
                      ></i>
                    </div>
                    <p>
                      <strong>Arabic sentence:</strong> {item.arabicExample}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <button className="cart-button" onClick={() => setShowCart(!showCart)}>
        <i className="fas fa-heart"></i> My Loved ({lovedItems.length})
      </button>

      <div className={`cart-panel ${showCart ? "show" : ""}`}>
        <div className="cart-header">
          <h3>❤️ Loved Prefixes/Suffixes</h3>
          <button onClick={() => setShowCart(false)} className="close-cart">
            <i className="fas fa-times"></i>
          </button>
        </div>
        {lovedItems.length === 0 ? (
          <p className="empty-cart">No favorites yet!</p>
        ) : (
          <ul className="cart-list">
            {lovedItems.map((word, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <li>
                  <strong>{word.word}</strong> — {word.arabic}
                </li>
                <i
                  className="fas fa-microphone mic-icon"
                  onClick={() => speakWord(word.word)}
                ></i>
              </div>
            ))}
          </ul>
        )}
      </div>

      <footer className="footer">
        <p>
          © 2025 <span className="brand">ABOOD | JAMAL</span>
        </p>
        <p className="quote-footer">
          📘 TOEFL Companion — Master Word Formation!
        </p>
      </footer>
    </div>
  );
}
