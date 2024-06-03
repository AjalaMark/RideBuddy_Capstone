import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="register-page">
      <div className="background">
        <div className="cityscape">
        </div>
      </div>
      <div className="register-box">
        <h2>Register</h2>
        <form>
          <div className="textbox">
            <input type="text" placeholder="First Name" required />
          </div>
          <div className="textbox">
            <input type="text" placeholder="Last Name" required />
          </div>
          <div className="textbox">
            <input type="email" placeholder="Email" required />
          </div>
          <div className="textbox">
            <input type="tel" placeholder="Phone No" required />
          </div>
          <div className="textbox">
            <input type="text" placeholder="Address/Street No" required />
          </div>
          <div className="textbox">
            <input type="text" placeholder="Postal Code" required />
          </div>
          <div className="textbox">
            <input type="text" placeholder="Province" required />
          </div>
          <div className="textbox">
            <input type="password" placeholder="Password" required />
          </div>
          <div className="textbox">
            <input type="password" placeholder="Confirm Password" required />
          </div>
          <button type="submit" className="register-button">Register</button>
          <div className="login-link">
            <p style={{color:"black"}}>Already Have An Account? <Link to="/">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
