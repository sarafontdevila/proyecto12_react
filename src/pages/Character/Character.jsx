import {  Link, useLocation } from "react-router-dom";
import "./Character.css"
import Header from "../../components/Header/Header";


const Character = () => {
  const location = useLocation();
  

  const character = location.state?.character;

  if (!character) {
    return (
      <div className="character-error">
        <p>No character data found. Please navigate from the characters list.</p>
        <Link to="/">
          <button className="back-button">Go Back</button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="character">
        <h2>{character.fullName}</h2>
        <div>
          <img src={character.imageUrl} alt={character.fullName} />
        </div>
        <p>{character.title}</p>
        <p>{character.family}</p>
        <Link to="/">
          <button className="back-button">Return</button>
        </Link>
      </div>
    </>
  );
};

export default Character;