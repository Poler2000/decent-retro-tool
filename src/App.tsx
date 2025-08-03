import mainLogo from "./assets/decent-retro-tool-logo.png";
import "./App.css";
import Counter from "./components/Counter/Counter";

function App() {
  return (
    <>
      <div>
        <img src={mainLogo} className="logo" alt="Decent Retro Tool logo" />
      </div>
      <Counter></Counter>
    </>
  );
}

export default App;
