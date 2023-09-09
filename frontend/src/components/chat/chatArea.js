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
          <p className={styles["con-icon"]}>
            {chat_user[0]}
          </p>
          <div className={styles["header-text"]}>
            <p className={styles["con-title"]}>
              {chat_user}
            </p>
          </div>
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


