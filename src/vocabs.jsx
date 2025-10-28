import React, { useState } from "react";
import vocab from "./data/vocabs";
import "./vocab.css";

export default function Vocab() {
  const [activeBatch, setActiveBatch] = useState("batch1");
  const [lovedVocabs, setLovedVocabs] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const batches = Object.keys(vocab);

  const displayedWords =
    activeBatch === "all"
      ? Object.values(vocab).flat()
      : vocab[activeBatch] || [];

  // Toggle love
  const toggleLove = (wordObj) => {
    const alreadyLoved = lovedVocabs.find((w) => w.word === wordObj.word);
    if (alreadyLoved) {
      setLovedVocabs(lovedVocabs.filter((w) => w.word !== wordObj.word));
    } else {
      setLovedVocabs([...lovedVocabs, wordObj]);
    }
  };

  return (
    <div className="vocab-wrapper">
      <header className="vocab-header">
        <h1>TOEFL Vocabulary Hub</h1>
        <p>Master your TOEFL words — one batch at a time!</p>

        <div className="batch-buttons">
          <button
            className={`batch-btn ${activeBatch === "all" ? "active" : ""}`}
            onClick={() => setActiveBatch("all")}
          >
            Show All
          </button>
          {batches.map((batch) => (
            <button
              key={batch}
              className={`batch-btn ${activeBatch === batch ? "active" : ""}`}
              onClick={() => setActiveBatch(batch)}
            >
              {batch.replace("batch", "Section ")}
            </button>
          ))}
        </div>
      </header>

      <main className="vocab-content fadeIn">
        <section className="vocab-section">
          <h2 className="batch-title">
            {activeBatch === "all"
              ? "All TOEFL Sections"
              : activeBatch.replace("batch", "Section ")}
          </h2>

          <div className="vocab-grid">
            {displayedWords.map((item, index) => {
              const isLoved = lovedVocabs.some((w) => w.word === item.word);
              return (
                <div key={index} className="vocab-card">
                  <div className="card-top">
                    <h3 className="word">{item.word}</h3>
                    <i
                      className={`fa-heart ${
                        isLoved ? "fas loved" : "far"
                      } heart-icon`}
                      onClick={() => toggleLove(item)}
                    ></i>
                  </div>
                  <div className="card-body">
                    <p className="arabic">{item.arabic}</p>
                    <p className="english">{item.english}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Floating Loved Cart Button */}
      <button className="cart-button" onClick={() => setShowCart(!showCart)}>
        <i className="fas fa-heart"></i> My Loved Vocabs ({lovedVocabs.length})
      </button>

      {/* Loved Cart Panel */}
      {showCart && (
        <div className="cart-panel">
          <div className="cart-header">
            <h3>❤️ Loved Vocabs</h3>
            <button onClick={() => setShowCart(false)} className="close-cart">
              <i className="fas fa-times"></i>
            </button>
          </div>
          {lovedVocabs.length === 0 ? (
            <p className="empty-cart">No loved words yet!</p>
          ) : (
            <ul className="cart-list">
              {lovedVocabs.map((word, i) => (
                <li key={i}>
                  <strong>{word.word}</strong> — {word.arabic}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <footer className="vocab-footer">
        <p>© 2025 TOEFL Companion — Vocabulary Power!</p>
      </footer>
    </div>
  );
}