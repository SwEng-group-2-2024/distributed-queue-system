import React, {useState, useEffect} from "react";
import { NavbarContainer,
         LeftContainer, 
         MiddleContainer,
         RightContainer,
         NavbarInnerContainer,
         NavbarExtendedContainer,
         NavbarLinkContainer,
         NavbarLink,
         Profile,
         Logo,
         OpenLinksButton,
         NavbarLinkExtended,
} from "./Navbar.style"; 


import ProfileImg from './iconProfile.png'
import logo from './fence.png';
import { IoMdColorPalette } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5"; 



function Navbar({ onProfileClick , setColor, color,  onSettingsClick}) {
  
    const [extendedNavbar, setExtendNavbar] = useState(false);
    const[profile, setProfile ] = useState(true);

    const [displayedText, setDisplayedText] = useState('');
    const textToType = "FENCE"; 
    const typingSpeed = 170;
  
    useEffect(() => {
      let index = 0;
      const intervalId = setInterval(() => {
        if (index < textToType.length) {
          setDisplayedText((prev) => prev + textToType.charAt(index));
          index += 1;
        } else {
          clearInterval(intervalId);
        }
      }, typingSpeed);
  
      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [textToType, typingSpeed]);
  
 return (
    <div>

   
    <NavbarContainer extendNavbar = {extendedNavbar}>
        <NavbarInnerContainer>
            <LeftContainer>
           
               

      
  <IoSettingsOutline size={35} color="white" style={{ cursor: 'pointer', marginTop: '1px' }} onClick={onSettingsClick} />
            </LeftContainer>
            <MiddleContainer>
        
        <div className="company-name">{displayedText}</div>
      </MiddleContainer>
            <RightContainer>
                        <Profile src={ProfileImg} onClick={onProfileClick} />
                       
                    </RightContainer>
        </NavbarInnerContainer>
        {extendedNavbar && (
        <NavbarExtendedContainer>
            <NavbarLinkExtended to="/">Home</NavbarLinkExtended>
            <NavbarLinkExtended to="/search">Search</NavbarLinkExtended>

          
        </NavbarExtendedContainer>
        )}
    </NavbarContainer>

        {/* Color changer input */}
    
     


    
  
    </div>
    );
}

export default Navbar;