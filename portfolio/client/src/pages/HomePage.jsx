import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/Homepage.css";
import Button from "../components/Button";
import Banner from "../components/Banner";
import TypingEffect from "../components/TypingEffect";

function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 1300, // Set global animation duration
      offset: 190, // Set the offset (trigger point for animations)
      once: false,
      easing: "easeInOut", // Easing function (linear, ease, ease-in-out, etc.)
      delay: 100, // Global delay for all animations (in milliseconds)

      mirror: true, // Should the animation happen again when scrolling up?
      anchorPlacement: "top-bottom", // Ensure animations only happen once per scroll
    });
  }, []);

  const email = "arifmirza3332@gmail.com";
  const subject = "Inquiry from Portfolio";
  const body = "Hello, I would like to discuss...";

  return (
    <>
      {/* <Navbar /> */}
      <div className="py-3">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8">
              <div
                className="main-sec d-flex align-items-center"
                data-aos="fade-right"
              >
                <div
                  className="d-flex justify-content-center align-items-center"
                  id="social-Icons"
                  data-aos="fade-in"
                  data-aos-delay="200"
                >
                  <a href="https://api.whatsapp.com/send?phone=923056223332">
                    <i className="fa-brands fa-whatsapp"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/muhammad-arif-mirza-1185362b8/">
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                  <a href="https://github.com/arif-mirza">
                    <i className="fa-brands fab fab fa-github"></i>
                  </a>
                  {/* <a href="https://www.facebook.com/profile.php?id=100093423030695"> */}
                  <a href="https://www.facebook.com/profile.php?id=61585366285890">
                    <i className="fab fa-facebook"></i>
                  </a>
                  {/* <a href="https://www.instagram.com/">
                    <i className="fab fa-instagram"></i>
                  </a> */}
                  <a href="https://leetcode.com/u/mirzaarif/">
                    <i class="fa-brands fa-leetcode"></i>
                  </a>
                </div>
                <div
                  className="home-content"
                  id="home-content"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <h5 style={{ color: "#9fa2ab" }}>Hi, my name is</h5>
                  <h1 id="name">Muhammad Arif Mirza</h1>
                  <p className="fw-bold typing-effect">
                    I'm a{" "}
                    <span id="typing-effect">
                      <TypingEffect
                        strings={[
                          "CS Student",
                          "MERN stack Developer",
                          "Data structure Problem Solver",
                          "Team Player",
                          "Backend Developer",
                          "Frontend Developer",
                        ]}
                        typeSpeed={20}
                        backSpeed={15}
                        delay={60}
                        loop={true}
                      />
                    </span>
                  </p>
                  <p style={{ color: "#9fa2ab" }}>
                    I'm a Computer Science student and passionate full-stack
                    developer specializing in the MERN stack. I love building
                    modern, responsive web applications and exploring innovative
                    technologies that solve real-world problems.
                  </p>
                  <a
                    href={`mailto:${email}?subject=${encodeURIComponent(
                      subject
                    )}&body=${encodeURIComponent(body)}`}
                  >
                    <Button text="Contact me" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div
                className="img-container d-flex justify-content-center align-items-center mt-4"
                data-aos="zoom-out"
                data-aos-delay="800"
              >
                <Banner />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
