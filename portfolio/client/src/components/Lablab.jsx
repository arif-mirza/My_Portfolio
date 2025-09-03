import React from 'react'
import "../styles/Experience.css"

function Lablab() {
  function getFormattedDate() {
    const date = new Date(); // Get the current date
    const options = { month: 'short', year: 'numeric' }; // Format options
    return date.toLocaleDateString('en-US', options); // Format and return the date
}
  return (
    <>

    <div className="tabs-info ms-5">
              <h5 className='skill-name fw-bold'>Hackathon Enthusiast <a href=""><span className='span-link'>@lablab.ai</span></a></h5>
              <p className='tab-date'>{getFormattedDate()} - Present</p>
              <div className="list-info">
                <ul className='tab-list' style={{color: "#9fa2ab" }}>
                  <li style={{color: "#9fa2ab" }}><span className='fw-bold' style={{color: "#9fa2ab" }}>Innovative Solutions in AI Hackathons</span>
                  Participated in AI-focused hackathons organized by Lablab.ai, where I collaborated with diverse teams to develop innovative projects that solve real-world problems.
                  
                  </li>
                  <li style={{color: "#9fa2ab" }}><span className='fw-bold'>Rapid Prototyping and Development: </span>
                  Gained experience in rapidly prototyping and developing AI-driven applications within strict deadlines, showcasing adaptability and problem-solving skills.
                  </li>
                  <li style={{color: "#9fa2ab" }}> <span className='fw-bold'>Exposure to Cutting-Edge AI Technologies: </span>
                  Engaged with the latest AI tools and frameworks during Lablab.ai hackathons, enhancing my technical proficiency and staying updated with industry trends.</li>
                  
                </ul>
              </div>

              
            </div>

    </>
  )
}

export default Lablab