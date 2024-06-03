import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="login-page">
      <div className="background">
        <div className="cityscape">
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
            <p style={{color:"black"}}>Don't have an account? <Link to="/register">Register</Link> </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
