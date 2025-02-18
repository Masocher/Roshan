import styles from "../../styles/global/Comment.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faStar } from "@fortawesome/free-solid-svg-icons";

export default function Comment({ date, user, content }) {
    return (
        <div className={styles.comment}>
            <div className={styles.top_content}>
                <div className={styles.date}>
                    <span>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                    </span>
                    {date}
                </div>

                <div className={styles.score}>
                    <span>
                        <FontAwesomeIcon icon={faStar} />
                    </span>

                    <span>
                        <FontAwesomeIcon icon={faStar} />
                    </span>

                    <span>
                        <FontAwesomeIcon icon={faStar} />
                    </span>

                    <span>
                        <FontAwesomeIcon icon={faStar} />
                    </span>

                    <span>
                        <FontAwesomeIcon icon={faStar} />
                    </span>
                </div>
            </div>

            <div className={styles.bottom_content}>
                <div className={styles.user_name}>{user}</div>

                <div className={styles.title}>{content}</div>
            </div>
        </div>
    );
}
