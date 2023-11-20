// HomePage.tsx
import { useState, useEffect } from "react";
import AddDrivers from "../components/drivers/AddDrivers";
import DeleteDriver from "../components/drivers/DeleteDriver";
import EditDriver from "../components/drivers/EditDriver";
import DriverService from "../services/DriverService";

const HomePage = () => {
  interface IDriver {
    id: number;
    name: string;
  }

  const [drivers, setDrivers] = useState<IDriver[]>([]);
  const [selectedDriverId, setSelectedDriverId] = useState<number | null>(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const allDrivers = await DriverService.getAllDrivers();
        setDrivers(allDrivers || []);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <>
      <img
        src="/public/f1-homepage-img.jpg"
        width={"100%"}
        alt="Bilde av redbull bil"
        className="img-fluid mt-5 mx-auto d-block"
      />
      <div className="container">
        <section className="mt-5">
          <h1 className="border-bottom border-dark p-4">
            Welcome to the F1 Event
          </h1>
          <br />
          <AddDrivers />
          <br />
          <label>
            <br />
            Select a Driver:
            <select
              value={selectedDriverId?.toString() || ""}
              onChange={(e) => setSelectedDriverId(Number(e.target.value))}
            >
              <option value="" disabled>
                Choose a driver
              </option>
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name}
                </option>
              ))}
            </select>
          </label>
        </section>
        <br />
        <br />
        {selectedDriverId && <EditDriver driverId={selectedDriverId} />}
        <br />
        <br />
        {selectedDriverId && <DeleteDriver driverId={selectedDriverId} />}
        <br />
        <br />
      </div>
    </>
  );
};

export default HomePage;
