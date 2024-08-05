import "../assets/PostRide.css";
import "../assets/Home.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostRide = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carType, setCarType] = useState("");
  const [carColor, setCarColor] = useState("");
  const [carYear, setCarYear] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [seatsNumber, setSeatsNumber] = useState("");
  const [seatPrice, setSeatPrice] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const currentYear = new Date().getFullYear();

  const handlePost = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found. Please log in.");
        navigate("/login");
        return;
      }

      const combineDateAndTime = (date, time) => {
        if (!date || !time) return null;
        return new Date(`${date}T${time}:00`);
      };

      const departTime = combineDateAndTime(travelDate, departureTime);
      const returnTimeDate = combineDateAndTime(travelDate, returnTime);

      if (
        !origin &&
        !destination &&
        !departureTime &&
        !returnTime &&
        !travelDate &&
        !carModel &&
        !carType &&
        !carColor &&
        !carYear &&
        !licensePlate &&
        !seatsNumber &&
        !seatPrice
      ) {
        setError("Fields cannot be empty");
        return;
      }

      if (
        !departTime ||
        !returnTimeDate ||
        isNaN(departTime) ||
        isNaN(returnTimeDate)
      ) {
        setError("Ride Schedule is required.");
        return;
      }

      if (carYear > currentYear) {
        setError("Car year cannot exceed the current year.");
        return;
      }

      if (seatPrice < 0) {
        setError("Price per seat cannot be less than 0.");
        return;
      }

      const response = await fetch(`${apiUrl}/ride`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          origin,
          destination,
          departureTime: departTime.toISOString(),
          returnTime: returnTimeDate.toISOString(),
          travelDate,
          carModel,
          carType,
          carColor,
          carYear,
          licensePlate,
          seatsNumber,
          seatPrice,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData?.message || "An error occurred. Please try again.");
        return;
      }

      const data = await response.json();
      if (response.ok) {
        navigate("/");
      } else {
        setError(data?.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.log(error);
    }
  };

  return (
    <>
      <Navbar textColor="#005770" />
      <div className="parent-container">
        <div className="child-container">
          <div className="container my-5">
            <div>
              <h1>Post a Ride</h1>
              <hr />
            </div>

            <form onSubmit={handlePost}>
              <section className="mb-5">
                <p className="h3">Travel Plan</p>
                <p>
                  Your origin and destination you&apos;re willing to make along
                  the way.
                </p>
                <div className="form-group row">
                  <label
                    htmlFor="origin"
                    className="col-sm-5 col-form-label text-right"
                  >
                    Origin
                  </label>
                  <select
                    className="form-control"
                    id="origin"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  >
                    <option value="">Select an Origin</option>
                    <option value="Guelph">Guelph</option>
                    <option value="Waterloo">Waterloo</option>
                    <option value="Kitchener">Kitchener</option>
                    <option value="Toronto">Toronto</option>
                    <option value="Barrie">Barrie</option>
                    <option value="Kingston">Kingston</option>
                    <option value="Hamilton">Hamilton</option>
                    <option value="Oshawa">Oshawa</option>
                    <option value="Windsor">Windsor</option>
                    <option value="Mississauga">Mississauga</option>
                    <option value="Brantford">Brantford</option>
                    <option value="Thunder Bay">Thunder Bay</option>
                    <option value="Brampton">Brampton</option>
                    <option value="North Bay">North Bay</option>
                    <option value="Ottawa">Ottawa</option>
                    <option value="Cambridge">Cambridge</option>
                    <option value="Stratford">Stratford</option>
                    <option value="London">London</option>
                  </select>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="destination"
                    className="col-sm-5 col-form-label text-right"
                  >
                    Destination
                  </label>
                  <select
                    className="form-control"
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  >
                    <option value="">Select a Destination</option>
                    <option value="Guelph">Guelph</option>
                    <option value="Waterloo">Waterloo</option>
                    <option value="Kitchener">Kitchener</option>
                    <option value="Toronto">Toronto</option>
                    <option value="Barrie">Barrie</option>
                    <option value="Kingston">Kingston</option>
                    <option value="Hamilton">Hamilton</option>
                    <option value="Oshawa">Oshawa</option>
                    <option value="Windsor">Windsor</option>
                    <option value="Mississauga">Mississauga</option>
                    <option value="Brantford">Brantford</option>
                    <option value="Thunder Bay">Thunder Bay</option>
                    <option value="Brampton">Brampton</option>
                    <option value="North Bay">North Bay</option>
                    <option value="Ottawa">Ottawa</option>
                    <option value="Cambridge">Cambridge</option>
                    <option value="Stratford">Stratford</option>
                    <option value="London">London</option>
                  </select>
                </div>
              </section>
              <hr />

              <section className="mb-5">
                <p className="h3">Ride Schedule</p>
                <p>
                  Enter a precise date and time with am (morning) or pm
                  (evening).
                </p>
                <div className="form-group row">
                  <label
                    htmlFor="departure-time"
                    className="col-sm-5 col-form-label text-right"
                  >
                    Time for Leaving
                  </label>

                  <input
                    type="time"
                    className="form-control"
                    id="departure-time"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                  />
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="return-time"
                    className="col-sm-5 col-form-label text-right"
                  >
                    Time for Returning
                  </label>

                  <input
                    type="time"
                    className="form-control"
                    id="return-time"
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                  />
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="travel-date"
                    className="col-sm-5 col-form-label text-right"
                  >
                    Travel Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    id="travel-date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                  />
                </div>
              </section>

              <hr />
              <section className="mb-5">
                <p className="h3">Vehicle Details</p>
                <p>
                  This helps you get more bookings and makes it easier for
                  passengers to identify your vehicle.
                </p>
                <div className="form-group row">
                  <label
                    htmlFor="car-model"
                    className="col-sm-5 col-form-label text-right"
                  >
                    Model
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="car-model"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    placeholder="Name of the car"
                  />
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="car-type"
                    className="col-sm-5 col-form-label text-right"
                  >
                    Type
                  </label>

                  <select
                    className="form-control"
                    id="car-type"
                    value={carType}
                    onChange={(e) => setCarType(e.target.value)}
                  >
                    <option value="">Select Type</option>
                    <option value="suv">SUV</option>
                    <option value="sedan">Sedan</option>
                    <option value="hatchback">Hatchback</option>
                    <option value="minivan">Mini Van</option>
                    <option value="hybrid">Hybrid/Electric</option>
                  </select>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="car-color"
                    className="col-sm-5 col-form-label text-right"
                  >
                    Color
                  </label>

                  <select
                    className="form-control"
                    id="car-color"
                    value={carColor}
                    onChange={(e) => setCarColor(e.target.value)}
                  >
                    <option value="">Select Color</option>
                    <option value="white">White</option>
                    <option value="black">Black</option>
                    <option value="silver">Silver</option>
                    <option value="grey">Grey</option>
                    <option value="blue">Blue</option>
                  </select>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="car-year"
                    className="col-sm-5 col-form-label text-right"
                  >
                    Year
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    id="car-year"
                    value={carYear}
                    onChange={(e) => setCarYear(e.target.value)}
                    min="1990"
                    max={currentYear}
                    placeholder="Year of Manufacture"
                  />
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="licence-plate"
                    className="col-sm-5 col-form-label text-right"
                  >
                    License Plate
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="licence-plate"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                    placeholder="License Plate"
                  />
                </div>
              </section>

              <hr />
              <section className="mb-5">
                <p className="h3">Empty Seats</p>
                <div className="form-group row">
                  <label
                    htmlFor="seats-number"
                    className="col-sm-5 col-form-label text-right"
                  >
                    Select Number of Seats
                  </label>

                  <select
                    className="form-control"
                    id="seats-number"
                    value={seatsNumber}
                    onChange={(e) => setSeatsNumber(e.target.value)}
                  >
                    <option value="">Select Number of Seats</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </section>

              <hr />
              <section className="mb-5">
                <p className="h3">Pricing</p>
                <p>
                  Enter a fair price per seat to cover your gas and other
                  expenses. Note that all prices are CAD.
                </p>
                <div className="form-group row">
                  <label
                    htmlFor="seat-price"
                    className="col-sm-5 col-form-label text-right"
                  >
                    Price per Seat (CAD)
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    id="seat-price"
                    value={seatPrice}
                    onChange={(e) => setSeatPrice(e.target.value)}
                    min="0"
                    placeholder="Enter price per seat"
                  />
                </div>
              </section>

              {error && <div className="error-message">{error}</div>}

              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Post Ride
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostRide;
