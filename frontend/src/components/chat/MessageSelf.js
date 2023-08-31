import React from "react";
import styles from './chat.module.css'

function MessageSelf({ props }) {
  // console.log("Message self Prop : ", props);
  return (
    <div className={styles["self-message-container"]}>
      <div className={styles["messageBox"]}>
        <p style={{ color: "black" }}>{props.content}</p>
      </div>
    </div>
  );
}

export default MessageSelf;