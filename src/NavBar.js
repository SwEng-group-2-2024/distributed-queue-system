import React, {useState} from "react";
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



function Navbar({ onProfileClick , setColor, color}) {
    //boolean for when the button is clicked
    //if true, button will activate and will show links
    const [extendedNavbar, setExtendNavbar] = useState(false);
    const[profile, setProfile ] = useState(true);
 return (
    <div>

   
    <NavbarContainer extendNavbar = {extendedNavbar}>
        <NavbarInnerContainer>
            <LeftContainer>
            <IoMdColorPalette style={{ color: 'white' , marginRight: '-2em',  marginLeft: '1em'}} size={42}id="logocolor"/>
               

                <div className="container"> 
    <div className="card">
      <div className="header">
        Colour: <span>{color || "White" }</span>
      </div>
      <input 
        type="text" 
        className="input"
        value={color} 
        onChange={(e) => setColor(e.target.value)}
        placeholder="Enter a colour"
      />
    </div>
  </div>
            </LeftContainer>
            <MiddleContainer>
                <Logo src={logo}></Logo>
            </MiddleContainer>
            <RightContainer> 
            <Profile src={ProfileImg} onClick={onProfileClick}></Profile>

         
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