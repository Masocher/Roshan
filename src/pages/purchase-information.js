import styles from "../styles/shopping/PurchaseInformation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faArrowRight,
    faLocationDot,
    faEarthAmericas,
    faTruck,
    faPlus,
    faTrashCan,
    faUser,
    faClose,
    faMobile,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import img from "../../public/images/1.webp";
import { useState } from "react";
import img1 from "../../public/images/12.png";

export default function PurchaseInformation() {
    const [productValue, setProductValue] = useState(1);
    const [gatewayStatus, setGatewayStatus] = useState(false);
    const [addressBoxStatus, setAddressBoxStatus] = useState(false);

    const [bankStatus, setBankStatus] = useState(false);
    const [addressStatus, setAddressStatus] = useState(false);

    return (
        <div className={styles.container}>
            <div
                className={`${styles.gateway_container} ${
                    gatewayStatus ? styles.show : ""
                }`}
            >
                <div className={styles.payment_gateway}>
                    <div className={styles.gateway_main_title}>
                        انتخاب درگاه پرداخت
                        <div
                            className={styles.close_btn}
                            onClick={() => setGatewayStatus(false)}
                        >
                            <FontAwesomeIcon icon={faClose} />
                        </div>
                    </div>

                    <div
                        className={`${styles.gateway} ${
                            bankStatus ? styles.show : ""
                        }`}
                        onClick={() => setBankStatus(!bankStatus)}
                    >
                        <div className={styles.title}>
                            <div
                                className={`${styles.check_box} ${
                                    bankStatus ? styles.show : ""
                                }`}
                            >
                                <span></span>
                            </div>
                            بانک صادرات
                        </div>

                        <Image
                            src={img1}
                            className={styles.gateway_image}
                            alt="لوگوی بانک"
                        />
                    </div>

                    <div className={styles.value_box}>
                        <div className={styles.title}>مقدار قابل پرداخت</div>

                        <div className={styles.value}>
                            1,600,000
                            <div className={styles.toman}>تومان</div>
                        </div>
                    </div>

                    <div
                        className={`${styles.complete_btn} ${
                            bankStatus ? styles.show : ""
                        }`}
                    >
                        تکمیل سفارش
                    </div>
                </div>
            </div>

            <div
                className={`${styles.address_container} ${
                    addressBoxStatus ? styles.show : ""
                }`}
            >
                <div className={styles.select_address}>
                    <div className={styles.address_main_title}>
                        انتخاب آدرس
                        <div
                            className={styles.close_btn}
                            onClick={() => setAddressBoxStatus(false)}
                        >
                            <FontAwesomeIcon icon={faClose} />
                        </div>
                    </div>

                    <div className={styles.addresses}>
                        <div
                            className={`${styles.address} ${
                                addressStatus ? "" : styles.show
                            }`}
                            onClick={() => setAddressStatus(false)}
                        >
                            <div className={styles.address_title}>
                                <div
                                    className={`${styles.check_box} ${
                                        addressStatus ? "" : styles.show
                                    }`}
                                >
                                    <span></span>
                                </div>
                                لرستان - دورود - دانشجو
                            </div>

                            <div className={styles.address_inf}>
                                <span>
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                امیر مسعود چراغی
                            </div>

                            <div className={styles.address_inf}>
                                <span>
                                    <FontAwesomeIcon icon={faMobile} />
                                </span>
                                09054182307
                            </div>
                        </div>

                        <div
                            className={`${styles.address} ${
                                addressStatus ? styles.show : ""
                            }`}
                            onClick={() => setAddressStatus(true)}
                        >
                            <div className={styles.address_title}>
                                <div
                                    className={`${styles.check_box} ${
                                        addressStatus ? styles.show : ""
                                    }`}
                                >
                                    <span></span>
                                </div>
                                لرستان - دورود - دانشجو
                            </div>

                            <div className={styles.address_inf}>
                                <span>
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                امیر مسعود چراغی
                            </div>

                            <div className={styles.address_inf}>
                                <span>
                                    <FontAwesomeIcon icon={faMobile} />
                                </span>
                                09054182307
                            </div>
                        </div>
                    </div>

                    <div className={styles.new_address}>
                        <span>
                            <FontAwesomeIcon icon={faLocationDot} />
                        </span>
                        افزودن آدرس جدید
                    </div>
                </div>
            </div>

            <div className={styles.top_section}>
                <Link href={"/shopping-cart"} className={styles.main_title}>
                    <span>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                    تکمیل سفارش
                </Link>

                <div className={styles.logo_box}>روشن مارکت</div>
            </div>

            <div className={styles.right_section}>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className={styles.user_inf_form}
                >
                    <div className={styles.title}>
                        <span>
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                        اطلاعات دریافت کننده
                    </div>

                    <input type="text" placeholder="نام و نام خانوادگی" />

                    <input type="text" placeholder="شماره تلفن" />
                </form>

                <div className={styles.location_box}>
                    <div className={styles.title}>انتخاب آدرس</div>

                    <div className={styles.selected_address_box}>
                        <div className={styles.title_box}>
                            <div className={styles.title}>
                                <span>
                                    <FontAwesomeIcon icon={faEarthAmericas} />
                                </span>
                                ارسال به آدرس انتخاب شده
                            </div>

                            <div
                                className={styles.select_address_btn}
                                onClick={() => setAddressBoxStatus(true)}
                            >
                                تغییر آدرس
                                <span>
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </span>
                            </div>
                        </div>

                        <div className={styles.selected_address}>
                            <span>
                                <FontAwesomeIcon icon={faLocationDot} />
                            </span>
                            لرستان - دورود - دانشجو
                        </div>
                    </div>
                </div>

                <div className={styles.products}>
                    <div className={styles.title}>
                        <span>
                            <FontAwesomeIcon icon={faTruck} />
                        </span>
                        ارسال معمولی
                    </div>

                    <div className={styles.product_box}>
                        <Image
                            src={img}
                            alt="عکس محصول"
                            className={styles.product_img}
                        />

                        <div className={styles.cart_product_value}>
                            <span>
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    onClick={() =>
                                        setProductValue(productValue + 1)
                                    }
                                />
                            </span>

                            <div className={styles.cart_product_num}>
                                {productValue}
                            </div>

                            <span>
                                <FontAwesomeIcon
                                    icon={faTrashCan}
                                    onClick={() => {
                                        if (productValue > 1) {
                                            setProductValue(productValue - 1);
                                        } else {
                                            null;
                                        }
                                    }}
                                />
                            </span>
                        </div>
                    </div>

                    <div className={styles.product_box}>
                        <Image
                            src={img}
                            alt="عکس محصول"
                            className={styles.product_img}
                        />

                        <div className={styles.cart_product_value}>
                            <span>
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    onClick={() =>
                                        setProductValue(productValue + 1)
                                    }
                                />
                            </span>

                            <div className={styles.cart_product_num}>
                                {productValue}
                            </div>

                            <span>
                                <FontAwesomeIcon
                                    icon={faTrashCan}
                                    onClick={() => {
                                        if (productValue > 1) {
                                            setProductValue(productValue - 1);
                                        } else {
                                            null;
                                        }
                                    }}
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.purchase_inf}>
                <div className={styles.inf_box}>
                    <div className={styles.title}>قیمت کالاها</div>

                    <div className={styles.badge}>
                        1,500,000
                        <div className={styles.toman}>تومان</div>
                    </div>
                </div>

                <div className={`${styles.inf_box} ${styles.inf_box_2}`}>
                    <div className={styles.title}>هزینه ارسال</div>

                    <div className={styles.badge}>
                        100,000
                        <div className={styles.toman}>تومان</div>
                    </div>
                </div>

                <div className={`${styles.inf_box} ${styles.inf_box_3}`}>
                    <div className={styles.title}>قابل پرداخت</div>

                    <div className={styles.badge}>
                        1,600,000
                        <div className={styles.toman}>تومان</div>
                    </div>
                </div>

                <div
                    className={styles.buy_btn}
                    onClick={() => setGatewayStatus(true)}
                >
                    ثبت سفارش
                </div>
            </div>
        </div>
    );
}
