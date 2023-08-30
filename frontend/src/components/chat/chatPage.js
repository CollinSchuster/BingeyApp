import React, { createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import ChatSidebar from "./chatSidebar";
import styles from './chat.module.css'

// import AccountCircleIcon from '@mui/icons-material/AccountCircle'
// import {IconButton} from '@mui/material'
// import AddCircleIcon from '@mui/icons-material/AddCircle'
// import PersonAddIcon from '@mui/icons-material/PersonAdd'
// import GroupAddIcon from '@mui/icons-material/GroupAdd'
// import NightlightIcon from '@mui/icons-material/Nightlight'
// import SearchIcon from '@mui/icons-material/Search'
// import ConversationsItem from './conversationsItem'

export const myContext = createContext();
function ChatPage() {
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);
  const [refresh, setRefresh] = useState(true);
  const {user} = useSelector((state) => state.auth)
  console.log(user)
  return (
      <div className={styles["chat-container"]}>
        <div className={styles["main-container"]}>
          <myContext.Provider value={{ refresh: refresh, setRefresh: setRefresh }}>
            <ChatSidebar />
            <Outlet />
          </myContext.Provider>
          {/* <Welcome /> */}
          {/* <CreateGroups /> */}
          {/* <ChatArea props={conversations[0]} /> */}
          {/* <Users /> */}
          {/* <Groups /> */}
        </div>
      </div>
  );
}


export default ChatPage

