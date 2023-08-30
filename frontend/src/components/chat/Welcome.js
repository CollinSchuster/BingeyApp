import React from "react";
import logo from "./live-chat_512px.png";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styles from './chat.module.css'

function Welcome() {
  const lightTheme = useSelector((state) => state.themeKey);
  const {user} = useSelector((state) => state.auth)
  console.log(user);
  const nav = useNavigate();
  if (!user) {
    console.log("User not Authenticated");
    nav("/");
  }

  return (
    <div className={styles["welcome-container"]}>
      <motion.img
        drag
        whileTap={{ scale: 1.05, rotate: 360 }}
        src={logo}
        alt="Logo"
        className={styles["welcome-logo"]}
      />
      <b>Hi , {user.name} 👋</b>
      <p>View and text directly to people present in the chat Rooms.</p>
    </div>
  );
}

export default Welcome;