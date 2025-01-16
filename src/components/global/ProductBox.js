import styles from "../../styles/global/ProductBox.module.css";
import Image from "next/image";
import Link from "next/link";

export default function ProductBox({ name, price, image, id }) {
    return (
        <Link className={styles.product} href={`/product/${id}`}>
            <Image
                className={styles.product_image}
                src={image}
                alt="عکس محصول"
            />

            <div className={styles.product_informations}>
                <div className={styles.product_name}>{name}</div>

                <div className={styles.product_price}>
                    {price}
                    <div className={styles.toman}>تومان</div>
                </div>
            </div>
        </Link>
    );
}
