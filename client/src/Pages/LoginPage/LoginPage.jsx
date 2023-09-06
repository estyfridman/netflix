import React, { useState, useEffect, useContext } from 'react';
import "./LoginPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from '../../Context/AuthContext';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { loginCall } from '../../Reducer/AuthReducer';
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import Navbar from '../../Components/navbar/navbar.jsx';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCAPTCHA, setShowCAPTCHA] = useState(false);

  const navigate = useNavigate();
  const { isFetching, dispatch, user } = useContext(AuthContext);
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const registrationSuccess = await loginCall({ email, password }, dispatch);
      
      if (registrationSuccess){
        toast('login success');
        navigate('/home');
      }else {
        toast('Incorrect details, try again');
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  }

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [navigate, redirect, user]);


  const handleShowCAPTCHA = () => {
    setShowCAPTCHA((preve) => !preve);
  };

  return (
    <div className="login">
      <Navbar />
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <div className='field'>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>

          <div className='field'>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
            <span className='show' onClick={handleShowPassword}>{showPassword ? <BiShow /> : <BiHide />}</span>
          </div>
          <button
            className="loginButton"
            onClick={handleLogin}
            disabled={isFetching}
          >
            Sign In
          </button>
          <span className='signup-span'>
            New to Netflix?{" "}
            <Link className="link link-signin" to="/register">
              Sign up now.
            </Link>
          </span>
          <span className='more'>
            <small>
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.
            </small>
            <a onClick={handleShowCAPTCHA} id="button-more">Learn more</a>
          </span>
          {showCAPTCHA &&
            <small >
              The information collected by Google reCAPTCHA is subject to the
              Google Privacy Policy and Terms of Service, and is used for
              providing, maintaining, and improving the reCAPTCHA service and
              for general security purposes. it is not used for personalized
              advertising by Google.
            </small>}

        </form>
      </div>
    </div>
  )
}

export default LoginPage;
