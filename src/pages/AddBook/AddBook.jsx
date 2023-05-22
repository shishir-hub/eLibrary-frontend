import React, { useContext, useState } from "react";
import "./AddBook.scss";
import { LibraryContext } from "../../App";
import axios from "axios";

function AddBook() {
  const { user, setIsLoading, alert, setAlert } = useContext(LibraryContext);
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    price: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    let data = {
      title: e.target.title.value,
      author: e.target.author.value,
      genre: e.target.genre.value,
      user_id: user?._id,
      price: e.target.price.value,
    };

    console.log(data);

    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/book`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setAlert({
          isOpen: true,
          message: "Book uploaded Successfully",
          type: "success",
        });
        setBook({
          title: "",
          author: "",
          genre: "",
          price: "",
        });
        setIsLoading(false);
      })
      .catch((err) => {
        setAlert({
          isOpen: true,
          message: "Something went wrong!",
          type: "danger",
        });
        setIsLoading(false);
        setTimeout(() => {
          setAlert({ ...alert, isOpen: false });
        }, 5000);
      });
  };

  return (
    <div className="add-book">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h3>Add Book</h3>
        <div className="inputs">
          <label htmlFor="title">Title</label>
          <input
            value={book.title}
            onChange={handleChange}
            name="title"
            type="title"
            required
            placeholder="Enter Title"
          />
        </div>
        <div className="inputs">
          <label htmlFor="author">Author</label>
          <input
            value={book.author}
            onChange={handleChange}
            name="author"
            type="author"
            required
            placeholder="Enter Author"
          />
        </div>
        <div className="inputs">
          <label htmlFor="genre">Genre</label>
          <input
            value={book.genre}
            onChange={handleChange}
            name="genre"
            type="genre"
            required
            placeholder="Enter Genre"
          />
        </div>
        <div className="inputs">
          <label htmlFor="price">Price</label>
          <input
            value={book.price}
            onChange={handleChange}
            name="price"
            type="price"
            required
            placeholder="Enter Price"
          />
        </div>
        <button className="btn btn-success" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddBook;
