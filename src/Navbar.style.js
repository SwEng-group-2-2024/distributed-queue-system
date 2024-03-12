import styled from "styled-components"; 
import {Link} from "react-router-dom";
import logo from './fence.png';

export const NavbarContainer = styled.nav`
    width: 100%; 
    height: ${(props) => (props.extendedNavbar ? "100vh" : "80px")};
    background-color: #043b5c;
    display: flex; 

    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const LeftContainer = styled.div`
    flex: 50%; //alow for search bar
    display: flex;
    align-items: center; 
    padding-left: 5%; 
    `

export const MiddleContainer = styled.div`
    flex: 20%; 
    display: flex;
    align-items: center; 
    
`

export const RightContainer = styled.div`
    flex: 30%; //profile logo
    display: flex; 
    justify-content: flex-end;
    padding-right: 50px;
`
export const NavbarInnerContainer = styled.div`
    width: 100%;
    height: 80px; 
    display: flex;
`;

export const NavbarLinkContainer = styled.div`
 display: flex; 
`;

export const NavbarLink = styled(Link)`
    color: white; 
    font-size: x-large; 
    font-family: Arial, Helvetica, sans-serif; 
    text-decoration: none; 
    margin: 10px;

 /* when width of screen is less than 700px, get rid of the links */
 @media (max-width: 700px) {

display: none;
}

`;

export const Profile=styled.img`
    margin: 10px; 
    max-width: 180px; 
    height: auto; 
`;


export const Logo=styled.img`
    margin: 10px; 
    height: 50px; 
`;

//This allows the screen to adapt depending on screen size
export const OpenLinksButton = styled.button`
    width: 70px; 
    height: 50 px; 
    background: none; 
    border: none; 
    color: white; 
    font-size: 45px; 
    cursor: pointer;

    /* when width of screen exceeds 700px, hide this button */
    @media (min-width: 700px) {

        display: none;
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