import styles from "../../styles/authentication/Auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faRotate } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";
import spiner from "../../../public/images/loading.svg";

axios.defaults.withCredentials = true;

export default function AuthCode({
  status,
  setStatus,
  name,
  number,
  password,
  password2,
}) {
  const router = useRouter();

  const [code, setCode] = useState("");

  const [err1, setErr1] = useState(true);

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

  const [loading, setLoading] = useState(false);

  const sendCode = async (code) => {
    if (!window.grecaptcha) {
      toast.error("reCAPTCHA بارگذاری نشد.");
      return;
    }

    try {
      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: "signup" }
      );

      setLoading(true);
      axios
        .post("/api/auth/register/verify/", {
          number: number,
          full_name: name,
          password: password,
          password2: password2,
          otp: `${code}`,
          recaptcha: token,
        })
        .then(() => {
          toast.success("خوش آمدید ، وارد حساب خود شوید");
          setTimeout(() => {
            router.push("/sign-in");
            setLoading(false);
          }, 3000);
        })
        .catch((err) => {
          if (err.response.data.detail) {
            toast.error(err.response.data.detail);
          } else if (err.response.data.otp) {
            toast.error("کد تایید : " + err.response.data.otp);
          } else if (err.response.data.number) {
            toast.error("شماره تلفن : " + err.response.data.number);
          } else if (err.response.data.full_name) {
            toast.error("نام و نام خانوادگی : " + err.response.data.full_name);
          } else if (err.response.data.password) {
            toast.error("رمزعبور : " + err.response.data.password);
          } else if (err.response.data.password2) {
            toast.error("تکرار رمز عبور : " + err.response.data.password2);
          } else {
            toast.error("خطایی رخ داد !");
          }
          setLoading(false);
        });
    } catch (error) {
      toast.error("احراز reCAPTCHA با خطا مواجه شد.");
    }
  };

  const resendCode = async () => {
    if (!window.grecaptcha) {
      toast.error("reCAPTCHA بارگذاری نشد.");
      return;
    }

    try {
      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: "signup" }
      );

      setLoading(true);

      axios
        .post("/api/auth/register/", {
          full_name: name,
          number: number,
          password: password,
          password2: password2,
          recaptcha: token,
        })
        .then(() => {
          toast.success(`کد یکبار مصرف به شماره شما پیامک شد`);
          setCanResend(false);
          setLoading(false);
          setTimeLeft(120);
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            const data = err.response.data;
            if (data.detail) toast.error(data.detail);
            else if (data.full_name)
              toast.error("نام و نام خانوادگی : " + data.full_name);
            else if (data.number) toast.error("شماره تلفن : " + data.number);
            else if (data.password) toast.error("رمز عبور : " + data.password);
            else if (data.password2)
              toast.error("تکرار رمز عبور : " + data.password2);
          } else {
            toast.error("خطایی رخ داد !");
          }
          setLoading(false);
        });
    } catch (err) {
      toast.error("احراز reCAPTCHA با خطا مواجه شد.");
    }
  };

  return status ? (
    <div className={styles.container}>
      <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
        <div className={styles.loading_wrapper}>
          <Image src={spiner} width={40} height={40} alt="لودینگ" />
        </div>
      </div>

      <Toaster position="bottom-left" reverseOrder={true} />

      <div className={styles.logo}>روشن مارکت</div>

      {!canResend ? (
        <div className={styles.auth_form}>
          <div className={styles.back_btn} onClick={() => setStatus(false)}>
            <span>
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
            بازگشت
          </div>

          <div className={styles.title}>تایید شماره تلفن</div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className={`${styles.input_box} ${styles.code_input_box}`}>
              <div className={styles.input_title}>
                کد تایید به شماره <div>{number}</div> پیامک شد
              </div>

              <input
                type="text"
                placeholder="____"
                maxLength={"4"}
                onChange={(e) => {
                  setCode(e.target.value);
                  checkCode(e.target.value);
                }}
                className={`${err1 ? styles.error : ""}`}
              />

              <div className={`${styles.error_box} ${err1 ? styles.show : ""}`}>
                کد تایید 4 رقمی الزامی است!
              </div>
            </div>

            <div className={styles.again_code_time}>
              <span>{timeLeft} ثانیه</span>
              تا ارسال مجدد کد تایید
            </div>

            <button
              className={`${styles.submit_btn} ${err1 ? "" : styles.show}`}
              onClick={() => sendCode(code)}
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

          <div className={styles.title}>تایید شماره تلفن</div>

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
