import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "./style.css";
import { toeflData } from "./data/toeflUnified";

// 🖼️ Import images
import reading1 from "./assets/reading1.jpg";
import reading2 from "./assets/reading2.jpg";
import reading3 from "./assets/reading3.jpg";
import reading4 from "./assets/reading4.jpg";

import listening1 from "./assets/listening1.jpg";
import listening2 from "./assets/listening2.jpg";
import listening3 from "./assets/listening3.jpg";
import listening4 from "./assets/listening4.jpg";
import listening5 from "./assets/listening5.jpg";

import speaking1 from "./assets/speaking1.jpg";
import speaking2 from "./assets/speaking2.jpg";
import speaking3 from "./assets/speaking3.jpg";
import speaking4 from "./assets/speaking4.jpg";

import writing1 from "./assets/writing1.jpg";
import writing2 from "./assets/writing2.jpg";
import writing3 from "./assets/writing3.jpg";
import writing4 from "./assets/writing4.jpg";
import writing5 from "./assets/writing5.jpg";

export default function ToeflCompanion() {
  const [theme, setTheme] = useState("default");

  // 🔹 Section images (multiple per section)
  const sectionImages = {
    Reading: [reading1, reading2, reading3, reading4],
    Listening: [listening1, listening2, listening3, listening4, listening5],
    Speaking: [speaking1, speaking2, speaking3, speaking4],
    Writing: [writing1, writing2, writing3, writing4, writing5],
  };

  // 🔹 Track current index of images
  const [currentImageIndex, setCurrentImageIndex] = useState({
    Reading: 0,
    Listening: 0,
    Speaking: 0,
    Writing: 0,
  });

  // 🌀 Rotate images every 3 seconds per section
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => ({
        Reading: (prev.Reading + 1) % sectionImages.Reading.length,
        Listening: (prev.Listening + 1) % sectionImages.Listening.length,
        Speaking: (prev.Speaking + 1) % sectionImages.Speaking.length,
        Writing: (prev.Writing + 1) % sectionImages.Writing.length,
      }));
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // 📄 Generate PDF (updated version)
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("TOEFL Study Plan", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(toeflData.studyMap.intro, 20, 30, { maxWidth: 170 });

    let y = 45;

    toeflData.toeflTips.forEach((section) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${section.section} Section`, 20, y);
      doc.setFont("helvetica", "normal");
      y += 7;

      section.tips.forEach((tip) => {
        const splitTip = doc.splitTextToSize(`- ${tip}`, 170);
        splitTip.forEach((line) => {
          doc.text(line, 25, y);
          y += 7;
        });
      });

      y += 5;
    });

    doc.setFont("helvetica", "bold");
    doc.text("Speaking Template:", 20, y);
    doc.setFont("helvetica", "normal");
    y += 7;
    toeflData.speakingTemplate.forEach((line) => {
      const splitLine = doc.splitTextToSize(`- ${line}`, 170);
      splitLine.forEach((text) => {
        doc.text(text, 25, y);
        y += 7;
      });
    });

    y += 5;
    doc.setFont("helvetica", "bold");
    doc.text("Writing Integrated Template:", 20, y);
    doc.setFont("helvetica", "normal");
    y += 7;
    toeflData.writingIntegratedTemplate.forEach((line) => {
      const splitLine = doc.splitTextToSize(`- ${line}`, 170);
      splitLine.forEach((text) => {
        doc.text(text, 25, y);
        y += 7;
      });
    });

    y += 5;
    doc.setFont("helvetica", "bold");
    doc.text("Writing Independent Template:", 20, y);
    doc.setFont("helvetica", "normal");
    y += 7;
    toeflData.writingIndependentTemplate.forEach((line) => {
      const splitLine = doc.splitTextToSize(`- ${line}`, 170);
      splitLine.forEach((text) => {
        doc.text(text, 25, y);
        y += 7;
      });
    });

    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text(
      "© 2025 TOEFL Companion | Designed to help you achieve your dream score!",
      20,
      y + 10
    );
    doc.save("TOEFL_Study_Plan.pdf");
  };

  // 🧩 Helper to render section
  const renderSection = (title, tips, sectionKey) => (
    <div className="card section-card" key={sectionKey}>
      <div className="section-content">
        <div className="tips">
          <h2>{title}</h2>
          <ul>
            {tips.map((tip, i) => (
              <li className="tip" key={i}>
                {tip}
              </li>
            ))}
          </ul>
        </div>
        <div className="images fade-in">
          <img
            src={sectionImages[sectionKey][currentImageIndex[sectionKey]]}
            alt={`${sectionKey} Illustration`}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className={`app-wrapper theme-${theme}`}>
      <header>
        <h1>TOEFL Companion</h1>
        <p>
          Get acquainted with the TOEFL — structure, strategies, and templates
        </p>
        <div className="controls">
          <select
            value={theme}
            style={{ borderRadius: "1pc", outline: "none" }}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="default">Classic</option>
            <option value="calm">Calm</option>
            <option value="mint">Mint</option>
          </select>
          <button onClick={generatePDF}>Download Study Plan (PDF)</button>
          <button>
            <a href="/vocabs" style={{ color: "white", textDecoration: "none" }}>
              Vocabs
            </a>
          </button>
        </div>
      </header>

      <main className="main-grid">
        {renderSection("Reading Section", toeflData.studyMap.reading, "Reading")}
        {renderSection(
          "Listening Section",
          toeflData.studyMap.listening,
          "Listening"
        )}
        {renderSection(
          "Speaking Section",
          [
            ...toeflData.studyMap.speaking.delivery,
            ...toeflData.studyMap.speaking.content,
          ],
          "Speaking"
        )}
        {renderSection(
          "Writing Section",
          [
            ...toeflData.studyMap.writing.integrated,
            ...toeflData.studyMap.writing.academicDiscussion,
          ],
          "Writing"
        )}
      </main>

      <footer>
        © 2025 ABOOD | JAMAL TOEFL Companion — Built with 💜 to help you
        succeed.
      </footer>
    </div>
  );
}
