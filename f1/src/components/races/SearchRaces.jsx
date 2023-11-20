import React, { useContext } from "react";
import RacesContext from "../../contexts/RacesContext";

const SearchRace = () => {
  const { searchTerm, searchRaceByGrandPrix } = useContext(RacesContext);

  return (
    <div>
      <input
        type="text"
        placeholder="Search races..."
        value={searchTerm}
        onChange={(e) => searchRaceByGrandPrix(e.target.value)}
      />
    </div>
  );
};

export default SearchRace;
