import styles from "../../styles/global/Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInstagram,
    faTelegram,
    faYoutube,
    faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import {
    faAngleUp,
    faAngleLeft,
    faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Footer() {
    const [hcb1, setHcb1] = useState(false);
    const [hcb2, setHcb2] = useState(false);
    const [hcb3, setHcb3] = useState(false);

    return (
        <div className={styles.footer_container}>
            <div className={styles.top_section}>
                <div className={styles.section}>
                    <div className={styles.logo}>فروشگاه اینترنتی روشن</div>

                    <div className={styles.contact_information}>
                        تلفن پشتیبانی - 09166991715
                    </div>
                </div>

                <div className={styles.left_section}>
                    <div
                        className={styles.scroll_btn}
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                    >
                        بازگشت به بالا
                        <span>
                            <FontAwesomeIcon icon={faAngleUp} />
                        </span>
                    </div>

                    <div className={styles.icons}>
                        <div className={styles.icon_box}>
                            <FontAwesomeIcon icon={faFacebook} />
                        </div>

                        <div className={styles.icon_box}>
                            <FontAwesomeIcon icon={faYoutube} />
                        </div>

                        <div className={styles.icon_box}>
                            <FontAwesomeIcon icon={faTelegram} />
                        </div>

                        <div className={styles.icon_box}>
                            <FontAwesomeIcon icon={faInstagram} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.center_sections}>
                <div className={`${styles.center_section} ${styles.cs1}`}>
                    <div className={styles.c_sec}>
                        <div className={styles.title}>راهنمای مشتریان</div>

                        <div className={styles.section_options}>
                            <div>پاسخ به پرسش های متداول</div>
                            <div>روش های ارسال کالا</div>
                            <div>شرایط بازگشت کالا</div>
                            <div>روش های پرداخت</div>
                            <div>قوانین و مقررات</div>
                        </div>
                    </div>

                    <div className={styles.c_sec}>
                        <div className={styles.title}>همراه با روشن مارکت</div>

                        <div className={styles.section_options}>
                            <div>ارتباط با ما</div>
                            <div>درباره ما</div>
                            <div>فروش به شرکت ها</div>
                            <div>خرید اقساطی</div>
                            <div>گزارش باگ و ایراد</div>
                        </div>
                    </div>

                    <div className={styles.c_sec}>
                        <div className={styles.title}>
                            راهنمای خرید از روشن مارکت
                        </div>

                        <div className={styles.section_options}>
                            <div>نحوه ثبت سفارش</div>
                            <div>نحوه ارسال سفارش</div>
                            <div>شرایط بازگشت کالا</div>
                        </div>
                    </div>
                </div>

                <div className={styles.hidden_center_sections}>
                    <div className={`${styles.hcb} ${hcb1 ? styles.show : ""}`}>
                        <div
                            className={styles.title}
                            onClick={() => setHcb1(!hcb1)}
                        >
                            راهنمای مشتریان
                            <span>
                                <FontAwesomeIcon
                                    icon={hcb1 ? faAngleDown : faAngleLeft}
                                />
                            </span>
                        </div>

                        <div className={styles.hidden_section_options}>
                            <div>پاسخ به پرسش های متداول</div>
                            <div>روش های ارسال کالا</div>
                            <div>شرایط بازگشت کالا</div>
                            <div>روش های پرداخت</div>
                            <div>قوانین و مقررات</div>
                        </div>
                    </div>

                    <div className={`${styles.hcb} ${hcb2 ? styles.show : ""}`}>
                        <div
                            className={styles.title}
                            onClick={() => setHcb2(!hcb2)}
                        >
                            همراه با روشن مارکت
                            <span>
                                <FontAwesomeIcon
                                    icon={hcb2 ? faAngleDown : faAngleLeft}
                                />
                            </span>
                        </div>

                        <div className={styles.hidden_section_options}>
                            <div>ارتباط با ما</div>
                            <div>درباره ما</div>
                            <div>فروش به شرکت ها</div>
                            <div>خرید اقساطی</div>
                            <div>گزارش باگ و ایراد</div>
                        </div>
                    </div>

                    <div className={`${styles.hcb} ${hcb3 ? styles.show : ""}`}>
                        <div
                            className={styles.title}
                            onClick={() => setHcb3(!hcb3)}
                        >
                            راهنمای خرید از روشن مارکت
                            <span>
                                <FontAwesomeIcon
                                    icon={hcb3 ? faAngleDown : faAngleLeft}
                                />
                            </span>
                        </div>

                        <div className={styles.hidden_section_options}>
                            <div>نحوه ثبت سفارش</div>
                            <div>نحوه ارسال سفارش</div>
                            <div>شرایط بازگشت کالا</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.bottom_section}>
                تمامی حقوق برای روشن مارکت محفوظ است
            </div>
        </div>
    );
}
