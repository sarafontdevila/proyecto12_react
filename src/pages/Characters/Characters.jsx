import { useState, useEffect } from "react";
import "./Characters.css";
import Loading from "../../components/Loading/Loading";
import Header from "../../components/Header/Header";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import ButtonPage from "../../components/ButtonPage/ButtonPage";
import { Link } from "react-router-dom";

const Characters = () => {
  const [allCharacters, setAllCharacters] = useState([]); 
  const [currentCharacters, setCurrentCharacters] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const charactersPerPage = 6;


  useEffect(() => {
    setLoading(true);
    const apiUrl = `https://thronesapi.com/api/v2/Characters`; 
    console.log("llamando a la API una sola vez:", apiUrl);
    
    
    fetch(apiUrl)
      .then((res) => res.json())
      .then((res) => {
        setAllCharacters(res);
        console.log("datos personajes:", res)
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
        setLoading(false);
      });
  }, []); 

  useEffect(() => {
    if (allCharacters.length > 0) {
      console.log("Todos los personajes disponibles:", allCharacters); 
    }
  }, [allCharacters])


  useEffect(() => {
    if (allCharacters.length > 0) {
      const startIndex = (page - 1) * charactersPerPage;
      const endIndex = startIndex + charactersPerPage;
      const charactersForCurrentPage = allCharacters.slice(startIndex, endIndex);
      setCurrentCharacters(charactersForCurrentPage);
    }
  }, [page, allCharacters, charactersPerPage]);

 
  const totalPages = Math.ceil(allCharacters.length / charactersPerPage);

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