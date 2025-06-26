import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CharacterProvider } from "./contexts/CharacterProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <CharacterProvider> 
    <App />
  </CharacterProvider>
  </BrowserRouter>
);
