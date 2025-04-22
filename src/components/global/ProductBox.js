import styles from "../../styles/global/ProductBox.module.css";
import Image from "next/image";
import Link from "next/link";

export default function ProductBox({
    name,
    price,
    finalPrice,
    image,
    slug,
    amazing,
    discount,
}) {
    return (
        <Link
            className={styles.product}
            onClick={() => localStorage.setItem("productSlug", slug)}
            href={`/product/${slug}`}
        >
            <div
                className={`${styles.amazing_box} ${
                    amazing ? styles.show : ""
                }`}
            >
                شگفت انگیز
            </div>

            <Image
                className={styles.product_image}
                src={image}
                alt="عکس محصول"
                width={100}
                height={100}
                quality={100}
            />

            <div className={styles.product_informations}>
                <div className={styles.product_name}>{name}</div>

                <div
                    className={`${styles.product_price} ${
                        discount === null ? "" : styles.show
                    }`}
                >
                    {price}
                    <div className={styles.toman}>تومان</div>
                </div>

                <div
                    className={`${styles.new_price} ${
                        discount === null ? "" : styles.show
                    }`}
                >
                    <div className={styles.content}>
                        {finalPrice}
                        <div className={styles.toman}>تومان</div>
                    </div>

                    <div
                        className={`${styles.off_percent} ${
                            discount === null ? styles.show : ""
                        }`}
                    >
                        {discount === null ? 0 : discount}%
                    </div>
                </div>
            </div>
        </Link>
    );
}
