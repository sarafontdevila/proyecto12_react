import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import useCharacters from "../../customHook/useCharacters";

const Search = () => {
  const [formData, setFormData] = useState({
    characterName: "",
    characterHouse: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

 
  const { characters, loading, error: contextError } = useCharacters();

  const submit = (e) => { 
    e.preventDefault();
    setError(null);

 
    if (loading) {
      setError("Characters are still loading. Please try again in a moment.");
      return;
    }

    if (contextError) {
      setError(`Failed to load character data: ${contextError}. Please try again later.`);
      return;
    }

   
    if (!characters || characters.length === 0) {
      setError("No character data available for search.");
      return;
    }

  
    const results = characters.filter((char) => {
      const nameMatch = formData.characterName.trim()
        ? char.fullName.toLowerCase().includes(formData.characterName.toLowerCase())
        : true;

      const houseMatch = formData.characterHouse.trim()
        ? char.family.toLowerCase().includes(formData.characterHouse.toLowerCase())
        : true;

      return nameMatch && houseMatch;
    });

    if (results.length === 0) {
      setError("No matching characters found.");
    } else if (results.length === 1) {
      navigate(`/character/${results[0].id}`);
    } else {
      navigate("/results", { state: { results } });
    }
  };

  return (
    <form onSubmit={submit}>
      <div>
        <label>Character Name</label>
        <input
          value={formData.characterName}
          onInput={(e) =>
            setFormData({ ...formData, characterName: e.target.value })
          }
        />
      </div>
      <div>
        <label>House</label>
        <input
          type="text"
          value={formData.characterHouse}
          onInput={(e) =>
            setFormData({ ...formData, characterHouse: e.target.value })
          }
        />
      </div>
      <button>Search</button>
      {loading && <p>Loading characters...</p>}
      {loading && <p>Loading characters...</p>}
      {contextError && <p style={{ color: "orange" }}>Error from context: {contextError}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default Search;