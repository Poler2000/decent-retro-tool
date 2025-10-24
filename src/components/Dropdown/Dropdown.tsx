import { useState } from "react";
import IconButton from "../Buttons/IconButton/IconButton";
import "./Dropdown.css";

export interface DropdownProps extends React.PropsWithChildren {
  icon: string;
}

const Dropdown = (props: DropdownProps) => {
  const [isOpen, setOpen] = useState(false);
  const { children, icon } = props;

  return (
    <div className="dropdown-menu">
      <IconButton
        icon={icon}
        onClick={() => {
          setOpen(!isOpen);
        }}
        colors={{
          background: "var(--primary-background-colour)",
          text: "var(--primary-text-colour)",
        }}
      />
      {isOpen ? <div className="setting-dropdown">{children}</div> : <></>}
    </div>
  );
};

export default Dropdown;
