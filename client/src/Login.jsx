import './Login.css';
import { Link } from 'react-router-dom';
import React from 'react';

const Login = () => {
  return (
    <div className="login-page">
      <div className="background">
        <div className="cityscape">
          {/* Add cityscape elements here if necessary */}
        </div>
      </div>
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="textbox">
            <input type="email" placeholder="Email" required />
          </div>
          <div className="textbox">
            <input type="password" placeholder="Password" required />
          </div>
          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className="login-button">Login</button>
          <div className="register-link">
            <p style={{color:"black"}}>Don't have an account? <Link to="/Register">Register</Link> </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
