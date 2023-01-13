import React from "react";
import Warehouse from "../pages/warehouse/Warehouse";
import WarehouseIcon from '@mui/icons-material/Warehouse';
import InventoryIcon from '@mui/icons-material/Inventory';
import OutputIcon from '@mui/icons-material/Output';
import WebStoriesIcon from '@mui/icons-material/WebStories';


export const SideBarMenue = [
{
title: "창고",
icon: <WarehouseIcon />,
link: "warehouse/"
},

{
title: "입고",
icon: <InventoryIcon/>,
link: "input/"
},

{
title: "출고",
icon: <OutputIcon />,
link: "output/"
},

{
title: "재고",
icon: <WebStoriesIcon />,
link: "stock/"
},
];

export const SideBarMyPage = [
  {
    icon: <WarehouseIcon />,
    link: "warehouse/"
    },
  {
    icon: <WarehouseIcon />,
    link: "warehouse/"
    },
];