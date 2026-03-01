import React, { useState } from "react";
import type { ColorPair } from "../../../Colour";
import { highlightMap } from "../../../highlightMap";
import "./Button.css";

export interface ButtonProps extends React.PropsWithChildren {
  colors: ColorPair;
  additionalClass?: string | undefined;
  onClick: () => void;
  /** optional animation end handler forwarded to <button> */
  onAnimationEnd?: React.AnimationEventHandler<HTMLButtonElement>;
}

const Button = (props: ButtonProps) => {
  const [hover, setHover] = useState(false);
  const { colors, additionalClass, onClick, children } = props;

  const style = hover
    ? {
        backgroundColor: highlightMap[colors.background],
        borderColor: colors.text,
        color: colors.text,
      }
    : {
        backgroundColor: colors.background,
        borderColor: colors.text,
        color: colors.text,
      };

  return (
    <button
      onClick={onClick}
      className={`button ${additionalClass}`}
      style={style}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onAnimationEnd={props.onAnimationEnd}
    >
      {children}
    </button>
  );
};

export default Button;
