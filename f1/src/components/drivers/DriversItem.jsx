// Importerer DriverService for å kunne utføre operasjoner relatert til sjåfører
import DriverService from "../../services/DriverService";

// Funksjonell komponent som representerer visningen for en enkelt sjåfør
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
        // Setter kilde-URL basert på serverens adresse og bildefilnavnet
        src={`http://localhost:5008/${image}`}
        style={{ width: "15rem", height: "15rem" }}
        alt="Picture of drivers"
      />
    </section>
  );
};

export default DriversItem;
