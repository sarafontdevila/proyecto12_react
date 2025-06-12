/*import { useParams, Link } from "react-router-dom";
import "./Character.css"
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";

const Character = () => {
  const { id } = useParams()
  const [character, setCharacter] = useState({})

  useEffect(() => {
    fetch(`https://thronesapi.com/api/v2/Characters/${id}`)
    .then((res) => res.json())
    .then((res) => setCharacter(res))
  },[id])
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
    
  )
}

export default Character  */


import { useParams, Link } from "react-router-dom";
import "./Character.css"
import Header from "../../components/Header/Header";
import useFetchCharacter from "../../customHook/useFetchCharacter"; 

const Character = () => {
  const { id } = useParams();
  const { character, loading, error } = useFetchCharacter(id); 

  if (loading) {
    return <div className="character-loading">Loading character...</div>;
  }

  if (error) {
    return <div className="character-error">Error: {error.message}</div>;
  }

  if (!character) { 
    return <div className="character-not-found">Character not found.</div>;
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