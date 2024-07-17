import { Link } from "react-router-dom";
import "../assets/Navbar.css";

const Navbar = (props) => {
  const links = [
    { path: "/home", text: "Home" },
    { path: "/findride", text: "Find Ride", userType: "passenger" },
    { path: "/postride", text: "Post Rides", userType: "driver" },
    { path: "#about-us", text: "About Us" },
  ];

  const userType = localStorage.getItem("userType");

  return (
    <div className="container d-flex justify-content-between align-items-center py-3 navbar-bg">
      <div>LOGO</div>
      <nav className="d-flex">
        {links.map((link, index) => {
          if (!link.userType || link.userType === userType) {
            return (
              <Link
                key={index}
                className={`nav-link me-3 ${props.textColor}`}
                to={link.path}
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

export default Navbar;
