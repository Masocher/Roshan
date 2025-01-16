import styles from "../../styles/home/Alert.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export default function Alert() {
    return (
        <div className={styles.alert_container}>
            <div className={styles.alert_title}>
                لورم ایپسوم یک متن ساختگی است
            </div>

            <div className={styles.alert_link}>
                مشاهده
                <div>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </div>
            </div>
        </div>
    );
}
