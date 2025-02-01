import styles from "../../styles/home/BestSellers.module.css";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import img from "../../../public/images/1.webp";
import ProductBox from "../global/ProductBox";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function BestSellers() {
    const matches1 = useMediaQuery(1500);
    const matches2 = useMediaQuery(1200);
    const matches3 = useMediaQuery(950);
    const matches4 = useMediaQuery(580);

    return (
        <div className={styles.container}>
            <div className={styles.title}>پر فروش ترین ها</div>

            <Swiper
                slidesPerView={
                    matches4
                        ? 2
                        : matches3
                        ? 3
                        : matches2
                        ? 4
                        : matches1
                        ? 6
                        : 8
                }
                className={styles.slider}
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
