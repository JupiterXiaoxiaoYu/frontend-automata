import React from "react";
import image from "../../images/Guides/mission.png";
import arrowImage from "../../images/Guides/mission_arrow.png";
import "./GuideFinal.css";

const GuideFinal = () => {
  return (
    <div>
      <img src={image} className="guide-popup-final-image" />
      <img src={arrowImage} className="guide-popup-final-arrow-image" />
      <p className="guide-popup-final-content-title">Let's Start</p>
      <p className="guide-popup-final-content-text">
        Now unlock your first automaton and make it work for you. With more and
        more automata involved and strategic program combinations, you will
        finally be able to sit back and watch your Titanium grow perpetually.
      </p>
    </div>
  );
};

export default GuideFinal;
