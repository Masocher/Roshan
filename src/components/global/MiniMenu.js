import styles from "../../styles/global/MiniMenu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faPhone,
    faBoxOpen,
    faBasketShopping,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MiniMenu() {
    const location = useRouter();

    return (
        <div className={styles.container}>
            <Link
                href={"/"}
                className={`${styles.menu_section} ${
                    location.pathname === "/" ? styles.show : ""
                }`}
            >
                <div className={styles.menu_icon}>
                    <FontAwesomeIcon icon={faHome} />
                </div>

                <div className={styles.menu_title}>خانه</div>
            </Link>

            <Link
                href={"/products"}
                className={`${styles.menu_section} ${
                    location.pathname === "/products" ? styles.show : ""
                }`}
            >
                <div className={styles.menu_icon}>
                    <FontAwesomeIcon icon={faBoxOpen} />
                </div>

                <div className={styles.menu_title}>محصولات</div>
            </Link>

            <Link
                href={"/shopping-cart"}
                className={`${styles.menu_section} ${
                    location.pathname === "/shopping-cart" ? styles.show : ""
                }`}
            >
                <div className={styles.menu_icon}>
                    <FontAwesomeIcon icon={faBasketShopping} />
                </div>

                <div className={styles.menu_title}>سبد خرید</div>
            </Link>

            <Link
                href={"/contact-us"}
                className={`${styles.menu_section} ${
                    location.pathname === "/contact-us" ? styles.show : ""
                }`}
            >
                <div className={styles.menu_icon}>
                    <FontAwesomeIcon icon={faPhone} />
                </div>

                <div className={styles.menu_title}>تماس با ما</div>
            </Link>
        </div>
    );
}
