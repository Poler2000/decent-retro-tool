import { useState } from "react";
import IconButton from "../Buttons/IconButton/IconButton";
import "./Dropdown.css";

const Dropdown = (props: React.PropsWithChildren) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="dropdown-menu">
      <IconButton
        icon="menu"
        onClick={() => {
          setOpen(!isOpen);
        }}
        colors={{
          background: "var(--primary-background-colour)",
          text: "var(--primary-text-colour)",
        }}
      />
      {isOpen ? (
        <div className="setting-dropdown">{props.children}</div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dropdown;
