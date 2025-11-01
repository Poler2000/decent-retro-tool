import { useState } from "react";
import IconButton from "../Buttons/IconButton/IconButton";
import "./Counter.css";
import type { ColorPair } from "../../Colour";

export interface CounterProps {
  colors: ColorPair;
  onUpdate: (newCount: number) => void;
  score: number;
  delayUpdate?: boolean;
}

const Counter = (props: CounterProps) => {
  const MaxCount = 999;
  const MinCount = 0;

  const { colors, score, onUpdate, delayUpdate } = props;

  const [count, setCount] = useState(() => score);
  const [isEditing, setIsEditing] = useState(false);
  const handlePlus = () => {
    if (count >= MaxCount) return;
    setCount(count + 1);

    if (!delayUpdate) {
      onUpdate(count + 1);
    } else {
      setIsEditing(true);
    }
  };
  const handleMinus = () => {
    if (count <= MinCount) return;
    setCount(count - 1);

    if (!delayUpdate) {
      onUpdate(count - 1);
    } else {
      setIsEditing(true);
    }
  };

  const style = {
    borderColor: colors.text,
  };

  return (
    <div
      className="counter"
      style={style}
      onMouseLeave={() => {
        if (isEditing && delayUpdate) {
          onUpdate(count);
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
