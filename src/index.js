import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {  HelmetProvider } from "react-helmet-async";
import App from "./App";
import Vocabs from "./components/vocabs";
import TOEFLGuide from "./components/TOEFLGuide";
import Topics from "./components/Topics";
import PreSuf from "./components/pre-suf";
import StudyPlan from "./components/studyPlan";
import AcademicTopics from "./components/AcademicTopics";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1> Error Page</h1>,
  },
  {
    path: "/Vocabs",
    element: <Vocabs />,
  },
  {
    path: "/TOEFLGuide",
    element: <TOEFLGuide />,
  },
  {
    path: "/Topics",
    element: <Topics />,
  },
  {
    path: "/pre-suf",
    element: <PreSuf />,
  },
  {
    path: "/studyPlan",
    element: <StudyPlan />,
  },
  {
    path: "/AcademicTopics",
    element: <AcademicTopics />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HelmetProvider>
    <RouterProvider router={router} />
  </HelmetProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
