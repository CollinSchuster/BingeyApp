import React from "react";
import styles from './chat.module.css'

function MessageSelf({ props }) {
  // console.log("Message self Prop : ", props);
  return (
    <div className={styles["self-message-container"]}>
      <div className={styles["messageBox"]}>
        <p style={{ color: "black" }}>{props.content}</p>
        {/* <p className="self-timeStamp" style={{ color: "black" }}>
          12:00am
        </p> */}
      </div>
    </div>
  );
}

export default MessageSelf;