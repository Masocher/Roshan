import styles from "../../styles/admin/Orders.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faAngleLeft,
    faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Orders() {
    return (
        <div className={styles.container}>
            <div className={styles.search_box}>
                <form className={styles.products_search}>
                    <input type="text" placeholder="جستجوی محصول ..." />

                    <span>
                        <FontAwesomeIcon icon={faSearch} />
                    </span>
                </form>

                <div className={styles.search_buttons}>
                    <div className={styles.inventory_button}>
                        <div>
                            <span></span>
                        </div>
                        پرداخت شده ها
                    </div>

                    <div className={styles.inventory_button}>
                        <div>
                            <span></span>
                        </div>
                        ارسال شده ها
                    </div>
                </div>
            </div>

            <div className={styles.orders}>
                <div className={styles.orders_top}>
                    <div className={styles.orders_title}>شماره</div>
                    <div className={styles.orders_title}>تلفن</div>
                    <div className={styles.orders_title}>قیمت</div>
                    <div className={styles.orders_title}>وضعیت پرداخت</div>
                    <div className={styles.orders_title}>تاریخ</div>
                    <div className={styles.orders_title}>وضعیت ارسال</div>
                </div>

                <Link className={styles.order} href={`/admin/order/${0}`}>
                    <div className={styles.order_id}>1</div>

                    <div className={styles.phone_number}>09054182307</div>

                    <div className={styles.order_value}>1,500,000</div>

                    <div className={styles.order_price}>پرداخت شده</div>
                    <div className={styles.order_date}>1403/1/14</div>
                    <div className={styles.order_active}>ارسال شده</div>
                </Link>

                <Link className={styles.order} href={`/admin/order/${1}`}>
                    <div className={styles.order_id}>1</div>

                    <div className={styles.phone_number}>09054182307</div>

                    <div className={styles.order_value}>1,500,000</div>

                    <div className={styles.order_price}>پرداخت شده</div>
                    <div className={styles.order_date}>1403/1/14</div>
                    <div className={styles.order_active}>ارسال شده</div>
                </Link>

                <Link className={styles.order} href={`/admin/order/${2}`}>
                    <div className={styles.order_id}>1</div>

                    <div className={styles.phone_number}>09054182307</div>

                    <div className={styles.order_value}>1,500,000</div>

                    <div className={styles.order_price}>پرداخت شده</div>
                    <div className={styles.order_date}>1403/1/14</div>
                    <div className={styles.order_active}>ارسال شده</div>
                </Link>

                <Link className={styles.order} href={`/admin/order/${3}`}>
                    <div className={styles.order_id}>1</div>

                    <div className={styles.phone_number}>09054182307</div>

                    <div className={styles.order_value}>1,500,000</div>

                    <div className={styles.order_price}>پرداخت شده</div>
                    <div className={styles.order_date}>1403/1/14</div>
                    <div className={styles.order_active}>ارسال شده</div>
                </Link>

                <Link className={styles.order} href={`/admin/order/${4}`}>
                    <div className={styles.order_id}>1</div>

                    <div className={styles.phone_number}>09054182307</div>

                    <div className={styles.order_value}>1,500,000</div>

                    <div className={styles.order_price}>پرداخت شده</div>
                    <div className={styles.order_date}>1403/1/14</div>
                    <div className={styles.order_active}>ارسال شده</div>
                </Link>

                <Link className={styles.order} href={`/admin/order/${5}`}>
                    <div className={styles.order_id}>1</div>

                    <div className={styles.phone_number}>09054182307</div>

                    <div className={styles.order_value}>1,500,000</div>

                    <div className={styles.order_price}>پرداخت شده</div>
                    <div className={styles.order_date}>1403/1/14</div>
                    <div className={styles.order_active}>ارسال شده</div>
                </Link>

                <Link className={styles.order} href={`/admin/order/${6}`}>
                    <div className={styles.order_id}>1</div>

                    <div className={styles.phone_number}>09054182307</div>

                    <div className={styles.order_value}>1,500,000</div>

                    <div className={styles.order_price}>پرداخت شده</div>
                    <div className={styles.order_date}>1403/1/14</div>
                    <div className={styles.order_active}>ارسال شده</div>
                </Link>

                <Link className={styles.order} href={`/admin/order/${7}`}>
                    <div className={styles.order_id}>1</div>

                    <div className={styles.phone_number}>09054182307</div>

                    <div className={styles.order_value}>1,500,000</div>

                    <div className={styles.order_price}>پرداخت شده</div>
                    <div className={styles.order_date}>1403/1/14</div>
                    <div className={styles.order_active}>ارسال شده</div>
                </Link>

                <Link className={styles.order} href={`/admin/order/${8}`}>
                    <div className={styles.order_id}>1</div>

                    <div className={styles.phone_number}>09054182307</div>

                    <div className={styles.order_value}>1,500,000</div>

                    <div className={styles.order_price}>پرداخت شده</div>
                    <div className={styles.order_date}>1403/1/14</div>
                    <div className={styles.order_active}>ارسال شده</div>
                </Link>

                <Link className={styles.order} href={`/admin/order/${9}`}>
                    <div className={styles.order_id}>1</div>

                    <div className={styles.phone_number}>09054182307</div>

                    <div className={styles.order_value}>1,500,000</div>

                    <div className={styles.order_price}>پرداخت شده</div>
                    <div className={styles.order_date}>1403/1/14</div>
                    <div className={styles.order_active}>ارسال شده</div>
                </Link>

                <Link className={styles.order} href={`/admin/order/${10}`}>
                    <div className={styles.order_id}>1</div>

                    <div className={styles.phone_number}>09054182307</div>

                    <div className={styles.order_value}>1,500,000</div>

                    <div className={styles.order_price}>پرداخت شده</div>
                    <div className={styles.order_date}>1403/1/14</div>
                    <div className={styles.order_active}>ارسال شده</div>
                </Link>

                <Link className={styles.order} href={`/admin/order/${11}`}>
                    <div className={styles.order_id}>1</div>

                    <div className={styles.phone_number}>09054182307</div>

                    <div className={styles.order_value}>1,500,000</div>

                    <div className={styles.order_price}>پرداخت شده</div>
                    <div className={styles.order_date}>1403/1/14</div>
                    <div className={styles.order_active}>ارسال شده</div>
                </Link>

                <Link className={styles.order} href={`/admin/order/${12}`}>
                    <div className={styles.order_id}>1</div>

                    <div className={styles.phone_number}>09054182307</div>

                    <div className={styles.order_value}>1,500,000</div>

                    <div className={styles.order_price}>پرداخت شده</div>
                    <div className={styles.order_date}>1403/1/14</div>
                    <div className={styles.order_active}>ارسال شده</div>
                </Link>

                <Link className={styles.order} href={`/admin/order/${13}`}>
                    <div className={styles.order_id}>1</div>

                    <div className={styles.phone_number}>09054182307</div>

                    <div className={styles.order_value}>1,500,000</div>

                    <div className={styles.order_price}>پرداخت شده</div>
                    <div className={styles.order_date}>1403/1/14</div>
                    <div className={styles.order_active}>ارسال شده</div>
                </Link>
            </div>

            <div className={styles.pagination}>
                <div className={styles.perv_btn}>
                    <span>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </span>
                    قبلی
                </div>
                <div className={`${styles.page_btn} ${styles.show}`}>1</div>
                <div className={`${styles.page_btn} ${""}`}>2</div>
                <div className={`${styles.page_btn} ${""}`}>3</div>
                <div className={`${styles.page_btn} ${""}`}>4</div>
                <div className={`${styles.page_btn} ${""}`}>5</div>
                <div className={styles.next_btn}>
                    بعدی
                    <span>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </span>
                </div>
            </div>
        </div>
    );
}
