import React from 'react'
import { Link } from 'react-router-dom';
import SidebarMenue from "./SideBarMenue"
import { useLocation } from 'react-router-dom';
import '../App.css';


const SideBar = () => {

  const pathName = useLocation().pathname;


  const menus = [
  
  {
    name: "창고",
    path: "warehouse/"
  },
  {
    name: "입고",
    path: "input/"
  },
  {
    name: "출고",
    path: "output/"
  },
  {
    name: "stock",
    path: "stock/"
  },
];



  return (
    <div className="sidebar">
      {menus.map((menu, index) => {
        return (
          <Link to={menu.path} key={index}>
            
            <SidebarMenue
              menu={menu}
              isActive={pathName === menu.path ? true : false}	// 현재 URL pathname과 객체에 담긴 path값 일치 여부 확인
            />

          </Link>
        );
      })}
    </div>
  )
}

export default SideBar