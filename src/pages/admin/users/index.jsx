/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import request from "./../../../server";

import "../../../sass/Users.scss";

const CategoriesPage = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const pageTotal = 10;

  useEffect(() => {
    getData();
  }, [currentPage]);

  async function getData() {
    try {
      setLoading(true);
      const response = await request.get(
        `user?page=${currentPage}&limit=${pageTotal}&search=${searchTerm}`
      );
      setItemsPerPage(response.data.pagination.total);
      const { data } = response.data;
      setData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const handleOk = async () => {
    try {
      const categoryData = {
        firstname,
        lastname,
        username,
      };
      if (selected === null) {
        await request.post("user", categoryData);
      } else {
        await request.put(`user/${selected}`, categoryData);
      }
      getData();
      setFirstname("");
      setLastname("");
      setUsername("");
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function edit(id) {
    setSelected(id);
    setIsModalOpen(true);
    try {
      let {
        data: { data },
      } = await request.get(`user/${id}`);
      setFirstname(data.first_name);
      setLastname(data.last_name);
      setUsername(data.username);
    } catch (err) {
      console.log(err);
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const editData = {
        first_name: firstname,
        last_name: lastname,
        username: username,
      };

      if (selected === null) {
        await request.post("user", editData);
        setLoading(false);
      } else {
        await request.put(`user/${selected}`, editData);
        setLoading(false);
      }
      getData();
      setIsModalOpen(false);
      setFirstname("");
      setLastname("");
      setUsername("");
    } catch (err) {
      console.log(err);
    }
  };

  async function deleteCategory(id) {
    const confirmation = window.confirm("Are you sure you want to delete?");
    if (confirmation) {
      try {
        await request.delete(`user/${id}`);
        getData();
        toast.error("User deleted successfully");
        setSearchTerm("");
      } catch (err) {
        toast.error("Failed to delete user");
      }
    }
  }

  console.log(data);

  const totalPages = Math.ceil(itemsPerPage / pageTotal);

  return (
    <div>
      {loading ? (
        <div className="loading">Please wait...</div>
      ) : (
        <div className="container users-section">
          <input
            className="searching"
            type="text"
            placeholder="User searching..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="users">
            <h1>Users ({itemsPerPage})</h1>
          </div>
          {isModalOpen && (
            <div className="form-category">
              <form className="form" onSubmit={handleFormSubmit}>
                <h2>Users data</h2>
                <div>
                  <label className="category-name" htmlFor="firstname">
                    First name:
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
                <div>
                  <label className="category-name" htmlFor="lastname">
                    Last name:
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
                <div>
                  <label className="category-name" htmlFor="username">
                    User name:
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="btns">
                  <button onClick={handleOk}>Save user</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          <table>
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Username</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="t-body">
              {data.map((row) => (
                <tr key={row._id}>
                  <td>{row.first_name}</td>
                  <td>{row.last_name}</td>
                  <td>{row.username}</td>
                  <td>
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
          <div className="pagination">
            <button
              className="pagination__button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <span className="pagination-num">{currentPage}</span>
            <button
              className="pagination__button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
