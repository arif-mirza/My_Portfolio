import React, { useEffect, useState } from "react";
import "../styles/Workpage.css";
import work1 from "../assets/images/work-1.png";
import Work_1 from "../components/work_1";
import Works from "../DB/works.js";
import myWorks from "../DB/works.js";
import Project_card from "../components/Project_card.jsx";
import ProjectCards from "../DB/project_card.js";
import Button from "../components/Button";
import AOS from "aos";
import "aos/dist/aos.css";

function WorkPage() {
  const [visibleCards, setVisibleCards] = useState(6);
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

  function createWork(myWork) {
    return (
      <Work_1
        key={myWork.id}
        title={myWork.title}
        description={myWork.description}
        tech={myWork.tech}
        img={myWork.img}
        link={myWork.link}
        live={myWork.live}
      />
    );
  }

  function createCard(ProjectCard) {
    return (
      <Project_card
        key={ProjectCard.id}
        title={ProjectCard.title}
        link={ProjectCard.link}
        live={ProjectCard.live}
        info={ProjectCard.info}
        tech={ProjectCard.tech}
      />
    );
  }
  const handleSeeMore = () => {
    setVisibleCards((prev) => prev + 6);
    console.log("see more clicked");
  };

  return (
    <>
      <div className="py-5">
        <div className="container py-5">
          <div className="row text-center">
            <div className="col-12">
              <h1 id="section-title-05" data-aos="fade-right">
                Projects
              </h1>
              <h1 id="section-title-06" data-aos="fade-left">
                Projects
              </h1>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="work-info">
                <h2 className="work-name">Somethings I've built</h2>
                <hr className="work-line" />
              </div>
            </div>
          </div>
        </div>

        {myWorks.map(createWork)}

        <div className="container py-5">
          <div className="row">
            <div className="col-12">
              <div className="work-info">
                <h2 className="work-name">Some Other Projects</h2>
                <hr className="work-line" />
              </div>
            </div>
          </div>
        </div>

        <div className="container " id="card-container">
          <div className="row">
            <div className="col">
              {ProjectCards.slice(0, visibleCards).map(createCard)}
            </div>
          </div>
        </div>

        <div className="container py-5 text-center">
          <div className="row">
            <div className="col">
              <div className="see-more">
                <Button
                  text="See More"
                  className="fw-bold px-5"
                  onClick={handleSeeMore}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WorkPage;
