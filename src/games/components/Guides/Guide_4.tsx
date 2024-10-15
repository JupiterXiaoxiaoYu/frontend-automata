import React from "react";
import image from "../../images/Guides/image3.png";
import "./Guide_3.css";

const Guide_4 = () => {
  return (
    <div>
      <img src={image} className="guide-popup-3-image" />
      <p className="guide-popup-3-content-title">4. Assembly Panel</p>
      <p className="guide-popup-3-content-text">
        Choose 8 Programs for an automaton from the Program Board  on the right. Every program can be used repeatedly. Try different program combinations, and observe the cost and gain of the current combination at the wheel’s upper left board. Whenever you are satisfied with the combination, click Unlock to execute the Automaton. You can also reboot one automaton and change the program combination if it dies or you have a new role for it.
      </p>
    </div>
  );
};

export default Guide_4;
