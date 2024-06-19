import { Link } from "react-router-dom";
import './Navbar.css'; // Import the CSS file

const Navbar = ({ textColor }) => {
  return (
    <div className="container d-flex justify-content-between align-items-center py-3 navbar-bg">
      <div>LOGO</div>
      <nav className="d-flex">
        <Link className={`nav-link me-3 ${textColor}`} to="/home">
          Home
        </Link>
        <Link className={`nav-link me-3 ${textColor}`} to="#find-ride">
          Find Ride
        </Link>
        <Link className={`nav-link me-3 ${textColor}`} to="/postride">
          Post Rides
        </Link>
        <Link className={`nav-link me-3 ${textColor}`} to="#about-us">
          About Us
        </Link>
        <Link className={`nav-link ${textColor}`} to="#login">
          Login
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
