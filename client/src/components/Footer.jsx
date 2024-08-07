import { instaIcon, twitterIcon, facebookIcon } from "../Constants";
const Footer = () => {
  return (
    <div>
      <footer className="py-4">
        <div className="container d-flex justify-content-between flex-wrap">
          <div className="footer-column mb-3">
            <p className="h4">Quick Links:</p>
            <a href="#home" className="d-block">
              Home
            </a>
            <a href="#find-ride" className="d-block">
              Find Ride
            </a>
            <a href="#post-ride" className="d-block">
              Post Ride
            </a>
            <a href="#login" className="d-block">
              Login
            </a>
          </div>
          <div className="footer-column mb-3">
            <p className="h4">Support</p>
            <a href="#help-center" className="d-block">
              Help Center
            </a>
            <a href="#privacy-policy" className="d-block">
              Privacy Policy
            </a>
            <a href="#terms-of-service" className="d-block">
              Terms of Service
            </a>
          </div>

          <div className="footer-column mb-3">
            <p className="h4">Connect with Us</p>
            <a
              href="https://twitter.com/example"
              className="d-inline-block mx-2 "
            >
              <img src={twitterIcon} alt="Twitter" />
            </a>
            <a
              href="https://facebook.com/example"
              className="d-inline-block mx-2 "
            >
              <img src={facebookIcon} alt="Facebook" />
            </a>
            <a
              href="https://instagram.com/example"
              className="d-inline-block mx-2 "
            >
              <img src={instaIcon} alt="Instagram" />
            </a>
            <p className="h5">Contact Information</p>
            <p>Email: support@ridebuddy.com</p>
            <p>Phone: 1-800-RIDEBUDDY</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
