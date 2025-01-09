import React from "react";
import image from "../../images/Guides/mission.png";
import "./GuideMission.css";

const GuideMission = () => {
  return (
    <div>
      <img src={image} className="guide-popup-mission-image" />
      <p className="guide-popup-mission-content-title">1. Mission</p>
      <p className="guide-popup-mission-content-text">
        Welcome aboard! This simulation console is an important part of our
        ambitious outer-space colonization plan for Titan. Your mission:
        accumulate as much Titanium as possible. This crucial material is not
        only essential for building our future colony but will also be converted
        to the primary currency on Titan. Get ready to shape the future!
      </p>
    </div>
  );
};

export default GuideMission;
