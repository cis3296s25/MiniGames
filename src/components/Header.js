import React from "react";
// import './Header.css'; // Import CSS for styling
import splashImage from '../mg.png';

class Header extends React.Component {
  render() {
    return(
      <header>
        <div className="splash-screen">
            <img src={splashImage} alt="MiniGames Logo" className="splash-image" />
        </div>
      </header>
    );
  }
}

export default Header;