import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/global/ProductBox.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
    faAward,
    faPercent,
    faSackDollar,
} from "@fortawesome/free-solid-svg-icons";

export default function ProductBox({ name, price, image, id }) {
    const [amazing, setAmazing] = useState(false);
    const [offer, setOffer] = useState(true);

    return (
        <Link className={styles.product} href={`/product/${id}`}>
            <div className={styles.amazing_box}>شگفت انگیز</div>

            <Image
                className={styles.product_image}
                src={image}
                alt="عکس محصول"
            />

            <div className={styles.product_informations}>
                <div className={styles.product_name}>{name}</div>

                <div
                    className={`${styles.product_price} ${
                        offer ? styles.show : ""
                    }`}
                >
                    {price}
                    <div className={styles.toman}>تومان</div>
                </div>

                <div
                    className={`${styles.new_price} ${
                        offer ? styles.show : ""
                    }`}
                >
                    <div className={styles.content}>
                        {price}
                        <div className={styles.toman}>تومان</div>
                    </div>

                    <div className={styles.off_percent}>
                        <span>
                            <FontAwesomeIcon icon={faPercent} />
                        </span>
                        32
                    </div>
                </div>
            </div>
        </Link>
    );
}
