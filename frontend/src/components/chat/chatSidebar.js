import React, { useContext, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LightModeIcon from "@mui/icons-material/LightMode";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { toggleTheme } from '../features/chat/chatSlice.js' /*error */
import axios from "axios";
// import { refreshSidebarFun } from '../features/chat/refreshSidebar' /*error */
import { myContext } from "./chatPage";
import styles from './chat.module.css'

function ChatSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const dyParams = useParams();
  // const [chat_id, chat_user] = dyParams._id.split("&");

  // axios.get(`"http://localhost:3001/api/chat/${userId}`)
  // .then(response => {
  //   const userName = response.data.name;
  //   console.log(`User's name is: ${userName}`);
  // })
  // .catch(error => {
  //   console.error('Error fetching user data:', error);
  // });

  // const friend = 

  const lightTheme = useSelector((state) => state.themeKey);
  // const refresh = useSelector((state) => state.refreshKey);
  const { refresh, setRefresh } = useContext(myContext);
  // console.log("Context API : refresh : ", refresh);
  const [conversations, setConversations] = useState([]);
  // console.log("Conversations of Sidebar : ", conversations);
  const {user} = useSelector((state) => state.auth)

  // console.log("Data from LocalStorage : ", user);
  const nav = useNavigate();
  if (!user) {
    console.log("User not Authenticated");
    nav("/");
  }

  // const user = userData.data;
  useEffect(() => {
    // console.log("Sidebar : ", user.token);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios.get("http://localhost:3001/api/chat/", config).then((response) => {
      console.log("Data refresh in sidebar ", response.data);
      setConversations(response.data);
      // setRefresh(!refresh);
    });
  }, [refresh]);


  return (
    <div className={styles["sidebar-container"]}>
      <div className={styles["sb-header"]}>
        <div className={styles["other-icons"]}>
          <IconButton
            onClick={() => {
              nav("/messages/welcome");
            }}
          >
            <AccountCircleIcon
              className={styles["icon"]}
            />
          </IconButton>
          <IconButton
            onClick={() => {
              navigate("users");
            }}
          >
            <PersonAddIcon className={styles["icon"]}/>
          </IconButton>
          <IconButton
            onClick={() => {
              navigate("groups");
            }}
          >
            <GroupAddIcon className={styles["icon"]} />
          </IconButton>
          <IconButton
            onClick={() => {
              navigate("create-groups");
            }}
          >
            <AddCircleIcon className={styles["icon"]} />
          </IconButton>
          <IconButton
            onClick={() => {
              localStorage.removeItem("userData");
              navigate("/home");
            }}
          >
            <ExitToAppIcon className={styles["icon"]} />
          </IconButton>
        </div>
      </div>
      <div className={styles["sb-search"]}>
        <IconButton className={styles["icon"]}>
          <SearchIcon />
        </IconButton>
        <input
          placeholder="Search"
          className={styles["search-box"]}
        />
      </div>
      <div className={styles["sb-conversations"]}>
        {conversations.map((conversation, index) => {
          // console.log("current convo : ", conversation);
          // console.log(conversation.isGroupChat)
          var chatName = "";
          if (conversation.isGroupChat) {
            chatName = conversation.chatName;
          } else {
            conversation.users.map((userData) => {
              if (user._id !== userData._id) { // sets the other users name as the name of the chat 
                chatName = userData.name;
              }
            })
          }
          // if (conversation.users.length === 1) {
          //   return <div key={index}></div>;
          // }
          if (conversation.latestMessage === null || conversation.latestMessage === undefined) { // undefined would not work in this context 
            // console.log("No Latest Message with ", conversation.users[1]);
            return (
              <div
                key={index}
                onClick={() => {
                  console.log("Refresh fired from sidebar");
                  // dispatch(refreshSidebarFun());
                  setRefresh(!refresh);
                }}
              >
                <div
                  key={index}
                  className={styles["conversation-container"]}
                  onClick={() => {
                    navigate(
                      "chat/" +
                        conversation._id +
                        "&" +
                        // conversation.users[1].name
                        chatName
                    );
                  }}
                  // dispatch change to refresh so as to update chatArea
                >
                  <p className={styles["con-icon"]}>
                    {chatName[0]}
                  </p>
                  <p className={styles["con-title"]}>
                    {chatName}
                  </p>
                  <p className={styles["con-lastMessage"]}>
                    No previous Messages, click here to start a new chat
                  </p>
                  <p className={styles["con-timeStamp"]}>
                  </p>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className={styles["conversation-container"]}
                onClick={() => {
                  navigate(
                    "chat/" +
                      conversation._id +
                      "&" +
                      chatName
                  );
                }}
              >
                <p className={styles["con-icon"]}>
                  {chatName[0]}
                </p>
                <p className={styles["con-title"]}>
                  {chatName}
                </p>
                <p className={styles["con-lastMessage"]}>
                  {conversation.latestMessage.content}
                </p>
                <p className={styles["con-timeStamp"]}>
                  {new Date(conversation.latestMessage.createdAt).toLocaleString("en-US")}
                </p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default ChatSidebar


/*
PREVIOUS WORKING CHATSIDEBAR

else {
            console.log(conversation)
            return (
              <div
                key={index}
                className={styles["conversation-container"]}
                onClick={() => {
                  navigate(
                    "chat/" +
                      conversation._id +
                      "&" +
                      conversation.users[1].name
                  );
                }}
              >
                <p className={styles["con-icon"]}>
                  {conversation.users[1].name[0]}
                </p>
                <p className={styles["con-title"]}>
                  {conversation.users[1].name}
                </p>
                <p className={styles["con-lastMessage"]}>
                  {conversation.latestMessage.content}
                </p>
                <p className={styles["con-timeStamp"]}>
                  {conversation.timeStamp}
                </p>
              </div>
            );
          }

\*/