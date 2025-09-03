import React from 'react'

function Work_2() {
  return (
    <>
    <div className="container py-5">
        <div className="row">
          <div className="col-12">
           <div className="row">
            <div className="col-6">
              <div className="work1-info ms-5">
                <p style={{color : '#4cc9f0'}} className='mb-0'>Featured Project</p>
                <h4 className='mb-4'>AI image Generator</h4>
                <div className="work-box">
                  <p className='mb-0'>This project create images by using prompt.In this project we use openAI for create images </p>
                </div>
                <p className='tech'>HTML5 CSS3 Bootstrap5 React-JS Context-API Generative AI, Langchain, Python
                </p>
                <div className="work-icon">
                <a href="#">
                    <i class="fab fa-github"></i>
                  
                  </a>
                </div>
              </div>
            </div>
            <div className="col-6 center-div">
              <div className="work-img">
                <img src={work1} alt="" />
              </div>
            </div>
           </div>
           
          </div>
        </div>
      </div>
    
    </>
  )
}

export default Work_2