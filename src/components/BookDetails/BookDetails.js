import React, { useContext, useEffect, useState } from "react";
import Star from "../Star/Star";
import { LibraryContext } from "../../App";
import './BookDetails.scss';
import axios from "axios";

function BookDetails({ bookDetails, setBookDetails }) {
  const { user, setIsLoading, alert, setAlert } = useContext(LibraryContext);
  const { isOpen, book } = bookDetails;
  const [stars, setStars] = useState({ avgRating: 0, totalUser: 0 });

  useEffect(() => {
    let rating = book?.rating || [];
    let noOfRating = rating.length || 0;
    let totalRate = 0;
    rating.forEach(el => { totalRate = el + totalRate });
    let avgRate = totalRate / (noOfRating !== 0 ? noOfRating : 1) || 0;
    console.log('Average Rating: ', avgRate);
    console.log(rating);
    console.log(totalRate);
    setStars({
      avgRating: avgRate,
      totalUser: noOfRating
    })
  }, [book])

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let rating = [...book?.rating];
    let reviewed_by = [...book?.reviewed_by];

    if (reviewed_by.indexOf(user?._id !== -1)) {
      rating.push(e.target.rate.value);
      reviewed_by.push(user._id);

      let data = {
        rating,
        reviewed_by
      }

      axios.put(`${process.env.REACT_APP_SERVER_DOMAIN}/book/${book._id}`, data, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(res => {
          setAlert({
            isOpen: true,
            message: "Rated",
            type: "success",
          });
          setIsLoading(false);
        })
        .catch(err => {
          setAlert({
            isOpen: true,
            message: "Something went wrong!",
            type: "danger",
          });
          setIsLoading(false);
        })
    }
    else {
      setAlert({
        isOpen: true,
        message: "You have already rated this book.",
        type: "danger",
      });
      setIsLoading(false);
    }
    setTimeout(() => {
      setAlert({ ...alert, isOpen: false });
    }, 5000);
  }
  return (
    <>
      {isOpen ? <div className="back">
        <div className="detail-wrapper">
          <div className="details">
            <h3>Title:</h3>
            <p>Author:</p>
            <p>Genre:</p>
            <p>Uploaded By:</p>
            <p>Market Price: Rs</p>
            <><Star stars={stars.avgRating} /><p> {stars.avgRating} <span>({stars.totalUser} users rated this book)</span></p></>
          </div>
          <div className="inputs">
            <label htmlFor="rate">Rate</label>
            <form onSubmit={(e) => handleSubmit(e)}>
              <select className="select" name="rate" required>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              <button disabled={user?._id === book.user_id} className="btn btn-primary mx-3" type="submit">Rate</button>
            </form>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-secondary" onClick={() => {
              setBookDetails({ ...bookDetails, isOpen: false });
              document.body.classList.remove('remove-scroll');
            }}>Done</button>
          </div>
        </div>
      </div> : null}

    </>
  );
}

export default BookDetails;
