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

  const [number, setNumber] = useState(user.number);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .post("/api/auth/activation/")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  const sendCode = (code) => {
    setLoading(true);

    axios.defaults.withCredentials = true;
    axios
      .post("/api/auth/activation/verify/", {
        otp: `${code}`,
      })
      .then((response) => {
        toast.success(response.data.detail);
        setLoading(false);
        router.push("/purchase-information");
      })
      .catch((err) => {
        if (err.response.data.detail) {
          toast.error(err.response.data.detail);
        }

        if (err.response.data.otp) {
          toast.error("کد تایید : " + err.response.data.otp);
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

  return (
    <div className={styles.container}>
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
        <div className={styles.title} style={{ marginTop: "0" }}>
          کد تایید را وارد کنید
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
              maxLength={"6"}
              onChange={(e) => {
                setCode(e.target.value);
                checkCode(e.target.value);
              }}
              className={`${err1 ? styles.error : ""}`}
            />

            <div className={`${styles.error_box} ${err1 ? styles.show : ""}`}>
              کد تایید اجباری است !
            </div>
          </div>

          <div className={styles.again_code_time}>
            <span>
              59<div>:</div>01
            </span>
            مانده تا دریافت مجدد کد
          </div>

          <div className={styles.get_code_again}>
            <span>
              <FontAwesomeIcon icon={faRotate} />
            </span>
            دریافت مجدد کد
          </div>

          <button className={styles.submit_btn} onClick={() => sendCode(code)}>
            تایید
          </button>
        </form>
      </div>
    </div>
  );
}
