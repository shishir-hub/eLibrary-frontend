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

export const LibraryContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    let token = localStorage.getItem('token');
    console.log(token);
    axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/user`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        console.log(res.data.data);
        setUser(res.data.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])
  return (
    <LibraryContext.Provider value={{
      isLoading, setIsLoading,
      user, setUser,
    }}>
      <BrowserRouter>
        <>
          {isLoading ? <LoadingSpinner /> : null}
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/myCollection' element={<Collection />} />
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
          </Routes>

        </>
      </BrowserRouter>
    </LibraryContext.Provider>
  );
}

export default App;
