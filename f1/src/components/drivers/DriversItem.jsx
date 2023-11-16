import F1Service from "../../services/F1Service";

const DriversItem = ({ name, age, image }) => {
  const baseURL = F1Service.getBaseUrl();
  return (
    <section>
      <h3>{name}</h3>
      <p>{age}</p>
      <img src={`${baseURL}/${image}`} alt="Image of driver" />
    </section>
  );
};

export default DriversItem;
