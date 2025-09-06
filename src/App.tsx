import "./App.css";
import { Navigate, Route, Routes } from "react-router";
import Home from "./components/Pages/Home/Home";
import Retro from "./components/Pages/Retro/Retro";
import Team from "./components/Pages/Team/Team";
import NotFound from "./components/Pages/NotFound/NotFound";
import Header from "./components/Header/Header";

function App() {
  const selectedTheme = localStorage.getItem("theme");
  if (selectedTheme) {
    document.querySelector("body")?.setAttribute("data-theme", selectedTheme);
  }

  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Navigate to={"home"} />} />
        <Route path="home" element={<Home />} />
        <Route path="teams">
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
