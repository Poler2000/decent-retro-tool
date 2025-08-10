import ThemeOption from "../ThemeOption/ThemeOption";
import "./ThemeSwitcher.css";

const ThemeSwitcher = () => {
  return (
    <div className="theme-switcher">
      <ThemeOption theme="light" />
      <ThemeOption theme="dark" />
      <ThemeOption theme="sunset" />
    </div>
  );
};

export default ThemeSwitcher;
