import styles from "../styles/authentication/Auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";
import Head from "next/head";
import spiner from "../../public/images/loading.svg";

axios.defaults.withCredentials = true;

export async function getServerSideProps(context) {
  let user = null;

  try {
    const res = await fetch("https://abazarak.ir/api/auth/me/", {
      headers: {
        Cookie: context.req.headers.cookie || "",
      },
    });

    if (res.ok) {
      user = await res.json();
    }
  } catch (err) {
    console.error("خطا در دریافت اطلاعات کاربر:", err);
  }

  return {
    props: {
      user,
    },
  };
}

export default function PhoneNumberVerification({ user }) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [err1, setErr1] = useState(false);
  const [number, setNumber] = useState(user?.number || "");
  const [loading, setLoading] = useState(false);

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

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const checkCode = (code) => {
    if (/^\d{4}$/.test(code)) {
      setErr1(false);
    } else {
      setErr1(true);
    }
  };

  const sendCode = () => {
    if (err1 || code.length !== 4) return;
    setLoading(true);
    axios
      .post("/api/auth/activation/verify/", { otp: code })
      .then((response) => {
        toast.success(response.data.detail);
        router.push("/purchase-information");
      })
      .catch((err) => {
        if (err.response?.data?.detail) {
          toast.error(err.response.data.detail);
        }
        if (err.response?.data?.otp) {
          toast.error(err.response.data.otp);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const resendCode = () => {
    setLoading(true);
    axios
      .post("/api/auth/activation/")
      .then(() => {
        toast.success("کد جدید ارسال شد");
        setTimeLeft(120);
        setCanResend(false);
      })
      .catch((err) => {
        toast.error("ارسال مجدد کد ناموفق بود");

        if (err.response.data.detail) {
          toast.error(err.response.data.detail);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    resendCode();
  }, []);

  return (
    <>
      <Head>
        <title>تایید شماره موبایل | روشن مارکت</title>
        <meta
          name="description"
          content="کد تایید را وارد کنید تا تایید شماره موبایل خود را کامل کنید"
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className={styles.container}>
        {loading && (
          <div className={`${styles.loading} ${styles.show}`}>
            <div className={styles.loading_wrapper}>
              <Image
                src={spiner}
                width={80}
                height={80}
                alt="تصویر لودینگ روشن مارکت"
              />
            </div>
          </div>
        )}

        <Toaster position="bottom-left" reverseOrder={true} />

        <Link href="/" className={styles.logo}>
          روشن مارکت
        </Link>

        <div className={styles.auth_form}>
          <div className={styles.title} style={{ marginTop: 0 }}>
            تایید شماره تلفن
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className={`${styles.input_box} ${styles.code_input_box}`}>
              <div className={styles.input_title}>
                کد تایید به شماره
                <div>{number}</div>
                ارسال شد
              </div>

              <input
                type="text"
                maxLength="4"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  checkCode(e.target.value);
                }}
                className={err1 ? styles.error : ""}
              />

              <div className={`${styles.error_box} ${err1 ? styles.show : ""}`}>
                کد تایید 4 رقمی الزامی است!
              </div>
            </div>

            {!canResend ? (
              <div className={styles.again_code_time}>
                <span>{formatTime(timeLeft)}</span>
                تا ارسال مجدد کد تایید
              </div>
            ) : (
              <button
                type="button"
                onClick={resendCode}
                className={styles.get_code_again}
              >
                <span>
                  <FontAwesomeIcon icon={faRotate} />
                </span>
                ارسال مجدد کد
              </button>
            )}

            <button
              className={styles.submit_btn}
              type="submit"
              onClick={sendCode}
            >
              تایید
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
