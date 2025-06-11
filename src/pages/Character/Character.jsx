import { useParams, Link } from "react-router-dom";
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
    <Header />
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

export default Character