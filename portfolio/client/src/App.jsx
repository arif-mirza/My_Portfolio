import React from "react";
import { useState, useRef, useEffect } from "react"; // Combine useState and useRef in one import//-
import AOS from "aos";
import 'aos/dist/aos.js';

import reactLogo from "./assets/react.svg";
import "./App.css";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import Experience from "./pages/Experience.jsx";
import WorkPage from "./pages/WorkPage";
import ContactPage from "./pages/ContactPage.jsx";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Loader from "./components/Loader.jsx";
import "../src/styles/Loader.css";

function App() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const workRef = useRef(null);
  const contactRef = useRef(null);

  const [loading, setloading] = useState(true);
  const [boxShadow, setBoxShadow] = useState(false);

  useEffect(() => {
    const animationDuration = 4000;
    setTimeout(() => {
      setloading(false);
      setBoxShadow("0 0 10px #4cc9f0, 0 0 10px #4cc9f0, 0 0 90px #4cc9f0");
    }, animationDuration); //
  }, []);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="content" style={{ boxShadow }}>
            <Navbar
              onScrollToSection={scrollToSection}
              homeRef={homeRef}
              aboutRef={aboutRef}
              experienceRef={experienceRef}
              workRef={workRef}
              contactRef={contactRef}
            />

            <div ref={homeRef} id="home">
              <HomePage />
            </div>
            <div ref={aboutRef} id="about">
              <AboutPage />
            </div>
            <div ref={experienceRef} id="experience">
              <Experience />
            </div>
            <div ref={workRef} id="work">
              <WorkPage />
            </div>
            <div ref={contactRef} id="contact">
              <ContactPage />
            </div>
          </div>
          
        </>
      )}
    </>
  );
}

export default App;
