import styles from "../styles/authentication/Auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faRotate } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AuthCode() {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <Link href={"/"} className={styles.logo}>
                روشن مارکت
            </Link>

            <div className={styles.auth_form}>
                <div
                    onClick={() => router.back()}
                    href={"/sign-in"}
                    className={styles.back_btn}
                >
                    <span>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                    بازگشت
                </div>

                <div className={styles.title}>کد تایید را وارد کنید</div>

                <form>
                    <div
                        className={`${styles.input_box} ${styles.code_input_box}`}
                    >
                        <div className={styles.input_title}>
                            کد تایید به شماره 09054182307 ارسال شد
                        </div>
                        <input type="text" maxLength={"6"} />
                    </div>

                    <div className={styles.again_code_time}>
                        <span>
                            59<div>:</div>01
                        </span>
                        مانده تا دریافت مجدد کد
                    </div>

                    <div className={styles.get_code_again}>
                        <span>
                            <FontAwesomeIcon icon={faRotate} />
                        </span>
                        دریافت مجدد کد
                    </div>

                    <button className={styles.submit_btn}>تایید</button>
                </form>
            </div>
        </div>
    );
}
