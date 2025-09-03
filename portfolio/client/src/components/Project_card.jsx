import React from "react";
import "../styles/Project_card.css";

function Project_card(props) {
  return (
    <>
      <div className="card">
        <div className="social">
          <a href={props.live} target="_blank" rel="noopener noreferrer">
            <i class="fa-regular fa-folder-closed"></i>
          </a>
          <a href={props.link} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
        </div>
        <div className="card-title  ">
          <h5>{props.title}</h5>
        </div>

        <div className="card-info" style={{ color: "#9fa2ab" }}>
          <p>{props.info}</p>
        </div>
        <div className="card-tech" style={{ color: "#9fa2ab" }}>
          <p>{props.tech}</p>
        </div>
      </div>
    </>
  );
}

export default Project_card;
