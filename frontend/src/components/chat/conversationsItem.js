import React from 'react'
import styles from './chat.module.css'

function ConversationsItem() {
  return (
      <div className={styles['conversation-container']}>
        <p className={styles['con-icon']}></p>
        <p className={styles['con-title']}></p>
        <p className={styles['con-lastMessage']}></p>
        <p className={styles['con-timeStamp']}></p>
      </div>
  )
}


export default ConversationsItem



