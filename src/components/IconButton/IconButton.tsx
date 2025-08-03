import "./IconButton.css";

export interface IconButtonProps {
  icon: string;
  onClick: () => void;
}

const IconButton = (props: IconButtonProps) => {
  const { icon, onClick } = props;

  return (
    <button onClick={onClick} className="icon-button">
      <img src={icon} className="icon-button-img" />
    </button>
  );
};

export default IconButton;
