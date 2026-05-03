import React, { useEffect, useState } from "react";
import "../styles/Workpage.css";
import Work_1 from "../components/work_1";
import Project_card from "../components/Project_card.jsx";
import Button from "../components/Button";
import AOS from "aos";
import "aos/dist/aos.css";
import { useProjects } from "../hooks/useProjects";
import { useWorks } from "../hooks/useWorks";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonCard() {
  return (
    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
      <SkeletonTheme baseColor="#1e1e24" highlightColor="#2a2a35">
        <Skeleton height={200} style={{ borderRadius: "8px", marginBottom: "16px" }} />
        <Skeleton height={22} width="70%" style={{ borderRadius: "4px", marginBottom: "12px" }} />
        <Skeleton height={16} width="90%" count={2} style={{ borderRadius: "4px", marginBottom: "6px" }} />
      </SkeletonTheme>
    </div>
  );
}

function SkeletonFeaturedWork() {
  return (
    <div className="container py-5">
      <SkeletonTheme baseColor="#1e1e24" highlightColor="#2a2a35">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="ms-md-5">
                  <Skeleton height={20} width="30%" style={{ marginBottom: "10px", borderRadius: "4px" }} />
                  <Skeleton height={35} width="60%" style={{ marginBottom: "20px", borderRadius: "4px" }} />
                  <Skeleton height={120} style={{ borderRadius: "12px", marginBottom: "20px" }} />
                  <Skeleton height={20} width="80%" style={{ marginBottom: "20px", borderRadius: "4px" }} />
                  <div style={{ display: "flex", gap: "15px" }}>
                    <Skeleton height={40} width={40} circle={true} />
                    <Skeleton height={40} width={150} style={{ borderRadius: "8px" }} />
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 center-div mt-4 mt-md-0">
                <Skeleton height={350} style={{ borderRadius: "16px", width: "100%" }} />
              </div>
            </div>
          </div>
        </div>
      </SkeletonTheme>
    </div>
  );
}

function WorkPage() {
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [visibleWorks, setVisibleWorks] = useState(3);

  const { projects: apiProjects, loading: projLoading, error: projError } = useProjects({ type: "FEATURED" });
  const { works: apiWorks, loading: worksLoading, error: worksError } = useWorks();

  useEffect(() => {
    AOS.init({ duration: 500, once: false });
    window.addEventListener("scroll", AOS.refresh);
    return () => window.removeEventListener("scroll", AOS.refresh);
  }, []);

  function createWork(myWork) {
    return (
      <Work_1
        key={myWork.id}
        title={myWork.title}
        description={myWork.description || myWork.info}
        tech={myWork.tech}
        img={myWork.img || myWork.imageUrl || null}
        link={myWork.link || myWork.githubUrl}
        live={myWork.live || myWork.liveUrl}
      />
    );
  }

  function createCard(card) {
    return (
      <Project_card
        key={card.id}
        title={card.title}
        link={card.link || card.githubUrl}
        live={card.live || card.liveUrl}
        info={card.info || card.description}
        tech={card.tech}
      />
    );
  }

  return (
    <>
      <div className="py-5">
        {/* Section heading */}
        <div className="container py-5">
          <div className="row text-center">
            <div className="col-12">
              <h1 id="section-title-05" data-aos="fade-right">Projects</h1>
              <h1 id="section-title-06" data-aos="fade-left">Projects</h1>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="work-info">
                <h2 className="work-name">Something I've built</h2>
                <hr className="work-line" />
              </div>
            </div>
          </div>
        </div>

        {projLoading ? (
          <div>
            {[1, 2].map((n) => <SkeletonFeaturedWork key={n} />)}
          </div>
        ) : projError ? (
          <div className="container text-center" style={{ color: "#9fa2ab" }}>Failed to load projects.</div>
        ) : apiProjects.length === 0 ? (
          <div className="container text-center" style={{ color: "#9fa2ab" }}>No projects found.</div>
        ) : (
          <div className="container">
            {apiProjects.slice(0, visibleProjects).map(createWork)}
          </div>
        )}

        {!projLoading && apiProjects.length > visibleProjects && (
          <div className="container py-3 text-center">
            <Button text="See More" className="fw-bold px-5" onClick={() => setVisibleProjects((p) => p + 3)} />
          </div>
        )}

        {/* Other Projects */}
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

        <div className="container" id="card-container">
          <div className="row">
            <div className="col">
              {worksLoading ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
                  {[1, 2, 3, 4].map((n) => <SkeletonCard key={n} />)}
                </div>
              ) : worksError ? (
                <div className="text-center" style={{ color: "#9fa2ab" }}>Failed to load works.</div>
              ) : apiWorks.length === 0 ? (
                <div className="text-center" style={{ color: "#9fa2ab" }}>No works found.</div>
              ) : (
                apiWorks.slice(0, visibleWorks).map(createCard)
              )}
            </div>
          </div>
        </div>

        {/* See More Works */}
        {!worksLoading && apiWorks.length > visibleWorks && (
          <div className="container py-5 text-center">
            <div className="row">
              <div className="col">
                <Button text="See More" className="fw-bold px-5" onClick={() => setVisibleWorks((p) => p + 6)} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default WorkPage;
