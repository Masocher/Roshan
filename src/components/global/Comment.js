import styles from "../../styles/global/Comment.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faStar } from "@fortawesome/free-solid-svg-icons";

export default function Comment() {
    return (
        <div className={styles.comment}>
            <div className={styles.top_content}>
                <div className={styles.date}>
                    <span>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                    </span>
                    2 ماه پیش
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
                <div className={styles.user_name}>کاربر روشن مارکت</div>

                <div className={styles.title}>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                    با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                    تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                    کاربردی می باشد
                </div>
            </div>
        </div>
    );
}
