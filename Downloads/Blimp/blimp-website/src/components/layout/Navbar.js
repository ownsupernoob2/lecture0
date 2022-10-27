import React from "react";


const Navbar = () => {
  return (
    <>
    <nav id="navbar">
      <div className="logo">
        <img
          src="../assets/logo.png"
          height="50px"
          style={{marginRight: '10px'}}
        />
            <span mycustomattribute="something" >B</span>
            <span mycustomattribute="something" >L</span>
            <span mycustomattribute="something" >I</span>
            <span mycustomattribute="something" >M</span>
            <span mycustomattribute="something" >P</span>
            <span mycustomattribute="something" >‏‏‎ ‎</span>
            <span mycustomattribute="something" >A</span>
            <span mycustomattribute="something" >C</span>
            <span mycustomattribute="something" >A</span>
            <span mycustomattribute="something" >D</span>
            <span mycustomattribute="something" >E</span>
            <span mycustomattribute="something" >M</span>
            <span mycustomattribute="something" >Y</span>

                </div>

      <ul className="nav-links">
        <input type="checkbox" id="checkbox_toggle" />
        <label htmlFor="checkbox_toggle" className="hamburger">&#9776;</label>
        <div className="menu">
          <li><a href="#">Home</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </div>
      </ul>
    </nav>
    </>
  );
};

export default Navbar;
