import React from "react";
import image from "../../images/Guides/image1.png";
import "./Guide_1.css";

const Guide_1 = () => {
  return (
    <div>
      <img src={image} className="guide-popup-1-image" />
      <p className="guide-popup-1-content-title">1. Mission</p>
      <p className="guide-popup-1-content-text">
          Welcome aboard! This simulation console is an important part of our ambitious outer-space colonization plan for Titan.
          Your mission: accumulate as much Titanium as possible. This crucial material is not only essential for building our future colony but will also be converted to the primary currency on Titan.
          Get ready to shape the future!
      </p>
    </div>
  );
};

export default Guide_1;
