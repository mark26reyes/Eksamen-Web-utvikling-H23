import TeamsService from "../../services/TeamsService";

const TeamsItem = ({ manufacturer, image, driverName, driverName2 }) => {
  const baseURL = TeamsService.getBaseUrl();
  return (
    <section>
      <h3 className="border-bottom border-secondary pb-3">{manufacturer}</h3>
      <img src={`${baseURL}/${image}`} width={"400px"} alt="Bilde av teams" />
      <p>D1: {driverName}</p>
      <p>D2: {driverName2}</p>
    </section>
  );
};

export default TeamsItem;
