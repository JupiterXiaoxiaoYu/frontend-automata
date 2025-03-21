import React from "react";
import image from "../../images/Guides/program.png";
import arrowImage from "../../images/Guides/program_arrow.png";
import "./GuideProgram.css";

const GuideProgram = () => {
  return (
    <div>
      <img src={image} className="guide-popup-program-image" />
      <img src={arrowImage} className="guide-popup-program-arrow-image" />
      <p className="guide-popup-program-content-title">3. Program List</p>
      <p className="guide-popup-program-content-text">
        You can purchase new programs using Titanium and participate in our
        campaigns to earn your first batch of Titanium, boosting your program
        inventory. You can also upgrade your automata, optimizing their
        productivity, efficiency and speed with Titanium.
      </p>
    </div>
  );
};

export default GuideProgram;
