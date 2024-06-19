import "../assets/PostRide.css";
import "../assets/Home.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PostRide = () => {
  return (
    <>
      <Navbar textColor="text-blue" />
      <div className="container my-5">
        <div className="text-center mb-5">
          <h1 style={{ fontFamily: 'Arial', textDecoration: 'underline' }}>Post a Ride</h1>
        </div>

        <section className="mb-5">
          <h3>Travel Plan</h3>
          <p>
            Your origin and destination you&apos;re willing to make along the
            way.
          </p>
          <div className="form-group row">
            <label htmlFor="origin" className="col-sm-2 col-form-label text-right">Origin</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="origin"
                placeholder="Enter an origin"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="destination" className="col-sm-2 col-form-label text-right">Destination</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="destination"
                placeholder="Enter a destination"
              />
            </div>
          </div>
        </section>

        <section className="mb-5">
          <h3>Ride Schedule</h3>
          <p>
            Enter a precise date and time with am (morning) or pm (evening).
          </p>
          <div className="form-group row">
            <label htmlFor="departure-time" className="col-sm-2 col-form-label text-right">Time for Leaving</label>
            <div className="col-sm-10">
              <input type="time" className="form-control" id="departure-time" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="return-time" className="col-sm-2 col-form-label text-right">Time for Returning</label>
            <div className="col-sm-10">
              <input type="time" className="form-control" id="return-time" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="travel-date" className="col-sm-2 col-form-label text-right">Travel Date</label>
            <div className="col-sm-10">
              <input type="date" className="form-control" id="travel-date" />
            </div>
          </div>
        </section>

        <section className="mb-5">
          <h3>Vehicle Details</h3>
          <p>
            This helps you get more bookings and makes it easier for passengers to identify your vehicle.
          </p>
          <div className="form-group row">
            <label htmlFor="car-model" className="col-sm-2 col-form-label text-right">Model</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="car-model"
                placeholder="Name of the car"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="car-type" className="col-sm-2 col-form-label text-right">Type</label>
            <div className="col-sm-10">
              <select className="form-control" id="car-type">
                <option value="">Select Type</option>
                <option value="suv">SUV</option>
                <option value="sedan">Sedan</option>
                <option value="hatchback">Hatchback</option>
                <option value="minivan">Mini Van</option>
                <option value="hybrid">Hybrid/Electric</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="car-color" className="col-sm-2 col-form-label text-right">Color</label>
            <div className="col-sm-10">
              <select className="form-control" id="car-color">
                <option value="">Select Color</option>
                <option value="white">White</option>
                <option value="black">Black</option>
                <option value="silver">Silver</option>
                <option value="grey">Grey</option>
                <option value="blue">Blue</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="car-year" className="col-sm-2 col-form-label text-right">Year</label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                id="car-year"
                placeholder="Year"
                min="2017"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="licence-plate" className="col-sm-2 col-form-label text-right">License Plate</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="licence-plate"
                placeholder="License Plate"
              />
            </div>
          </div>
        </section>

        <section className="mb-5">
          <h3>Empty Seats</h3>
          <div className="form-group row">
            <label htmlFor="seats-number" className="col-sm-2 col-form-label text-right">Select Number of Seats</label>
            <div className="col-sm-10">
              <select className="form-control" id="seats-number">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>
        </section>

        <section className="mb-5">
          <h3>Pricing</h3>
          <p>
            Enter a fair price per seat to cover your gas and other expenses.
            Note that all prices are CAD.
          </p>
          <div className="form-group row">
            <label htmlFor="seat-price" className="col-sm-2 col-form-label text-right">Price per Seat (CAD)</label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                id="seat-price"
                placeholder="Enter price per seat"
              />
            </div>
          </div>
        </section>

        <div className="text-center">
          <button className="btn btn-primary">Post Ride</button>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PostRide;
