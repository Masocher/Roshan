import styles from "../../../styles/admin-options/Order.module.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRight,
    faCheck,
    faClose,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import img from "../../../../public/images/1.webp";

export default function Order() {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.main_title}>
                <div className={styles.back_btn} onClick={() => router.back()}>
                    <span>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                    بازگشت
                </div>
                صفحه سفارش
            </div>

            <div className={styles.order}>
                <div className={styles.first_section}>
                    <div className={styles.main_information}>
                        <div className={styles.name}>امیر مسعود چراغی</div>
                        <div className={styles.phone}>09054182307</div>
                    </div>

                    <div className={styles.payment_status}>
                        <div className={styles.title}>وضعیت ارسال</div>

                        <div className={`${styles.content} ${styles.show}`}>
                            <span>
                                <FontAwesomeIcon icon={faClose} />
                            </span>
                            <div>ارسال نشده</div>
                        </div>
                    </div>

                    <div className={styles.payment_status}>
                        <div className={styles.title}>وضعیت پرداخت</div>

                        <div className={styles.content}>
                            <span>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <div>پرداخت شده</div>
                        </div>
                    </div>

                    <div className={styles.payment_status}>
                        <div className={styles.title}>تاریخ سفارش</div>

                        <div className={styles.content}>
                            <div>1403/1/14</div>
                        </div>
                    </div>
                </div>

                <div className={styles.second_section}>
                    <div className={styles.address}>
                        <div className={styles.title}>آدرس</div>

                        <div className={styles.content}>
                            لرستان - دورود - دانشجو
                        </div>
                    </div>

                    <div className={styles.offer}>
                        <div className={styles.title}>کد تخفیف</div>

                        <div className={styles.content}>yalda00</div>
                    </div>
                </div>

                <div className={styles.third_section}>
                    <div className={styles.title}>محصولات انتخاب شده</div>

                    <div className={styles.products}>
                        <div className={styles.product}>
                            <Image
                                src={img}
                                alt="عکس محصول"
                                className={styles.product_img}
                            />

                            <div className={styles.product_inf}>
                                <div className={styles.badge}>تعداد : 2</div>

                                <div className={styles.cart_product_num}>
                                    1,500,000
                                </div>

                                <div className={styles.product_name}>
                                    هود آشپزی مدل سیمرغ
                                </div>
                            </div>
                        </div>

                        <div className={styles.product}>
                            <Image
                                src={img}
                                alt="عکس محصول"
                                className={styles.product_img}
                            />

                            <div className={styles.product_inf}>
                                <div className={styles.badge}>تعداد : 2</div>

                                <div className={styles.cart_product_num}>
                                    1,500,000
                                </div>

                                <div className={styles.product_name}>
                                    هود آشپزی مدل سیمرغ
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.fourth_section}>
                    <div className={styles.section_title}>صورتحساب</div>

                    <div className={styles.bottom_section}>
                        <div className={styles.botom_box}>
                            <div className={styles.title}>وضعیت پرداخت</div>

                            <div className={styles.content}>پراخت شده</div>
                        </div>

                        <div className={styles.botom_box}>
                            <div className={styles.title}>قیمت پرداخت شده</div>

                            <div className={styles.content}>1,500,000</div>
                        </div>

                        <div className={styles.botom_box}>
                            <div className={styles.title}>تاریخ پرداخت</div>

                            <div className={styles.content}>1403/1/14</div>
                        </div>

                        <div className={styles.botom_box}>
                            <div className={styles.title}>کد تراکنش</div>

                            <div className={styles.content}>6533120</div>
                        </div>

                        <div className={styles.botom_box}>
                            <div className={styles.title}>کد درگاه پرداخت</div>

                            <div className={styles.content}>6533120</div>
                        </div>

                        <div className={styles.payment_gateway_details}>
                            <div className={styles.title}>
                                جزئیات درگاه پرداخت
                            </div>

                            <div className={styles.content}>
                                <div className={styles.content_box}>
                                    کد : 100
                                </div>

                                <div className={styles.content_box}>
                                    پیغام : تایید شده
                                </div>

                                <div className={styles.content_box}>
                                    کد هش کارت :
                                    1EBE3EBEBE35C7EC0F8D6EE4F2F859107A87822CA179BC9528767EA7B5489B69
                                </div>

                                <div className={styles.content_box}>
                                    شماره کارت : 502229******5995
                                </div>

                                <div className={styles.content_box}>
                                    کد تراکنش : 201
                                </div>

                                <div className={styles.content_box}>
                                    نوع کارمزد : Merchant
                                </div>

                                <div className={styles.content_box}>
                                    کارمزد : 0
                                </div>

                                <div className={styles.error}>
                                    ارور :<div>سرقت مسلحانه صورت گرفته است</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.fifth_section}>
                    <div className={styles.section_title}>جزئیات مرسوله</div>

                    <div className={styles.content}>
                        <div className={styles.main_user_information}>
                            <div className={styles.right_content}>
                                <input
                                    type="text"
                                    placeholder="نام و نام خانوادگی تحویل گیرنده"
                                />

                                <input
                                    type="text"
                                    placeholder="شماره موبایل تحویل گیرنده"
                                />
                            </div>

                            <textarea
                                type="text"
                                placeholder="آدرس تحویل گیرنده"
                            />
                        </div>

                        <div className={styles.order_details}>
                            <input type="text" placeholder="تاریخ ارسال" />
                            <input type="text" placeholder="هزینه ارسال" />
                            <input type="text" placeholder="کد رهگیری مرسوله" />
                        </div>

                        <div className={styles.submit_btn}>ثبت تغییرات</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
