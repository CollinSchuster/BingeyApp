import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import logo from "./live-chat_512px.png";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { refreshSidebarFun } from "./refreshSidebar";
import { myContext } from "./chatPage";
import styles from './chat.module.css'

function Users() {
  // const [refresh, setRefresh] = useState(true);
  const { refresh, setRefresh } = useContext(myContext);

  const lightTheme = useSelector((state) => state.themeKey);
  const [otherUsers, setOtherUsers] = useState([]);
  const {user} = useSelector((state) => state.auth)
  // console.log("Data from LocalStorage : ", userData);
  const nav = useNavigate();
  const dispatch = useDispatch();


  if (!user) {
    console.log("User not Authenticated");
    nav(-1);
  }

  useEffect(() => {
    console.log("Users refreshed");
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios.get("http://localhost:3001/api/users/fetchUsers", config).then((data) => {
      console.log("UData refreshed in Users panel ");
      console.log(data)
      setOtherUsers(data.data);
      // setRefresh(!refresh); this was commented out in the code
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
            duration: "0.3",
          }}
          className={styles["list-container"]}
        >
          <div className={styles["ug-header"]}>
            <img
              src={logo}
              style={{ height: "2rem", width: "2rem", marginLeft: "10px" }}
            />
            <p className={styles["ug-title"]}>
              Available Users
            </p>
            <IconButton
              className={styles["styles.icon"]}
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
          <div className={styles["ug-list"]}>
            {otherUsers.map((users, index) => {
              return (
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className={styles["list-tem"]}
                  key={index}
                  onClick={() => {
                    console.log("Creating chat with", users.name);
                    console.log(user._id)
                    console.log(user.token)
                    const config = {
                      headers: {
                        Authorization: `Bearer ${user.token}`,
                      },
                    };
                    axios.post(
                      "http://localhost:3001/api/chat/",
                      {
                        userId: users._id,
                      },
                      config
                    );
                    dispatch(refreshSidebarFun());
                  }}
                >
                  <p className={styles["con-icon"]}>T</p>
                  <p className={styles["con-title"]}>
                    {users.name}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
      </div>
  );
}

export default Users;