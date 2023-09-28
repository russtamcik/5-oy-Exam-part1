import { useState, useEffect } from "react";

import { ENDPOINT } from "../../../constants";
import request from "./../../../server";

import "../../../sass/Categories.scss";

const CategoriesPage = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      let {
        data: { data },
      } = await request.get("category");
      setData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const handleOk = async (e) => {
    e.preventDefault();
    try {
      if (photo) {
        const categoriesData = {
          name,
          description,
        };
        let categoryData = { ...categoriesData, photo: photo._id };
        setLoading(false);
        if (selected === null) {
          await request.post("category", categoryData);
        } else {
          await request.put(`category/${selected}`, categoryData);
        }
        getData();
        setName("");
        setDescription("");
        setIsModalOpen(false);
      } else {
        console.log("Upload photo");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
    setSelected(null);
    setName("");
    setDescription("");
    setPhoto(null);
  };

  const uploadImage = async (e) => {
    try {
      let foto = new FormData();
      foto.append("file", e.target.files[0]);
      let { data } = await request.post("upload", foto);
      setPhoto(data);
    } catch (err) {
      console.log(err);
    }
  };

  async function edit(id) {
    setSelected(id);
    setIsModalOpen(true);
    let { data } = await request.get(`category/${id}`);
    setPhoto(data.photo);
    setName(data.name);
    setDescription(data.description);
  }

  async function deleteCategory(id) {
    const confirmation = window.confirm("Are you sure you want to delete?");
    if (confirmation) {
      try {
        await request.delete(`category/${id}`);
        getData();
        console.log("Category deleted successfully");
      } catch (err) {
        console.log("Failed to delete category");
      }
    }
  }

  return (
    <div>
      {loading ? (
        <div className="loading">Please wait...</div>
      ) : (
        <div className="container users-section">
          <div className="users">
            <h1>Categories ({data.length})</h1>
            <button onClick={showModal}>Add</button>
          </div>
          {isModalOpen && (
            <div className="form-category">
              <form className="form" onSubmit={handleOk}>
                <h2>Category data</h2>
                <div>
                  <label className="category-name" htmlFor="name">
                    Category name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="category-desc">
                  <label className="category-name" htmlFor="description">
                    Description:
                  </label>
                  <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <input type="file" onChange={uploadImage} />
                </div>
                <div className="btns">
                  <button onClick={handleOk}>
                    {selected === null ? "Add category" : "Save category"}
                  </button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="t-body">
              {data.map((row) => (
                <tr key={row._id}>
                  <td>{row.name}</td>
                  <td>{row.description}</td>
                  <td>
                    <img
                      src={`${ENDPOINT}upload/${row.photo._id}.${
                        row.photo.name.split(".")[1]
                      }`}
                      alt="Category"
                      height={50}
                    />
                  </td>
                  <td className="btn">
                    <button className="edit" onClick={() => edit(row._id)}>
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => deleteCategory(row._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
