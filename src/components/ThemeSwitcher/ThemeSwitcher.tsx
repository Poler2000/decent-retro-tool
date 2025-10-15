import ThemeOption from "../ThemeOption/ThemeOption";
import "./ThemeSwitcher.css";

const ThemeSwitcher = () => {
  return (
    <>
      <span className="theme-switcher-header">Theme:</span>
      <div className="theme-switcher">
        <ThemeOption theme="light" />
        <ThemeOption theme="dark" />
        <ThemeOption theme="sunset" />
      </div>
    </>
  );
};

export default ThemeSwitcher;
