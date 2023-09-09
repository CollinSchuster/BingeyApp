import React, { useState,useEffect,useContext } from "react";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { create } from "@mui/material/styles/createTransitions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from './chat.module.css'
import { myContext } from "./chatPage";
import { AnimatePresence, motion } from "framer-motion";
import { refreshSidebarFun } from "./refreshSidebar";

function CreateGroups() {
  const { refresh, setRefresh } = useContext(myContext);
  const lightTheme = useSelector((state) => state.themeKey);
  const {user} = useSelector((state) => state.auth)
  const [otherUsers, setOtherUsers] = useState([]);  
  const [groupUsers, setGroupUsers] = useState([]);  
  const dispatch = useDispatch();
  // const userData = JSON.parse(localStorage.getItem("userData"));
  // console.log("Data from LocalStorage : ", userData);
  const nav = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]); // State to track selected users

  if (!user) {
    console.log("User not Authenticated");
    nav("/");
  }

  useEffect(() => {
    console.log("Users refreshed");
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios.get("http://localhost:3001/api/users/fetchUsers", config).then((data) => {
      // console.log("UData refreshed in Users panel ");
      setOtherUsers(data.data);
      // setRefresh(!refresh); this was commented out in the code
    });
  }, [refresh]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("User Data from CreateGroups : ", user);


  const addUsers = (userId) => {
    if (!selectedUsers.includes(userId)) {
      setSelectedUsers([...selectedUsers, userId]); // Add userId to the selected users
    } else {
      setSelectedUsers(selectedUsers.filter((_id) => _id !== userId)); // Deselect the user if already selected
    }
  };

  const createGroup = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    // Convert selectedUsers array to a JSON string
    const usersJSON = JSON.stringify(selectedUsers);

    axios.post(
      "http://localhost:3001/api/chat/createGroup",
      {
        name: groupName,
        users: usersJSON//all the other users in the group chat '["64ede10279d50ac687e19935","64eb4188010c177285092702"]'  `${selectedUsers}` 
      },
      config
    );
    nav("/messages/groups");
  };

  return (
    <>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do you want to create a Group Named " + groupName}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This will create a create group in which you will be the admin and
              other will be able to join this group.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button
              onClick={() => {
                console.log('a group was created')
                console.log(selectedUsers)
                createGroup();
                handleClose();
              }}
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className={styles["createGroups-container"]}>
        <input
          placeholder="Enter Group Name"
          className={styles["search-box"]}
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
        />
        <IconButton
          className={styles["icon"]}
          onClick={() => {
            handleClickOpen();
          }}
        >
          <DoneOutlineRoundedIcon />
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
                    addUsers(users._id)
                  }
                  } // Pass the user's _id to addUser
                >
                  <p className={styles["con-icon"]}>T</p>
                  <p className={styles["con-title"]}>
                    {users.name}
                  </p>
                </motion.div>
              );
            })}
          </div>
    </>
  );
}

export default CreateGroups;