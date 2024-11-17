import React from 'react';
import "../Styles/Layout.css"

function Header() {
  return (
    <div className="topnav">
      <a className="active" href="#home">Home</a>
      <a href="#Account">Account</a>
      <input type="text" placeholder="search"></input>
    </div>
  );
}

export default Header;