import type { ColorPair } from "../../../Colour";
import "./IconButton.css";
import Button from "../Button/Button";

export interface IconButtonProps {
  icon: string;
  additionalClass?: string | undefined;
  iconSize?: string;
  colors: ColorPair;
  onClick: () => void;
}

const IconButton = (props: IconButtonProps) => {
  const { icon, additionalClass, colors, iconSize, onClick } = props;

  const iconStyle = iconSize
    ? {
        fontSize: iconSize,
        color: colors.text,
      }
    : { color: colors.text };

  return (
    <Button
      colors={colors}
      additionalClass={`icon-button ${additionalClass}`}
      onClick={onClick}
    >
      <span className="material-icons-outlined" style={iconStyle}>
        {icon}
      </span>
    </Button>
  );
};

export default IconButton;
