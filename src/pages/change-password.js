import styles from "../styles/authentication/ChangePassword.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function ChangePassword() {
    const router = useRouter();

    const [err1, setErr1] = useState(false);
    const [err2, setErr2] = useState(false);

    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");

    let [number, setNumber] = useState("");

    useEffect(() => {
        setNumber(localStorage.getItem("number"));
    }, []);

    const changePasswordFunction = (code, pas) => {
        // axios.post("/auth/reset_password/verify/", {
        //     "number": `${localStorage.getItem("number")}`,
        //     "otp": `${code}`,
        //     "new_password": `${pas}`,
        // });
        console.log("number : " + number);
        console.log("otp : " + code);
        console.log("new password : " + pas);
        router.push("/");
        localStorage.removeItem("number");
    };

    const checkCode = (code) => {
        if (code.length > 0) {
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
            <div className={styles.auth_form}>
                <div className={styles.title_box}>تغییر رمز عبور</div>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div
                        className={`${styles.input_box} ${styles.code_input_box}`}
                    >
                        <div className={styles.input_title}>
                            کد تایید ارسال شده به شماره
                            <span>{number}</span>
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
                            کد تایید نمیتواند خالی باشد !
                        </div>
                    </div>

                    <div className={styles.input_box}>
                        <div className={styles.input_title}>رمز عبور جدید</div>

                        <input
                            type="text"
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

                    <button
                        className={styles.submit_btn}
                        onClick={() => {
                            changePasswordFunction(code, password);
                        }}
                    >
                        تغییر رمز عبور
                    </button>
                </form>
            </div>
        </div>
    );
}
