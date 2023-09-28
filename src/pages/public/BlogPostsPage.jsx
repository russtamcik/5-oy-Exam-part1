/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import request from "../../server";

import "../../sass/BlogPost.scss";

import { ENDPOINT } from "../../constants";

const BlogPostsPage = () => {
  const { blogId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const res = await request.get(`/post/${blogId}`);
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  console.log(data);

  return (
    <section className="blogpost">
      <div className="container">
        {loading ? (
          <div className="loading">Please wait...</div>
        ) : (
          <div className="blog-info">
            <img
              width="100%"
              src={`${ENDPOINT}upload/${data.photo._id}.${
                data.photo.name.split(".")[1]
              }`}
              alt="Photo Not Found"
            />
            <div className="blog-avatar">
              <img
                width="50"
                height={50}
                src={`${ENDPOINT}upload/${data.photo._id}.${
                  data.photo.name.split(".")[1]
                }`}
                alt="Photo Not Found"
              />
              <div className="ava-info">
                <p className="full-name">
                  {data.user.first_name} {data.user.last_name}
                </p>
                <p className="data">Posted on {data.updatedAt.split("T")[0]}</p>
              </div>
            </div>
            <div className="blog-hero">
              <p className="blog-title">{data.description}</p>
            </div>
            <div className="blog-start">
              <p className="blog-biznes">
                Startup (#{data.name}, #screen, #life)
              </p>
            </div>
            <div className="blog-lorem">
              <p>{data.description}</p>
              <p>{data.description}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPostsPage;
