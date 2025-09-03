import react from "react";
import { useState, useEffect } from "react";
import "../styles/AboutPage.css";
import aboutimg from "../assets/images/about-img.png";
import Button from "../components/Button";
import html from "../assets/icons/html.png";
import css from "../assets/icons/css.png";
import github from "../assets/icons/github.png";
import scss from "../assets/icons/scss.png";
import sass from "../assets/icons/sass.png";
import antDesign from "../assets/icons/aunt-Design.png";
import bootstrap from "../assets/icons/bootstrap.png";
import reactImg from "../assets/icons/react.png";
import reactNative from "../assets/icons/react-native.png";
import firebase from "../assets/icons/firebase.png";
import node from "../assets/icons/node.png";
import expressjs from "../assets/icons/express.png";
import mongodb from "../assets/icons/mongodb.png";
import git from "../assets/icons/git.png";
import restApi from "../assets/icons/restapi.png";
import javascript from "../assets/icons/javascript.png";
import CV from "../assets/images/Muhammad Arif Official(M).pdf";
import redux from "../assets/icons/redux.png";
import yup from "../assets/icons/yup.png";
import AOS from "aos";
import "aos/dist/aos.css";

import TypingEffect from "../components/TypingEffect";

{
  /* <h3 class="counter" data-target="3000"></h3> */
}

