import settings from './settings.png';
import settingIcon from './settingsImage.png'
import './SettingsPage.css';

import React, {useState, useEffect, useRef} from 'react';

function SettingPage() {

  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        console.log(menuRef.current);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });

  return (
    <div className="App">
      <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
          <img src={settings}  alt='settingsIcon'></img>
        </div>

        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
          <ul>
            <DropdownItem img = {settings} text = {"Settings"}/>
            
          </ul>
        </div>
      </div>
    </div>
  );
}

function DropdownItem(props){
  return(
    <li className = 'dropdownItem'>
      <img src={props.img}></img>
      <a> {props.text} </a>
    </li>
  );
}

export default SettingPage;