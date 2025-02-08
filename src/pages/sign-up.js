import styles from "../styles/authentication/Auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserPlus,
    faUnlockKeyhole,
    faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignUp() {
    const router = useRouter();

    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [err1, setErr1] = useState(false);
    const [err2, setErr2] = useState(false);
    const [err3, setErr3] = useState(false);

    const signUpFunction = (num, pas1, pas2) => {
        // axios.post("/api/auth/login/", {
        //     "number": `${num}`,
        //     "password1": `${pas1}`,
        //     "password2": `${pas2}`,
        // });
        console.log("number : " + num);
        console.log("password : " + pas1);
        console.log("confirm password : " + pas2);
        localStorage.setItem("number", num);
        
        if (localStorage.getItem("number")) {
            router.push("/auth-code");
        } else {
            router.push("/");
        }
    };

    const checkNumber = (number) => {
        if (number.length > 0) {
            setErr1(false);
        } else {
            setErr1(true);
        }
    };

    const checkPassword = (password) => {
        if (password.length > 0) {
            setErr2(false);
        } else {
            setErr2(true);
        }
    };

    const checkPassword2 = (password) => {
        if (password.length > 0) {
            setErr3(false);
        } else {
            setErr3(true);
        }
    };

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
                        className={`${styles.main_title} ${styles.show}`}
                    >
                        <span>
                            <FontAwesomeIcon icon={faUserPlus} />
                        </span>
                        ثبت نام
                    </Link>

                    <Link
                        href={"/sign-in"}
                        className={`${styles.main_title} ${""}`}
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

                        <input
                            type="text"
                            onChange={(e) => {
                                setNumber(e.target.value);
                                checkNumber(e.target.value);
                            }}
                            className={`${err1 ? styles.error : ""}`}
                        />

                        <div
                            className={`${styles.error_box} ${
                                err1 ? styles.show : ""
                            }`}
                        >
                            شماره تلفن نمیتواند خالی باشد !
                        </div>
                    </div>

                    <div className={styles.input_box}>
                        <div className={styles.input_title}>رمز عبور</div>

                        <input
                            type="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                checkPassword(e.target.value);
                            }}
                            className={`${err2 ? styles.error : ""}`}
                        />

                        <div
                            className={`${styles.error_box} ${
                                err2 ? styles.show : ""
                            }`}
                        >
                            رمز عبور نمیتواند خالی باشد !
                        </div>
                    </div>

                    <div className={styles.input_box}>
                        <div className={styles.input_title}>تکرار رمز عبور</div>

                        <input
                            type="password"
                            onChange={(e) => {
                                setPassword2(e.target.value);
                                checkPassword2(e.target.value);
                            }}
                            className={`${err3 ? styles.error : ""}`}
                        />

                        <div
                            className={`${styles.error_box} ${
                                err3 ? styles.show : ""
                            }`}
                        >
                            تکرار رمز عبور اجباری است !
                        </div>
                    </div>

                    <button
                        className={styles.submit_btn}
                        onClick={() => {
                            signUpFunction(number, password, password2);
                        }}
                    >
                        ثبت نام
                    </button>
                </form>
            </div>
        </div>
    );
}
