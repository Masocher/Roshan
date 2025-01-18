import styles from "../../styles/global/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Header() {
    return (
        <div className={styles.header_container}>
            <div className={styles.right_secrion}>
                <Link href={"/"} className={styles.logo_wrapper}>روشن مارکت</Link>

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
                    <Link href={"/"} className={styles.header_l}>
                        خانه
                    </Link>

                    <Link href={"/products"} className={styles.header_l}>
                        محصولات
                    </Link>

                    <Link href={"/shopping-cart"} className={styles.header_l}>
                        سبد خرید
                    </Link>

                    <Link href={"/contact-us"} className={styles.header_l}>
                        تماس با ما
                    </Link>
                </div>

                <Link href={"/sign-in"} className={styles.auth_btn}>
                    ورود | ثبت نام
                </Link>
            </div>
        </div>
    );
}
