import React from "react";
import image from "../../images/Guides/image1.png";
import "./Guide_1.css";

const Guide_5 = () => {
  return (
    <div>
      <img src={image} className="guide-popup-1-image" />
      <p className="guide-popup-1-content-title">Let's Start</p>
      <p className="guide-popup-1-content-text">
          Now unlock your first automaton and make it work for you.
          With more and more automata involved and strategic program combinations, you will finally be able to sit back and watch your Titanium grow perpetually.
      </p>
    </div>
  );
};

export default Guide_5;
