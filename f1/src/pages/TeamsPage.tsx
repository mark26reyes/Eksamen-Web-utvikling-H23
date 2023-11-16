import { TeamsProvider } from "../contexts/TeamsContext";
import TeamsList from "../components/teams/TeamsList";

const TeamsPage = () => {
  return (
    <section className="mt-5">
      <br />
      <br />
      <TeamsProvider>
        <TeamsList />
      </TeamsProvider>
    </section>
  );
};

export default TeamsPage;
