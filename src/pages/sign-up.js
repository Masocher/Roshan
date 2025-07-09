import styles from "../styles/authentication/Auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faArrowRight,
  faUnlockKeyhole,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";
import spiner from "../../public/images/loading.svg";
import Head from "next/head";

axios.defaults.withCredentials = true;

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

  const [loading, setLoading] = useState(false);

  const checkName = (name) => setErr1(name.trim() === "");
  const checkNumber = (number) => {
    const phoneRegex = /^09\d{9}$/;
    setErr2(!phoneRegex.test(number));
  };
  const checkPassword = (pass) => setErr3(pass.length < 6);
  const checkPassword2 = (pass2) => setErr4(pass2 !== password);

  const signUpFunction = (nam, num, pas1, pas2) => {
    if (nam.trim() === "") return setErr1(true);
    if (!/^09\d{9}$/.test(num)) return setErr2(true);
    if (pas1.length < 6) return setErr3(true);
    if (pas1 !== pas2) {
      toast.error("رمز عبور و تکرار آن مطابقت ندارند.");
      setErr4(true);
      return;
    }
    setLoading(true);
    axios
      .post("/api/auth/register/", {
        full_name: nam,
        number: num,
        password: pas1,
        password2: pas2,
      })
      .then(() => {
        localStorage.setItem("number", num);
        router.push("/auth-code");
        setLoading(false);
        toast.success(`کد یکبار مصرف به شماره شما پیامک شد`);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.data) {
          const data = err.response.data;
          if (data.detail) toast.error(data.detail);
          if (data.full_name)
            toast.error("نام و نام خانوادگی : " + data.full_name);
          else if (data.number) toast.error("شماره تلفن : " + data.number);
          else if (data.password) toast.error("رمز عبور : " + data.password);
          else if (data.password2)
            toast.error("تکرار رمز عبور : " + data.password2);
        } else {
          toast.error("خطایی رخ داد !");
        }
      });
  };

  return (
    <>
      <Head>
        <title>ثبت نام | روشن مارکت</title>
        <meta
          name="description"
          content="صفحه ثبت نام در روشن مارکت، ثبت نام سریع و امن"
        />
      </Head>

      <main className={styles.container}>
        <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
          <div className={styles.loading_wrapper}>
            <Image src={spiner} width={80} height={80} alt="لودینگ" />
          </div>
        </div>

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
              className={`${styles.main_title} ${styles.show}`}
            >
              <span>
                <FontAwesomeIcon icon={faUserPlus} />
              </span>
              ثبت نام
            </Link>

            <Link href={"/sign-in"} className={styles.main_title}>
              <span>
                <FontAwesomeIcon icon={faUnlockKeyhole} />
              </span>
              ورود
            </Link>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              signUpFunction(name, number, password, password2);
            }}
          >
            <div className={styles.input_box}>
              <label htmlFor="fullName" className={styles.input_title}>
                نام و نام خانوادگی
              </label>
              <input
                id="fullName"
                type="text"
                autoFocus
                onChange={(e) => {
                  setName(e.target.value);
                  checkName(e.target.value);
                }}
                className={err1 ? styles.error : ""}
                aria-describedby="errorName"
              />
              <div
                id="errorName"
                className={`${styles.error_box} ${err1 ? styles.show : ""}`}
              >
                نام و نام خانوادگی اجباری است !
              </div>
            </div>

            <div className={styles.input_box}>
              <label htmlFor="phoneNumber" className={styles.input_title}>
                شماره موبایل
              </label>
              <input
                id="phoneNumber"
                type="text"
                onChange={(e) => {
                  setNumber(e.target.value);
                  checkNumber(e.target.value);
                }}
                className={err2 ? styles.error : ""}
                aria-describedby="errorNumber"
              />
              <div
                id="errorNumber"
                className={`${styles.error_box} ${err2 ? styles.show : ""}`}
              >
                شماره موبایل باید 11 رقم باشد و با 09 شروع شود.
              </div>
            </div>

            <div className={styles.input_box}>
              <label htmlFor="password1" className={styles.input_title}>
                رمز عبور
              </label>
              <input
                id="password1"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  checkPassword(e.target.value);
                }}
                className={err3 ? styles.error : ""}
                aria-describedby="errorPass1"
              />
              <div
                id="errorPass1"
                className={`${styles.error_box} ${err3 ? styles.show : ""}`}
              >
                رمز عبور باید حداقل 6 کاراکتر باشد.
              </div>
            </div>

            <div className={styles.input_box}>
              <label htmlFor="password2" className={styles.input_title}>
                تکرار رمز عبور
              </label>
              <input
                id="password2"
                type="password"
                onChange={(e) => {
                  setPassword2(e.target.value);
                  checkPassword2(e.target.value);
                }}
                className={err4 ? styles.error : ""}
                aria-describedby="errorPass2"
              />
              <div
                id="errorPass2"
                className={`${styles.error_box} ${err4 ? styles.show : ""}`}
              >
                رمز عبور با تکرارش مطابقت ندارد.
              </div>
            </div>

            <button
              className={styles.submit_btn}
              type="submit"
              disabled={loading}
              aria-busy={loading}
            >
              ثبت نام
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
