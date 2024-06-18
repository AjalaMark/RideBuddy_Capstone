import React from 'react';
import '../assets/PostRidePage.css';

const PostRidePage = () => {
  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h1>Post a Ride</h1>
      </div>

      <section className="mb-5">
        <h3>Travel Plan</h3>
        <p>Your origin and destination you're willing to make along the way.</p>
        <div className="form-group">
          <label htmlFor="origin">Origin</label>
          <input type="text" className="form-control" id="origin" placeholder="Enter an origin" />
        </div>
        <div className="form-group">
          <label htmlFor="destination">Destination</label>
          <input type="text" className="form-control" id="destination" placeholder="Enter a destination" />
        </div>
      </section>

      <section className="mb-5">
        <h1>Ride Schedule</h1>
        <p>Enter a precise date and time with am (morning) or pm (evening).</p>
        <div className="form-group">
          <label htmlFor="departure-time">Time for Leaving</label>
          <input type="time" className="form-control" id="departure-time" />
        </div>
        <div className="form-group">
          <label htmlFor="return-time">Time for Returning</label>
          <input type="time" className="form-control" id="return-time" />
        </div>
        <div className="form-group">
          <label htmlFor="travel-date">Travel Date</label>
          <input type="date" className="form-control" id="travel-date" />
        </div>
      </section>

      <section className="mb-5">
        <h1>Vehicle Details</h1>
        <p>This helps you get more bookings and makes it easier for passengers to identify your vehicle.</p>
        <div className="form-group">
          <label htmlFor="car-model">Model</label>
          <input type="text" className="form-control" id="car-model" placeholder="Name of the car" />
        </div>
        <div className="form-group">
          <label htmlFor="car-type">Type and Color</label>
          <input type="text" className="form-control" id="car-type" placeholder="Type and Color" />
        </div>
        <div className="form-group">
          <label htmlFor="car-year">Year</label>
          <input type="number" className="form-control" id="car-year" placeholder="Year" />
        </div>
        <div className="form-group">
          <label htmlFor="licence-plate">License Plate</label>
          <input type="text" className="form-control" id="licence-plate" placeholder="License Plate" />
        </div>
      </section>

      <section className="mb-5">
        <h1>Empty Seats</h1>
        <div className="form-group">
          <label htmlFor="seats-number">Select Number of Seats</label>
          <select className="form-control" id="seats-number">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
      </section>

      <section className="mb-5">
        <h1>Pricing</h1>
        <p>Enter a fair price per seat to cover your gas and other expenses. Note that all prices are CAD.</p>
        <div className="form-group">
          <label htmlFor="seat-price">Price per Seat (CAD)</label>
          <input type="number" className="form-control" id="seat-price" placeholder="Enter price per seat" />
        </div>
      </section>
      
      <div className="text-center">
        <button className="btn btn-primary">Post Ride</button>
      </div>
    </div>
  );
};

export default PostRidePage;
