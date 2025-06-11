import { Route, Routes } from "react-router-dom";
import "./App.css";
import Characters from "./pages/Characters/Characters";
import Character from "./pages/Character/Character";
import Guess from "./pages/Guess/Guess";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/character/:id" element={<Character/>} />
        <Route path="/guess" element={<Guess />} />
      </Routes>
    </>
  );
};

export default App;