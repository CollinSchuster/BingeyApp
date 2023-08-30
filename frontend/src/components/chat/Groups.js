import React, { useContext, useEffect, useState } from "react";
import styles from './chat.module.css'
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import logo from "./live-chat_512px.png";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { refreshSidebarFun } from "../features/refreshSidebar";
import { myContext } from "./chatPage";

function Groups() {
  // const [refresh, setRefresh] = useState(true);
  const { refresh, setRefresh } = useContext(myContext);

  const lightTheme = useSelector((state) => state.themeKey);
  const dispatch = useDispatch();
  const [groups, SetGroups] = useState([]);
  const {user} = useSelector((state) => state.auth)
  // console.log("Data from LocalStorage : ", userData);
  const nav = useNavigate();
  if (!user) {
    console.log("User not Authenticated");
    nav("/");
  }
  
  useEffect(() => {
    // console.log("Users refreshed : ", user.token);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios
      .get("http://localhost:3001/api/chat/fetchGroups", config)
      .then((response) => {
  
        SetGroups(response.data);
      });
  }, [refresh]);

  return (
      <div className={styles["main-container"]}>
          <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              ease: "anticipate",
              duration: "0.3",
            }}
            className={styles["list-container"]}
          >
            <div className={styles["styles.ug-header"]}>
              <img
                src={logo}
                style={{ height: "2rem", width: "2rem", marginLeft: "10px" }}
              />
              <p className={styles["styles.ug-title"]}>
                Available Groups
              </p>
              <IconButton
                className={styles["icon"]}
                onClick={() => {
                  setRefresh(!refresh);
                }}
              >
                <RefreshIcon />
              </IconButton>
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
            {groups.map((group, index) => {
              console.log(group.groupAdmin)
              console.log(user._id)
              if (group.groupAdmin !== user._id) {
                return (<></>);
              } else {
                return (
                  <div className={styles["ug-list"]}>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className={styles["list-tem"]}
                      key={index}
                      onClick={() => {
                        console.log(group);
                      }}
                    >
                      <p className={styles["con-icon"]}>T</p>
                      <p className={styles["con-title"]}>
                        {group.chatName}
                        {console.log(group.chatName)}
                      </p>
                    </motion.div>
                  </div>
                );
              }
            })}
          </motion.div>
        </AnimatePresence>
      </div>
  );
}

export default Groups;