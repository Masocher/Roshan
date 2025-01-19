import styles from "../../styles/global/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Header({ status, setStatus }) {
    const location = useRouter();
    const matches2 = useMediaQuery(1200);

    return (
        <div className={styles.header_container}>
            <div className={styles.right_section}>
                <Link href={"/"} className={styles.logo_wrapper}>
                    روشن مارکت
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
                            location.pathname === "/shopping-cart"
                                ? styles.show
                                : ""
                        }`}
                    >
                        سبد خرید
                    </Link>

                    <Link
                        href={"/contact-us"}
                        className={`${styles.header_l} ${
                            location.pathname === "/contact-us"
                                ? styles.show
                                : ""
                        }`}
                    >
                        تماس با ما
                    </Link>
                </div>

                <Link href={"/sign-in"} className={styles.auth_btn}>
                    ورود | ثبت نام
                </Link>
            </div>

            <div
                className={`${styles.categories_menu} ${
                    status ? styles.show : ""
                }`}
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
