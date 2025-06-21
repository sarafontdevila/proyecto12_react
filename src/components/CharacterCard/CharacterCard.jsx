import React from 'react'
import "./CharacterCard.css"
const CharacterCard = ({character}) => {
  return (
    <div className="character-card">
        <div className= "back">
          <h2>{character.fullName}</h2>
          <p>{character.title}</p>
          <p>{character.family}</p>
          </div>
        <div className="img_wrp">
        <img 
        src= {character.imageUrl} 
        alt={character.fullName} 
        key={character.id}/>
        </div>
      </div>
  )
}

export default CharacterCard

