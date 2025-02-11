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
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function SignUp() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [err1, setErr1] = useState(false);
    const [err2, setErr2] = useState(false);
    const [err3, setErr3] = useState(false);
    const [err4, setErr4] = useState(false);

    const signUpFunction = (nam, num, pas1, pas2) => {
        axios.defaults.withCredentials = true;
        axios
            .post("https://roshan-api.liara.run/api/auth/register/", {
                "full_name": `${nam}`,
                "number": `${num}`,
                "password": `${pas1}`,
                "password2": `${pas2}`,
            })
            .then((response) => {
                toast.success(`کد یکبار مصرف به شماره شما پیامک شد`);
                localStorage.setItem("number", num);
                router.push("/auth-code");
            })
            .catch((err) => {
                if (err.response.data.detail) {
                    toast.error(err.response.data.detail);
                }

                if (err.response.data.full_name) {
                    toast.error(
                        "نام و نام خانوادگی : " + err.response.data.full_name
                    );
                } else if (err.response.data.number) {
                    toast.error("شماره تلفن : " + err.response.data.number);
                } else if (err.response.data.password) {
                    toast.error("رمز عبور : " + err.response.data.password);
                } else if (err.response.data.password2) {
                    toast.error(
                        "تکرار رمز عبور : " + err.response.data.password2
                    );
                }
            });
    };

    const checkName = (name) => {
        if (name.length > 0) {
            setErr1(false);
        } else {
            setErr1(true);
        }
    };

    const checkNumber = (number) => {
        if (number.length > 0) {
            setErr2(false);
        } else {
            setErr2(true);
        }
    };

    const checkPassword = (password) => {
        if (password.length > 0) {
            setErr3(false);
        } else {
            setErr3(true);
        }
    };

    const checkPassword2 = (password) => {
        if (password.length > 0) {
            setErr4(false);
        } else {
            setErr4(true);
        }
    };

    return (
        <div className={styles.container}>
            <Toaster position="top-left" reverseOrder={true} />

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
                        <div className={styles.input_title}>
                            نام و نام خانوادگی
                        </div>

                        <input
                            type="text"
                            onChange={(e) => {
                                setName(e.target.value);
                                checkName(e.target.value);
                            }}
                            className={`${err1 ? styles.error : ""}`}
                        />

                        <div
                            className={`${styles.error_box} ${
                                err1 ? styles.show : ""
                            }`}
                        >
                            نام و نام خانوادگی اجباری است !
                        </div>
                    </div>

                    <div className={styles.input_box}>
                        <div className={styles.input_title}>شماره موبایل</div>

                        <input
                            type="text"
                            onChange={(e) => {
                                setNumber(e.target.value);
                                checkNumber(e.target.value);
                            }}
                            className={`${err2 ? styles.error : ""}`}
                        />

                        <div
                            className={`${styles.error_box} ${
                                err2 ? styles.show : ""
                            }`}
                        >
                            شماره تلفن اجباری است !
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
                            className={`${err3 ? styles.error : ""}`}
                        />

                        <div
                            className={`${styles.error_box} ${
                                err3 ? styles.show : ""
                            }`}
                        >
                            رمز عبور اجباری است !
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
                            className={`${err4 ? styles.error : ""}`}
                        />

                        <div
                            className={`${styles.error_box} ${
                                err4 ? styles.show : ""
                            }`}
                        >
                            تکرار رمز عبور اجباری است !
                        </div>
                    </div>

                    <button
                        className={styles.submit_btn}
                        onClick={() => {
                            signUpFunction(name, number, password, password2);
                        }}
                    >
                        ثبت نام
                    </button>
                </form>
            </div>
        </div>
    );
}
