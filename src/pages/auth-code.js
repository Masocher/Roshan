import styles from "../styles/authentication/Auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faRotate } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

export default function AuthCode() {
    const router = useRouter();

    const [code, setCode] = useState("");

    const [err1, setErr1] = useState(false);

    const sendCode = (code) => {
        // axios.post("/auth/register/verify/", {
        //     "number" : localStorage.getItem("number"),
        //     "otp" : code
        // })

        console.log(localStorage.getItem("number"));
        console.log(code);
        
        localStorage.removeItem("number");
        router.push("/");
    };

    const checkCode = (code) => {
        if (code.length > 0) {
            setErr1(false);
        } else {
            setErr1(true);
        }
    };

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

                <form onSubmit={(e) => e.preventDefault()}>
                    <div
                        className={`${styles.input_box} ${styles.code_input_box}`}
                    >
                        <div className={styles.input_title}>
                            کد تایید به شماره 09054182307 ارسال شد
                        </div>

                        <input
                            type="text"
                            maxLength={"6"}
                            onChange={(e) => {
                                setCode(e.target.value);
                                checkCode(e.target.value);
                            }}
                            className={`${err1 ? styles.error : ""}`}
                        />

                        <div
                            className={`${styles.error_box} ${
                                err1 ? styles.show : ""
                            }`}
                        >
                            کد وارد شده صحیح نیست !
                        </div>
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

                    <button
                        className={styles.submit_btn}
                        onClick={() => sendCode(code)}
                    >
                        تایید
                    </button>
                </form>
            </div>
        </div>
    );
}
