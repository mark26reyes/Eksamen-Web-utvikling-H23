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
        <section className="row mt-5">
          <h3 className="border-bottom border-dark p-4 mb-4 f1-black-font fs-1">
            F1 Event
          </h3>
          <br />
          <AddDrivers />
          <img
            className="border-bottom border-dark col-lg-6 pt-5 pb-5 img-fluid"
            height={"450rem"}
            src="/public/max.jpg"
            alt="Image of Max Verstappen"
          />
          <br />
          <label>
            <br />
            Select a Driver: <br />
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
          <img
            className="col-lg-6 pt-5 pb-5"
            src="/public/drivers.jpg"
            alt="Image og all F1 drivers"
          />
        </section>
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
