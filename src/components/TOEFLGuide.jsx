import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./style/TOEFLGuide.css";
import { Helmet } from "react-helmet-async";

const TOEFLGuide = () => {
  const [query, setQuery] = useState("");
  const [openSection, setOpenSection] = useState(null);
  const [openQuestion, setOpenQuestion] = useState({});

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  const toggleQuestion = (sectionId, index) => {
    setOpenQuestion((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId] === index ? null : index,
    }));
  };

  const sections = [
    {
      id: "reading",
      title: "Reading Section",
      time: "35 minutes",
      questions: "20 questions",
      types: [
        {
          name: "Vocabulary questions",
          explanation: "You identify meanings of words or phrases in context.",
        },
        {
          name: "Inference questions",
          explanation:
            "You deduce information not directly stated but implied in the text.",
        },
        {
          name: "Main idea questions",
          explanation:
            "You determine the central concept or purpose of the passage.",
        },
        {
          name: "Reference and detail questions",
          explanation:
            "You locate specific information and connect it to the text meaning.",
        },
      ],
      tips: "Read for main ideas and details. Skim first, then scan for key information.",
      description:
        "You’ll read 2 academic passages (around 700 words each) and answer comprehension questions testing understanding, inference, and vocabulary.",
    },
    {
      id: "listening",
      title: "Listening Section",
      time: "36 minutes",
      questions: "28–39 questions",
      types: [
        {
          name: "Main idea and detail questions",
          explanation:
            "Identify the central theme and supporting information in audio.",
        },
        {
          name: "Function and attitude questions",
          explanation:
            "Recognize tone, intent, and the speaker’s attitude or purpose.",
        },
        {
          name: "Inference questions",
          explanation:
            "Understand implied meanings and logical conclusions in conversations.",
        },
        {
          name: "Organization questions",
          explanation:
            "Identify how the lecture or conversation is structured logically.",
        },
      ],
      tips: "Take short notes and focus on transitions. Recognize tone and speaker attitude.",
      description:
        "Listen to lectures and conversations, and answer questions about main ideas, details, and implied meanings.",
    },
    {
      id: "speaking",
      title: "Speaking Section",
      time: "16 minutes",
      questions: "4 tasks",
      types: [
        {
          name: "Independent speaking task",
          explanation:
            "You express personal opinions on a familiar topic within 45 seconds.",
        },
        {
          name: "Integrated reading & listening task",
          explanation:
            "You read a short passage, listen to a talk, and summarize both.",
        },
        {
          name: "Integrated listening & speaking task",
          explanation:
            "You listen to a conversation or lecture and respond orally.",
        },
        {
          name: "Campus situation discussion",
          explanation:
            "You comment on student life or university situations in short dialogues.",
        },
      ],
      tips: "Organize your response: introduction → reasons → example → conclusion.",
      description:
        "Express opinions and summarize information from reading and listening materials. Record your answers in 45–60 seconds.",
    },
    {
      id: "writing",
      title: "Writing Section",
      time: "29 minutes",
      questions: "2 tasks",
      types: [
        {
          name: "Integrated writing task (read + listen + write)",
          explanation:
            "You read and listen to materials, then summarize the relationship between them.",
        },
        {
          name: "Independent essay task (give opinion)",
          explanation:
            "You write an essay expressing your viewpoint on a familiar issue.",
        },
      ],
      tips: "Plan before writing. Focus on structure, coherence, and clear examples.",
      description:
        "Write two essays: one summarizing reading/listening, and one giving your opinion on a topic.",
    },
  ];

  const motivations = [
    {
      quote:
        "✨ Every section mastered brings you closer to your dream university.",
      author: "ETS Mentor",
    },
    {
      quote:
        "🚀 Your TOEFL score opens doors to over 11,000 universities worldwide!",
      author: "Global Education Board",
    },
    {
      quote:
        "💡 Study with persistence. Success comes from consistency, not intensity.",
      author: "Language Expert",
    },
    {
      quote: "🌍 The TOEFL isn’t just a test — it’s a passport to opportunity.",
      author: "Scholar Abroad",
    },
  ];

  const advices = [
    {
      title: "🎯 Focus on Skills, Not Tricks",
      message:
        "Develop your academic English — reading, listening, and writing — not shortcuts. Real skill lasts longer than hacks.",
    },
    {
      title: "🕐 Time Management is Key",
      message:
        "Practice with timers. Learn to read quickly, think clearly, and speak within the time limit.",
    },
    {
      title: "📖 Practice Integrated Thinking",
      message:
        "Combine reading, listening, and writing practice. TOEFL rewards connections between skills.",
    },
    {
      title: "💬 Speak Every Day",
      message:
        "Don’t memorize — communicate naturally. Record yourself and refine fluency and pronunciation.",
    },
  ];

  const filteredSections = sections.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="toefl-page">
      <Helmet>
        <title>ABOOD | Toefl Guide </title>
        <meta name="description" content="The Toefl Guide For Toefl" />
      </Helmet>
      <motion.header
        className="header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="logo">
          🧠 TOEFL Mastery <span>— Get Acquainted in Minutes</span>
        </h2>
        <input
          type="text"
          className="search-bar"
          placeholder="🔍 Search sections..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </motion.header>
      <section className="content">
        <div className="section-grid">
          {filteredSections.map((section, i) => (
            <motion.div
              key={section.id}
              className="section-card"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <h3>{section.title}</h3>
              <p className="info">
                ⏱ {section.time} • {section.questions}
              </p>
              <p>{section.description}</p>

              <button
                className="toggle-btn"
                onClick={() => toggleSection(section.id)}
              >
                {openSection === section.id
                  ? "▼ Hide Question Types"
                  : "▶ Show Question Types"}
              </button>

              <AnimatePresence>
                {openSection === section.id && (
                  <motion.ul
                    className="question-types"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {section.types.map((type, index) => (
                      <li key={index} className="question-item">
                        <div
                          className="question-header"
                          onClick={() => toggleQuestion(section.id, index)}
                        >
                          <span>🧩 {type.name}</span>
                          <span className="arrow">
                            {openQuestion[section.id] === index ? "▲" : "▶"}
                          </span>
                        </div>
                        <AnimatePresence>
                          {openQuestion[section.id] === index && (
                            <motion.p
                              className="question-explanation"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                            >
                              {type.explanation}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>

              <p className="tips">💡 {section.tips}</p>
            </motion.div>
          ))}
        </div>

        {/* Motivations */}
        <div className="motivation-container">
          <h2 className="motivation-title">Motivation Corner 🌟</h2>
          <div className="motivation-grid">
            {motivations.map((m, i) => (
              <motion.div
                key={i}
                className="motivation-card"
                initial={{ opacity: 0, rotateY: 90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <p className="quote">“{m.quote}”</p>
                <p className="author">— {m.author}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Advice Section */}
        {/* Advice Section */}
        <div className="advice-container">
          <h2 className="advice-title">Expert Advice 💬</h2>
          <p className="advice-subtitle">
            Learn from top TOEFL mentors — small strategies that make a huge
            difference.
          </p>

          <div className="advice-grid">
            {advices.map((a, i) => (
              <motion.div
                key={i}
                className="advice-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ duration: 0.4, delay: i * 0.2 }}
              >
                <div className="advice-icon">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <h3>{a.title}</h3>
                <p>{a.message}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <footer className="footer">
        <p>
          © 2025 <span className="brand">ABOOD | JAMAL</span>
        </p>
        <p className="quote-footer">
          🎯 Consistency beats intensity — study smart, not just hard.
        </p>
      </footer>
    </div>
  );
};

export default TOEFLGuide;
