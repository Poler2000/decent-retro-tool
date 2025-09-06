import { useState } from "react";
import IconButton from "../Buttons/IconButton/IconButton";
import "./Counter.css";
import type { ColorPair } from "../../Colour";

export interface CounterProps {
  colors: ColorPair;
}

const Counter = (props: CounterProps) => {
  const [count, setCount] = useState(1);
  const handlePlus = () => {
    setCount(count + 1);
  };
  const handleMinus = () => {
    setCount(count - 1);
  };

  const { colors } = props;
  const style = {
    borderColor: colors.text,
  };

  return (
    <div className="counter" style={style}>
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
