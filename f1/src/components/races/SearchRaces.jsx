import React, { useContext } from "react";
import RacesContext from "../../contexts/RacesContext";

// Funksjonell komponent for søkefeltet som lar brukeren søke etter løp basert på Grand Prix-navn
const SearchRace = () => {
  // Henter searchTerm og searchRaceByGrandPrix fra RacesContext ved hjelp av useContext-hook
  const { searchTerm, searchRaceByGrandPrix } = useContext(RacesContext);

  // JSX for søkefeltet
  return (
    <div>
      {/* Input-element for å skrive inn søketekst */}
      <input
        type="text"
        placeholder="Search races..."
        // Verdien av input-elementet er satt til searchTerm fra RacesContext
        value={searchTerm}
        // onChange-eventet trigges når brukeren skriver inn noe i input-feltet
        // Kaller searchRaceByGrandPrix-funksjonen fra RacesContext med den nye søketeksten
        onChange={(e) => searchRaceByGrandPrix(e.target.value)}
      />
    </div>
  );
};

export default SearchRace;
