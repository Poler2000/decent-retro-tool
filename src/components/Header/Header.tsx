import { Link } from "react-router";
import mainLogo from "../../assets/decent-retro-tool-logo.png";
import IconButton from "../Buttons/IconButton/IconButton";
import SettingsMenu from "../SettingsMenu/SettingsMenu";
import "./Header.css";

export interface HeaderProps {
  onEdit?: () => void;
  onImport?: () => void;
  onExport?: () => void;
}

const Header = (props: HeaderProps) => {
  const { onEdit, onImport, onExport } = props;

  return (
    <div className="header">
      <div>
        <Link to="/home">
          <img src={mainLogo} className="logo" alt="Decent Retro Tool logo" />
        </Link>
      </div>
      <div className="menu-buttons">
        {onEdit && (
          <IconButton
            icon="edit"
            onClick={onEdit}
            colors={{
              background: "var(--primary-background-colour)",
              text: "var(--primary-text-colour)",
            }}
          />
        )}
        {onImport && (
          <IconButton
            icon="upload"
            onClick={() => {
              console.log("import not implemented");
            }}
            colors={{
              background: "var(--primary-background-colour)",
              text: "var(--primary-text-colour)",
            }}
          />
        )}
        {onExport && (
          <IconButton
            icon="download"
            onClick={() => {
              console.log("export not implemented");
            }}
            colors={{
              background: "var(--primary-background-colour)",
              text: "var(--primary-text-colour)",
            }}
          />
        )}
        <SettingsMenu />
      </div>
    </div>
  );
};

export default Header;
