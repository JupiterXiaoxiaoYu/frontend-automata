import { GameController as AutomataController } from "./games/controller";
import { loginL1AccountAsync } from "./data/accountSlice";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import "./App.css";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loginL1AccountAsync());
  }, []);

  return <AutomataController />;
}

export default App;
