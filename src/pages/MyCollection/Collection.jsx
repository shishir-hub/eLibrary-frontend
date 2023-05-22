import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Collection.scss";
import BookCard from "../../components/BookCard/BookCard";
import { LibraryContext } from "../../App";
import axios from "axios";
import Edit from "../../components/Edit/Edit";
import ConfirmDialogue from "../../components/ConfirmDialogue/ConfirmDialogue";

function Collection() {
  const { setIsLoading, user, alert, setAlert } = useContext(LibraryContext);
  const [myBooks, setMyBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [confirmDialogue, setConfirmDialogue] = useState({
    isOpen: false,
    type: "",
    title: "",
    message: "",
    task: () => {},
  });
  const [editBook, setEditBook] = useState({
    isOpen: false,
    book: {},
  });

  const reload = () => {
    setIsLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/books/${user?._id}?search_term=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setMyBooks(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setAlert({
          isOpen: true,
          message: "Something went wrong!",
          type: "danger",
        });
        setIsLoading(false);
      });
    setTimeout(() => {
      setAlert({ ...alert, isOpen: false });
    }, 5000);
  };

  useEffect(() => {
    reload();
  }, [searchTerm]);
  return (
    <>
      <Edit editBook={editBook} setEditBook={setEditBook} reload={reload} />
      <ConfirmDialogue
        confirmDialogue={confirmDialogue}
        setConfirmDialogue={setConfirmDialogue}
      />
      <div className="collection">
        <div className="collection-wrapper">
          <div className="heading">
            <Link to="/addbook">
              <button className="btn btn-secondary">Add Book</button>
            </Link>
            <input
              className="form-control search"
              type="text"
              name="search"
              placeholder="Search Books(Title/Author/Genre)"
              aria-label="Search"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
          <hr />
          {myBooks.length !== 0 ? (
            <div className="books">
              {myBooks.map((book, i) => {
                let rating = book?.rating || [];
                let noOfRating = rating.length || 0;
                let totalRate = 0;
                rating.forEach((el) => {
                  totalRate = el + totalRate;
                });
                let avgRate =
                  totalRate / (noOfRating !== 0 ? noOfRating : 1) || 0;
                return (
                  <BookCard
                    avgRate={avgRate}
                    key={i}
                    book={book}
                    setConfirmDialogue={setConfirmDialogue}
                    setEditBook={setEditBook}
                    reload={reload}
                  />
                );
              })}
            </div>
          ) : (
            <>
              <h3>Your collection doesnot have any books.</h3>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Collection;
