import React, { useEffect } from "react";
import ImageButton from "../../script/common/ImageButton";
import onImage from "../../image/Buttons/RocketSwitchButton/rocket_switch_on.png";
import onHoverImage from "../../image/Buttons/RocketSwitchButton/rocket_switch_on_hv.png";
import offImage from "../../image/Buttons/RocketSwitchButton/rocket_switch_off.png";
import offHoverImage from "../../image/Buttons/RocketSwitchButton/rocket_switch_off_hv.png";

interface Props {
  isInitOn: boolean;
  onToggle: (isOn: boolean) => void;
}

const RocketSwitchButton = ({ isInitOn, onToggle }: Props) => {
  const [isOn, setIsOn] = React.useState(isInitOn);

  function toggleSwitch() {
    setIsOn(!isOn);
    onToggle(!isOn);
  }

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "auto",
        height: "100%",
        aspectRatio: "130 / 79",
        transform: "translate(-50%, -50%)",
        margin: "0px",
      }}
    >
      <ImageButton
        onClick={toggleSwitch}
        isDisabled={false}
        defaultImagePath={isOn ? onImage : offImage}
        hoverImagePath={isOn ? onHoverImage : offHoverImage}
        clickedImagePath={isOn ? onHoverImage : offHoverImage}
        disabledImagePath={isOn ? onImage : offImage}
        removeHoverWhenClicked={true}
      />
    </div>
  );
};

export default RocketSwitchButton;
