import TeamsService from "../../services/TeamsService";

const TeamsItem = ({ manufactur, image, driverName, driverName2 }) => {
  const baseURL = TeamsService.getBaseUrl();
  return (
    <section>
      <h3>{manufactur}</h3>
      <img src={`${baseURL}/${image}`} width={"400px"} alt="Bilde av teams" />
      <p>{driverName}</p>
      <p>{driverName2}</p>
    </section>
  );
};

export default TeamsItem;
