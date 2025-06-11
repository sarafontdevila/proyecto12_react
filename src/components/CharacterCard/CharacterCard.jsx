import "./CharacterCard.css"

import React from 'react'

const CharacterCard = ({character}) => {
  return (
    <div className="character-card">
        <div className= "back">
          <h2>{character.fullName}</h2>
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

