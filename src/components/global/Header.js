import styles from "../../styles/global/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faLock,
  faReceipt,
  faRightToBracket,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function Header({ status, setStatus }) {
  const location = useRouter();

  const matches2 = useMediaQuery(1200);

  const [menuStatus, setMenuStatus] = useState(false);

  const [userName, setUserName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [authStatus, setAuthStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios.defaults.withCredentials = true;
    axios
      .get("/api/auth/me")
      .then((response) => {
        setUserName(response.data.full_name);
        setUserNumber(response.data.number);
        setAuthStatus(true);
        setLoading(false);
      })
      .catch((err) => {
        if (err.status === 401) {
          setAuthStatus(false);
        }
        setLoading(false);
      });
  }, []);

  const logOut = () => {
    axios
      .post("/api/auth/logout/")
      .then((response) => {
        window.location.href = "/";
        toast.success(response.data.detail);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.header_container}>
      <Toaster position="bottom-left" reverseOrder={true} />

      <div
        className={`${styles.black_back_2} ${menuStatus ? styles.show : ""}`}
        onClick={() => setMenuStatus(false)}
      ></div>

      <div className={`${styles.user_pannel} ${menuStatus ? styles.show : ""}`}>
        <div className={styles.user_main_title}>
          پنل کاربری
          <div
            className={styles.close_btn}
            onClick={() => setMenuStatus(false)}
          >
            <FontAwesomeIcon icon={faClose} />
          </div>
        </div>

        <div className={styles.user_information}>
          <div className={styles.user_inf}>
            <span>
              <FontAwesomeIcon icon={faUser} />
            </span>
            {userName}
          </div>

          <div className={styles.user_inf_number}>{userNumber}</div>
        </div>

        <div className={styles.menu_sections}>
          <Link className={styles.menu_sec} href={"/change-password-code"}>
            <span>
              <FontAwesomeIcon icon={faLock} />
            </span>
            تغییر رمز عبور
          </Link>

          <Link
            className={styles.menu_sec}
            href={"/user-orders"}
            onClick={() => setMenuStatus(false)}
          >
            <span>
              <FontAwesomeIcon icon={faReceipt} />
            </span>
            تاریخچه سفارشات
          </Link>

          <div
            className={styles.menu_sec}
            onClick={() => {
              logOut();
              setMenuStatus(false);
            }}
          >
            <span>
              <FontAwesomeIcon icon={faRightToBracket} />
            </span>
            خروج از حساب
          </div>
        </div>
      </div>

      <div className={styles.right_section}>
        <Link href={"/"} className={styles.logo_wrapper}>
          روشن ابزار
        </Link>

        <div className={styles.search_box_wrapper}>
          <form action={"#"} className={styles.search_box}>
            <input type="text" placeholder="جستجو" />
            <div>
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </form>
        </div>
      </div>

      <div className={styles.header_left_section}>
        <div className={styles.header_links}>
          <Link
            href={"/"}
            className={`${styles.header_l} ${
              location.pathname === "/" ? styles.show : ""
            }`}
          >
            خانه
          </Link>

          <Link
            href={"/products"}
            className={`${styles.header_l} ${
              location.pathname === "/products" ? styles.show : ""
            }`}
          >
            محصولات
          </Link>

          <div
            className={`${styles.header_l}`}
            onMouseEnter={() => setStatus(true)}
            onMouseLeave={() => setStatus(false)}
          >
            دسته بندی ها
          </div>

          <Link
            href={"/shopping-cart"}
            className={`${styles.header_l} ${
              location.pathname === "/shopping-cart" ? styles.show : ""
            }`}
          >
            سبد خرید
          </Link>

          <Link
            href={"/contact-us"}
            className={`${styles.header_l} ${
              location.pathname === "/contact-us" ? styles.show : ""
            }`}
          >
            تماس با ما
          </Link>
        </div>

        {loading ? (
          <Link href={"/sign-in"} className={styles.auth_btn}>
            ورود | ثبت نام
          </Link>
        ) : authStatus === false ? (
          <Link href={"/sign-in"} className={styles.auth_btn}>
            ورود | ثبت نام
          </Link>
        ) : (
          <div className={styles.user_icon} onClick={() => setMenuStatus(true)}>
            <FontAwesomeIcon icon={faUser} />
          </div>
        )}
      </div>

      <div
        className={`${styles.categories_menu} ${status ? styles.show : ""}`}
        onMouseEnter={() => (matches2 ? null : setStatus(true))}
        onMouseLeave={() => (matches2 ? null : setStatus(false))}
      >
        <div className={styles.main_title}>
          دسته بندی ها
          <span onClick={() => setStatus(false)}>
            <FontAwesomeIcon icon={faClose} />
          </span>
        </div>

        <div className={styles.categories}>
          <div className={styles.categories_right}>
            <div className={`${styles.categ_box} ${styles.show}`}>
              ابزار فلزی
            </div>
            <div className={styles.categ_box}>ابزار پلاستیکی</div>
            <div className={styles.categ_box}>ابزار فولادی</div>
            <div className={styles.categ_box}>ابزار مسی</div>
          </div>

          <div className={styles.categories_left}>
            <div className={styles.categ_item}>نردبان</div>
            <div className={styles.categ_item}>پتک</div>
            <div className={styles.categ_item}>تبر</div>
            <div className={styles.categ_item}>کلنگ</div>
            <div className={styles.categ_item}>قلاویز</div>
            <div className={styles.categ_item}>انبر</div>
            <div className={styles.categ_item}>آچار</div>
            <div className={styles.categ_item}>اره دستی</div>
            <div className={styles.categ_item}>تلمبه پایی</div>
            <div className={styles.categ_item}>چکش</div>
            <div className={styles.categ_item}>سمپاش</div>
            <div className={styles.categ_item}>فاز متر</div>
            <div className={styles.categ_item}>قلم بنایی</div>
            <div className={styles.categ_item}>کیف ابزار</div>
            <div className={styles.categ_item}>کاتر</div>
            <div className={styles.categ_item}>مغار</div>
            <div className={styles.categ_item}>سنباده</div>
            <div className={styles.categ_item}>لوله بر</div>
            <div className={styles.categ_item}>روغن دان</div>
            <div className={styles.categ_item}>میخ پرچ</div>
          </div>
        </div>
      </div>
    </div>
  );
}
