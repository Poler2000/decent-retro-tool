import { useState } from "react";
import IconButton from "../IconButton/IconButton";
import "./Counter.css";

const Counter = () => {
  const [count, setCount] = useState(0);
  const handlePlus = () => {
    setCount(count + 1);
  };
  const handleMinus = () => {
    setCount(count - 1);
  };

  return (
    <div className="counter">
      <IconButton icon="remove" onClick={handleMinus} />
      <div className="counter-value">
        <span>{count}</span>
      </div>
      <IconButton icon="add" onClick={handlePlus} />
    </div>
  );
};

export default Counter;
