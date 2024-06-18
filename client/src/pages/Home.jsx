import React from 'react';
import '../assets/Home.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

import driverImage from '../assets/driver.png';  
import twitterIcon from '../assets/twitter.png';  
import facebookIcon from '../assets/facebook.png';
import instaIcon from '../assets/insta.png';
import tickMark from '../assets/tick.png';
import whoWeAreImage from '../assets/who-we-are-01.jpeg';  
import userIcon from '../assets/user.png'; 
import signUpIcon from '../assets/signup.png'; 
import bookARideIcon from '../assets/book.png'; 
import getADriverIcon from '../assets/driver1.png';
import enjoyTripIcon from '../assets/enjoy.png'; 

const HomePage = () => {
  return (
    <div>
      <header className="bg-primary text-white">
        <div className="container d-flex justify-content-between align-items-center py-3">
          <div>LOGO</div>
          <nav className="d-flex">
            <a className="nav-link text-white me-3" href="#home">Home</a>
            <a className="nav-link text-white me-3" href="#find-ride">Find Ride</a>
            <a className="nav-link text-white me-3" href="./postride.jsx">Post Rides</a>
            <a className="nav-link text-white me-3" href="#about-us">About Us</a>
            <a className="nav-link text-white" href="#login">Login</a>
          </nav>
        </div>

        <section id="header" className="bg-light p-4">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-md-2">
                <label>From</label>
                <input type="text" className="form-control" placeholder="Enter origin" />
              </div>
              <div className="col-md-2">
                <label>To</label>
                <input type="text" className="form-control" placeholder="Enter destination" />
              </div>
              <div className="col-md-2">
                <label>Date</label>
                <input type="date" className="form-control" />
              </div>
              <div className="col-md-2">
                <label>Passenger</label>
                <input type="text" className="form-control" placeholder="Passenger" />
              </div>
              <div className="col-md-2">
                <button className="btn btn-warning w-100 mt-3">Search</button>
              </div>
            </div>
          </div>
        </section>
      </header>
      <main className="container my-5">
      <section className="text-center mb-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-3 mb-4">
                <div className="box p-4 bg-light">
                  <img src={signUpIcon} alt="Sign Up" className="icon-img img-fluid mb-3" />
                  <h3>Sign Up</h3>
                  <p>Create your RideBuddy account in just a few simple steps.</p>
                </div>
              </div>

              <div className="col-md-3 mb-4">
                <div className="box p-4 bg-light">
                  <img src={bookARideIcon} alt="Book A Ride" className="icon-img img-fluid mb-3" />
                  <h3>Book A Ride</h3>
                  <p>Enter your destination and confirm your booking.</p>
                </div>
              </div>

              <div className="col-md-3 mb-4">
                <div className="box p-4 bg-light">
                  <img src={getADriverIcon} alt="Get A Driver" className="icon-img img-fluid mb-3" />
                  <h3>Get a driver </h3>
                  <p>We match you with the available driver for a prompt pickup.</p>
                </div>
              </div>

              <div className="col-md-3 mb-4">
                <div className="box p-4 bg-light">
                  <img src={enjoyTripIcon} alt="Enjoy Trip" className="icon-img img-fluid mb-3" />
                  <h3>Enjoy Trip</h3>
                  <p>Sit back, relax, and enjoy the ride with RideBuddy.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="text-center mb-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <img src={driverImage} className="img-fluid" alt="Image" />
              </div>
              <div className="col-md-6">
                <h2>Driving in your car soon?</h2>
                <p>Drivers, fantastic news! Your good habits are being rewarded. Enjoy the Carpool Bonus by carpooling. Check the eligibility conditions for more details.</p>
                <button className="btn btn-success">Offer Ride</button>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center mb-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h2>About RideBuddy</h2>
                <p>At RideBuddy, we believe in making transportation easy, affordable, and sustainable. Whether you're commuting to work, heading to an event, or just exploring the city, RideBuddy is here to connect you with reliable rides that fit your schedule and budget.</p>
                <ul className="list-unstyled">
                  <li><img src={tickMark} alt="Tick Mark" className="tick-mark" /> Convenient Booking</li>
                  <li><img src={tickMark} alt="Tick Mark" className="tick-mark" /> Eco-Friendly Options</li>
                  <li><img src={tickMark} alt="Tick Mark" className="tick-mark" /> Affordable Rates</li>
                  <li><img src={tickMark} alt="Tick Mark" className="tick-mark" /> Safety First</li>
                </ul>
                <button className="btn btn-info">Read More</button>
              </div>
              <div className="col-md-6">
                <img src={whoWeAreImage} className="img-fluid rounded" alt="Who We Are" />
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials text-center bg-light py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="testimonial-card p-4">
                  <blockquote>
                    "RideBuddy has been a game-changer for my daily commute. The booking process is quick and easy, and the drivers are always friendly and professional. I especially appreciate the real-time tracking feature, which lets me know exactly when my ride will arrive. Highly recommend!"
                  </blockquote>
                  <div className="user-icon">
                    <img src={userIcon} alt="User" className="img-fluid" />
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="testimonial-card p-4">
                  <blockquote>
                    "I've tried several ride-sharing services, but RideBuddy stands out for its affordability and reliability. The app is super user-friendly, and I've never had to wait long for a driver. Plus, I love the option to choose eco-friendly vehicles."
                  </blockquote>
                  <div className="user-icon">
                    <img src={userIcon} alt="User" className="img-fluid" />
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="testimonial-card p-4">
                  <blockquote>
                    "RideBuddy is fantastic! I use it for everything from grocery runs to airport trips. The drivers are always courteous, and I feel safe knowing that RideBuddy thoroughly vets them. The transparent pricing is a huge plus, and I've never had any surprise charges. Five stars!"
                  </blockquote>
                  <div className="user-icon">
                    <img src={userIcon} alt="User" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <footer className="bg-secondary text-white py-4">
        <div className="container d-flex justify-content-between flex-wrap">
          <div className="footer-column mb-3">
            <h4>Quick Links:</h4>
            <a href="#home" className="d-block text-white">Home</a>
            <a href="#find-ride" className="d-block text-white">Find Ride</a>
            <a href="#post-ride" className="d-block text-white">Post Ride</a>
            <a href="#login" className="d-block text-white">Login</a>
          </div>
          <div className="footer-column mb-3">
            <h4>Support</h4>
            <a href="#help-center" className="d-block text-white">Help Center</a>
            <a href="#privacy-policy" className="d-block text-white">Privacy Policy</a>
            <a href="#terms-of-service" className="d-block text-white">Terms of Service</a>
          </div>

          <div className="footer-column mb-3">
            <h4>Connect with Us</h4>
            <a href="https://twitter.com/example" className="d-inline-block mx-2 text-white"><img src={twitterIcon} alt="Twitter" /></a>
            <a href="https://facebook.com/example" className="d-inline-block mx-2 text-white"><img src={facebookIcon} alt="Facebook" /></a>
            <a href="https://instagram.com/example" className="d-inline-block mx-2 text-white"><img src={instaIcon} alt="Instagram" /></a>
          </div>

          <div className="footer-column mb-3">
            <h4>Contact Information</h4>
            <p>Email: support@ridebuddy.com</p>
            <p>Phone: 1-800-RIDEBUDDY</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
