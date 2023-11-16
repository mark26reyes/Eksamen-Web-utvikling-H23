import DriversList from "../components/drivers/DriversList";
import { DriverProvider } from "../contexts/DriverContext";

const DriversPage = () => {
  return (
    <section className="mt-5">
      <h1 className="text-center f1-bold-font">Welcome to Driver App</h1>
      <p className="text-center">This is the drivers page of the app.</p>
      <DriverProvider>
        <DriversList />
      </DriverProvider>
    </section>
  );
};

export default DriversPage;
