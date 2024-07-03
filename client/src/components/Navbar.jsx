import { Link } from "react-router-dom";
import "../assets/Navbar.css";

const Navbar = (props) => {
  return (
    <div className="container d-flex justify-content-between align-items-center py-3 navbar-bg">
      <div>LOGO</div>
      <nav className="d-flex">
        <Link className={`nav-link me-3 ${props.textColor}`} to="/home">
          Home
        </Link>
        <Link className={`nav-link me-3 ${props.textColor}`} to="#find-ride">
          Find Ride
        </Link>
        <Link className={`nav-link me-3 ${props.textColor}`} to="/postride">
          Post Rides
        </Link>
        <Link className={`nav-link me-3 ${props.textColor}`} to="#about-us">
          About Us
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
