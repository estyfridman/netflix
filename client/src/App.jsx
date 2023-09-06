import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import RegisterPage from "./Pages/Register/RegisterPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import DetailsPage from "./Pages/Details/DetailsPage";
import RegisterFinishPage from "./Pages/RegisterFinishPage/RegisterFinishPage";
import Search from './Pages/Search/Search';
import Watch from './Pages/Watch/Watch';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useContext, useEffect, useState } from 'react';
import { AuthContext } from './Context/AuthContext';
import Protected from './Components/Protected';
import Account from './Pages/Account/Account';


function App() {
  const { user } = useContext(AuthContext);
  const [isSignedIn, setIsSignedIn] = useState(null)

  useEffect(() => {
    if(user) {
      setIsSignedIn(true);
    }else{
      setIsSignedIn(false);
    }

  },[user])

  return (
    <div className="App">
      <BrowserRouter>
        <div className="up">
          <ToastContainer
            position="top-center"
            limit={1}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />

          <div >
            <Routes>
              <Route exact path="/" element={<Protected isSignedIn={isSignedIn}><HomePage /></Protected>} />
              <Route path="/home" element={<Protected isSignedIn={isSignedIn}><HomePage /></Protected>} />
              <Route path="/movies" element={<Protected isSignedIn={isSignedIn}><HomePage type="movies" /></Protected>} />
              <Route path="/series" element={<Protected isSignedIn={isSignedIn}><HomePage type="series" /></Protected>} />
              <Route path="/details/:id" element={<Protected isSignedIn={isSignedIn}><DetailsPage /></Protected>} />
              <Route path="/search" element={<Protected isSignedIn={isSignedIn}><Search /></Protected>} />
              <Route path="/watch/:id" element={<Protected isSignedIn={isSignedIn}><Watch /></Protected>} />
              <Route path="/account" element={<Protected isSignedIn={isSignedIn}><Account /></Protected>} />

              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/finish" element={<RegisterFinishPage />} />

            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
