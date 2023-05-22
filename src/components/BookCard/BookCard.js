import React, { useContext } from 'react';
import './BookCard.scss';
import { Link, useLocation } from 'react-router-dom';
import { LibraryContext } from '../../App';
import axios from 'axios';
import Star from '../Star/Star';

function BookCard({ book, setEditBook, setConfirmDialogue, reload, bookDetails, setBookDetails, avgRate }) {
    const { setIsLoading, alert, setAlert } = useContext(LibraryContext);
    const { user } = useContext(LibraryContext);
    const location = useLocation();

    const deleteBook = (id) => {
        setIsLoading(true);

        axios.delete(`${process.env.REACT_APP_SERVER_DOMAIN}/book/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setAlert({
                    isOpen: true,
                    message: "Book Deleted",
                    type: "success",
                });
                reload();
            })
            .catch(err => {
                setAlert({
                    isOpen: true,
                    message: "Something went wrong!",
                    type: "danger",
                });
                setIsLoading(false);
            })
        setTimeout(() => {
            setAlert({ ...alert, isOpen: false });
        }, 5000);
    }
    return (
        <div className="card" style={{ width: "13rem" }}>
            <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Author: {book.author}</p>
                <p className="card-text">Genre: {book.genre}</p>
                <p className="card-text">Uploaded by: {book.uploaded_by.username}</p>
                <p className="card-text">RS {book.price}</p>
                <div className="star">
                    <Star stars={avgRate} />
                    <p>{avgRate}</p>
                </div>
                {location.pathname === '/myCollection' ? <>
                    <div className='buttons my-3'>
                        <button onClick={() => {
                            setEditBook({ isOpen: true, book: book });
                            document.body.classList.add('remove-scroll');
                        }} className='btn btn-primary mx-2'>Edit</button>
                        <button onClick={() => {
                            setConfirmDialogue({
                                isOpen: true,
                                type: "danger",
                                title: "Do you want to continue?",
                                message: "This book will be deleted permanently and it cannot be undone.",
                                task: () => { deleteBook(book._id) }
                            });
                            document.body.classList.add('remove-scroll');
                        }} className='btn btn-danger mx-2'>Delete</button>
                    </div>
                </> : <>
                    {user ? user._id === book.user_id ? <button className='btn btn-primary' onClick={() => {
                        setBookDetails({ isOpen: true, book: book });
                        document.body.classList.add('remove-scroll');
                    }}>See details</button> : <button className='btn btn-success' onClick={() => {
                        setBookDetails({ isOpen: true, book: book });
                        document.body.classList.add('remove-scroll');
                    }}>Borrow</button> : <Link to='/signup' className='btn btn-success'>Borrow</Link>}
                </>}
            </div>
        </div>
    )
}

export default BookCard