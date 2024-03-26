import styled from "styled-components"; 
import {Link} from "react-router-dom";
import logo from './fence.png';

export const NavbarContainer = styled.nav`
    width: 100%; 
    height: ${(props) => (props.extendedNavbar ? "100vh" : "80px")};
    background-color: var(--navbar-background-color); /* Use variable */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px; /* Add padding to avoid elements being too close to the edge */
`;


export const MiddleContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  .company-name {
    font-size: 1.6rem;
    font-weight: bold;
    color: #FFFFFF;
  }
`;

export const RightContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px; /* Add padding to avoid elements being too close to the edge */
`;
export const NavbarInnerContainer = styled.div`
    width: 100%;
    height: 80px; 
    display: flex;
   
`;

export const NavbarLinkContainer = styled.div`
 display: flex; 
`;

export const NavbarLink = styled(Link)`
    color: var(--link-color); /* Use variable */
    font-size: x-large;
    /* Rest of the styles */
`;

export const Profile = styled.img`
  margin-top: 17px; 
  max-width: 180px; 
  width: 2.1em;
  height: 2.7em;
  filter: brightness(200%); // Adjust the brightness to make the image lighter
`;

export const Logo=styled.img`
    margin: 10px; 
    height: 50px; 
`;

//This allows the screen to adapt depending on screen size
export const OpenLinksButton = styled.button`
  display: none; /* Initially hidden */
  /* Styles for the button */
  @media (max-width: 768px) {
    display: block; /* Show only on smaller screens */
  }
`;

export const NavbarExtendedContainer = styled.div`
    display: flex; 
    flex-direction: column; 
    align-items: center; 

    //remove if screen is > 700px
    @media (min-width: 700px;) {
        display: none;
    }
`;


export const NavbarLinkExtended= styled(Link)`
    color: white; 
    font-size: x-large; 
    font-family: Arial, Helvetica, sans-serif; 
    text-decoration: none; 
    margin: 10px;
`;

