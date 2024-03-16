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




function Navbar({ onProfileClick }) {
    //boolean for when the button is clicked
    //if true, button will activate and will show links
    const [extendedNavbar, setExtendNavbar] = useState(false);
    const[profile, setProfile ] = useState(true);
 return (
    <div>

   
    <NavbarContainer extendNavbar = {extendedNavbar}>
        <NavbarInnerContainer>
            <LeftContainer>
                <NavbarLinkContainer>
                    <NavbarLink to="/">Home</NavbarLink>
                    {/* <NavbarLink to="/search">Search</NavbarLink> */}
                    {/* <NavbarLink to="/profile">Profile</NavbarLink>*/}
                    <OpenLinksButton 
                        onClick={() =>  {
                            setExtendNavbar((curr) => !curr);
                        }}
                    >
                    {extendedNavbar ? <> &#10005;</> : <>&#8801;</>}
                    </OpenLinksButton>
                </NavbarLinkContainer>
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
    </div>
    );
}

export default Navbar;