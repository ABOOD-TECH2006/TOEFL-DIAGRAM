import React, { useState } from "react";
import vocab from "./data/vocabs";
import "./vocab.css";

export default function Vocab() {
  const [activeBatch, setActiveBatch] = useState("batch1");

  const batches = Object.keys(vocab);

  return (
    <div className="vocab-wrapper">
      <header className="vocab-header">
        <h1>TOEFL Vocabulary List</h1>
        <p>Select a batch to explore its words</p>

        <div className="batch-buttons">
          {batches.map((batch) => (
            <button
              key={batch}
              className={`batch-btn ${activeBatch === batch ? "active" : ""}`}
              onClick={() => setActiveBatch(batch)}
            >
              {batch.replace("batch", "Batch ")}
            </button>
          ))}
        </div>
      </header>

      <main className="vocab-content">
        <section className="vocab-section fadeIn">
          <h2 className="batch-title">
            {activeBatch.replace("batch", "Batch ")}
          </h2>
          <div className="vocab-grid">
            {vocab[activeBatch].map((item, index) => (
              <div key={index} className="vocab-card">
                <h3 className="word">{item.word}</h3>
                <p className="arabic">{item.arabic}</p>
                <p className="english">{item.english}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="vocab-footer">
        <p>© 2025 TOEFL Companion — Vocabulary Power!</p>
      </footer>
    </div>
  );
}
