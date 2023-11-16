import RacesList from "../components/races/RacesList";
import { RacesProvider } from "../contexts/RacesContext";

const RacesPage = () => {
  return (
    <section className="mt-5">
      <br />
      <br />
      <RacesProvider>
        <RacesList />
      </RacesProvider>
    </section>
  );
};

export default RacesPage;
