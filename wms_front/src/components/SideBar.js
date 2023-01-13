import React from 'react'
import { SideBarMenue } from './SideBarMenue';
import '../App.css';
 
const SideBar = () => {
  
  return (
  <div className="SideBar">
  <ul className="SideBarList">
  {SideBarMenue.map((val, key) => {
  return (
    <li 
    key={key} 
    className="row"
    onClick={()=> {
    window.location.pathname = val.link
  }}
  >
  <div>{val.icon}</div> <div>{val.title}</div>
  </li>
  );
  })}
  </ul>
  </div>
  );
}
  
export default SideBar;