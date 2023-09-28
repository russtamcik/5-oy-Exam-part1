/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";

import request from "../../server";
import Card from "../../components/card/Card";
import { ENDPOINT } from "../../constants";

import "../../sass/MyPosts.scss";

const MyPostsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const [btns] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState();
  const pageTotal = 5;

  const handleCancel = () => {
    setIsModalOpen(false);
    setErrors({});
  };

  const getData = async () => {
    setLoading(true);
    try {
      const response = await request.get(
        `/post?page=${currentPage}&limit=${pageTotal}`
      );
      setData(response.data.data);
      setItemsPerPage(data.pagination.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const edit = async (id) => {
    setIsModalOpen(true);
    setSelected(id);
    let { data } = await request.get(`post/${id}`);
    setLoading(false);
    setPhoto(data.photo);
    setName(data.description);
    setTitle(data.title);
    setDescription(data.description);
  };

  const Categorydelet = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      await request.delete(`post/${id}`);
      getData(currentPage);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(photo);
      if (photo) {
        console.log(photo);
        const formData = {
          title,
          description,
        };

        console.log(formData);
        let categoryData = { ...formData, photo: photo._id };
        console.log(categoryData);
        if (selected === null) {
          await request.post("post", categoryData);
          setLoading(false);
        } else {
          await request.put(`post/${selected}`, categoryData);
          setLoading(false);
        }
        setIsModalOpen(false);
        setTitle("");
        setName("");
        setDescription("");
        setErrors({});
        getData(currentPage);
      } else {
        console.error("Upload photo");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const totalPages = Math.ceil(itemsPerPage / pageTotal);

  return (
    <>
      {loading ? (
        <div className="loading">Please wait...</div>
      ) : (
        <section>
          <div className="container">
            <div className="post-hero">
              <h2>My Post</h2>
            </div>
            <hr />
          </div>
          {data.length === 0 ? (
            <h2
              style={{
                textAlign: "center",
                color: "red",
                fontFamily: "sen",
                fontSize: "25px",
              }}
            >
              Posts Not Found
            </h2>
          ) : (
            data.map((el, index) => (
              <Card
                key={index}
                data={el}
                btns={btns}
                edit={edit}
                Categorydelet={Categorydelet}
              />
            ))
          )}

          {isModalOpen && (
            <div className="form-category">
              <form className="form" onSubmit={handleFormSubmit}>
                <h2>Posts data</h2>
                <div>
                  <label className="category-name" htmlFor="firstname">
                    Title:
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="category-name" htmlFor="lastname">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="category-name" htmlFor="username">
                    Description:
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                {photo && (
                  <div className="">
                    <img
                      width="100%"
                      height="200"
                      className=""
                      src={`${ENDPOINT}upload/${photo._id}.${
                        photo.name.split(".")[1]
                      }`}
                      alt={photo.name}
                    />
                  </div>
                )}
                <div className="btns">
                  <button onClick={handleFormSubmit}>Save user</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          {pageTotal > itemsPerPage ? null : (
            <div className="pagination">
              <button
                className="pagination_button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              <span className="pagination-num">{currentPage}</span>
              <button
                className="pagination_button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default MyPostsPage;
