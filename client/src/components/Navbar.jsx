import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="container d-flex justify-content-between align-items-center py-3">
      <div>LOGO</div>
      <nav className="d-flex">
        <Link className="nav-link text-white me-3" to="/home">
          Home
        </Link>
        <Link className="nav-link text-white me-3" to="#find-ride">
          Find Ride
        </Link>
        <Link className="nav-link text-white me-3" to="/postride">
          Post Rides
        </Link>
        <Link className="nav-link text-white me-3" to="#about-us">
          About Us
        </Link>
        <Link className="nav-link text-white" to="#login">
          Login
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
