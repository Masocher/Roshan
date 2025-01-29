import styles from "../../styles/admin-options/EditCode.module.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faClose } from "@fortawesome/free-solid-svg-icons";

export default function CreateCode() {
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
                افزودن کد تخفیف
            </div>

            <div className={styles.code}>
                <div className={styles.first_section}>
                    <input type="text" placeholder="کد را وارد کنید" />
                    <input type="text" placeholder="تاریخ شروع" />
                    <input type="text" placeholder="تاریخ اتمام" />
                </div>

                <div className={styles.second_section}>
                    <div className={styles.feature_box}>
                        <div className={styles.title}>اعمال روی همه</div>

                        <div className={styles.inventory_button}>
                            <div>
                                <span></span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.feature_box}>
                        <div className={styles.title}>تخفیف تومانی</div>

                        <div className={styles.inventory_button}>
                            <div>
                                <span></span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.feature_box}>
                        <div className={styles.title}>تخفیف درصدی</div>

                        <div className={styles.inventory_button}>
                            <div>
                                <span></span>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`${styles.feature_box} ${styles.main_feature}`}
                    >
                        <div className={styles.title}>مقدار تخفیف</div>

                        <input
                            type="text"
                            placeholder="مقدار تخفیف را وارد کنید"
                        />
                    </div>
                </div>

                <div className={styles.third_section}>
                    <div className={styles.title}>انتخاب دسته بندی ها</div>

                    <div className={styles.select_category}>
                        <input placeholder="نام دسته بندی" type="text" />

                        <div className={styles.submit_btn}>ثبت</div>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.category}>
                            <span>
                                <FontAwesomeIcon icon={faClose} />
                            </span>
                            ابزار خانگی
                        </div>
                    </div>
                </div>

                <div className={styles.third_section}>
                    <div className={styles.title}>انتخاب محصولات</div>

                    <div className={styles.select_category}>
                        <input placeholder="نام محصول" type="text" />

                        <div className={styles.submit_btn}>ثبت</div>
                    </div>

                    <div className={styles.products}>
                        <div className={styles.product}>
                            <span>
                                <FontAwesomeIcon icon={faClose} />
                            </span>
                            هود آشپزی مدل سیمرغ
                        </div>
                    </div>
                </div>

                <div className={styles.edit_btn}>افزودن کد تخفیف</div>
            </div>
        </div>
    );
}
