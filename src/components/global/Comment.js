import styles from "../../styles/global/Comment.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Comment({ date, user, content, score, status }) {
  return (
    <div className={`${styles.comment} ${status ? styles.show : ""}`}>
      <div className={styles.top_content}>
        <div className={styles.score}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className={`${score >= star ? styles.show : ""}`}>
              <FontAwesomeIcon icon={faStar} />
            </span>
          ))}
        </div>

        <div className={styles.date}>{date}</div>
      </div>

      <div className={styles.bottom_content}>
        <div className={styles.user_name}>{user}</div>

        <div className={styles.title}>{content}</div>
      </div>
    </div>
  );
}
