import mainLogo from "./assets/decent-retro-tool-logo.png";
import "./App.css";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";
import { Navigate, Route, Routes } from "react-router";
import Home from "./components/Pages/Home/Home";
import Retro from "./components/Pages/Retro/Retro";
import Team from "./components/Pages/Team/Team";
import NotFound from "./components/Pages/NotFound/NotFound";

function App() {
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
      <Routes>
        <Route index element={<Navigate to={"home"} />} />
        <Route path="home" element={<Home />} />
        <Route path="team">
          <Route path=":teamId" element={<Team />} />
          <Route path=":teamId/retro">
            <Route path=":retroId" element={<Retro />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
