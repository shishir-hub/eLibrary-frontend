import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { LibraryContext } from '../../App';
import('./Edit.scss');

function Edit(props) {
    const { setIsLoading, alert, setAlert } = useContext(LibraryContext);
    const { editBook, setEditBook, reload } = props;
    const { isOpen, book } = editBook;

    const [editInputs, setEditInputs] = useState({
        title: '',
        author: '',
        genre: '',
        price: '',
    });

    useEffect(() => {
        setEditInputs({
            title: book?.title || '',
            author: book?.author || '',
            genre: book?.genre || '',
            price: book?.price || '',
        })
    }, [book])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditInputs({ ...editInputs, [name]: value });
    }

    const hanleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        let data = {
            title: editInputs.title,
            author: editInputs.author,
            genre: editInputs.genre,
            price: editInputs.price,
        }

        axios.put(`${process.env.REACT_APP_SERVER_DOMAIN}/book/${book._id}`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setAlert({
                    isOpen: true,
                    message: "Book updated Successfully",
                    type: "success",
                });
                document.body.classList.remove('remove-scroll');
                setEditBook({ ...editBook, isOpen: false });
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
        <>
            {isOpen ? <div className='back'>
                <div className="edit-container">
                    <div>
                        <h2 className='text-center mb-3'>Edit</h2>
                        <form onSubmit={hanleSubmit} className="d-flex flex-column">
                            <div className="inputs">
                                <label htmlFor="title">Title</label>
                                <input
                                    value={editInputs.title} onChange={(e) => { handleChange(e) }}
                                    name="title"
                                    type="text"
                                    required
                                    placeholder="Enter title"
                                />
                            </div>
                            <div className="inputs">
                                <label htmlFor="author">Author</label>
                                <input
                                    value={editInputs.author} onChange={(e) => { handleChange(e) }}
                                    name="author"
                                    type="text"
                                    required
                                    placeholder="Enter author name"
                                />
                            </div>
                            <div className="inputs">
                                <label htmlFor="genre">Genre</label>
                                <input
                                    value={editInputs.genre} onChange={(e) => { handleChange(e) }}
                                    name="genre"
                                    type="text"
                                    required
                                    placeholder="Enter your genre"
                                />
                            </div>
                            <div className="inputs">
                                <label htmlFor="price">Price</label>
                                <input
                                    value={editInputs.price} onChange={(e) => { handleChange(e) }}
                                    name="price"
                                    type="number"
                                    required
                                    placeholder="Enter your price"
                                />
                            </div>
                            <div className="buttons">
                                <button className='btn btn-success mx-2' type='submit'>Submit</button>
                                <button onClick={() => {
                                    document.body.classList.remove('remove-scroll');
                                    setEditBook({ ...editBook, isOpen: false });
                                }} className='btn btn-danger mx-2' type='button'>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div> : null}
        </>
    )
}

export default Edit
