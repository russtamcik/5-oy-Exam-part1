import PropTypes from "prop-types";

import people from "../../assets/images/png/people.png";

import "../../sass/Card.scss";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  console.log(data);
  return (
    <section className="card-section">
      <div className="card-body">
        <img src={people} alt="" />
        <div className="card-title">
          <h3>{data.category.name}</h3>
          <Link to={`/blogpost/${data._id}`}>
            <h5>{data.category.description}</h5>
          </Link>
          <p>{data.description}</p>
        </div>
      </div>
    </section>
  );
};

Card.propTypes = {
  data: PropTypes.object,
};

export default Card;
