import { useState, useEffect } from "react";
import "../styles/Experience.css";
import SkillBtn from "../components/SkillBtn";
import { useExperience } from "../hooks/useExperience";
import AOS from "aos";
import "aos/dist/aos.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Experience() {
  const { experiences: apiExperiences, loading, error } = useExperience();
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 500, once: false });
    window.addEventListener("scroll", AOS.refresh);
    return () => window.removeEventListener("scroll", AOS.refresh);
  }, []);

  // Set initial active tab
  useEffect(() => {
    if (apiExperiences && apiExperiences.length > 0 && !activeId) {
      setActiveId(apiExperiences[0].id);
    }
  }, [apiExperiences, activeId]);

  return (
    <>
      <div className="py-5">
        <div className="container py-5">
          <div className="row text-center">
            <div className="col-12">
              <h1 id="section-title-03" data-aos="fade-right">
                Experience
              </h1>
              <h1 id="section-title-04" data-aos="fade-left">
                Experience
              </h1>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="skill-info">
                <h2 className="skill-name">Where I've Worked</h2>
                <hr className="skill-line" />
              </div>
            </div>
          </div>
        </div>
        <div className="container py-5">
          {loading ? (
            <SkeletonTheme baseColor="#1e1e24" highlightColor="#2a2a35">
              <div className="row">
                <div className="col-12 col-md-3">
                  <div className="skill-btns">
                    {[1, 2, 3, 4].map((n) => (
                      <Skeleton key={n} height={50} style={{ marginBottom: "10px", borderRadius: "8px" }} />
                    ))}
                  </div>
                </div>
                <div className="col-12 col-md-9">
                  <div className="tabs-info ms-5">
                    <Skeleton height={32} width="60%" style={{ marginBottom: "8px" }} />
                    <Skeleton height={20} width="40%" style={{ marginBottom: "24px" }} />
                    <Skeleton count={4} style={{ marginBottom: "12px" }} />
                    <Skeleton height={200} style={{ marginTop: "24px", borderRadius: "8px" }} />
                  </div>
                </div>
              </div>
            </SkeletonTheme>
          ) : error ? (
             <div style={{ color: "#9fa2ab", textAlign: "center" }}>Error fetching data.</div>
          ) : apiExperiences.length === 0 ? (
             <div style={{ color: "#9fa2ab", textAlign: "center" }}>No experiences found.</div>
          ) : (
            <div className="row">
              <div className="col-12 col-md-3">
                <div className="skill-btns">
                  {apiExperiences.map((exp) => (
                    <SkillBtn
                      key={exp.id}
                      label={exp.label}
                      isActive={activeId === exp.id}
                      onClick={() => setActiveId(exp.id)}
                    />
                  ))}
                </div>
              </div>
              <div className="col-12 col-md-9">
                {apiExperiences.map(
                  (exp) =>
                    activeId === exp.id && (
                      <div key={exp.id} className="tabs-info ms-5" data-aos="fade-left">
                        <h5 className="skill-name fw-bold">
                          {exp.title}
                          {exp.companyName && (
                            <a href={exp.companyUrl || "#"} target="_blank" rel="noopener noreferrer">
                              <span className="span-link"> @{exp.companyName}</span>
                            </a>
                          )}
                        </h5>
                        <p className="tab-date">{exp.duration}</p>
                        <div className="list-info">
                          <ul 
                            className="tab-list" 
                            style={{ color: "#9fa2ab" }}
                            dangerouslySetInnerHTML={{ __html: exp.description }}
                          />
                        </div>
                        
                        {/* 🖼️ Image Option at the end of details */}
                        {exp.imageUrl && (
                          <div className="exp-image-container mt-4">
                            <img 
                              src={exp.imageUrl} 
                              alt={`${exp.companyName} experience`} 
                              style={{ width: '100%', maxWidth: '600px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}
                            />
                          </div>
                        )}
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Experience;
