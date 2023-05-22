import React, { useContext, useEffect, useState } from "react";
import BookCard from "../../components/BookCard/BookCard";
import "./Home.scss";
import { LibraryContext } from "../../App";
import axios from "axios";
import BookDetails from "../../components/BookDetails/BookDetails";

function Home() {
  const { setIsLoading, alert, setAlert } = useContext(LibraryContext);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookDetails, setBookDetails] = useState({
    isOpen: false,
    book: {},
  });

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/book?search_term=${searchTerm}`
      )
      .then((res) => {
        console.log(res.data.data);
        setBooks(res.data.data);
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
  }, [searchTerm]);
  return (
    <>
      <BookDetails setBookDetails={setBookDetails} bookDetails={bookDetails} />
      <div className="home">
        <div className="heading">
          <h3>Books</h3>
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
        {books.length !== 0 ? (
          <div className="books">
            {books.map((book, i) => {
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
                  key={i}
                  book={book}
                  setBookDetails={setBookDetails}
                  bookDetails={bookDetails}
                  avgRate={avgRate}
                />
              );
            })}
          </div>
        ) : (
          <p>No Books available</p>
        )}
      </div>
    </>
  );
}

export default Home;
