import { Link, useNavigate } from "react-router-dom";
import "../assets/Navbar.css";
import PropTypes from "prop-types";
import { logout } from "../utils/Auth";

const Navbar = (props) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  const navigate = useNavigate;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const links = [
    { path: "/", text: "Home" },
    { path: "/findride", text: "Find Ride", userType: "passenger" },
    { path: "/postride", text: "Post Rides", userType: "driver" },
    {
      path: "/messages",
      text: "Messages",
      userType: "driver",
    },
    {
      path: "/driver-notification",
      text: "Notifications",
      userType: "driver",
    },
    { path: "#about-us", text: "About Us" },
    { path: "/profile", text: "Profile" },
    !token
      ? { path: "/login", text: "Login" }
      : { path: "#", text: "Logout", onClick: handleLogout },
  ];

  return (
    <div className="container d-flex justify-content-between align-items-center py-3 navbar-bg">
      <div>
        <img className="logo-home" src={props.image} alt="logo" />
      </div>
      <nav className="link-flex-container grid-container">
        {links.map((link, index) => {
          if (!link.userType || link.userType === userType) {
            return (
              <Link
                key={index}
                className={`nav-link me-3`}
                style={{ color: props.textColor }}
                to={link.path}
                onClick={link.onClick}
              >
                {link.text}
              </Link>
            );
          }
          return null;
        })}
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  textColor: PropTypes.string.isRequired,
};

export default Navbar;
