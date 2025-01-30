import styles from "../../styles/admin/Discounts.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Discounts() {
    return (
        <div className={styles.container}>
            <div className={styles.top_box}>
                <Link href={"/admin/create-offer"} className={styles.add_btn}>
                    <span>
                        <FontAwesomeIcon icon={faPlus} />
                    </span>
                    تخفیف جدید
                </Link>
            </div>

            <div className={styles.discounts}>
                <div className={styles.discounts_top}>
                    <div className={styles.discounts_title}>شماره</div>
                    <div className={styles.discounts_title}>وضعیت</div>
                    <div className={styles.discounts_title}>تعداد محصولات</div>
                    <div className={styles.discounts_title}>نوع تخفیف</div>
                    <div className={styles.discounts_title}>مقدار تخفیف</div>
                </div>

                <Link
                    className={styles.discount}
                    href={`/admin/edit-discount/${0}`}
                >
                    <div className={styles.discount_id}>1</div>

                    <div className={styles.discount_active}>فعال</div>

                    <div className={styles.discount_num}>20</div>

                    <div className={styles.discount_status}>درصدی</div>

                    <div className={styles.discount_value}>10%</div>
                </Link>

                <Link
                    className={styles.discount}
                    href={`/admin/edit-discount/${0}`}
                >
                    <div className={styles.discount_id}>1</div>

                    <div className={styles.discount_active}>فعال</div>

                    <div className={styles.discount_num}>20</div>

                    <div className={styles.discount_status}>درصدی</div>

                    <div className={styles.discount_value}>10%</div>
                </Link>

                <Link
                    className={styles.discount}
                    href={`/admin/edit-discount/${0}`}
                >
                    <div className={styles.discount_id}>1</div>

                    <div className={styles.discount_active}>فعال</div>

                    <div className={styles.discount_num}>20</div>

                    <div className={styles.discount_status}>درصدی</div>

                    <div className={styles.discount_value}>10%</div>
                </Link>

                <Link
                    className={styles.discount}
                    href={`/admin/edit-discount/${0}`}
                >
                    <div className={styles.discount_id}>1</div>

                    <div className={styles.discount_active}>فعال</div>

                    <div className={styles.discount_num}>20</div>

                    <div className={styles.discount_status}>درصدی</div>

                    <div className={styles.discount_value}>10%</div>
                </Link>
            </div>
        </div>
    );
}
