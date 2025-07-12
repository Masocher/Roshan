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
import Image from "next/image";
import spiner from "../../public/images/loading.svg";
import Head from "next/head";

axios.defaults.withCredentials = true;

export default function SignIn() {
  const router = useRouter();

  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const [err1, setErr1] = useState(false);
  const [err2, setErr2] = useState(false);

  const [loading, setLoading] = useState(false);

  const signInFunction = async (num, pas) => {
    if (!num) {
      setErr1(true);
      toast.error("شماره موبایل اجباری است!");
      return;
    }
    if (!pas) {
      setErr2(true);
      toast.error("رمز عبور اجباری است!");
      return;
    }

    if (!window.grecaptcha) {
      toast.error("reCAPTCHA بارگذاری نشد.");
      return;
    }

    try {
      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: "login" }
      );

      setLoading(true);
      axios
        .post("/api/auth/login/", {
          number: `${num}`,
          password: `${pas}`,
          recaptcha: token,
        })
        .then((response) => {
          toast.success(response.data.detail);
          setTimeout(() => {
            router.push("/");
            setLoading(false);
          }, 3000);
        })
        .catch((err) => {
          if (err.response?.data?.detail) {
            toast.error(err.response.data.detail);
          }
          if (err.response?.data?.number) {
            toast.error("شماره تلفن : " + err.response.data.number);
          } else if (err.response?.data?.password) {
            toast.error("رمز عبور : " + err.response.data.password);
          }

          setLoading(false);
        });
    } catch (error) {
      toast.error("احراز reCAPTCHA با خطا مواجه شد.");
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

  return (
    <>
      <Head>
        <title>ورود به حساب کاربری - روشن مارکت</title>
        <meta
          name="description"
          content="ورود به حساب کاربری در روشن مارکت برای خرید آسان و مدیریت سفارشات"
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className={styles.container}>
        <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
          <div className={styles.loading_wrapper}>
            <Image src={spiner} width={40} height={40} alt="لودینگ" />
          </div>
        </div>

        <Toaster position="bottom-left" reverseOrder={true} />

        <Link href={"/"} className={styles.logo}>
          روشن مارکت
        </Link>

        <div className={styles.auth_form}>
          <div onClick={() => router.back()} className={styles.back_btn_2}>
            <span>
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
            بازگشت
          </div>

          <div className={styles.top_titles}>
            <Link href={"/sign-up"} className={`${styles.main_title} ${""}`}>
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

          <form
            onSubmit={(e) => {
              e.preventDefault();
              signInFunction(number, password);
            }}
          >
            <div className={styles.input_box}>
              <div className={styles.input_title}>شماره موبایل</div>

              <input
                type="tel"
                autoFocus
                onChange={(e) => {
                  setNumber(e.target.value);
                  checkNumber(e.target.value);
                }}
                className={`${err1 ? styles.error : ""}`}
                value={number}
              />

              <div className={`${styles.error_box} ${err1 ? styles.show : ""}`}>
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
                value={password}
              />

              <div className={`${styles.error_box} ${err2 ? styles.show : ""}`}>
                رمز عبور اجباری است !
              </div>
            </div>

            <button type="submit" className={styles.submit_btn_2}>
              ورود به حساب
            </button>
          </form>

          <Link className={styles.forgot_password} href={"/reset-password"}>
            رمز عبورم را فراموش کرده ام !
          </Link>
        </div>
      </div>
    </>
  );
}
