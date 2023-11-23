import DriverService from "../../services/DriverService";

const DriversItem = ({ name, age, nationality, image }) => {
  return (
    <section>
      <h3 className="f1-bold-font border-bottom border-secondary pb-3">
        {name}
      </h3>
      <p> Age: {age}</p>
      <p>Nationality: {nationality}</p>
      <img
        className="mx-auto d-block"
        src={`http://localhost:5008/${image}`}
        style={{ width: "15rem", height: "15rem" }}
        alt="Picture of drivers"
      />
    </section>
  );
};

export default DriversItem;
