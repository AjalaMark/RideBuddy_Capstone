import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/Bookride.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BookRide = () => {
  const { rideId } = useParams();
  const [ride, setRide] = useState(null);
  const [seats, setSeats] = useState(1);
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${apiUrl}/ride/${rideId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch ride details");
        }
        const data = await response.json();
        setRide(data.ride);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchRideDetails();
  }, [rideId]);

  const handleBooking = (event) => {
    event.preventDefault();

    if (!nameOnCard || !cardNumber || !expDate || !cvv) {
      setError("All payment fields are required.");
      return;
    }

    console.log("Booking successful");
  };

  if (!ride) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar textColor="text-blue" />
      <div className="parent-container">
        <div className="child-container">
          <div className="container my-5">
            <h1>Book a Ride</h1>
            <div className="ride-details">
              <div className="left-section">
                <div className="driver-info">
                  <div className="profile-pic"></div>
                  <div className="driver-details">
                    <h2>{ride.driver.name}</h2>
                    <div className="rating">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>☆</span>
                    </div>
                  </div>
                </div>
                <h3>Request to book with {ride.driver.name}</h3>
                <div className="ride-info">
                  <h4>
                    {ride.startCity.name} to {ride.endCity.name}
                  </h4>
                  <p>Leaving: {new Date(ride.departTime).toLocaleString()}</p>
                  <p>Returning: {new Date(ride.returnTime).toLocaleString()}</p>
                  <h5>{ride.seatsNumber} seats left</h5>
                  <p>Pickup: {ride.startCity.name}</p>
                  <p>Dropoff: {ride.endCity.name}</p>
                  <hr />
                  <div className="vehicle-info">
                    <p>
                      Vehicle: {ride.carType} {ride.carModel}
                    </p>
                    <p>Type: {ride.carType}</p>
                    <p>Color: {ride.carColor}</p>
                    <p>Year: {ride.carYear}</p>
                    <p>Licence Plate: {ride.licensePlate}</p>
                    <hr />
                  </div>
                </div>
              </div>
              <div className="booking-summary">
                <h4>Booking request</h4>
                <p>
                  {ride.startCity.name} to {ride.endCity.name}
                </p>
                <p>Leaving: {new Date(ride.departTime).toLocaleString()}</p>
                <p>Returning: {new Date(ride.returnTime).toLocaleString()}</p>
                <hr />
                <div className="cost-summary">
                  <p>{seats} seats</p>
                  <p>${ride.seatPrice * seats}</p>
                </div>
                <div className="cost-summary">
                  <p>Booking Fee</p>
                  <p>$8</p>
                </div>
                <div className="cost-summary">
                  <h3>Total</h3>
                  <h3>${ride.seatPrice * seats + 8}</h3>
                </div>
                <hr />
                <button className="request-button">Request To Book</button>
              </div>
            </div>

            <div className="additional-info">
              <div className="select-seats">
                <div className="select-seats-container">
                  <h3>Select Seats</h3>
                  <select
                    className="form-control"
                    value={seats}
                    onChange={(e) => setSeats(e.target.value)}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
                <button className="message-button">
                  Message {ride.driver.name}
                </button>
                <div className="payment-policy">
                  <h3>Payment policy</h3>
                  <p>
                    Your card isn’t charged until the driver approves your
                    Booking Request.
                  </p>
                  <h3>Cancellation policy</h3>
                  <p>
                    Full refund if your Booking Request isn&apos;t approved by
                    the driver, is withdrawn or expires before being approved.
                  </p>
                  <p>
                    100% refund if you cancel your booking more than 24h before
                    departure.
                  </p>
                  <p>
                    50% refund if you cancel your booking less than 24h before
                    departure.
                  </p>
                </div>
              </div>
              <div className="payment-method-box">
                <div className="payment-method">
                  <h3>Payment Method</h3>
                  <form onSubmit={handleBooking}>
                    <label>Name on Card</label>
                    <input
                      type="text"
                      value={nameOnCard}
                      onChange={(e) => setNameOnCard(e.target.value)}
                    />
                    <label>Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                    <label>Exp. Date</label>
                    <input
                      type="text"
                      value={expDate}
                      onChange={(e) => setExpDate(e.target.value)}
                    />
                    <label>CVV</label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                    <button type="submit">Proceed To Pay</button>
                  </form>
                </div>
              </div>
            </div>
            {error && <div className="error-message">{error}</div>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookRide;
