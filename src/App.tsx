import mainLogo from "./assets/decent-retro-tool-logo.png";
import "./App.css";
import CardGrid from "./components/CardGrid/CardGrid";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";

function App() {
  const titles = [
    "Hello",
    "Hello2. Hello2 Hello2. Hello2",
    "Hello3",
    "Hello4",
    "Hello5",
    "Hello6",
    "Hello7",
  ];

  const selectedTheme = localStorage.getItem("theme");
  if (selectedTheme) {
    document.querySelector("body")?.setAttribute("data-theme", selectedTheme);
  }

  return (
    <>
      <div>
        <a href="https://github.com/Poler2000/decent-retro-tool">
          <img src={mainLogo} className="logo" alt="Decent Retro Tool logo" />
        </a>
      </div>
      <ThemeSwitcher />
      <CardGrid titles={titles}></CardGrid>
    </>
  );
}

export default App;
