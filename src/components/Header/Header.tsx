import mainLogo from "../../assets/decent-retro-tool-logo.png";
import IconButton from "../IconButton/IconButton";
import SettingsMenu from "../SettingsMenu/SettingsMenu";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div>
        <a href="https://github.com/Poler2000/decent-retro-tool">
          <img src={mainLogo} className="logo" alt="Decent Retro Tool logo" />
        </a>
      </div>
      <div className="menu-buttons">
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
        <SettingsMenu />
      </div>
    </div>
  );
};

export default Header;
