import React, { useState, useEffect } from "react";
import vocab from "./data/studyVocabularies";
import "./Topics.css";

export default function Vocab() {
const [activeTopic, setActiveTopic] = useState("All");
const [lovedVocabs, setLovedVocabs] = useState([]);
const [showCart, setShowCart] = useState(false);

const topics = Object.keys(vocab);

const displayedWords =
activeTopic === "All"
? Object.values(vocab).flat()
: vocab[activeTopic] || [];

useEffect(() => {
const saved = localStorage.getItem("lovedVocabs2");
if (saved) {
setLovedVocabs(JSON.parse(saved));
}
}, []);

useEffect(() => {
localStorage.setItem("lovedVocabs2", JSON.stringify(lovedVocabs));
}, [lovedVocabs]);

const toggleLove = (wordObj) => {
const alreadyLoved = lovedVocabs.find((w) => w.word === wordObj.word);
if (alreadyLoved) {
setLovedVocabs(lovedVocabs.filter((w) => w.word !== wordObj.word));
} else {
setLovedVocabs([...lovedVocabs, wordObj]);
}
};

const speakWord = (word) => {
const utterance = new SpeechSynthesisUtterance(word);
utterance.lang = "en-US";
utterance.rate = 0.9;
speechSynthesis.speak(utterance);
};

return ( <div className="vocab-wrapper"> <header className="vocab-header"> <h1>TOEFL Vocabulary Hub Of Most common Topics</h1> <p>Master your TOEFL words — one topic at a time!</p>

    <div className="batch-buttons">  
      <button  
        className={`batch-btn ${activeTopic === "All" ? "active" : ""}`}  
        onClick={() => setActiveTopic("All")}  
      >  
        Show All  
      </button>  

      {topics.map((topic) => (  
        <button  
          key={topic}  
          className={`batch-btn ${activeTopic === topic ? "active" : ""}`}  
          onClick={() => setActiveTopic(topic)}  
        >  
          {topic}  
        </button>  
      ))}  
    </div>  
  </header>  

  <main className="vocab-content fadeIn">  
    <section className="vocab-section">  
      <h2 className="batch-title">  
        {activeTopic === "All" ? "All Topics" : activeTopic}  
      </h2>  

      <div className="vocab-grid">  
        {displayedWords.map((item, index) => {  
          const isLoved = lovedVocabs.some((w) => w.word === item.word);  
          return (  
            <div key={index} className="vocab-card">  
              <div className="card-top">  
                <h3 className="word">{item.word}</h3>  
                <div className="icons">  
                  <i  
                    className={`fa-heart ${isLoved ? "fas loved" : "far"} heart-icon`}  
                    onClick={() => toggleLove(item)}  
                  ></i>  
                  <i  
                    className="fas fa-microphone mic-icon"  
                    onClick={() => speakWord(item.word)}  
                  ></i>  
                </div>  
              </div>  

              <div className="card-body">  
                <p className="arabic">{item.arabic}</p>  
                <div style={{ display: "flex", columnGap: "5px" }}>  
                  <p className="english">{item.english}</p>  
                  <i  
                    className="fas fa-microphone mic-icon"  
                    onClick={() => speakWord(item.english)}  
                  ></i>  
                </div>  
              </div>  
            </div>  
          );  
        })}  
      </div>  
    </section>  
  </main>  

  <button className="cart-button" onClick={() => setShowCart(!showCart)}>  
    <i className="fas fa-heart"></i> My Loved Words ({lovedVocabs.length})  
  </button>  

  <div className={`cart-panel ${showCart ? "show" : ""}`}>  
    <div className="cart-header">  
      <h3>❤️ Loved Words</h3>  
      <button onClick={() => setShowCart(false)} className="close-cart">  
        <i className="fas fa-times"></i>  
      </button>  
    </div>  

    {lovedVocabs.length === 0 ? (  
      <p className="empty-cart">No loved words yet!</p>  
    ) : (  
      <ul className="cart-list">  
        {lovedVocabs.map((word, i) => (  
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
      🎯 TOEFL Companion — Vocabulary Power!  
    </p>  
  </footer>  
</div>  


);
}
