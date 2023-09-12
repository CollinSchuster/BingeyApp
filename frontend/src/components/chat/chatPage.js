import React, { createContext, useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet,useLocation,useNavigate } from "react-router-dom";
import ChatSidebar from "./chatSidebar";
import styles from './chat.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export const myContext = createContext();
function ChatPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const lightTheme = useSelector((state) => state.themeKey);
  const [refresh, setRefresh] = useState(true);
  const {user} = useSelector((state) => state.auth)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Event listener to update window width when the screen is resized
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  function isMobileDevice() {
    return /Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent);
  }

  function chatPageSetUp() {
    if (window.innerWidth < 780 && location.pathname === '/messages'){
      console.log('test')
      return (
        <ChatSidebar />
      )
    } else if (window.innerWidth > 780 ) {
      console.log('no sidebar',location)
      return (<><ChatSidebar /></>)
    }
    else {
      <></>
    }
  }
  // Function to handle going back to the previous page
  const goBack = () => {
    navigate(-1); // Navigate back one step in the history stack
  };

  return (
      <div className={styles["chat-container"]}>
        <div className={styles["main-container"]}>
          <myContext.Provider value={{ refresh: refresh, setRefresh: setRefresh }}>
            {chatPageSetUp()}
            {windowWidth < 780 && location.pathname !== "/messages" ? (
            <ArrowBackIcon
              onClick={goBack}
              style={{
                position: "relative",
                top: 25,
                left: 10,
                cursor: "pointer",
                padding: "10px",
              }}
            />
          ) : (
            <></>
          )}
            <Outlet />
          </myContext.Provider>
        </div>
      </div>
  );
}


export default ChatPage
/*
            {window.innerWidth < 780 & location !== '/messages/chat/:_id' ? (
              <ChatSidebar />
          ) : (
            <>
              <ChatSidebar />
              <Outlet />
            </>
          )}

*/