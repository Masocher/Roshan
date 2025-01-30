import styles from "../../styles/admin/Codes.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Codes() {
    return (
        <div className={styles.container}>
            <div className={styles.top_box}>
                <Link href={"/admin/codes/create"} className={styles.add_btn}>
                    <span>
                        <FontAwesomeIcon icon={faPlus} />
                    </span>
                    کد تخفیف جدید
                </Link>
            </div>

            <div className={styles.offers}>
                <div className={styles.offers_top}>
                    <div className={styles.offers_title}>شماره</div>
                    <div className={styles.offers_title}>فعال تا</div>
                    <div className={styles.offers_title}>کد تخفیف</div>
                    <div className={styles.offers_title}>مقدار</div>
                    <div className={styles.hidden_title}></div>
                </div>

                <Link className={styles.offer} href={`/admin/codes/${0}`}>
                    <div className={styles.offer_id}>1</div>

                    <div className={styles.offer_date}>1403/1/14</div>

                    <div className={styles.offer_code}>yalda00</div>

                    <div className={styles.offer_value}>500 هزارتومان</div>
                </Link>

                <Link className={styles.offer} href={`/admin/codes/${0}`}>
                    <div className={styles.offer_id}>1</div>

                    <div className={styles.offer_date}>1403/1/14</div>

                    <div className={styles.offer_code}>yalda00</div>

                    <div className={styles.offer_value}>500 هزارتومان</div>
                </Link>

                <Link className={styles.offer} href={`/admin/codes/${0}`}>
                    <div className={styles.offer_id}>1</div>

                    <div className={styles.offer_date}>1403/1/14</div>

                    <div className={styles.offer_code}>yalda00</div>

                    <div className={styles.offer_value}>500 هزارتومان</div>
                </Link>

                <Link className={styles.offer} href={`/admin/codes/${0}`}>
                    <div className={styles.offer_id}>1</div>

                    <div className={styles.offer_date}>1403/1/14</div>

                    <div className={styles.offer_code}>yalda00</div>

                    <div className={styles.offer_value}>500 هزارتومان</div>
                </Link>

                <Link className={styles.offer} href={`/admin/codes/${0}`}>
                    <div className={styles.offer_id}>1</div>

                    <div className={styles.offer_date}>1403/1/14</div>

                    <div className={styles.offer_code}>yalda00</div>

                    <div className={styles.offer_value}>500 هزارتومان</div>
                </Link>

                <Link className={styles.offer} href={`/admin/codes/${0}`}>
                    <div className={styles.offer_id}>1</div>

                    <div className={styles.offer_date}>1403/1/14</div>

                    <div className={styles.offer_code}>yalda00</div>

                    <div className={styles.offer_value}>500 هزارتومان</div>
                </Link>

                <Link className={styles.offer} href={`/admin/codes/${0}`}>
                    <div className={styles.offer_id}>1</div>

                    <div className={styles.offer_date}>1403/1/14</div>

                    <div className={styles.offer_code}>yalda00</div>

                    <div className={styles.offer_value}>500 هزارتومان</div>
                </Link>

                <Link className={styles.offer} href={`/admin/codes/${0}`}>
                    <div className={styles.offer_id}>1</div>

                    <div className={styles.offer_date}>1403/1/14</div>

                    <div className={styles.offer_code}>yalda00</div>

                    <div className={styles.offer_value}>500 هزارتومان</div>
                </Link>

                <Link className={styles.offer} href={`/admin/codes/${0}`}>
                    <div className={styles.offer_id}>1</div>

                    <div className={styles.offer_date}>1403/1/14</div>

                    <div className={styles.offer_code}>yalda00</div>

                    <div className={styles.offer_value}>500 هزارتومان</div>
                </Link>

                <Link className={styles.offer} href={`/admin/codes/${0}`}>
                    <div className={styles.offer_id}>1</div>

                    <div className={styles.offer_date}>1403/1/14</div>

                    <div className={styles.offer_code}>yalda00</div>

                    <div className={styles.offer_value}>500 هزارتومان</div>
                </Link>

                <Link className={styles.offer} href={`/admin/codes/${0}`}>
                    <div className={styles.offer_id}>1</div>

                    <div className={styles.offer_date}>1403/1/14</div>

                    <div className={styles.offer_code}>yalda00</div>

                    <div className={styles.offer_value}>500 هزارتومان</div>
                </Link>

                <Link className={styles.offer} href={`/admin/codes/${0}`}>
                    <div className={styles.offer_id}>1</div>

                    <div className={styles.offer_date}>1403/1/14</div>

                    <div className={styles.offer_code}>yalda00</div>

                    <div className={styles.offer_value}>500 هزارتومان</div>
                </Link>
            </div>
        </div>
    );
}
