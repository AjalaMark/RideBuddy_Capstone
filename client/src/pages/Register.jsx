import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [province, setProvince] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNo,
          address,
          postalCode,
          province,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData?.message || "An error occurred. Please try again.");
        return;
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      if (response.ok) {
        navigate("/login");
      } else {
        setError(data?.message || "An error occurred. Please try again.");
        console.log(error);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="register-page">
      <div className="background">
        <div className="cityscape"></div>
      </div>
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="textbox">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {email && !isEmailValid(email) && (
              <div className="error-message">
                Please enter a valid email address.
              </div>
            )}
          </div>
          <div className="textbox">
            <input
              type="tel"
              placeholder="Phone No"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="text"
              placeholder="Address/Street No"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="text"
              placeholder="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="text"
              placeholder="Province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="register-button">
            Register
          </button>
          <div className="login-link">
            <p className="black-color">
              Already Have An Account? <Link to="/">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
