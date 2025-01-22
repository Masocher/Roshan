import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/admin/Admin.module.css";
import {
    faArrowRightToBracket,
    faBoxOpen,
    faComments,
    faCopyright,
    faList,
    faSackDollar,
    faTruckRampBox,
    faUsers,
    faMessage,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Products from "@/components/admin/Products";
import Orders from "@/components/admin/Orders";
import Categories from "@/components/admin/Categories";
import Brands from "@/components/admin/Brands";
import { useState } from "react";

export default function Admin() {
    const [pageNum, setPageNum] = useState(1);

    return (
        <div className={styles.container}>
            <div className={styles.admin_menu}>
                <div className={styles.main_title}>
                    <Link
                        href={"/"}
                        style={{ textDecoration: "none", color: "#0d7c66" }}
                    >
                        پنل ادمین
                    </Link>

                    <span>فرشاد چراغی</span>
                </div>

                <div className={styles.menu_items}>
                    <div
                        className={`${styles.menu_item} ${
                            pageNum === 1 ? styles.show : ""
                        }`}
                        onClick={() => setPageNum(1)}
                    >
                        <span>
                            <FontAwesomeIcon icon={faBoxOpen} />
                        </span>
                        محصولات
                    </div>

                    <div
                        className={`${styles.menu_item} ${
                            pageNum === 2 ? styles.show : ""
                        }`}
                        onClick={() => setPageNum(2)}
                    >
                        <span>
                            <FontAwesomeIcon icon={faTruckRampBox} />
                        </span>
                        سفارشات
                    </div>

                    <div
                        className={`${styles.menu_item} ${
                            pageNum === 3 ? styles.show : ""
                        }`}
                        onClick={() => setPageNum(3)}
                    >
                        <span>
                            <FontAwesomeIcon icon={faList} />
                        </span>
                        دسته بندی ها
                    </div>

                    <div
                        className={`${styles.menu_item} ${
                            pageNum === 4 ? styles.show : ""
                        }`}
                        onClick={() => setPageNum(4)}
                    >
                        <span>
                            <FontAwesomeIcon icon={faCopyright} />
                        </span>
                        برند ها
                    </div>

                    <div className={styles.menu_item}>
                        <span>
                            <FontAwesomeIcon icon={faComments} />
                        </span>
                        نظرات
                    </div>

                    <div className={styles.menu_item}>
                        <span>
                            <FontAwesomeIcon icon={faUsers} />
                        </span>
                        کاربران
                    </div>

                    <div className={styles.menu_item}>
                        <span>
                            <FontAwesomeIcon icon={faSackDollar} />
                        </span>
                        تخفیفات
                    </div>

                    <div className={styles.menu_item}>
                        <span>
                            <FontAwesomeIcon icon={faMessage} />
                        </span>
                        تیکت ها
                    </div>
                </div>

                <div className={styles.back_to_home_btn}>
                    <span>
                        <FontAwesomeIcon icon={faArrowRightToBracket} />
                    </span>
                    برگشت به فروشگاه
                </div>
            </div>

            <div className={styles.admin_content}>
                {pageNum === 1 ? (
                    <Products />
                ) : pageNum === 2 ? (
                    <Orders />
                ) : pageNum === 3 ? (
                    <Categories />
                ) : pageNum === 4 ? (
                    <Brands />
                ) : (
                    <div>چنین اطلاعاتی یافت نشد !</div>
                )}
            </div>
        </div>
    );
}
