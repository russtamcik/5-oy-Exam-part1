import { Link } from "react-router-dom";

import { ENDPOINT } from "../../constants";

import "../../sass/Card.scss";

/* eslint-disable react/prop-types */

const Card = ({ data, btns, edit, Categorydelet }) => {
  console.log(data);
  return (
    <section className="card-section">
      <div className="container">
        <div className="card-body">
          <img
            src={`${ENDPOINT}upload/${data.photo._id}.${
              data.photo.name.split(".")[1]
            }`}
            alt=""
          />
          <div className="card-title">
            <h3>{data.title}</h3>
            <Link to={`/blogpost/${data._id}`}>
              <h5>{data.description}</h5>
            </Link>
            <p>{data.description}</p>
          </div>
          {btns === true ? (
            <div className="btns">
              <button
                className="edit"
                onClick={() => edit(data._id)}
              >
                Edit
              </button>
              <button
                className="delete"
                onClick={() => Categorydelet(data._id)}
              >
                Delete
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};

export default Card;
