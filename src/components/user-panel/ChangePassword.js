import axios from "axios";
import styles from "../../styles/authentication/ChangePassword.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import spiner from "../../../public/images/loading.svg";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faRotate } from "@fortawesome/free-solid-svg-icons";

axios.defaults.withCredentials = true;

export default function ChangePassword({ status, setStatus, number }) {
  const router = useRouter();

  const [err1, setErr1] = useState(false);
  const [err2, setErr2] = useState(false);

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [timeLeft, setTimeLeft] = useState(status ? 120 : 0);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (status) {
      setTimeLeft(120);
      setCanResend(false);
    } else {
      setTimeLeft(0);
      setCanResend(true);
    }
  }, [status]);

  useEffect(() => {
    if (!status || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status, timeLeft]);

  const checkCode = (code) => {
    if (/^\d{4}$/.test(code)) {
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
        number: number,
        otp: code,
        new_password: pas,
      })
      .then(() => {
        toast.success("رمز عبور شما با موفقیت تغییر پیدا کرد.");
        setTimeout(() => {
          router.push("/");
          setLoading(false);
        }, 3000);
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

  const resendCode = async () => {
    if (!window.grecaptcha) {
      toast.error("reCAPTCHA بارگذاری نشد.");
      return;
    }

    try {
      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: "reset_password" }
      );

      setLoading(true);
      axios
        .post("/api/auth/reset_password/", {
          number: number,
          recaptcha: token,
        })
        .then(() => {
          toast.success(`کد یکبار مصرف به شماره شما پیامک شد`);
          setCanResend(false);
          setLoading(false);
          setTimeLeft(120);
        })
        .catch((err) => {
          if (err.response.data.detail) {
            toast.error(err.response.data.detail);
          } else if (err.response.data.otp) {
            toast.error("کد تایید : " + err.response.data.otp);
          } else if (err.response.data.password) {
            toast.error("رمز عبور : " + err.response.data.password);
          } else {
            toast.error("خطایی رخ داد !");
          }
          setLoading(false);
        });
    } catch (error) {
      toast.error("احراز reCAPTCHA با خطا مواجه شد.");
    }
  };

  return status ? (
    <div className={styles.container}>
      <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
        <div className={styles.loading_wrapper}>
          <Image src={spiner} width={80} height={80} alt="لودینگ" />
        </div>
      </div>

      <Toaster position="bottom-left" reverseOrder={true} />

      {!canResend ? (
        <div className={styles.auth_form}>
          <div className={styles.back_btn} onClick={() => setStatus(false)}>
            <span>
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
            بازگشت
          </div>

          <div className={styles.timer}>{timeLeft} ثانیه</div>

          <div className={styles.title}>تغییر رمز عبور</div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className={`${styles.input_box} ${styles.code_input_box}`}>
              <div className={styles.input_title}>
                کد تایید به شماره
                <div>{number}</div>
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
              className={`${styles.submit_btn} ${
                err1 || err2 ? "" : styles.show
              }`}
              onClick={() => changePasswordFunction(code, password)}
            >
              تایید کد
            </button>
          </form>
        </div>
      ) : (
        <div className={styles.auth_form}>
          <div className={styles.back_btn} onClick={() => setStatus(false)}>
            <span>
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
            بازگشت
          </div>

          <div className={styles.title}>تغییر رمز عبور</div>

          <button
            type="button"
            onClick={resendCode}
            className={styles.get_code_again_2}
          >
            <span>
              <FontAwesomeIcon icon={faRotate} />
            </span>
            ارسال مجدد کد
          </button>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
}
