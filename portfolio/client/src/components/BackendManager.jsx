function BackendManager() {
  return (
    <>
      <div className="tabs-info ms-5">
        <h5 className='skill-name fw-bold'>
          Software Developer Intern
          <a href="https://sitenative.com/" target="_blank" rel="noopener noreferrer">
            <span className='span-link'>@Sitenative Solutions</span>
          </a>
        </h5>

        <p className='tab-date'>2 Month Internship</p>

        <div className="list-info">
          <ul className='tab-list' style={{ color: "#9fa2ab" }}>

            <li>
              <span className='fw-bold'>Team-Based Project Development:</span>
              Collaborated with a development team to build a real-world web platform, gaining practical experience in teamwork, code collaboration, and project planning.
            </li>

            <li>
              <span className='fw-bold'>LayoffProof.ai Project:</span>
              Contributed to the development of
              <a href="https://layoffproof.ai/" target="_blank" rel="noopener noreferrer">
                <span className='span-link'> LayoffProof.ai </span>
              </a>
              platform, a tool designed to help professionals enhance their career stability through AI-powered insights and resources.
            </li>

            <li>
              <span className='fw-bold'>Practical Development Experience:</span>
              Worked on implementing features, debugging issues, and improving the functionality of the platform while following modern development practices.
            </li>

          </ul>
        </div>
      </div>
    </>
  );
}

export default BackendManager;
