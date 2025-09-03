import React, { useEffect } from "react";
import "../styles/Workpage.css";
import work1 from "../assets/images/work-1.png";
import Works_imgs from "../components/Works_imgs";
import AOS from "aos";
import "aos/dist/aos.css";
import Button from "./Button";

function work_1(props) {
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

  return (
    <>
      <div className="container py-5" data-aos="zoom-in">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-6">
                <div className="work1-info ms-5" style={{ color: "#9fa2ab" }}>
                  <p style={{ color: "#4cc9f0" }} className="mb-0">
                    Featured Project
                  </p>
                  <h4 className="mb-4">{props.title}</h4>
                  <div className="glassmorphism">
                    <p className="mb-0">{props.description} </p>
                  </div>
                  <p className="tech">{props.tech}</p>
                  <div className="work-icon">
                    <a
                      href={props.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i class="fab fa-github"></i>
                    </a>
                    <a
                      href={props.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="button-10">View live Project</button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-6 center-div">
                <div className="work-img">
                  <img src={props.img} alt="workImages" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default work_1;
