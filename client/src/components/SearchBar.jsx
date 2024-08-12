import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../assets/Searchbar.css";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onSearch }) => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [date, setDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passenger, setPassenger] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleSearch = () => {
    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    if (!onSearch) {
      navigate(`/findride`);
      return;
    }

    if (!fromLocation && !toLocation && !date) {
      setErrorMessage(
        "Please select at least one filter option (From, To, or Date)."
      );
      return;
    }

    setErrorMessage("");

    onSearch({ fromLocation, toLocation, date });
  };

  return (
    <div>
      <section id="header" className="bg-light p-4">
        <div className="main-container">
          {/* <div className="row align-items-end justify-content-between"> */}
          <div className="search-container">
            {/* <div className="col-md-2"> */}
            <select
              className="form-control custom-select"
              id="origin"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
            >
              <option value="">Select an Origin</option>
              <option value="Guelph">Guelph</option>
              <option value="Waterloo">Waterloo</option>
              <option value="Kitchener">Kitchener</option>
              <option value="Toronto">Toronto</option>
              <option value="Barrie">Barrie</option>
              <option value="Kingston">Kingston</option>
              <option value="Hamilton">Hamilton</option>
              <option value="Oshawa">Oshawa</option>
              <option value="Windsor">Windsor</option>
              <option value="Mississauga">Mississauga</option>
              <option value="Brantford">Brantford</option>
              <option value="Thunder Bay">Thunder Bay</option>
              <option value="Brampton">Brampton</option>
              <option value="North Bay">North Bay</option>
              <option value="Ottawa">Ottawa</option>
              <option value="Cambridge">Cambridge</option>
              <option value="Stratford">Stratford</option>
              <option value="London">London</option>
            </select>
            {/* </div> */}
            {/* <div className="col-md-2"> */}
            <select
              className="form-control custom-select"
              id="origin"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
            >
              <option value="">Select an Origin</option>
              <option value="Guelph">Guelph</option>
              <option value="Waterloo">Waterloo</option>
              <option value="Kitchener">Kitchener</option>
              <option value="Toronto">Toronto</option>
              <option value="Barrie">Barrie</option>
              <option value="Kingston">Kingston</option>
              <option value="Hamilton">Hamilton</option>
              <option value="Oshawa">Oshawa</option>
              <option value="Windsor">Windsor</option>
              <option value="Mississauga">Mississauga</option>
              <option value="Brantford">Brantford</option>
              <option value="Thunder Bay">Thunder Bay</option>
              <option value="Brampton">Brampton</option>
              <option value="North Bay">North Bay</option>
              <option value="Ottawa">Ottawa</option>
              <option value="Cambridge">Cambridge</option>
              <option value="Stratford">Stratford</option>
              <option value="London">London</option>
            </select>
            {/* </div> */}
            {/* <div className="col-md-2"> */}
            <input
              type="date"
              className="form-control custome-date"
              id="search-date-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {/* </div> */}
            {/* <div className="col-md-2"> */}
            {/* <label>
                Passenger{" "} */}
            <input
              type="text"
              className="form-control custom-passenger"
              placeholder="Passenger"
              value={passenger}
              onChange={(e) => setPassenger(e.target.value)}
            />
            {/* </label> */}
            {/* </div> */}
            {/* <div className="col-md-2"> */}
            <button className="btn btn-warning w-100" onClick={handleSearch}>
              Search
            </button>
            {/* </div> */}
          </div>
          {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
        </div>
      </section>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func,
};

export default SearchBar;
