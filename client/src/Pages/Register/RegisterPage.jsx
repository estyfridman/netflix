import React, { useState, } from 'react';
import { useNavigate } from "react-router-dom";
import './RegisterPage.scss';
import Navbar from '../../Components/navbar/navbar.jsx';

export const RegisterPage = () => {
  const [email, setEmail] = useState(" ");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isBlurEmail, setIsBlurEmail] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
  
    if (ValidateEmail(email)) {
      console.log(email);
      sessionStorage.setItem('email', email);
      setIsBlurEmail(true);
      navigate('/finish')
    }else {
      setIsValidEmail(false);
      setIsBlurEmail(true);
      setEmail('');
    }
  }

  function ValidateEmail(email) 
  {
   if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
      return (true)
    }
      return (false)
  }

  return (
    <div className="register">
      <Navbar/>
      <div className="container">
        <form>
          <h1>Unlimited movies, TV shows, and more</h1>
          <div className='text'>
            Watch anywhere. Cancel anytime.
          </div>
          <div className='text'>
            Ready to watch? Enter your email to create or restart your membership.
          </div>
          <div className='input-field'>
            <div className="input-container">
              <input
                className='email-input'
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => ValidateEmail(e.target.value)}
                // disabled={isBlurEmail}
              />
              <div className="placeholder">Email Address</div>
              {!isValidEmail && isBlurEmail && <div className='error'>Please provide a valid email address</div>}
            </div>
            <button
              className="loginButton"
              type='submit'
              // disabled={!isValidEmail}
              onClick={handleLogin}
            >
              Get Started {'>'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default RegisterPage;
