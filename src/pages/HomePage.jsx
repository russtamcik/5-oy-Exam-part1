// import { Fragment } from "react";

// import HeroSection from "../components/hero/HeroSection";
// import BlogsSection from "../components/blogs/BlogsSection";
// import CatgeorySection from "../components/category/CatgeorySection";

// import "../sass/HeroSection.scss";

// const HomePage = () => {
//   return (
//     <Fragment>
//       <HeroSection />
//       <BlogsSection />
//       <hr />
//       <CatgeorySection />
//     </Fragment>
//   );
// };

// export default HomePage;

import { Fragment, useState, useEffect } from "react";

import HeroSection from "../components/hero/HeroSection";
import BlogsSection from "../components/blogs/BlogsSection";
import CatgeorySection from "../components/category/CatgeorySection";

import "../sass/HomePage.scss";
import "../sass/HeroSection.scss";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <Fragment>
      {loading ? (
        <div className="loading">Please wait...</div>
      ) : (
        <Fragment>
          <HeroSection />
          <BlogsSection />
          <hr />
          <CatgeorySection />
        </Fragment>
      )}
    </Fragment>
  );
};

export default HomePage;
