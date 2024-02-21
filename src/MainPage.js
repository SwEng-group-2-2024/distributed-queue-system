// MainPage.js
import React, { useState } from 'react';
import './MainPage.css';
import NavBar from "./NavBar";
import ProfilePopup from './PopUp'; // Assuming you have this component defined
import { NavbarContainer,
  LeftContainer, 
  RightContainer,
  NavbarInnerContainer,
  NavbarExtendedContainer,
  NavbarLinkContainer,
  NavbarLink,
  Profile,
  OpenLinksButton,
  NavbarLinkExtended,
} from "./Navbar.style"; 
import ProfileImg from './iconProfile.webp'
import { GoPersonFill } from "react-icons/go";
import ChatInputWithMenu from './ChatInputWithMenu';
function MainPage({ setIsLoggedIn }) {
  const [isProfilePopupVisible, setProfilePopupVisible] = useState(false);
  const toggleProfilePopup = () => setProfilePopupVisible(!isProfilePopupVisible);

  const handleLogout = () => setIsLoggedIn(false); // Add a logout button or mechanism

  return (
    <div className="M">
      <NavBar onProfileClick={toggleProfilePopup} />
      {isProfilePopupVisible && <ProfilePopup onClose={toggleProfilePopup} />}
      <button onClick={handleLogout}>Log Out</button> 
      <body>
  
    <div id="bar">      <GoPersonFill className="pro"/>    <div id="nameLable">Steph</div>
 </div>
  
   
    <ChatInputWithMenu />
  
</body>
    </div>
  );
}

export default MainPage;