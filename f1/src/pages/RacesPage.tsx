// Importerer RacesList-komponenten
import RacesList from "../components/races/RacesList";

// Importerer RacesProvider fra RacesContext for å gi tilgang til løpsdata
import { RacesProvider } from "../contexts/RacesContext";

// Funksjonell komponent som representerer siden for F1-løp
const RacesPage = () => {
  return (
    <section className="mt-5">
      <br />
      <br />
      {/* RacesProvider gir RacesList tilgang til løpsdata */}
      <RacesProvider>
        {/* Inkluderer RacesList-komponenten */}
        <RacesList />
      </RacesProvider>
    </section>
  );
};

export default RacesPage;
