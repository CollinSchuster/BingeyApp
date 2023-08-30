import React, { useState, useEffect } from 'react';
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import "../css/header.css"
import "../css/main.css"

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
  const fullName = user.name
  // Split the full name string into an array of words
  const nameParts = fullName.trim().split(/\s+/);

  // The first element of the array will be the first name
  const firstName = nameParts[0];

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
      <header className="header">
        <div className='profile-container'>
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
        <h1 className="title">Bingey</h1>
        {/* <div className="search-container">
          <div className="search-bar" onClick={handleClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M15.5 14h-.79l-.28-.27C16.41 12.61 17 11.11 17 9.5 17 5.91 14.09 3 10.5 3S4 5.91 4 9.5 6.91 16 10.5 16c1.61 0 3.11-.59 4.23-1.57l.27.28v.79l4 4 1.49-1.49L16.99 14zm-5 0c-2.48 0-4.5-2.02-4.5-4.5S8.02 5 10.5 5 15 7.02 15 9.5 12.98 14 10.5 14z" />
              </svg>
              {(isSearchBarVisible===true || isSearchBarClick===true) ? (<input className="search" type="text" placeholder="Search"/>) : []}
          </div>
        </div> */}
        <ul className='user-btns'>
          {user ? (
            <li>
              <button className='btn' onClick={onLogOut}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
        ) : 
        (<>
              <li>
                <Link to='/login'>
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to='/register'>
                  <FaUser /> Register
                </Link>
              </li>
        </>)}
      </ul>
      </header>
    </div>
   )
}

export default Header