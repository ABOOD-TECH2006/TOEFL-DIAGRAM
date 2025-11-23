import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import Vocabs from "./components/vocabs";
import TOEFLGuide from "./components/TOEFLGuide";
import Topics from "./components/Topics";
import PreSuf from "./components/pre-suf";
import StudyPlan from "./components/studyPlan";
import AcademicTopics from "./components/AcademicTopics";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <HelmetProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Vocabs" element={<Vocabs />} />
        <Route path="/TOEFLGuide" element={<TOEFLGuide />} />
        <Route path="/Topics" element={<Topics />} />
        <Route path="/pre-suf" element={<PreSuf />} />
        <Route path="/studyPlan" element={<StudyPlan />} />
        <Route path="/AcademicTopics" element={<AcademicTopics />} />
        <Route path="*" element={<h1>Error Page</h1>} />
      </Routes>
    </HashRouter>
  </HelmetProvider>
);

// 🔥 Auto-Update PWA
serviceWorkerRegistration.register({
  onUpdate: (registration) => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      window.location.reload();
    }
  },
});
