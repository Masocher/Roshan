import styles from "../styles/authentication/ChangePassword.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import spiner from "../../public/images/loading.svg";
import Image from "next/image";

axios.defaults.withCredentials = true;

export default function ResetPassword() {
  const router = useRouter();

  const [err1, setErr1] = useState(false);

  const [number, setNumber] = useState("");

  const [loading, setLoading] = useState(false);

  const getCodeFunction = async () => {
    if (!number) {
      setErr1(true);
      toast.error("شماره تلفن نمیتواند خالی باشد !");
      return;
    }

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
          localStorage.setItem("userNumber", number);
          toast.success("کد فعالسازی به شماره تلفن شما ارسال شد.");
          router.push("/change-password");
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.data.detail) {
            toast.error(err.response.data.detail);
          }
          if (err.response.data.number) {
            toast.error("شماره تلفن : " + err.response.data.number);
          }

          localStorage.removeItem("userNumber");
          setLoading(false);
        });
    } catch (error) {}
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
      <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
        <div className={styles.loading_wrapper}>
          <Image src={spiner} width={80} height={80} alt="لودینگ" />
        </div>
      </div>

      <Toaster position="bottom-left" reverseOrder={true} />

      <div className={styles.logo}>تغییر رمز عبور</div>

      <div className={styles.auth_form}>
        <div onClick={() => router.back()} className={styles.back_btn_2}>
          <span>
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
          بازگشت
        </div>

        <div className={styles.title_box}>شماره تلفن را وارد کنید</div>

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

            <div className={`${styles.error_box} ${err1 ? styles.show : ""}`}>
              شماره تلفن نمیتواند خالی باشد !
            </div>
          </div>

          <button
            className={styles.submit_btn}
            onClick={() => {
              getCodeFunction();
            }}
          >
            دریافت کد
          </button>
        </form>
      </div>
    </div>
  );
}
