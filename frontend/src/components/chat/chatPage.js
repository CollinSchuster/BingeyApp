import React, { createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import ChatSidebar from "./chatSidebar";
import styles from './chat.module.css'


export const myContext = createContext();
function ChatPage() {
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);
  const [refresh, setRefresh] = useState(true);
  const {user} = useSelector((state) => state.auth)


  return (
      <div className={styles["chat-container"]}>
        <div className={styles["main-container"]}>
          <myContext.Provider value={{ refresh: refresh, setRefresh: setRefresh }}>
            <ChatSidebar />
            <Outlet />
          </myContext.Provider>
        </div>
      </div>
  );
}


export default ChatPage

