import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
import Vocabs from "./vocabs"
import TOEFLGuide from "./TOEFLGuide"
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1> Error Page</h1>,
  },
  {
    path: "/Vocabs",
    element: <Vocabs/>,
  },  {
    path: "/TOEFLGuide",
    element: <TOEFLGuide/>,
  },])
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
