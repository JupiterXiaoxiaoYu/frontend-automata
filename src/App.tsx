import { GameController as AutomataController } from "./games/automata/controller";
import { MainNavBar } from "./components/Nav";
import "./App.css";

function App() {
  return (
    <>
      <MainNavBar
        currency={0}
        handleRestart={() => {
          /* */
        }}
        showNavBar={false}
      />
      <AutomataController />
    </>
  );
}

export default App;
