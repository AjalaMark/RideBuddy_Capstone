import { useEffect, useState } from "react";
import "../assets/Notifications.css";
import Navbar from "../components/Navbar";
import { logo2 } from "../Constants";

const DriverNotification = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const token = localStorage.getItem("token"); // Retrieve the token

        const response = await fetch(`${apiUrl}/bookings/pending`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching pending bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleAccept = async (bookingId) => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const token = localStorage.getItem("token"); // Retrieve the token

      const response = await fetch(`${apiUrl}/bookings/${bookingId}/accept`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the request headers
        },
      });
      if (!response.ok) {
        throw new Error("Failed to accept booking");
      }
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      console.error("Error accepting booking:", error);
    }
  };

  const handleDecline = async (bookingId) => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const token = localStorage.getItem("token"); // Retrieve the token

      const response = await fetch(`${apiUrl}/bookings/${bookingId}/decline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the request headers
        },
      });
      if (!response.ok) {
        throw new Error("Failed to decline booking");
      }
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      console.error("Error declining booking:", error);
    }
  };

  return (
    <>
      <Navbar image={logo2} />
      <div className="pending-bookings-container">
        <h2>Pending Bookings</h2>
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              <span>
                {`${booking.userId?.firstName || "Unknown"} ${
                  booking.userId?.lastName || "User"
                }`}{" "}
                has requested to book your ride.
              </span>
              <div className="booking-buttons">
                <button onClick={() => handleAccept(booking._id)}>
                  Accept
                </button>
                <button onClick={() => handleDecline(booking._id)}>
                  Decline
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DriverNotification;
