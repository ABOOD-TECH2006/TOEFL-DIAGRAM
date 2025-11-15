import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "./components/style/style.css";
import { toeflData } from "./data/toeflUnified";
// import TodoList from "./components/TodoList";
// 🖼️ Import images
import reading1 from "./assets/reading1.jpg";
import reading2 from "./assets/reading2.jpg";
import reading3 from "./assets/reading3.jpg";
import reading4 from "./assets/reading4.jpg";
import reading5 from "./assets/reading5.jpg";
import reading6 from "./assets/reading6.jpg";
import reading7 from "./assets/reading7.jpg";
import reading8 from "./assets/reading8.jpg";
import reading9 from "./assets/reading9.jpg";
import reading10 from "./assets/reading10.jpg";
import reading11 from "./assets/reading11.jpg";
import reading12 from "./assets/reading12.jpg";
import reading13 from "./assets/reading13.jpg";
import reading14 from "./assets/reading14.jpg";
import reading15 from "./assets/reading15.jpg";
import reading16 from "./assets/reading16.jpg";
import reading17 from "./assets/reading17.jpg";
import reading18 from "./assets/reading4.jpg";

import listening1 from "./assets/listening1.jpg";
import listening2 from "./assets/listening2.jpg";
import listening3 from "./assets/listening3.jpg";
import listening4 from "./assets/listening4.jpg";
import listening5 from "./assets/listening5.jpg";
import listening6 from "./assets/listening6.jpg";
import listening7 from "./assets/listening7.jpg";
import listening8 from "./assets/listening8.jpg";
import listening9 from "./assets/listening9.jpg";
import listening10 from "./assets/listening10.jpg";
import listening11 from "./assets/listening11.jpg";
import listening12 from "./assets/listening12.jpg";
import listening13 from "./assets/listening13.jpg";
import listening14 from "./assets/listening14.jpg";

import speaking1 from "./assets/speaking1.jpg";
import speaking2 from "./assets/speaking2.jpg";
import speaking3 from "./assets/speaking3.jpg";
import speaking4 from "./assets/speaking4.jpg";

import writing1 from "./assets/writing1.jpg";
import writing2 from "./assets/writing2.jpg";
import writing3 from "./assets/writing3.jpg";
import writing4 from "./assets/writing4.jpg";
import writing5 from "./assets/writing5.jpg";
import writing6 from "./assets/writing6.jpg";
import writing7 from "./assets/writing7.jpg";
import writing8 from "./assets/writing8.jpg";
import writing9 from "./assets/writing9.jpg";
// import writing10 from "./assets/writing10.jpg";
import writing11 from "./assets/writing11.jpg";
import writing12 from "./assets/writing12.jpg";
import writing13 from "./assets/writing13.jpg";
import writing14 from "./assets/writing14.jpg";
import writing15 from "./assets/writing15.jpg";
import writing16 from "./assets/writing16.jpg";
import writing17 from "./assets/writing17.jpg";
import writing18 from "./assets/writing18.jpg";
import writing19 from "./assets/writing19.jpg";
import writing20 from "./assets/writing20.jpg";

export default function ToeflCompanion() {

  // 🔹 Section images (multiple per section)
  const sectionImages = {
    Reading: [
      reading1,
      reading2,
      reading3,
      reading4,
      reading5,
      reading6,
      reading7,
      reading8,
      reading9,
      reading10,
      reading11,
      reading12,
      reading13,
      reading14,
      reading15,
      reading16,
      reading17,
      reading18,
    ],
    Listening: [
      listening1,
      listening2,
      listening3,
      listening4,
      listening5,
      listening6,
      listening7,
      listening8,
      listening9,
      listening10,
      listening11,
      listening12,
      listening13,
      listening14,
    ],
    Speaking: [speaking1, speaking2, speaking3, speaking4],
    Writing: [
      writing1,
      writing2,
      writing3,
      writing4,
      writing5,
      writing6,
      writing7,
      writing8,
      writing9,
      writing11,
      writing12,
      writing13,
      writing14,
      writing15,
      writing16,
      writing17,
      writing18,
      writing19,
      writing20,
    ],
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
  }, [
    sectionImages.Reading.length,
    sectionImages.Listening.length,
    sectionImages.Speaking.length,
    sectionImages.Writing.length,
  ]);

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
    <div className={`app-wrapper`}>
      <header>
        <h1>TOEFL Companion</h1>
        <p>
          Get acquainted with the TOEFL — structure, strategies, and templates
        </p>
        <div className="controls">
          <div className="group">
            <button onClick={generatePDF}>Download Study Plan (PDF)</button>
            <button>
              <a
                href="/studyPlan"
                style={{ color: "white", textDecoration: "none" }}
              >
                Study Plan
              </a>
            </button>
            <button>
              <a
                href="/vocabs"
                style={{ color: "white", textDecoration: "none" }}
              >
                Vocabs
              </a>
            </button>
            <button>
              <a
                href="/Topics"
                style={{ color: "white", textDecoration: "none" }}
              >
                Vocabs For Topics
              </a>
            </button>
            <button>
              <a
                href="/AcademicTopics"
                style={{ color: "white", textDecoration: "none" }}
              >
                Academic Topics
              </a>
            </button>
          </div>
          <div className="group">
            <button>
              <a
                href="/pre-suf"
                style={{ color: "white", textDecoration: "none" }}
              >
                prefix/suffix
              </a>
            </button>
            <button>
              <a
                href="/TOEFLGuide"
                style={{ color: "white", textDecoration: "none" }}
              >
                TOEFL Guide
              </a>
            </button>
          </div>
        </div>
      </header>
      <main className="main-grid">
        {renderSection(
          "Reading Section",
          toeflData.studyMap.reading,
          "Reading"
        )}
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
