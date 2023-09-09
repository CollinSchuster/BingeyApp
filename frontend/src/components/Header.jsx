import React, { useState, useEffect } from 'react';
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import styles from "../css/header.module.css"
import "../css/main.css"
import { size } from 'lodash';

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  console.log(user)
  const onLogOut = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  if (user) {
    const fullName = user.name
    // Split the full name string into an array of words
    const nameParts = fullName.trim().split(/\s+/);

    // The first element of the array will be the first name
    const firstName = nameParts[0];

  }
  const handleNavigate = async (path) => {
    navigate(path);
  };

  const [isSearchBarVisible, setIsSearchBarVisible] = useState(true);
  const [isSearchBarClick, setIsSearchBarClick] = useState(false);
  
  // Check if the search bar is fully visible on mount and on window resize
  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth;
      setIsSearchBarVisible(windowWidth >= 600);
    }
    handleResize(); // Initial check on mount
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handles the Click event on the div for when it is just the search-icon so that the full search bar can still pop up
  function handleClick() {
    setIsSearchBarClick(prevClick => {
      return !prevClick
    })
  }
  console.log(isSearchBarClick)

  return(
    <div>
      <header className={styles.header}>
        <div className={styles['profile-container']}>
          <svg 
              xmlns="http://www.w3.org/2000/svg" 
              height="2em" 
              viewBox="0 0 448 512"
              className='profile-pic'>
                <path 
                  fill="currentColor"
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
            </svg>
        </div>
        <h1 className={styles.title}>Bingey</h1>
        {user ? (
            <ul className={styles['user-btns']}>
              <li>
                <button className={`${styles.btn} ${styles.logoutBtn}`} onClick={onLogOut}>
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          ) : (
            <div>
              <ul className={styles['user-btns']}>
                <li className={styles['user-link']}>
                  <Link to="/login" style={{display: 'flex', alignItems: 'center',color: 'black', fontSize: '20px',textDecoration: 'none'}}>
                    <FaSignInAlt /> Login
                  </Link>
                </li>
              </ul>
              <ul className={styles['user-btns']}>
                <li className={styles['user-link']}>
                  <Link to="/register" style={{display: 'flex', alignItems: 'center', color: 'black', fontSize: '20px',textDecoration: 'none'}}>
                    <FaUser /> Register
                  </Link>
                </li>
              </ul>
            </div>
        )}
      </header>
    </div>
  );
}

export default Header