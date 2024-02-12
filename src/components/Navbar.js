import React, {useState} from "react";
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
} from "../styles/Navbar.style"; 
import ProfileImg from '../assets/iconProfile.webp'


function Navbar() {
    //boolean for when the button is clicked
    //if true, button will activate and will show links
    const [extendedNavbar, setExtendNavbar] = useState(false);
 return (
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
            <RightContainer> 
                <Profile src={ProfileImg}></Profile>
            </RightContainer>
        </NavbarInnerContainer>
        {extendedNavbar && (
        <NavbarExtendedContainer>
            <NavbarLinkExtended to="/">Home</NavbarLinkExtended>
            <NavbarLinkExtended to="/search">Search</NavbarLinkExtended>
        </NavbarExtendedContainer>
        )}
    </NavbarContainer>
    );
}

export default Navbar;