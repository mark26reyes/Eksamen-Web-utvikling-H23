import RacesList from "../components/races/RacesList";
import { RacesProvider } from "../contexts/RacesContext";

const RacesPage = () => {
  return (
    <section>
      <h1>Welcome to the Races App</h1>
      <p>This is the races page of the app.</p>
      <RacesProvider>
        <RacesList />
      </RacesProvider>
    </section>
  );
};

export default RacesPage;
