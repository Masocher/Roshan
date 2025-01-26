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
import Comments from "@/components/admin/Comments";
import Users from "@/components/admin/Users";
import Offers from "@/components/admin/Offers";
import Tickets from "@/components/admin/Tickets";
import { useState } from "react";

export default function Admin() {
    const [pageNum, setPageNum] = useState(1);

    return (
        <div className={styles.container}>
            <div className={styles.admin_menu}>
                <div className={styles.main_title}>
                    <div>پنل ادمین</div>

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
                        <div>محصولات</div>
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
                        <div>سفارشات</div>
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
                        <div>دسته بندی ها</div>
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
                        <div>برند ها</div>
                    </div>

                    <div
                        className={`${styles.menu_item} ${
                            pageNum === 5 ? styles.show : ""
                        }`}
                        onClick={() => setPageNum(5)}
                    >
                        <span>
                            <FontAwesomeIcon icon={faComments} />
                        </span>
                        <div>نظرات</div>
                    </div>

                    <div
                        className={`${styles.menu_item} ${
                            pageNum === 6 ? styles.show : ""
                        }`}
                        onClick={() => setPageNum(6)}
                    >
                        <span>
                            <FontAwesomeIcon icon={faUsers} />
                        </span>
                        <div>کاربران</div>
                    </div>

                    <div
                        className={`${styles.menu_item} ${
                            pageNum === 7 ? styles.show : ""
                        }`}
                        onClick={() => setPageNum(7)}
                    >
                        <span>
                            <FontAwesomeIcon icon={faSackDollar} />
                        </span>
                        <div>کد های تخفیف</div>
                    </div>

                    <div
                        className={`${styles.menu_item} ${
                            pageNum === 8 ? styles.show : ""
                        }`}
                        onClick={() => setPageNum(8)}
                    >
                        <span>
                            <FontAwesomeIcon icon={faMessage} />
                        </span>
                        <div>تیکت ها</div>
                    </div>
                </div>

                <Link href={"/"} className={styles.back_to_home_btn}>
                    <span>
                        <FontAwesomeIcon icon={faArrowRightToBracket} />
                    </span>
                    <div>برگشت به فروشگاه</div>
                </Link>
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
                ) : pageNum === 5 ? (
                    <Comments />
                ) : pageNum === 6 ? (
                    <Users />
                ) : pageNum === 7 ? (
                    <Offers />
                ) : pageNum === 8 ? (
                    <Tickets />
                ) : (
                    <div>چنین اطلاعاتی یافت نشد !</div>
                )}
            </div>
        </div>
    );
}
