import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import request from "../../server";

const HeroSection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const res = await request.get("/post/lastone");
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  console.log(data.user);
  return (
    <div>
      {loading ? (
        <div className="loading">Please wait...</div>
      ) : (
        <section className="hero-section">
          <div className="container">
            {data.user && (
              <div className="hero-text">
                <h1>{data.title}</h1>
                <p className="desc">
                  {data.description} lorem serutm majongloi seruf sturk
                </p>
                <p className="fullname">
                  By{" "}
                  <span>
                    {data.user.first_name} {data.user.last_name}
                  </span>{" "}
                  | May 23, 2023
                </p>
                <p className="desc-2">{data.description}</p>
              </div>
            )}
            <Link to={`/blogpost/${data._id}`}>
              <button>Read More</button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default HeroSection;
