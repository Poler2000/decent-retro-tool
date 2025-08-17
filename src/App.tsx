import mainLogo from "./assets/decent-retro-tool-logo.png";
import "./App.css";
import CardGrid from "./components/CardGrid/CardGrid";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";
import { colorSequence } from "./ColourSequence";

function App() {
  const grids = ["Grid1", "Grid 2", "grid 3"];

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
      {grids.map((_, id) => (
        <CardGrid
          key={id}
          titles={["gwe", "fddfsfds"]}
          backgroundColor={colorSequence[id].background}
          textColor={colorSequence[id].text}
        ></CardGrid>
      ))}
    </>
  );
}

export default App;
