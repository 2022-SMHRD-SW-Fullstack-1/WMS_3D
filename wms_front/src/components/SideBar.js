import React from "react";
import { SideBarMenu, SideBarMyPage } from "./SideBarMenu";
import "../css/SideBar.css";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";

const SideBar = () => {
  return (
    <div className="SideBar">
      <div className="top_section">
        <h1 className="logo">W</h1>
      </div>

      <div className="SideBarList">
        <div className="middle_section">
          {SideBarMenu.map((val, key) => {
            return (
              <div
                key={key}
                className="row"
                onClick={() => {
                  window.location.pathname = val.link;
                }}
              >
                <div>{val.icon}</div> <div>{val.title}</div>
              </div>
            );
          })}
        </div>
        <div className="bottom_section">
          <h1 className="bell">
            <NotificationsIcon />
          </h1>
          <h1 className="user">
            <PersonIcon />
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
