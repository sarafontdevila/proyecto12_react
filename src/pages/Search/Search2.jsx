import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const Search = () => {
  const [formData, setFormData] = useState({
    characterName: "",
    characterHouse: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("https://thronesapi.com/api/v2/Characters");
      const characters = await response.json();

      console.log("All characters fetched:", characters); 
      console.log("Search formData:", formData); 

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
    } catch (err) {
      console.error(err);
      setError("Error fetching data.");
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
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default Search;
