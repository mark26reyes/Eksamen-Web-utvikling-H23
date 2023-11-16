import F1Service from "../../services/F1Service";

const DriversItem = ({ name, age, nationality, image }) => {
  return (
    <section>
      <h3 className="f1-bold-font">{name}</h3>
      <p> Age: {age}</p>
      <p>Nationality: {nationality}</p>
      <img src={`http://localhost:5008/${image}`} alt="Picture of drivers" />
    </section>
  );
};

export default DriversItem;
