import styles from "../styles/user-pannel/UserOrders.module.css";
import Header from "@/components/global/Header";
import MiniMenu from "@/components/global/MiniMenu";
import BlackBackground from "@/components/global/BlacKBackground";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faClose,
    faLocationDot,
    faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import img from "../../public/images/1.webp";

export default function UserOrders() {
    let [categoriesStatus, setCategoriesStatus] = useState(false);

    return (
        <div className={styles.container}>
            <BlackBackground
                status={categoriesStatus}
                setStatus={setCategoriesStatus}
            />
            <MiniMenu
                status={categoriesStatus}
                setStatus={setCategoriesStatus}
            />
            <Header status={categoriesStatus} setStatus={setCategoriesStatus} />

            <div className={styles.orders_container}>
                <div className={styles.user_orders_main_title}>
                    <div className={styles.title}>
                        <span>
                            <FontAwesomeIcon icon={faReceipt} />
                        </span>
                        تاریخچه سفارشات
                    </div>
                </div>

                <div className={styles.user_orders}>
                    <div className={styles.order}>
                        <div className={styles.order_assets}>
                            <div className={styles.order_status}>
                                <div className={styles.status_box}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                                پرداخت شده
                            </div>

                            <div className={styles.order_status}>
                                <div className={styles.status_box}>
                                    <FontAwesomeIcon icon={faClose} />
                                </div>
                                ارسال نشده
                            </div>
                        </div>

                        <div className={styles.tracking_code}>
                            <span>کد رهگیری : </span>
                            395060436
                        </div>

                        <div className={styles.order_informations}>
                            <div>
                                <span>تاریخ : </span>
                                14 فروردین 1403
                            </div>

                            <div>
                                <span>هزینه ارسال : </span>
                                50,000 تومان
                            </div>

                            <div>
                                <span>تخفیف : </span>
                                50,000 تومان
                            </div>

                            <div>
                                <span>کل مبلغ : </span>
                                1,500,000 تومان
                            </div>
                        </div>

                        <div className={styles.order_address}>
                            <span>
                                <FontAwesomeIcon icon={faLocationDot} />
                            </span>
                            لرستان - دورود - دانشجو
                        </div>

                        <div className={styles.products}>
                            <div className={styles.product}>
                                <Image
                                    className={styles.product_img}
                                    src={img}
                                    alt="عکس محصول"
                                />

                                <div className={styles.badge}>1</div>
                            </div>

                            <div className={styles.product}>
                                <Image
                                    className={styles.product_img}
                                    src={img}
                                    alt="عکس محصول"
                                />

                                <div className={styles.badge}>2</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.order}>
                        <div className={styles.order_assets}>
                            <div className={styles.order_status}>
                                <div className={styles.status_box}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                                پرداخت شده
                            </div>

                            <div className={styles.order_status}>
                                <div className={styles.status_box}>
                                    <FontAwesomeIcon icon={faClose} />
                                </div>
                                ارسال نشده
                            </div>
                        </div>

                        <div className={styles.tracking_code}>
                            <span>کد رهگیری : </span>
                            395060436
                        </div>

                        <div className={styles.order_informations}>
                            <div>
                                <span>تاریخ : </span>
                                14 فروردین 1403
                            </div>

                            <div>
                                <span>هزینه ارسال : </span>
                                50,000 تومان
                            </div>

                            <div>
                                <span>تخفیف : </span>
                                50,000 تومان
                            </div>

                            <div>
                                <span>کل مبلغ : </span>
                                1,500,000 تومان
                            </div>
                        </div>

                        <div className={styles.order_address}>
                            <span>
                                <FontAwesomeIcon icon={faLocationDot} />
                            </span>
                            لرستان - دورود - دانشجو
                        </div>

                        <div className={styles.products}>
                            <div className={styles.product}>
                                <Image
                                    className={styles.product_img}
                                    src={img}
                                    alt="عکس محصول"
                                />

                                <div className={styles.badge}>1</div>
                            </div>

                            <div className={styles.product}>
                                <Image
                                    className={styles.product_img}
                                    src={img}
                                    alt="عکس محصول"
                                />

                                <div className={styles.badge}>2</div>
                            </div>

                            <div className={styles.product}>
                                <Image
                                    className={styles.product_img}
                                    src={img}
                                    alt="عکس محصول"
                                />

                                <div className={styles.badge}>2</div>
                            </div>

                            <div className={styles.product}>
                                <Image
                                    className={styles.product_img}
                                    src={img}
                                    alt="عکس محصول"
                                />

                                <div className={styles.badge}>2</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
