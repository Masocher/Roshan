import styles from "../styles/global/Custom404.module.css";
import Link from "next/link";

export default function Custom404() {
    return (
        <div className={styles.container}>
            <div className={styles.main_text}>404</div>
            <div>صفحه مورد نظر یافت نشد</div>
            <Link href={"/"} className={styles.back_btn}>
                برگشت به خانه
            </Link>
        </div>
    );
}
