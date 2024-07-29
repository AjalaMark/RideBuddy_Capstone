import { userIcon } from "../Constants";
import PropTypes from "prop-types";

const Testimonial = (props) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="testimonial-card p-4">
        {props.message}
        <div className="user-icon">
          <img src={userIcon} alt="User" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

Testimonial.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Testimonial;
