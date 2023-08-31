import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './chat.module.css'

function MessageOthers({ props }) {
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);
  // console.log("message others : ", props);
  return (
      <div className={styles["other-message-container"]}>
        <div className={styles["conversation-container"]}>
          <p className={styles["con-icon"]}>
            {props.sender.name[0]}
          </p>
          <div className={styles["other-text-content"]}>
            <p className={styles["con-title"]}>
              {props.sender.name}
            </p>
            <p className={styles["con-lastMessage"]}>
              {props.content}
            </p>
          </div>
        </div>
      </div>
  );
}

export default MessageOthers;