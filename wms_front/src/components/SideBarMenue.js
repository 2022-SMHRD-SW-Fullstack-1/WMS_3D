import React from "react";

function SideBarMenue({ menu, isActive }){
        return isActive === true ? (
                <div className="sidebar-menue active">
                  <p>{menu.name}</p>
                </div>
              ) : (
                <div className="sidebar-menue ">
                  <p>{menu.name}</p>
                </div>
              );
            }

export default SideBarMenue;