import styles from "../styles/shopping/ShoppingCart.module.css";
import Header from "@/components/global/Header";
import BlackBackground from "@/components/global/BlacKBackground";
import MiniMenu from "@/components/global/MiniMenu";
import Footer from "@/components/global/Footer";
import Image from "next/image";
import img from "../../public/images/1.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from "next/link";

export default function ShoppingCart() {
    let [categoriesStatus, setCategoriesStatus] = useState(false);
    const [productValue, setProductValue] = useState(1);

    return (
        <div className={styles.container}>
            <BlackBackground
                status={categoriesStatus}
                setStatus={setCategoriesStatus}
            />
            <Header status={categoriesStatus} setStatus={setCategoriesStatus} />

            <div className={styles.cart_wrapper}>
                <div className={styles.right_section}>
                    <div className={styles.cart_product}>
                        <div className={styles.product_right_content}>
                            <Image
                                className={styles.cart_product_img}
                                src={img}
                                alt="عکس محصول"
                            />

                            <div className={styles.cart_product_inf}>
                                <div className={styles.product_title}>
                                    ایپسوم یک متن ساختگی است ایپسوم یک متن
                                    ساختگی است
                                </div>

                                <div className={styles.cart_product_value}>
                                    <span>
                                        <FontAwesomeIcon
                                            icon={faPlus}
                                            onClick={() =>
                                                setProductValue(
                                                    productValue + 1
                                                )
                                            }
                                        />
                                    </span>

                                    <div className={styles.cart_product_num}>
                                        {productValue}
                                    </div>

                                    <span>
                                        <FontAwesomeIcon
                                            icon={faMinus}
                                            onClick={() => {
                                                if (productValue > 1) {
                                                    setProductValue(
                                                        productValue - 1
                                                    );
                                                } else {
                                                    null;
                                                }
                                            }}
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.product_left_content}>
                            <span>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </span>

                            <div className={styles.cart_product_price}>
                                1,500,000
                                <div className={styles.toman}>تومان</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.cart_product}>
                        <div className={styles.product_right_content}>
                            <Image
                                className={styles.cart_product_img}
                                src={img}
                                alt="عکس محصول"
                            />

                            <div className={styles.cart_product_inf}>
                                <div className={styles.product_title}>
                                    لورم ایپسوم یک متن ساختگی است
                                </div>

                                <div className={styles.cart_product_value}>
                                    <span>
                                        <FontAwesomeIcon
                                            icon={faPlus}
                                            onClick={() =>
                                                setProductValue(
                                                    productValue + 1
                                                )
                                            }
                                        />
                                    </span>

                                    <div className={styles.cart_product_num}>
                                        {productValue}
                                    </div>

                                    <span>
                                        <FontAwesomeIcon
                                            icon={faMinus}
                                            onClick={() => {
                                                if (productValue > 1) {
                                                    setProductValue(
                                                        productValue - 1
                                                    );
                                                } else {
                                                    null;
                                                }
                                            }}
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.product_left_content}>
                            <span>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </span>

                            <div className={styles.cart_product_price}>
                                1,500,000
                                <div className={styles.toman}>تومان</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.cart_product}>
                        <div className={styles.product_right_content}>
                            <Image
                                className={styles.cart_product_img}
                                src={img}
                                alt="عکس محصول"
                            />

                            <div className={styles.cart_product_inf}>
                                <div className={styles.product_title}>
                                    لورم ایپسوم یک متن ساختگی است
                                </div>

                                <div className={styles.cart_product_value}>
                                    <span>
                                        <FontAwesomeIcon
                                            icon={faPlus}
                                            onClick={() =>
                                                setProductValue(
                                                    productValue + 1
                                                )
                                            }
                                        />
                                    </span>

                                    <div className={styles.cart_product_num}>
                                        {productValue}
                                    </div>

                                    <span>
                                        <FontAwesomeIcon
                                            icon={faMinus}
                                            onClick={() => {
                                                if (productValue > 1) {
                                                    setProductValue(
                                                        productValue - 1
                                                    );
                                                } else {
                                                    null;
                                                }
                                            }}
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.product_left_content}>
                            <span>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </span>

                            <div className={styles.cart_product_price}>
                                1,500,000
                                <div className={styles.toman}>تومان</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.left_section}>
                    <div className={styles.title}>اطلاعات پرداخت</div>

                    <form
                        className={styles.bonus_code_box}
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type="text"
                            placeholder="کد تخفیف را اینجا وارد کنید"
                        />

                        <button type="submit">اعمال تخفیف</button>
                    </form>

                    <div className={styles.value_box}>
                        <div className={styles.value_title}>جمع کل</div>

                        <div className={styles.value}>
                            1,500,000
                            <div className={styles.toman}>تومان</div>
                        </div>
                    </div>

                    <div className={styles.value_box}>
                        <div className={styles.value_title}>تخفیف</div>

                        <div className={`${styles.value} ${styles.off_value}`}>
                            0<div className={styles.toman}>تومان</div>
                        </div>
                    </div>

                    <div className={`${styles.value_box} ${styles.buy_value}`}>
                        <div className={styles.value_title}>
                            مبلغ قابل پرداخت
                        </div>

                        <div className={styles.value}>
                            1,500,000
                            <div className={styles.toman}>تومان</div>
                        </div>
                    </div>

                    <Link
                        href={"/purchase-information"}
                        className={styles.buy_btn}
                    >
                        تایید و تکمیل سفارش
                    </Link>
                </div>
            </div>

            <MiniMenu
                status={categoriesStatus}
                setStatus={setCategoriesStatus}
            />
            <Footer />
        </div>
    );
}
