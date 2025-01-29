import styles from "../../styles/admin/Offers.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Offers() {
    return (
        <div className={styles.container}>
            <div className={styles.top_box}>
                <Link href={"/admin/create-offer"} className={styles.add_btn}>
                    <span>
                        <FontAwesomeIcon icon={faPlus} />
                    </span>
                    آفر جدید
                </Link>
            </div>

            <div className={styles.offers}>
                <div className={styles.offers_top}>
                    <div className={styles.offers_title}>شماره</div>
                    <div className={styles.offers_title}>محصولات</div>
                    <div className={styles.offers_title}>حداقل تعداد</div>
                    <div className={styles.offers_title}>نوع تخفیف</div>
                    <div className={styles.offers_title}>مقدار تخفیف</div>
                </div>

                <Link className={styles.offer} href={`/admin/edit-offer/${0}`}>
                    <div className={styles.offer_id}>1</div>

                    <div className={styles.offer_product}>4</div>

                    <div className={styles.offer_num}>20</div>

                    <div className={styles.offer_status}>درصدی</div>

                    <div className={styles.offer_value}>10%</div>
                </Link>

                <Link className={styles.offer} href={`/admin/edit-offer/${0}`}>
                    <div className={styles.offer_id}>1</div>

                    <div className={styles.offer_product}>4</div>

                    <div className={styles.offer_num}>20</div>

                    <div className={styles.offer_status}>درصدی</div>

                    <div className={styles.offer_value}>10%</div>
                </Link>

                <Link className={styles.offer} href={`/admin/edit-offer/${0}`}>
                    <div className={styles.offer_id}>1</div>

                    <div className={styles.offer_product}>4</div>

                    <div className={styles.offer_num}>20</div>

                    <div className={styles.offer_status}>درصدی</div>

                    <div className={styles.offer_value}>10%</div>
                </Link>

                <Link className={styles.offer} href={`/admin/edit-offer/${0}`}>
                    <div className={styles.offer_id}>1</div>

                    <div className={styles.offer_product}>4</div>

                    <div className={styles.offer_num}>20</div>

                    <div className={styles.offer_status}>درصدی</div>

                    <div className={styles.offer_value}>10%</div>
                </Link>
            </div>
        </div>
    );
}
