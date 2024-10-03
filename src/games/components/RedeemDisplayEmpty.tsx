import React from "react";
import "./RedeemDisplayEmpty.css";
import background from "../images/backgrounds/redeem_frame_empty.png";

const RedeemDisplayEmpty = () => {
  return (
    <div className="redeem-display-empty-container">
      <img className="redeem-display-empty-background" src={background} />
    </div>
  );
};

export default RedeemDisplayEmpty;
