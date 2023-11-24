// Importerer TeamsProvider fra TeamsContext for å gi tilgang til lagdata
import { TeamsProvider } from "../contexts/TeamsContext";

// Importerer TeamsList-komponenten
import TeamsList from "../components/teams/TeamsList";

// Funksjonell komponent som representerer siden for F1-lag
const TeamsPage = () => {
  return (
    <section className="mt-5">
      <br />
      <br />
      {/* TeamsProvider gir TeamsList tilgang til lagdata */}
      <TeamsProvider>
        {/* Inkluderer TeamsList-komponenten */}
        <TeamsList />
      </TeamsProvider>
    </section>
  );
};

export default TeamsPage;
