import styles from "../../styles/home/BestSellers.module.css";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import ProductBox from "../global/ProductBox";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";

export default function BestSellers({ data }) {
  const matches1 = useMediaQuery(1500);
  const matches2 = useMediaQuery(1200);
  const matches3 = useMediaQuery(950);
  const matches4 = useMediaQuery(580);

  const [products, setProducts] = useState(data);

  return (
    <>
      {products.length > 0 ? (
        <div className={styles.container}>
          <div className={styles.title}>پر فروش ترین ها</div>

          <Swiper
            slidesPerView={
              matches4 ? 2 : matches3 ? 3 : matches2 ? 4 : matches1 ? 6 : 8
            }
            className={styles.slider}
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
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
