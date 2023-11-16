import DriversList from "../components/drivers/DriversList";
import { DriverProvider } from "../contexts/DriverContext";

const DriversPage = () => {
  return (
    <section className="m-5">
      <br />
      <br />
      <DriverProvider>
        <DriversList />
      </DriverProvider>
    </section>
  );
};

export default DriversPage;
