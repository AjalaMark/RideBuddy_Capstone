import React, { useEffect, useState } from "react";
import "../assets/FindRide.css";
import "../assets/Home.css";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";

const FindRide = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await fetch("http://localhost:3000/ride", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch rides");
        }
        const data = await response.json();
        setRides(data.rides);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <header className="text-white">
        <Navbar textColor="text-white" />
        <SearchBar />
      </header>
      <main className="main-container">
        <h1>Find a Ride</h1>
        <div className="rides-container">
          {rides.map((ride) => (
            <div className="ride-card" key={ride._id}>
              <div className="ride-details">
                <h2>{ride.driver.name}</h2>
                <p>
                  Route: {ride.startCity.name} to {ride.endCity.name}
                </p>
                <p>Leaving: {new Date(ride.departTime).toLocaleString()}</p>
                <p>Returning: {new Date(ride.returnTime).toLocaleString()}</p>
                <p>
                  Travel Date: {new Date(ride.travelDate).toLocaleDateString()}
                </p>
                <p>
                  Car: {ride.carType} {ride.carModel} ({ride.carYear})
                </p>
                <p>License Plate: {ride.licensePlate}</p>
                <p>Car Color: {ride.carColor}</p>
              </div>
              <div className="ride-price-container">
                <div className="ride-price">${ride.seatPrice}</div>
                <div className="seats-left">{ride.seatsNumber} seats left</div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FindRide;
