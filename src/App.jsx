import { Route, Routes } from "react-router-dom";
import Characters from "./pages/Characters/Characters";
import Character from "./pages/Character/Character";
import Guess from "./pages/Guess/Guess";
import Search from "./pages/Search/Search";
import Header from "./components/Header/Header";
import Results from "./components/Results/Results";
import { CharacterProvider } from "./contexts/CharacterProvider";


const App = () => {
  return (
    <>
      <Header />
      <CharacterProvider> 
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/character/:id" element={<Character/>} />
        <Route path="/guess" element={<Guess />} />
        <Route path="/search" element={<Search />} />
        <Route path="/results" element={<Results />} />
      </Routes>
      </CharacterProvider>
    </>
  )
};

export default App;