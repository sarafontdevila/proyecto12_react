import React, { useReducer, useState, useEffect, useCallback } from 'react';
import './Guess.css';
import  useCharacters from '../../customHook/useCharacters';

const initialState = {
  score: 0,
  currentCharacter: null,
  gameStatus: 'playing',
  totalGuesses: 0,
  correctGuesses: 0,
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CHARACTER':
      return { ...state, currentCharacter: action.payload, gameStatus: 'playing' };
    case 'CORRECT_GUESS':
      return {
        ...state,
        score: state.score + 1,
        gameStatus: 'correct',
        totalGuesses: state.totalGuesses + 1,
        correctGuesses: state.correctGuesses + 1,
      };
    case 'INCORRECT_GUESS':
      return {
        ...state,
        score: Math.max(0, state.score - 1),
        gameStatus: 'incorrect',
        totalGuesses: state.totalGuesses + 1,
      };
    case 'RESET_STATUS':
      return { ...state, gameStatus: 'playing' };
    case 'RESET_GAME':
      return initialState;
    default:
      return state;
  }
};

const Guess = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [userGuess, setUserGuess] = useState('');
  const [showHint, setShowHint] = useState(false);

  const { characters, loading, error } = useCharacters();


  const selectRandomCharacter = useCallback(() => {
    if (characters && characters.length > 0) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomCharacter = characters[randomIndex];
      
     
      if (!randomCharacter) {
        console.error('Selected character is null or undefined');
        return;
      }


      const aliases = [];
      if (randomCharacter.firstName) aliases.push(randomCharacter.firstName);
      if (randomCharacter.lastName) aliases.push(randomCharacter.lastName);
      if (randomCharacter.aliases && Array.isArray(randomCharacter.aliases)) {
        aliases.push(...randomCharacter.aliases);
      }

      const characterData = {
        ...randomCharacter,
        fullName: randomCharacter.fullName || `${randomCharacter.firstName || ''} ${randomCharacter.lastName || ''}`.trim(),
        aliases: aliases,
        imageUrl: randomCharacter.imageUrl || '/assets/default-character.png' 
      };

      dispatch({
        type: 'SET_CHARACTER',
        payload: characterData,
      });
    }
  }, [characters]);

  useEffect(() => {
    if (!loading && !error && characters && characters.length > 0 && !state.currentCharacter) {
      selectRandomCharacter();
    }
  }, [loading, error, characters, state.currentCharacter, selectRandomCharacter]);

  const normalizeString = (str) => {
    if (!str || typeof str !== 'string') return '';
    return str.toLowerCase().trim().replace(/[^a-zA-Z0-9\s]/g, '');
  };

  const checkGuess = () => {
    if (!userGuess.trim() || !state.currentCharacter) return;

    const normalizedGuess = normalizeString(userGuess);
    const { fullName, aliases = [] } = state.currentCharacter;

    const validNames = [fullName, ...aliases].filter(Boolean);
    
    const isCorrect = validNames.some(
      (name) => normalizeString(name) === normalizedGuess
    );

    dispatch({ type: isCorrect ? 'CORRECT_GUESS' : 'INCORRECT_GUESS' });
    setUserGuess('');
    setShowHint(false);
  };

  const nextCharacter = () => {
    selectRandomCharacter();
    dispatch({ type: 'RESET_STATUS' });
    setShowHint(false);
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (state.gameStatus === 'playing') {
        checkGuess();
      } else {
        nextCharacter();
      }
    }
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
    setUserGuess('');
    setShowHint(false);

    setTimeout(() => {
      selectRandomCharacter();
    }, 100);
  };

  if (loading) {
    return <div className="guess-game">Loading characters...</div>;
  }

  if (error) {
    return <div className="guess-game">Error: {error}</div>;
  }

  if (!characters || characters.length === 0) {
    return <div className="guess-game">No characters available. Please check your data source.</div>;
  }

  return (
    <div className="guess-game">
      <h1>Guess who the Character is</h1>
      <div className="score">
        Score: {state.score} | Correct: {state.correctGuesses} / {state.totalGuesses}
      </div>
      <div className="reset-section">
        <button onClick={resetGame} className="reset-button">
          Reset Game
        </button>
      </div>

      {state.currentCharacter ? (
        <div className="game-content">
          <div className="character-section">
            <div className="character-image-container">
              <img
                src={state.currentCharacter.imageUrl}
                alt="Character to guess"
                className="character-image"
                onError={(e) => {
                  e.target.src = '/assets/default-character.png'; 
                }}
              />
              <div className="image-overlay"></div>
            </div>

            {showHint && state.currentCharacter.fullName && (
              <div className="hint">
                💡 Hint: This character's name starts with "
                {state.currentCharacter.fullName.charAt(0)}"
              </div>
            )}
          </div>

          <div className="guess-input-section">
            <input
              type="text"
              placeholder="Guess the character's name"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={state.gameStatus !== 'playing'}
              className="guess-input"
            />

            {state.gameStatus === 'playing' ? (
              <button onClick={checkGuess} className="guess-button">
                Submit Guess
              </button>
            ) : (
              <button onClick={nextCharacter} className="next-button">
                Next Character
              </button>
            )}

            <button onClick={toggleHint} className="hint-button">
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>

            {state.gameStatus === 'correct' && (
              <div className="feedback correct">✅ Correct!</div>
            )}
            {state.gameStatus === 'incorrect' && (
              <div className="feedback incorrect">
                ❌ Incorrect. The answer was: {state.currentCharacter.fullName}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="no-character-message">
          Loading character... Please wait.
        </div>
      )}
    </div>
  );
};

export default Guess;