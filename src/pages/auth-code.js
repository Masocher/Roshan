import styles from "../styles/authentication/Auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faRotate } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";
import spiner from "../../public/images/loading.svg";

axios.defaults.withCredentials = true;

export default function AuthCode() {
  const router = useRouter();

  const [code, setCode] = useState("");

  const [err1, setErr1] = useState(true);

  const [timeLeft, setTimeLeft] = useState(120);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const checkCode = (code) => {
    if (/^\d{4}$/.test(code)) {
      setErr1(false);
    } else {
      setErr1(true);
    }
  };

  const [loading, setLoading] = useState(false);

  const sendCode = (code) => {
    setLoading(true);
    axios
      .post("/api/auth/register/verify/", {
        number: `${localStorage.getItem("number")}`,
        otp: `${code}`,
      })
      .then((response) => {
        localStorage.removeItem("number");
        router.push("/sign-in");
        toast.success(response.data.detail);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.data.detail) {
          toast.error(err.response.data.detail);
        } else if (err.response.data.otp) {
          toast.error("کد تایید : " + err.response.data.otp);
        } else {
          toast.error("خطایی رخ داد !");
        }
        setLoading(false);
      });
  };

  const resendCode = () => {
    setLoading(true);
    axios
      .post("/api/auth/register/verify/")
      .then(() => {
        toast.success("کد جدید ارسال شد");
        setTimeLeft(120);
        setCanResend(false);
      })
      .catch((err) => {
        if (err.response.data.detail) {
          toast.error(err.response.data.detail);
        } else {
          toast.error("ارسال مجدد کد ناموفق بود");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
        <div className={styles.loading_wrapper}>
          <Image src={spiner} width={80} height={80} alt="لودینگ" />
        </div>
      </div>

      <Toaster position="bottom-left" reverseOrder={true} />

      <div className={styles.logo}>روشن مارکت</div>

      {!canResend ? (
        <div className={styles.auth_form}>
          <Link href={"/sign-up"} className={styles.back_btn}>
            <span>
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
            بازگشت
          </Link>

          <div className={styles.title}>تایید شماره تلفن</div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className={`${styles.input_box} ${styles.code_input_box}`}>
              <div className={styles.input_title}>
                کد تایید به شماره <div>{localStorage.getItem("number")}</div>{" "}
                پیامک شد
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
              تایید
            </button>
          </form>
        </div>
      ) : (
        <div className={styles.auth_form}>
          <Link href={"/sign-up"} className={styles.back_btn}>
            <span>
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
            بازگشت
          </Link>

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
  );
}
