import styles from "../../styles/global/Comment.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";

export default function ReplyComment({ date, content, user }) {
  return (
    <div className={`${styles.comment} ${styles.reply_comment}`}>
      <div className={styles.reply_icon}>
        <FontAwesomeIcon icon={faReply} />
      </div>

      <div className={styles.top_content}>
        <div className={styles.user_name}>{user}</div>
        <div className={styles.date}>{date}</div>
      </div>

      <div className={styles.bottom_content}>
        <div className={styles.title}>{content}</div>
      </div>
    </div>
  );
}
