import React from 'react'
import "../styles/Experience.css"

function Smit() {

  return (
    <>
    <div className="tabs-info ms-5">
              <h5 className='skill-name'>Web and Mobile Application Development At <a href=""><span className='span-link'>@SMIT</span></a></h5>
              <p className='tab-date'>Dec 2024 - completed</p>
              <div className="list-info">
                <ul className='tab-list'>
                  <li style={{color: "#9fa2ab" }}><span className='fw-bold'>Comprehensive Training in Web Development: </span>
                  Acquired skills in HTML, CSS, JavaScript, and modern front-end frameworks like React, enabling the creation of responsive and dynamic web applications.
                  
                  </li>
                  <li style={{color: "#9fa2ab" }}><span className='fw-bold'>Mobile Application Development Expertise: </span>
                  Learned to develop cross-platform mobile applications using React Native, focusing on user-friendly interfaces and seamless performance.
                  </li>
                  <li style={{color: "#9fa2ab" }}> <span className='fw-bold'>Back-End Development Skills: </span>
                  Gained experience in server-side technologies such as Node.js and Express.js, including database integration and API development.</li>
                  <li style={{color: "#9fa2ab" }}> <span className='fw-bold'>Project-Based Learning: </span>Completed hands-on projects that demonstrate proficiency in both web and mobile application development, showcasing the ability to deliver full-stack solutions.</li>
                </ul>
              </div>

              <h5 className='skill-name fw-bold'>Courses</h5>
              <ul className='tab-list-02' style={{color: "#9fa2ab" }}>
                <li>Web Development</li>
                <li>Mobile Application Development</li>
                <li>Search Engine Optimization (SEO)</li>
                <li>Wordpress Development</li>
              </ul>
            </div>

    
    </>
  )
}

export default Smit