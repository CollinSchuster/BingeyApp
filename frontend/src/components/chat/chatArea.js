import React, { useContext, useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MessageSelf from "./MessageSelf";
import MessageOthers from "./MessageOthers";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import { myContext } from "./chatPage";
import styles from './chat.module.css'

function ChatArea() {
  const lightTheme = useSelector((state) => state.themeKey);
  const [messageContent, setMessageContent] = useState("");
  const messagesEndRef = useRef(null);
  const dyParams = useParams();
  const [chat_id, chat_user] = dyParams._id.split("&");
  const { user } = useSelector((state) => state.auth);
  const fullName = user.name;

  const [allMessages, setAllMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const { refresh, setRefresh } = useContext(myContext);
  const [loaded, setloaded] = useState(false);

  const fetchConversations = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios
      .get("http://localhost:3001/api/messages/" + chat_id, config)
      .then(({ data }) => {
        setAllMessages(data);
        setloaded(true);
      });
  };
  const fetchSidebarData = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios
      .get("http://localhost:3001/api/chat/", config)
      .then((response) => {
        console.log("Data refresh in sidebar", response.data);
        setConversations(response.data);
      });
  };

  const sendMessage = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios
      .post(
        "http://localhost:3001/api/messages/",
        {
          content: messageContent,
          chatId: chat_id,
        },
        config
      )
      .then(({ data }) => {
        console.log("Message Fired");
        fetchConversations(); // Fetch conversations after sending message
      });
  };

  useEffect(() => {
    fetchConversations();
    fetchSidebarData(); // Fetch sidebar data on initial load
  }, [refresh, chat_id, user.token]);

  if (!loaded) {
    return (
      <div
        style={{
          border: "20px",
          padding: "10px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            borderRadius: "10px",
            flexGrow: "1",
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
      </div>
    );
  } else {
    return (
      <div className={styles["chatArea-container"]}>
        <div className={styles["chatArea-header"]}>
          {conversations.map((conversation, index) => {
            if (conversation.users.length === 1) {
              return <div key={index}></div>;
            } else {
              return (
                <>
                <p className={styles["con-icon"]}>
                  {conversation.users[1].name[0]}
                </p>
                <div className={styles["header-text"]}>
                  <p className={styles["con-title"]}>
                    {conversation.users[1].name}
                  </p>
                </div>
                </>
              );
            }
          })}
          <IconButton className={styles["icon"]}>
            <DeleteIcon />
          </IconButton>
        </div>
        <div className={styles["messages-container"]}>
          {allMessages
            .slice(0)
            .reverse()
            .map((message, index) => {
              const sender = message.sender;
              const self_id = user._id;
              if (sender._id === self_id) {
                return <MessageSelf props={message} key={index} />;
              } else {
                return <MessageOthers props={message} key={index} />;
              }
            })}
        </div>
        <div ref={messagesEndRef} className={styles["BOTTOM"]} />
        <div className={styles["text-input-area"]}>
          <input
            placeholder="Type a Message"
            className={styles["search-box"]}
            value={messageContent}
            onChange={(e) => {
              setMessageContent(e.target.value);
            }}
            onKeyDown={(event) => {
              if (event.code == "Enter") {
                // console.log(event);
                sendMessage();
                setMessageContent("Type a Message");
                setRefresh(!refresh);
              }
            }}
          />
          <IconButton
            className={styles["icon"]}
            onClick={() => {
              sendMessage();
              setRefresh(!refresh);
            }}
          >
            <SendIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default ChatArea;



/*
 const lightTheme = useSelector((state) => state.themeKey);
  const [messageContent, setMessageContent] = useState("");
  const messagesEndRef = useRef(null);
  const dyParams = useParams();
  const [chat_id, chat_user] = dyParams._id.split("&");
  const {user} = useSelector((state) => state.auth)
  const fullName = user.name
  // Split the full name string into an array of words
  const nameParts = fullName.trim().split(/\s+/);
  // The first element of the array will be the first name
  const firstName = nameParts[0];

  const [allMessages, setAllMessages] = useState([]);
  // console.log("Chat area id : ", chat_id._id);
  // const refresh = useSelector((state) => state.refreshKey);
  const { refresh, setRefresh } = useContext(myContext);
  const [loaded, setloaded] = useState(false);
  const sendMessage = () => {
    // console.log("SendMessage Fired to", chat_id._id);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios
      .post(
        "http://localhost:3001/api/messages/",
        {
          content: messageContent,
          chatId: chat_id,
        },
        config
      )
      .then(({ data }) => {
        console.log("Message Fired");

      });
  };
  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  useEffect(() => {
    console.log("Users refreshed");
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios
      .get("http://localhost:3001/api/messages/" + chat_id, config)
      .then(({ data }) => {
        setAllMessages(data);
        setloaded(true);
        // console.log("Data from Acess Chat API ", data);
      });
    // scrollToBottom();
  }, [refresh, chat_id, user.token]);

  if (!loaded) {
    return (
      <div
        style={{
          border: "20px",
          padding: "10px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            borderRadius: "10px",
            flexGrow: "1",
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
      </div>
    );
  } else {
    return (
      <div className={"chatArea-container" + (lightTheme ? "" : " dark")}>
        <div className={"chatArea-header" + (lightTheme ? "" : " dark")}>
          <p className={"con-icon" + (lightTheme ? "" : " dark")}>
            {chat_user[0]}
          </p>
          <div className={"header-text" + (lightTheme ? "" : " dark")}>
            <p className={"con-title" + (lightTheme ? "" : " dark")}>
              {chat_user}
            </p>
            {/* <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>
              {props.timeStamp}
            </p> 
            </div>
            <IconButton className={"icon" + (lightTheme ? "" : " dark")}>
              <DeleteIcon />
            </IconButton>
          </div>
          <div className={"messages-container" + (lightTheme ? "" : " dark")}>
            {allMessages
              .slice(0)
              .reverse()
              .map((message, index) => {
                const sender = message.sender;
                const self_id = user._id;
                if (sender._id === self_id) {
                  // console.log("I sent it ");
                  return <MessageSelf props={message} key={index} />;
                } else {
                  // console.log("Someone Sent it");
                  return <MessageOthers props={message} key={index} />;
                }
              })}
          </div>
          <div ref={messagesEndRef} className="BOTTOM" />
          <div className={"text-input-area" + (lightTheme ? "" : " dark")}>
            <input
              placeholder="Type a Message"
              className={"search-box" + (lightTheme ? "" : " dark")}
              value={messageContent}
              onChange={(e) => {
                setMessageContent(e.target.value);
              }}
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  // console.log(event);
                  sendMessage();
                  setMessageContent("Type a Message");
                  setRefresh(!refresh);
                }
              }}
            />
            <IconButton
              className={"icon" + (lightTheme ? "" : " dark")}
              onClick={() => {
                sendMessage();
                setRefresh(!refresh);
              }}
            >
              <SendIcon />
            </IconButton>
          </div>
        </div>
      );
    }
  }
  
*/