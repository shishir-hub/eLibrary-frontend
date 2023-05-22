import { createContext, useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Collection from './pages/MyCollection/Collection';
import Signup from './pages/Signup/Signup';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import AddBook from './pages/AddBook/AddBook';
import Alert from './components/Alert/Alert';

export const LibraryContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const [alert, setAlert] = useState({
    isOpen: false,
    message: 'Task Completed',
    type: 'success'
  });

  useEffect(() => {
    setIsLoading(true);
    let token = localStorage.getItem('token');
    axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/user`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        setUser(res.data.data);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        // setAlert({
        //   isOpen: true,
        //   message: "Something went wrong!",
        //   type: "danger",
        // });

      })
    setTimeout(() => {
      setAlert({ ...alert, isOpen: false });
    }, 5000);
  }, [])
  return (
    <LibraryContext.Provider value={{
      isLoading, setIsLoading,
      user, setUser,
      alert, setAlert,
    }}>
      <BrowserRouter>
        <>
          {isLoading ? <LoadingSpinner /> : null}
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route path='/' element={user ? <Home /> : <Home />}></Route>
            <Route path='/myCollection' element={user ? <Collection /> : <Home />} />
            <Route path='/addbook' element={user ? <AddBook /> : <Home />} />
            <Route path='/login' element={user ? <Home /> : <Login />}></Route>
            <Route path='/signup' element={user ? <Home /> : <Signup />}></Route>
          </Routes>

        </>
      </BrowserRouter>
    </LibraryContext.Provider>
  );
}

export default App;
