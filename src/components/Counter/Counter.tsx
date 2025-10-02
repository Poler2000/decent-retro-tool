import { useState } from "react";
import IconButton from "../Buttons/IconButton/IconButton";
import "./Counter.css";
import type { ColorPair } from "../../Colour";

export interface CounterProps {
  colors: ColorPair;
  onUpdate: (newCount: number) => void;
  score: number;
}

const Counter = (props: CounterProps) => {
  const { colors, score } = props;

  const [count, setCount] = useState(() => score);
  const [isEditing, setIsEditing] = useState(false);
  const handlePlus = () => {
    setCount(count + 1);
    setIsEditing(true);
  };
  const handleMinus = () => {
    setCount(count - 1);
    setIsEditing(true);
  };

  const style = {
    borderColor: colors.text,
  };

  console.log(score);

  return (
    <div
      className="counter"
      style={style}
      onMouseLeave={() => {
        if (isEditing) {
          props.onUpdate(count);
        }
        setIsEditing(false);
      }}
    >
      <IconButton
        icon="remove"
        colors={{ background: colors.background, text: colors.text }}
        onClick={handleMinus}
      />
      <div className="counter-value">
        <span>{count}</span>
      </div>
      <IconButton
        icon="add"
        colors={{ background: colors.background, text: colors.text }}
        onClick={handlePlus}
      />
    </div>
  );
};

export default Counter;
