import React, { useContext } from "react";
import DriverContext from "../../contexts/DriverContext";

// Funksjonell komponent for søkefeltet
const SearchDriver = () => {
  // Henter search term og funksjon for å søke etter sjåfører fra konteksten ved hjelp av useContext-hook
  const { searchTerm, searchDriverByName } = useContext(DriverContext);

  // JSX som viser et input-felt for å søke etter sjåfører
  return (
    <div>
      <input
        type="text"
        placeholder="Search drivers..."
        // Setter verdien av input-feltet til search term fra konteksten
        value={searchTerm}
        // Event handler som kalles når brukeren skriver i input-feltet
        onChange={(e) => searchDriverByName(e.target.value)}
      />
    </div>
  );
};

export default SearchDriver;
