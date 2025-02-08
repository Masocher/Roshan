import styles from "../styles/authentication/ChangePassword.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ChangePasswordCode() {
    const router = useRouter();

    const [err1, setErr1] = useState(false);

    const [number, setNumber] = useState("");

    const getCodeFunction = (num) => {
        // axios.post("/auth/reset_password/", {
        //     "number": `${num}`
        // });
        console.log("number : " + num);

        if (num) {
            setErr1(false);
            router.push("/change-password");
            localStorage.setItem("number", num)
        } else {
            setErr1(true);
        }
    };

    const checkNumber = (number) => {
        if (number.length > 0) {
            setErr1(false);
        } else {
            setErr1(true);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.auth_form}>
                <div className={styles.title_box}>ارسال کد به شماره تلفن</div>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.input_box}>
                        <div className={styles.input_title}>شماره تلفن</div>

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

                    <button
                        className={styles.submit_btn}
                        onClick={() => {
                            getCodeFunction(number);
                        }}
                    >
                        دریافت کد
                    </button>
                </form>
            </div>
        </div>
    );
}
