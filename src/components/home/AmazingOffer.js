import styles from "../../styles/home/AmazingOffer.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductBox from "../global/ProductBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";
import Link from "next/link";

export default function AmazingOffer({ data }) {
  const matches1 = useMediaQuery(1500);
  const matches2 = useMediaQuery(1200);
  const matches3 = useMediaQuery(950);
  const matches4 = useMediaQuery(580);
  const matches5 = useMediaQuery(380);

  const [products, setProducts] = useState(data);

  return (
    <>
      {products.length > 0 ? (
        <div className={styles.container}>
          <div className={styles.right_section}>
            <div className={styles.title_box}>
              <div>پیشنهاد</div>
              <div>شــــگفـت</div>
              <div>انـــــگـــــــیز</div>
            </div>
          </div>

          <div className={styles.left_section}>
            <Swiper
              className={styles.products}
              slidesPerView={
                matches5
                  ? 2
                  : matches4
                  ? 2
                  : matches3
                  ? 4
                  : matches2
                  ? 5
                  : matches1
                  ? 6
                  : 7
              }
              spaceBetween={2}
            >
              {products.map((product) => (
                <SwiperSlide className={styles.product} key={product.id}>
                  <ProductBox
                    name={product.name}
                    price={product.price}
                    finalPrice={product.final_price}
                    image={product.image}
                    slug={product.slug}
                    amazing={product.is_amazing}
                    discount={product.discount}
                    amazingBox={true}
                  />
                </SwiperSlide>
              ))}

              <SwiperSlide
                className={`${styles.product} ${styles.last_product}`}
              >
                <Link href={"/amazings"} style={{ textDecoration: "none" }}>
                  <div>
                    <span>
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </span>
                    مشاهده همه
                  </div>
                </Link>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
