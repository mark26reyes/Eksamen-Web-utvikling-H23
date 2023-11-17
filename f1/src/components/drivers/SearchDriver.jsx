import React, { useContext } from "react";
import DriverContext from "../../contexts/DriverContext";

const SearchDriver = () => {
  const { searchTerm, searchDriverByName } = useContext(DriverContext);

  return (
    <div>
      <p>Søk etter førere: </p>
      <input
        type="text"
        placeholder="Search drivers..."
        value={searchTerm}
        onChange={(e) => searchDriverByName(e.target.value)}
      />
    </div>
  );
};

export default SearchDriver;