function AboutPage(props) {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 500, // Animation duration in milliseconds
      once: false, // Allow animation to happen multiple times
    });

    // Reset animations on scroll
    window.addEventListener("scroll", AOS.refresh);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", AOS.refresh);
    };
  }, []);

  useEffect(() => {
    // counter functionallity
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
      //  console.log(counter);
      counter.innerHTML = 0;
      const updateCounter = () => {
        const startingCount = Number(counter.innerHTML);

        const targetCount = +counter.getAttribute("data-target");

        const incr = targetCount / 100;
        if (startingCount < targetCount) {
          counter.innerHTML = `${startingCount + incr}`;
        }
        // console.log(targetCount);
        setTimeout(updateCounter, 10);
      };

      updateCounter();
    });
  }, []);

  // const createItem = (item) => {
  //   return (
  //     <SingleItem
  //     icon = {props.icon}
  //     title = {item.title}
  //     id={props.id}

  //     />
  //   )
  // }

  return (
    <>
      <div className="py-5" id="#About">
        <div className="container py-5">
          <div className="row text-center">
            <div className="col-12">
              <h1 id="section-title-01" data-aos="fade-right">
                About Me
              </h1>
              <h1 id="section-title-02" data-aos="fade-left">
                About Me
              </h1>
            </div>
          </div>
        </div>

        {/* 2 */}
        <div className="container">
          <div className="row">
            {/* image sec */}
            <div className="col-12 col-md-4">
              <div className="img-sec" id="center-div">
                <img src={aboutimg} alt="" />
              </div>
            </div>
            {/* content sec */}
            <div className="col-12 col-md-8 d-flex justify-content-start align-items-center flex-column">
              <div className="info" style={{ color: "#9fa2ab" }}>
                <h2
                  className="mb-4 fw-bold about-name text-white"
                  data-aos="fade-left"
                >
                  Hello I'm Muhammad Arif Mirza
                </h2>
                <h5 className="sec-about">
                  A Lead{" "}
                  <span>
                    <TypingEffect
                      strings={[
                        "Software Engineer",
                        "MERN stack Developer",
                        "Mobile Application Developer",
                      ]}
                      typeSpeed={40}
                      backSpeed={50}
                      loop={true}
                    />
                  </span>{" "}
                  based in Faisalabad,Pakistan
                </h5>
                <p data-aos="fade-left">
                  Hello! I'm Mirza Arif, a full-stack software engineer from
                  Faisalabad, PK.
                </p>
                <p data-aos="fade-right">
                  I have expertise in Web Applications(MERN), and Mobile
                  Application(React Native).I bring a diverse background, having
                  worked collaboratively in teams professionally, participated
                  in International Hackathons, worked independently as a
                  freelancer.
                </p>

                <p data-aos="fade-right">
                  {" "}
                  I study Web Application Development and Mobile Applicaiton
                  Development in{" "}
                  <a href="" className="hover-link-effect">
                    Saylani Mass IT training (SMIT)
                  </a>{" "}
                  gaining expertise in building dynamic, responsive, and
                  user-friendly applications that cater to modern digital needs.
                </p>

                <p>
                  Currently pursuing a BS in Computer Science at{" "}
                  <a href="" className="hover-link-effect">
                    Virtual University
                  </a>
                  , with a strong commitment to furthering my education and
                  expanding my expertise in the field.
                </p>

                {/* counters */}
                <div className="list-sec" data-aos="zoom-out">
                  <ul className="professional-list">
                    <li className="list-item">
                      <h3 className="counterr" data-target="5+">
                        1+
                      </h3>
                      <span>
                        Years of
                        <br /> Experiance
                      </span>
                    </li>

                    <li className="list-item">
                      <h3 className="counter" data-target="50"></h3>
                      <span>
                        Happy
                        <br /> Clients
                      </span>
                    </li>

                    <li className="list-item">
                      <h3 className="counter" data-target="100"></h3>
                      <span>
                        Success
                        <br /> Projects
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col">
                <h2 className="about-name fw-bold mt-5 text-white">
                  Technologies
                </h2>
                <p>
                  Here are a few technologies I've been working with recently:
                </p>
                <div className="container list-container">
                  <div className="row tech-main-sec">
                    <div
                      className=" col"
                      data-aos="zoom-out"
                      data-aos-duration="1000"
                    >
                      <ul className="tect-list">
                        <div className="new-div">
                          <li className="list-1">
                            <div className="img ">
                              <img src={javascript} alt="" />
                            </div>
                            <div className="info">JavaScript</div>
                          </li>
                        </div>
                        <li className="list-2">
                          <div className="img ">
                            <img src={html} alt="" />
                          </div>
                          <div className="info">HTML</div>
                        </li>
                        <li className="list-3">
                          <div className="img ">
                            <img src={css} alt="" />
                          </div>
                          <div className="info">CSS3</div>
                        </li>
                        <li className="list-4">
                          <div className="img ">
                            <img src={git} alt="" />
                          </div>
                          <div className="info">Git</div>
                        </li>
                        <li className="list-5">
                          <div className="img ">
                            <img src={github} alt="" />
                          </div>
                          <div className="info">Github</div>
                        </li>
                        <li className="list-6">
                          <div className="img ">
                            <img src={sass} alt="" />
                          </div>
                          <div className="info">Sass</div>
                        </li>
                        <li className="list-7">
                          <div className="img ">
                            <img src={scss} alt="" />
                          </div>
                          <div className="info">Scss</div>
                        </li>
                        <li className="list-8">
                          <div className="img ">
                            <img src={bootstrap} alt="" />
                          </div>
                          <div className="info">Bootstrap</div>
                        </li>
                        <li className="list-9">
                          <div className="img ">
                            <img src={redux} alt="" />
                          </div>
                          <div className="info">Redux</div>
                        </li>
                        <li className="list-1">
                          <div className="img ">
                            <img src={reactImg} alt="" />
                          </div>
                          <div className="info">React</div>
                        </li>
                        <li className="list-1">
                          <div className="img ">
                            <img src={expressjs} alt="" />
                          </div>
                          <div className="info">Express-JS</div>
                        </li>
                        <li className="list-1">
                          <div className="img ">
                            <img src={mongodb} alt="" />
                          </div>
                          <div className="info">Mongo-DB</div>
                        </li>
                        <li className="list-1">
                          <div className="img ">
                            <img src={antDesign} alt="" />
                          </div>
                          <div className="info">Ant-Design</div>
                        </li>
                        <li className="list-1">
                          <div className="img ">
                            <img src={reactNative} alt="" />
                          </div>
                          <div className="info">React-Native</div>
                        </li>
                        <li className="list-1">
                          <div className="img ">
                            <img src={firebase} alt="" />
                          </div>
                          <div className="info">Firebase</div>
                        </li>
                        <li className="list-1">
                          <div className="img ">
                            <img src={node} alt="" />
                          </div>
                          <div className="info">Node-JS</div>
                        </li>
                        <li className="list-1">
                          <div className="img ">
                            <img src={restApi} alt="" />
                          </div>
                          <div className="info">Rest-APIs</div>
                        </li>
                        <li className="list-1">
                          <div className="img ">
                            <img src={yup} alt="" />
                          </div>
                          <div className="info">YUP Validation</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "center" }} className="mt-5 end-sec">
                  <div className="btn-sec fw-bold px-2 py-3 d-flex  align-items-center">
                    <a href={CV} target="_blank" rel="noopener noreferrer">
                      <Button text="Download CV" className="fw-bold px-5" />{" "}
                    </a>
                    <div className="social-icons mx-5" id="about-social-Icons">
                      <a href="https://api.whatsapp.com/send?phone=923056223332">
                        <i className="fa-brands fa-whatsapp"></i>
                      </a>
                      <a href="https://www.linkedin.com/in/muhammad-arif-mirza-1185362b8/">
                        <i className="fa-brands fa-linkedin"></i>
                      </a>
                      <a href="https://github.com/arif-mirza">
                        <i className="fa-brands fab fab fa-github"></i>
                      </a>
                      <a href="https://www.facebook.com/profile.php?id=100093423030695">
                        <i className="fab fa-facebook"></i>
                      </a>
                      <a href="">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2 end */}
        </div>
      </div>
    </>
  );
}

export default AboutPage;
