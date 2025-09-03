import React from "react";
import "../styles/Navbar.css";
import logo from "../assets/images/nav-logo.png";



// function Navbar() {

  window.addEventListener("scroll", function(){
    const header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
})




function Navbar() {
  return (
    <>
<header id="header">
<nav class="navbar navbar-dark navbar-expand-lg bg-body-tertiar sticky-top" data-bs-theme="dark" >
  <div class="container">
    <a class="navbar-brand" href="#"> <img src={logo} className="logo" /><span style={{color: "#9fa2ab"}}>MirzaArif</span></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0" style={{color: "#9fa2ab" }}>
        <li class="nav-item" style={{color: "#9fa2ab" }}>
          <a class="nav-link active hover-effect" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item" >
          <a class="nav-link hover-effect active" href="#about" style={{color: "#9fa2ab" }}>About</a>
          
        </li>
        <li class="nav-item">
          <a class="nav-link hover-effect active" href="#experience" >Experience</a>
        </li>
        <li class="nav-item">
          <a class="nav-link hover-effect active" href="#work" >Work</a>
        </li>
       
        <li class="nav-item">
          <a class="nav-link hover-effect active"  href="#contact">Contact</a>
        </li>
        
      </ul>
     
    </div>
  </div>
</nav>

</header>





    </>
  )
}

export default Navbar