import axios from "axios";
import styles from "../styles/authentication/ChangePassword.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import spiner from "../../public/images/loading.svg";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

axios.defaults.withCredentials = true;

export default function ChangePassword() {
  const router = useRouter();

  const [status, setStatus] = useState(true);

  const [err1, setErr1] = useState(false);
  const [err2, setErr2] = useState(false);

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [time, setTime] = useState(120);

  setTimeout(() => {
    if (!time == 0) {
      setTime(time - 1);
    } else {
      localStorage.removeItem("userNumber");
      setStatus(false);
      clearTimeout();
    }
  }, 1000);

  const changePasswordFunction = (code, pas) => {
    if (!code) {
      setErr1(true);
      toast.error("کد تایید نمیتواند خالی باشد");
      return;
    }

    if (!pas) {
      setErr2(true);
      toast.error("رمز عبور نمیتواند خالی باشد");
      return;
    }

    setLoading(true);
    axios
      .post("/api/auth/reset_password/verify/", {
        number: localStorage.getItem("userNumber"),
        otp: code,
        new_password: pas,
      })
      .then(() => {
        localStorage.removeItem("userNumber");
        toast.success("رمز عبور شما با موفقیت تغییر پیدا کرد.");
        router.push("/");
        setErr1(false);
        setErr2(false);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.data.detail) {
          toast.error(err.response.data.detail);
        }
        if (err.response.data.otp) {
          toast.error("کد تایید : " + err.response.data.otp);
        }
        if (err.response.data.new_password) {
          toast.error("رمز عبور جدید : " + err.response.data.new_password);
        }
        setLoading(false);
      });
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
      <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
        <div className={styles.loading_wrapper}>
          <Image src={spiner} width={80} height={80} alt="لودینگ" />
        </div>
      </div>

      <Toaster position="bottom-left" reverseOrder={true} />

      {status && localStorage.getItem("userNumber") ? (
        <div className={styles.auth_form}>
          <div className={styles.timer}>{time} ثانیه</div>

          <div className={styles.title_box}>تغییر رمز عبور</div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className={`${styles.input_box} ${styles.code_input_box}`}>
              <div className={styles.input_title}>
                کد تایید به شماره
                <span>{localStorage.getItem("userNumber")}</span>
                پیامک شده است
              </div>

              <input
                type="text"
                maxLength={"4"}
                placeholder="____"
                onChange={(e) => {
                  setCode(e.target.value);
                  checkCode(e.target.value);
                }}
                className={`${err1 ? styles.error : ""}`}
              />

              <div className={`${styles.error_box} ${err1 ? styles.show : ""}`}>
                کد تایید نمیتواند خالی باشد !
              </div>
            </div>

            <div className={styles.input_box}>
              <div className={styles.input_title}>رمز عبور جدید</div>

              <input
                type="password"
                placeholder="رمز عبور جدید را وارد کنید"
                onChange={(e) => {
                  setPassword(e.target.value);
                  checkPassword(e.target.value);
                }}
                className={`${err2 ? styles.error : ""}`}
              />

              <div className={`${styles.error_box} ${err2 ? styles.show : ""}`}>
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
      ) : (
        <div className={styles.auth_form}>
          <span>وقت به اتمام رسید</span>

          <button
            className={styles.submit_btn_2}
            onClick={() => {
              router.back();
            }}
          >
            دریافت مجدد کد تایید
            <div>
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
