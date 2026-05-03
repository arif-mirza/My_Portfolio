import React from "react";
import { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.js";
import "aos/dist/aos.css";
import { Toaster } from "react-hot-toast";

import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "../src/styles/Loader.css";

import Navbar from "./components/Navbar";
import Loader from "./components/Loader.jsx";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Experience from "./pages/Experience.jsx";
import WorkPage from "./pages/WorkPage";
import ContactPage from "./pages/ContactPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";

import { AuthProvider } from "./context/AuthContext";

// ── Portfolio single-page layout ──────────────────────────────
function PortfolioLayout() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const workRef = useRef(null);
  const contactRef = useRef(null);

  const [loading, setloading] = useState(true);
  const [boxShadow, setBoxShadow] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    const animationDuration = 4000;
    setTimeout(() => {
      setloading(false);
      setBoxShadow("0 0 10px #4cc9f0, 0 0 10px #4cc9f0, 0 0 90px #4cc9f0");
    }, animationDuration);
  }, []);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) return <Loader />;

  return (
    <div className="content" style={{ boxShadow }}>
      <Navbar
        onScrollToSection={scrollToSection}
        homeRef={homeRef}
        aboutRef={aboutRef}
        experienceRef={experienceRef}
        workRef={workRef}
        contactRef={contactRef}
      />
      <div ref={homeRef} id="home"><HomePage /></div>
      <div ref={aboutRef} id="about"><AboutPage /></div>
      <div ref={experienceRef} id="experience"><Experience /></div>
      <div ref={workRef} id="work"><WorkPage /></div>
      <div ref={contactRef} id="contact"><ContactPage /></div>
    </div>
  );
}

// ── Root App with Router + AuthProvider ───────────────────────
function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Global toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0d1b2a",
              color: "#e2e8f0",
              border: "1px solid rgba(76,201,240,0.2)",
              fontFamily: "Poppins, sans-serif",
              fontSize: "0.88rem",
            },
            success: { iconTheme: { primary: "#4cc9f0", secondary: "#0d1b2a" } },
            error:   { iconTheme: { primary: "#ef4444", secondary: "#0d1b2a" } },
          }}
        />

        <Routes>
          {/* Main portfolio */}
          <Route path="/" element={<PortfolioLayout />} />

          {/* Admin dashboard — only renders admin UI, no portfolio navbar */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Catch-all → home */}
          <Route path="*" element={<PortfolioLayout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

