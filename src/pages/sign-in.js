import styles from "../styles/authentication/Auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserPlus,
    faUnlockKeyhole,
    faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function SignIn() {
    return (
        <div className={styles.container}>
            <Link href={"/"} className={styles.logo}>
                روشن مارکت
            </Link>

            <div className={styles.auth_form}>
                <Link href={"/"} className={styles.back_btn_2}>
                    <span>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                    بازگشت
                </Link>

                <div className={styles.top_titles}>
                    <Link
                        href={"/sign-up"}
                        className={`${styles.main_title} ${""}`}
                    >
                        <span>
                            <FontAwesomeIcon icon={faUserPlus} />
                        </span>
                        ثبت نام
                    </Link>

                    <Link
                        href={"/sign-in"}
                        className={`${styles.main_title} ${styles.show}`}
                    >
                        <span>
                            <FontAwesomeIcon icon={faUnlockKeyhole} />
                        </span>
                        ورود
                    </Link>
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.input_box}>
                        <div className={styles.input_title}>شماره موبایل</div>

                        <input type="text" />
                    </div>

                    <div className={styles.input_box}>
                        <div className={styles.input_title}>رمز عبور</div>

                        <input type="password" />
                    </div>

                    <Link href={"/auth-code"}>
                        <button className={styles.submit_btn}>
                            ورود به حساب
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
}
