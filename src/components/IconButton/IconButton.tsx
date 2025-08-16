import "./IconButton.css";

export interface IconButtonProps {
  icon: string;
  additionalClass?: string | undefined;
  onClick: () => void;
}

const IconButton = (props: IconButtonProps) => {
  const { icon, additionalClass, onClick } = props;

  return (
    <button onClick={onClick} className={`icon-button ${additionalClass}`}>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" 
rel="stylesheet"/>
      <span className="material-icons-outlined">
        {icon}
      </span>
    </button>
  );
};

export default IconButton;
