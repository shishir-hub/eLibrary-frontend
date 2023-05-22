import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./Navbar.scss";
import { LibraryContext } from '../../App';

function Navbar() {

    const { user, setUser, setIsLoading } = useContext(LibraryContext);

    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoading(true);
        localStorage.removeItem('token');
        setUser();
        navigate('/login');
        setIsLoading(false);
    }

    return (
        // <div className='navigation'>
        <div className="navbar-container">
            <h4>eLibrary</h4>
            <ul>
                <li className={location.pathname === '/' ? "active" : ""}><div /><Link to='/'>Home</Link></li>
                {user ? <>
                    <li className={location.pathname === '/myCollection' ? "active" : ""}><div /><Link to='/myCollection'>My Books</Link></li>
                    <button onClick={handleLogout} className='btn btn-danger' type='button'>Logout</button></> :
                    <>
                        <li className={location.pathname === '/login' ? "active" : ""}><div /><Link to='/login'>Login</Link></li>
                        <li className={location.pathname === '/signup' ? "active" : ""}><div /><Link to='/signup'>Register</Link></li>
                    </>}
            </ul>
        </div>
        // </div>
    )
}

export default Navbar
