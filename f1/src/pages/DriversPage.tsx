import DriversList from "../components/drivers/DriversList";
import { DriverProvider } from "../contexts/DriverContext";

const DriversPage = () => {
  return (
    <section>
      <h1>Welcome to Driver App</h1>
      <p>This is the drivers page of the app.</p>
      <DriverProvider>
        <DriversList />
      </DriverProvider>
    </section>
  );
};

export default DriversPage;
