import React, { useState, useEffect } from "react";
import DriverService from "../../services/DriverService";

function DeleteDriver({ driverId }) {
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const fetchedDriver = await DriverService.getDriverById(driverId);
        setDriver(fetchedDriver);
      } catch (error) {
        console.error("Error fetching driver:", error);
      }
    };

    fetchDriver();
  }, [driverId]);

  const handleDelete = async () => {
    try {
      if (driver && driver.id) {
        await DriverService.deleteDriver(driver.id);
        // Redirect to another page after deletion
        window.location.href = "/drivers";
      } else {
        console.error("Driver or driver ID is invalid.");
      }
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  if (!driver) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h2>Delete Driver</h2>
      <p>Are you sure you want to delete the driver: {driver.name || "N/A"}?</p>
      <button onClick={handleDelete} className="rounded border-dark shadow">
        Yes, Delete Driver
      </button>
    </section>
  );
}

export default DeleteDriver;
