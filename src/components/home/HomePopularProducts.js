import styles from "../../styles/home/HomePopularProducts.module.css";
import ProductBox from "../global/ProductBox";
import img from "../../../public/images/1.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function HomePopularProducts() {
    const matches3 = useMediaQuery(950);
    const matches4 = useMediaQuery(580);
    const matches5 = useMediaQuery(380);

    return (
        <div className={styles.products_container}>
            <div className={styles.title_box}>محبوب ترین ابزار ها</div>

            <Swiper
                className={styles.products}
                slidesPerView={matches5 ? 2 : matches4 ? 3 : matches3 ? 4 : 6}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                loop={"true"}
                modules={[Autoplay]}
            >
                <SwiperSlide className={styles.product}>
                    <ProductBox
                        image={img}
                        name={"دستگاه جوش آذین"}
                        price={"1,500,00"}
                    />
                </SwiperSlide>

                <SwiperSlide className={styles.product}>
                    <ProductBox
                        image={img}
                        name={"دستگاه جوش آذین"}
                        price={"1,500,00"}
                    />
                </SwiperSlide>

                <SwiperSlide className={styles.product}>
                    <ProductBox
                        image={img}
                        name={"دستگاه جوش آذین"}
                        price={"1,500,00"}
                    />
                </SwiperSlide>

                <SwiperSlide className={styles.product}>
                    <ProductBox
                        image={img}
                        name={"دستگاه جوش آذین"}
                        price={"1,500,00"}
                    />
                </SwiperSlide>

                <SwiperSlide className={styles.product}>
                    <ProductBox
                        image={img}
                        name={"دستگاه جوش آذین"}
                        price={"1,500,00"}
                    />
                </SwiperSlide>

                <SwiperSlide className={styles.product}>
                    <ProductBox
                        image={img}
                        name={"دستگاه جوش آذین"}
                        price={"1,500,00"}
                    />
                </SwiperSlide>

                <SwiperSlide className={styles.product}>
                    <ProductBox
                        image={img}
                        name={"دستگاه جوش آذین"}
                        price={"1,500,00"}
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
