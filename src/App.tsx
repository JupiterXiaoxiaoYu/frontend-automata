import { GameController as AutomataController } from "./games/controller";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import { AccountSlice } from "zkwasm-minirollup-rpc";
import "./App.css";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(AccountSlice.loginL1AccountAsync());
  }, []);

  return <AutomataController />;
}

export default App;
