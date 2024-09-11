import React from "react";
import "./TopMenu.css";
import AccountInfo from "./AccountInfo";
import Resources from "./Resources";
import Attributes from "./Attributes";

const TopMenu = () => {
  return (
    <div className="top">
      <div className="top-left"></div>
      <div className="top-middle"></div>
      <div className="top-right"></div>
      <AccountInfo />
      <Resources />
      <Attributes />
    </div>
  );
};

export default TopMenu;
