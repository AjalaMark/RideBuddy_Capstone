import twitterIcon from "../assets/twitter.png";
import facebookIcon from "../assets/facebook.png";
import instaIcon from "../assets/insta.png";
const Footer = () => {
  return (
    <div>
      <footer className="bg-secondary text-white py-4">
        <div className="container d-flex justify-content-between flex-wrap">
          <div className="footer-column mb-3">
            <h4>Quick Links:</h4>
            <a href="#home" className="d-block text-white">
              Home
            </a>
            <a href="#find-ride" className="d-block text-white">
              Find Ride
            </a>
            <a href="#post-ride" className="d-block text-white">
              Post Ride
            </a>
            <a href="#login" className="d-block text-white">
              Login
            </a>
          </div>
          <div className="footer-column mb-3">
            <h4>Support</h4>
            <a href="#help-center" className="d-block text-white">
              Help Center
            </a>
            <a href="#privacy-policy" className="d-block text-white">
              Privacy Policy
            </a>
            <a href="#terms-of-service" className="d-block text-white">
              Terms of Service
            </a>
          </div>

          <div className="footer-column mb-3">
            <h4>Connect with Us</h4>
            <a
              href="https://twitter.com/example"
              className="d-inline-block mx-2 text-white"
            >
              <img src={twitterIcon} alt="Twitter" />
            </a>
            <a
              href="https://facebook.com/example"
              className="d-inline-block mx-2 text-white"
            >
              <img src={facebookIcon} alt="Facebook" />
            </a>
            <a
              href="https://instagram.com/example"
              className="d-inline-block mx-2 text-white"
            >
              <img src={instaIcon} alt="Instagram" />
            </a>
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

export default Footer;
