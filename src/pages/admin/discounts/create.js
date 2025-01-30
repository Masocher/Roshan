import styles from "../../../styles/admin-options/EditDiscount.module.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faClose } from "@fortawesome/free-solid-svg-icons";

export default function CreateDiscount() {
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
                افزودن تخفیف
            </div>

            <div className={styles.code}>
                <div className={styles.first_section}>
                    <div className={styles.inputs}>
                        <input type="text" placeholder="مقدار تخفیف" />
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

                <div className={styles.edit_btn}>افزودن تخفیف</div>
            </div>
        </div>
    );
}
