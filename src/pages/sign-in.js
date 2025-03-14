import styles from "../styles/authentication/Auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserPlus,
    faUnlockKeyhole,
    faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function SignIn() {
    const router = useRouter();

    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");

    const [err1, setErr1] = useState(false);
    const [err2, setErr2] = useState(false);

    const signInFunction = (num, pas) => {
        axios.defaults.withCredentials = true;
        axios
            .post("http://abazarak.ir/api/auth/login/", {
                "number": `${num}`,
                "password": `${pas}`,
            })
            .then((response) => {
                toast.success(response.data.detail);
                console.log(response.data.detail);
                router.push("/");
            })
            .catch((err) => {
                if (err.response.data.detail) {
                    toast.error(err.response.data.detail);
                }

                if (err.response.data.number) {
                    toast.error("شماره تلفن : " + err.response.data.number);
                } else if (err.response.data.password) {
                    toast.error("رمز عبور : " + err.response.data.password);
                }
            });
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

    return (
        <div className={styles.container}>
            <Toaster position="bottom-left" reverseOrder={true} />

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
                            className={`${err2 ? styles.error : ""}`}
                        />

                        <div
                            className={`${styles.error_box} ${
                                err2 ? styles.show : ""
                            }`}
                        >
                            رمز عبور اجباری است !
                        </div>
                    </div>

                    <button
                        className={styles.submit_btn}
                        onClick={() => {
                            signInFunction(number, password);
                        }}
                    >
                        ورود به حساب
                    </button>
                </form>
            </div>
        </div>
    );
}
