import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import request from "../../server";

import "swiper/css";
import "../../sass/CategorySection.scss";
import busines from "../../assets/images/svg/busines.svg";
import { Link } from "react-router-dom";

const CatgeorySection = () => {
  const [data, setData] = useState([]);
  const [sliderSize, setSliderSize] = useState(4);

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
      const res = await request.get("/category");
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  console.log(data);
  return (
    <section>
      <div className="container">
        <div className="categories">
          <h1>Choose A Catagory</h1>
          <Swiper
            spaceBetween={50}
            slidesPerView={sliderSize}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {data.map((el, id) => (
              <SwiperSlide key={id}>
                <Link to={`/category/${el.name}`}>
                  <div className="card-box">
                    <img src={busines} alt="" />
                    <p className="name">{el.name}</p>
                    <p className="card-desc">{el.description}</p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CatgeorySection;
