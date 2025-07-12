import { useMediaQuery } from "@/hooks/useMediaQuery";
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
  amazingBox,
}) {
  const matches4 = useMediaQuery(580);

  return (
    <Link
      className={`${styles.product} ${amazingBox ? styles.amazing : ""}`}
      onClick={() => localStorage.setItem("productSlug", slug)}
      href={`/product/${slug}`}
    >
      <div className={`${styles.amazing_box} ${amazing ? styles.show : ""}`}>
        شگفت انگیز
      </div>

      <Image
        className={styles.product_image}
        src={image}
        alt="عکس محصول"
        width={800}
        height={800}
        quality={100}
        priority
      />

      <div className={styles.product_informations}>
        <div className={styles.product_name}>{name}</div>

        {amazingBox ? (
          <div className={styles.new_price_box}>
            <div
              className={`${styles.product_price} ${
                discount === null ? "" : styles.show
              }`}
            >
              {price}
              <div className={styles.toman}>تومان</div>
            </div>

            {matches4 ? (
              <div
                className={`${styles.off_percent} ${
                  discount === null ? styles.show : ""
                }`}
              >
                {discount === null ? 0 : discount}%
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div
            className={`${styles.product_price} ${
              discount === null ? "" : styles.show
            }`}
          >
            {price}
            <div className={styles.toman}>تومان</div>
          </div>
        )}

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
            className={`${styles.off_percent} ${styles.off_percent_2} ${
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
