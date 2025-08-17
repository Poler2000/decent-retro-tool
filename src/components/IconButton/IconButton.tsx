import { useState } from "react";
import type { Color, ColorPair } from "../../Colour";
import "./IconButton.css";
import { highlightMap } from "../../highlightMap";

export interface IconButtonProps {
  icon: string;
  additionalClass?: string | undefined;
  iconSize?: string;
  colors: ColorPair;
  onClick: () => void;
}

const IconButton = (props: IconButtonProps) => {
  const [hover, setHover] = useState(false);
  const { icon, additionalClass, colors, iconSize, onClick } = props;

  const style = hover
    ? {
        backgroundColor: highlightMap[colors.background],
        borderColor: colors.text,
      }
    : {
        backgroundColor: colors.background,
        borderColor: colors.text,
      };

  const iconStyle = iconSize
    ? {
        fontSize: iconSize,
        color: colors.text,
      }
    : { color: colors.text };

  return (
    <button
      onClick={onClick}
      className={`icon-button ${additionalClass}`}
      style={style}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <span className="material-icons-outlined" style={iconStyle}>
        {icon}
      </span>
    </button>
  );
};

export default IconButton;
