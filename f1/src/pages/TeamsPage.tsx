import { TeamsProvider } from "../contexts/TeamsContext";
import TeamsList from "../components/teams/TeamsList";

const TeamsPage = () => {
  return (
    <section>
      <h1>Welcome to the Teams</h1>
      <p>This is the team page of the app.</p>
      <TeamsProvider>
        <TeamsList />
      </TeamsProvider>
    </section>
  );
};

export default TeamsPage;
