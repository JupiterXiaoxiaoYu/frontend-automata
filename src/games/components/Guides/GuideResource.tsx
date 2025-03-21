import React from "react";
import image from "../../images/Guides/resource.png";
import "./GuideResource.css";

const GuideResource = () => {
  return (
    <div>
      <img src={image} className="guide-popup-resource-image" />
      <p className="guide-popup-resource-content-title">2. Resources</p>
      <p className="guide-popup-resource-content-text">
        At the top, you'll find the Resource&Attribute Indicator. The first line
        shows shared resources available to all your automata, including
        Crystal, Interstellar Mineral, Quantum Foam, Necrodermis, Alien Floral,
        Spice Melange, and Titanium. The second line lists attributes that are
        unique to each automaton, such as Level, Productivity, Efficiency, and
        Speed. On the left is the Automata Showcase, where all available
        automata are displayed. To the right is the Program Board, featuring
        various program options that can be used to assemble your automata. In
        the center is the automata Working Wheel. At the wheel's upper left, you
        can view the inputs and outputs of a selected automaton, while the
        programs in use are displayed around the wheel's periphery.
      </p>
    </div>
  );
};

export default GuideResource;
