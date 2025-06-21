import React, { useReducer, useState, useEffect } from 'react';
import './Guess.css';

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

  const fetchCharacters = async () => {
    try {
      const page = Math.floor(Math.random() * 45) + 1;
      const response = await fetch(`https://thronesapi.com/api/v2/Characters?page=${page}&limit=5`);
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const randomCharacter = data[Math.floor(Math.random() * data.length)];
        dispatch({
          type: 'SET_CHARACTER',
          payload: {
            ...randomCharacter,
            fullName: randomCharacter.fullName,
            aliases: [randomCharacter.firstName, randomCharacter.lastName],
          },
        });
      }
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const normalizeString = (str) =>
    str.toLowerCase().trim().replace(/[^a-zA-Z0-9\s]/g, '');

  const checkGuess = () => {
    if (!userGuess.trim() || !state.currentCharacter) return;

    const normalizedGuess = normalizeString(userGuess);
    const { fullName, aliases } = state.currentCharacter;

    const isCorrect = [fullName, ...(aliases || [])].some(
      (name) => normalizeString(name) === normalizedGuess
    );

    dispatch({ type: isCorrect ? 'CORRECT_GUESS' : 'INCORRECT_GUESS' });
    setUserGuess('');
    setShowHint(false);
  };

  const nextCharacter = () => {
    fetchCharacters();
    dispatch({ type: 'RESET_STATUS' });
    setShowHint(false);
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      state.gameStatus === 'playing' ? checkGuess() : nextCharacter();
    }
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
    fetchCharacters();
    setUserGuess('');
    setShowHint(false);
  };

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

      {state.currentCharacter && (
        <div className="game-content">
          <div className="character-section">
            <div className="character-image-container">
              <img
                src={state.currentCharacter.imageUrl}
                alt="Character to guess"
                className="character-image"
              />
              <div className="image-overlay"></div>
            </div>

            {showHint && (
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
              <div className="feedback incorrect">❌ Incorrect. Try the next one!</div>
            )}
          </div>
        </div>
      )}


    </div>
  );
};

export default Guess;
