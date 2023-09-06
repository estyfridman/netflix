import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { LOGOUT } from '../../Reducer/Actions.js';
import { FiSearch } from 'react-icons/fi';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import './navbar.scss';
import userImage from '../../images/userdf.png';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import MovieIcon from '@mui/icons-material/Movie';
import RecentActorsIcon from '@mui/icons-material/RecentActors';

const Navbar = () => {
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    window.onscroll = () => {
        setIsScrolled(window.scrollY === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    const logoutHandler = () => {
        dispatch({
            type: LOGOUT
        });
    }

    function toggleDropdown() {
        setIsDropdownOpen(!isDropdownOpen);
      }

      
  useEffect(() => {
    //Checking screen size
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    console.log(windowWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }); 

    return (
        <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
            <div className="navcontainer">
                <div className="logo">
                    <Link to="/">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="logo" />
                    </Link>
                </div>
                <div className={isDropdownOpen && windowWidth <= 860 ? "mobile" : "links"}>
                        <Link to="/home" className="link">
                            <RecentActorsIcon className="icon"/>
                            <span className="navbarmainLinks">Home</span>
                        </Link>

                        <Link to="/series" className="link">
                            <RecentActorsIcon className="icon"/>
                            <span className="navbarmainLinks">Series</span>
                        </Link>
                   
                        <Link to="/movies" className="link">
                            <MovieIcon className="icon"/>
                            <span className="navbarmainLinks">Movies</span>
                        </Link>
                        
                        <Link to="/search" className="link">
                            <FiSearch className="icon"/>
                            <span>Search</span>
                        </Link>

                    {user && (
                        <>
                        <div className="user link">
                            <img src={user.profilePicture ? user.profilePicture : userImage} alt="user" />
                            <span className="username">{user ? user.username : 'Welcome'}</span>

                        </div>
                        <div onClick={logoutHandler} className="link">
                                <LogoutIcon className="icon"/>
                                <span>Logout</span>
                        </div>
                        <div onClick={() => navigate(`/account`)} className="link">
                                <ManageAccountsIcon className="icon"/>
                                <span>Account</span>
                        </div>
                        </>
                    )}

                    {!user && (
                        <Link to="/register" className="link">
                            <span className="navbarmainLinks">Register</span>
                        </Link>
                    )}
                </div>

                <div className="Drop">
                    <CalendarViewDayIcon onClick={toggleDropdown}/>
                </div>

            </div>
        </div>
    )
}

export default Navbar;
