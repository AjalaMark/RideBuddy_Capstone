import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/findride.css";
import "../assets/Home.css";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import { logo1 } from "../Constants";

const FindRide = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async ({ fromLocation, toLocation, date }) => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(
        `${apiUrl}/rides/search?from=${fromLocation}&to=${toLocation}&date=${date}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch rides");
      }
      const data = await response.json();
      console.log("this is the data received", data);
      setRides(data.rides);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRides = async () => {
      const token = localStorage.getItem("token");

      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${apiUrl}/ride`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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

  const handleRideClick = (rideId) => {
    navigate(`/book-ride/${rideId}`);
  };

  return (
    <div className="findRide-container">
      <header className="text-white">
        <Navbar textColor="text-white" image={logo1} />
        {localStorage.getItem("userType") === "passenger" ? (
          <SearchBar onSearch={handleSearch} />
        ) : (
          ""
        )}
      </header>

      <main className="main-container">
        <h1>Find a Ride</h1>
        <div className="rides-container">
          {rides.map((ride) => (
            <div
              className="ride-card"
              key={ride._id}
              onClick={() => handleRideClick(ride._id)}
            >
              <div className="driver-image-container">
                <img src={ride.driver.profilePicture} alt="driver-image" />
              </div>

              <div className="ride-details-container">
                <div>
                  <h2>{ride.driver.name}</h2>
                  <p className="rout">
                    {ride.startCity.name} to {ride.endCity.name}
                  </p>
                  <div className="leaving-returning-container">
                    <p className="leaving">
                      Leaving:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {new Date(ride.departTime).toLocaleString()}
                    </p>
                  </div>
                  <div className="pickup-dropoff-container">
                    <p className="pick-up">
                      Pickup:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      {ride.startCity.name}
                    </p>
                    <p className="drop-off">
                      Dropoff:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {ride.endCity.name}
                    </p>
                  </div>
                </div>
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
