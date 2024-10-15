import React from "react";
import image from "../../images/Guides/image2.png";
import "./Guide_2.css";

const Guide_3 = () => {
  return (
    <div>
      <img src={image} className="guide-popup-2-image" />
      <p className="guide-popup-2-content-title">3. Program List</p>
      <p className="guide-popup-2-content-text">
         You can purchase new programs using Titanium and participate in our campaigns to earn your first batch of Titanium, boosting your program inventory.
         You can also upgrade your automata, optimizing their productivity, efficiency and speed with Titanium.
      </p>
    </div>
  );
};

export default Guide_3;
