import "../assets/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  driverImage,
  tickMark,
  whoWeAreImage,
  signUpIcon,
  bookARideIcon,
  getADriverIcon,
  enjoyTripIcon,
  iconImgClass,
} from "../Constants";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import Testimonial from "../components/Testimonial";

const token = localStorage.getItem("token");
const isLoggedIn = !!token;

const Home = () => {
  return (
    <div className="home-container">
      <header className="text-white">
        <Navbar textColor="text-white" />
        <SearchBar />
      </header>
      <main className="container my-5">
        <section className="text-center mb-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-3 mb-4">
                <div className="box p-4 bg-light">
                  <a href="/register">
                    <img
                      src={signUpIcon}
                      alt="Sign Up"
                      className={iconImgClass}
                    />
                  </a>
                  <h3>Sign Up</h3>
                  <p>
                    Create your RideBuddy account in just a few simple steps.
                  </p>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="box p-4 bg-light">
                  {isLoggedIn &&
                  localStorage.getItem("userType") === "passenger" ? (
                    <a href="/findride">
                      <img
                        src={bookARideIcon}
                        alt="Book A Ride"
                        className={iconImgClass}
                      />
                    </a>
                  ) : (
                    <a href="/login">
                      <img
                        src={bookARideIcon}
                        alt="Book A Ride"
                        className={iconImgClass}
                      />
                    </a>
                  )}
                  <h3>Book A Ride</h3>
                  <p>Enter your destination and confirm your booking.</p>
                </div>
              </div>

              <div className="col-md-3 mb-4">
                <div className="box p-4 bg-light">
                  <img
                    src={getADriverIcon}
                    alt="Get A Driver"
                    className={iconImgClass}
                  />
                  <h3>Get a driver </h3>
                  <p>
                    We match you with the available driver for a prompt pickup.
                  </p>
                </div>
              </div>

              <div className="col-md-3 mb-4">
                <div className="box p-4 bg-light">
                  <img
                    src={enjoyTripIcon}
                    alt="Enjoy Trip"
                    className={iconImgClass}
                  />
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
                <p>
                  Drivers, fantastic news! Your good habits are being rewarded.
                  Enjoy the Carpool Bonus by carpooling. Check the eligibility
                  conditions for more details.
                </p>
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
                <p>
                  At RideBuddy, we believe in making transportation easy,
                  affordable, and sustainable. Whether you&apos;re commuting to
                  work, heading to an event, or just exploring the city,
                  RideBuddy is here to connect you with reliable rides that fit
                  your schedule and budget.
                </p>
                <ul className="list-unstyled">
                  <li>
                    <img src={tickMark} alt="Tick Mark" className="tick-mark" />{" "}
                    Convenient Booking
                  </li>
                  <li>
                    <img src={tickMark} alt="Tick Mark" className="tick-mark" />{" "}
                    Eco-Friendly Options
                  </li>
                  <li>
                    <img src={tickMark} alt="Tick Mark" className="tick-mark" />{" "}
                    Affordable Rates
                  </li>
                  <li>
                    <img src={tickMark} alt="Tick Mark" className="tick-mark" />{" "}
                    Safety First
                  </li>
                </ul>
                <button className="btn btn-success">Read More</button>
              </div>
              <div className="col-md-6">
                <img
                  src={whoWeAreImage}
                  className="img-fluid rounded"
                  alt="Who We Are"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials text-center bg-light py-5">
          <div className="container">
            <div className="row">
              <Testimonial
                message={
                  <blockquote>
                    &quot;RideBuddy has been a game-changer for my daily
                    commute. The booking process is quick and easy, and the
                    drivers are always friendly and professional. I especially
                    appreciate the real-time tracking feature, which lets me
                    know exactly when my ride will arrive. Highly recommend!
                    &quot;
                  </blockquote>
                }
              />
              <Testimonial
                message={
                  <blockquote>
                    &quot;I&apos;ve tried several ride-sharing services, but
                    RideBuddy stands out for its affordability and reliability.
                    The app is super user-friendly, and I&apos;ve never had to
                    wait long for a driver. Plus, I love the option to choose
                    eco-friendly vehicles. &quot;
                  </blockquote>
                }
              />
              <Testimonial
                message={
                  <blockquote>
                    &quot;RideBuddy is fantastic! I use it for everything from
                    grocery runs to airport trips. The drivers are always
                    courteous, and I feel safe knowing that RideBuddy thoroughly
                    vets them. The transparent pricing is a huge plus, and
                    I&apos;ve never had any surprise charges. Five stars!&quot;
                  </blockquote>
                }
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
