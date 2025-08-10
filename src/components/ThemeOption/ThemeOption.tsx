import "./ThemeOption.css";

export interface ThemeOptionProps {
  theme: string;
}

const ThemeOption = ({ theme }: ThemeOptionProps) => {
  const setTheme = () => {
    document.querySelector("body")?.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <div
      onClick={setTheme}
      className="theme-option"
      id={`theme-${theme}`}
    ></div>
  );
};

export default ThemeOption;
