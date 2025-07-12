import styles from "../../styles/global/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faClose,
  faLock,
  faReceipt,
  faRightToBracket,
  faSearch,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import spiner from "../../../public/images/loading.svg";
import Image from "next/image";
import { useCategories } from "../CategoryContext";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryQuery } from "@/store/Reducer";

axios.defaults.withCredentials = true;

export default function Header({ status, setStatus, user }) {
  const dispatch = useDispatch();

  const categoryQuery = useSelector((state) => state.category);

  const headerCategories = useCategories();

  const router = useRouter();

  const location = useRouter();

  const matches2 = useMediaQuery(1200);

  const [menuStatus, setMenuStatus] = useState(false);

  const [userName, setUserName] = useState(user ? user.full_name : "");
  const [userNumber, setUserNumber] = useState(user ? user.number : "");
  const [authStatus, setAuthStatus] = useState(
    user ? (user.full_name && user.number ? true : false) : false
  );
  const [loading, setLoading] = useState(false);

  const logOut = () => {
    setLoading(true);
    axios
      .post("/api/auth/logout/")
      .then((response) => {
        toast.success(response.data.detail);
        setTimeout(() => {
          window.location.href = "/";
          setLoading(false);
        }, 3000);
      })
      .catch(() => {
        toast.error("خطایی رخ داد !");
        setLoading(false);
      });
  };

  const [text, setText] = useState("");

  const search = () => {
    router.push(`/products/?search=${text}`);
  };

  return (
    <div className={styles.header_container}>
      <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
        <div className={styles.loading_wrapper}>
          <div className={styles.loading_wrapper_title}>روشن ابزار</div>
          <Image src={spiner} width={40} height={40} alt="لودینگ" />
        </div>
      </div>

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
          {user ? (
            user.role === "staff" ? (
              <Link
                className={`${styles.menu_sec} ${styles.admin_sec}`}
                href={"/admin-panel/products"}
                onClick={() => setMenuStatus(false)}
              >
                <span>
                  <FontAwesomeIcon icon={faUserLock} />
                </span>
                پنل ادمین
              </Link>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          <Link className={styles.menu_sec} href={"/reset-password"}>
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              search();
            }}
            className={styles.search_box}
          >
            <input
              type="text"
              placeholder="جستجو"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />

            <button type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
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
          {headerCategories.map((category) => (
            <Link
              href={"/products"}
              className={`${styles.categ_box} ${
                categoryQuery === category.name ? styles.show : ""
              }`}
              key={category.id}
              onClick={() => dispatch(setCategoryQuery(category.name))}
            >
              {category.name}
              <span>
                <FontAwesomeIcon icon={faAngleLeft} />
              </span>
            </Link>
          ))}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>{" "}
          <Link href={"/products"} className={`${styles.categ_box}`}>
            چکش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
