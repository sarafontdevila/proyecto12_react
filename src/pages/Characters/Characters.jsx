import { useContext, useState, useEffect } from "react";
import "./Characters.css";
import Loading from "../../components/Loading/Loading";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import ButtonPage from "../../components/ButtonPage/ButtonPage";
import { Link } from "react-router-dom";
import { CharacterContext } from "../../contexts/CharacterContext";

const Characters = () => {
  const { characters: allCharacters, loading, error } = useContext(CharacterContext); 
  const [currentCharacters, setCurrentCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const charactersPerPage = 6;

  useEffect(() => {
    if (allCharacters.length > 0) {
      const startIndex = (page - 1) * charactersPerPage;
      const endIndex = startIndex + charactersPerPage;
      setCurrentCharacters(allCharacters.slice(startIndex, endIndex));
    }
  }, [page, allCharacters]);

  const totalPages = Math.ceil(allCharacters.length / charactersPerPage);

  if (loading) return <Loading />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  return (
    <>
      <main id="characters">
        {loading && <Loading />}
        <div className="container">
          {currentCharacters.map((character) => (
            <Link
              key={character.id}
              to={`/character/${character.id}`}
              state={{ character }}
              className="character_link"
            >
              <CharacterCard character={character} />
            </Link>
          ))}
        </div>
        <ButtonPage 
          page={page} 
          setPage={setPage} 
          totalPages={totalPages}
        />
      </main>
    </>
  );
};

export default Characters;