// Importerer nødvendige komponenter og kontekster
import DriversList from "../components/drivers/DriversList";
import { DriverProvider } from "../contexts/DriverContext";

// Definerer funksjonaliteten for DriversPage-komponenten
const DriversPage = () => {
  return (
    <section className="m-5">
      <br />
      <br />
      {/* DriverProvider brukes til å gi tilgang til DriverContext i hele DriversList-komponenten */}
      <DriverProvider>
        {/* DriversList-komponenten brukes for å vise listen over sjåfører */}
        <DriversList />
      </DriverProvider>
    </section>
  );
};

export default DriversPage;
