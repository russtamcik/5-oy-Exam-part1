/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import request from "../../server";
import "../../sass/BlogSection.scss";

import "swiper/css";
import foto from "../../assets/images/png/two-women.png";
import { Link } from "react-router-dom";

const BlogsSection = () => {
  const [data, setData] = useState([]);
  const [sliderSize, setSliderSize] = useState(3);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const size = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 735) {
        setSliderSize(1);
      } else if (windowWidth < 1100) {
        setSliderSize(2);
      } else {
        setSliderSize(3);
      }
    };

    window.addEventListener("resize", size);

    return () => {
      window.removeEventListener("resize", size);
    };
  }, []);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const res = await request.get("/post/lastones");
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  console.log(data);

  return (
    <section className="blogs-section">
      <div className="container">
        <h1>Popular blogs</h1>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <Swiper
            spaceBetween={50}
            slidesPerView={sliderSize}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {data.map((el, i) => (
              <SwiperSlide key={i}>
                <div className="cards">
                  <Link to={`/blogpost/${el._id}`}>
                    <img src={foto} alt="img" />
                  </Link>
                  <p className="info">
                    By{" "}
                    <span>
                      {el.user.first_name} {el.user.last_name}
                    </span>{" "}
                    | {el.createdAt.split("T")[0]}
                  </p>
                  <p className="lor">{el.category.description}</p>
                  <p className="lor-2">{el.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default BlogsSection;
