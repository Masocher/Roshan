import styles from "../../styles/home/AmazingOffer.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductBox from "../global/ProductBox";
import img from "../../../public/images/1.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function AmazingOffer() {
    const matches1 = useMediaQuery(1500);
    const matches2 = useMediaQuery(1200);
    const matches3 = useMediaQuery(950);
    const matches4 = useMediaQuery(580);
    const matches5 = useMediaQuery(380);

    return (
        <div className={styles.container}>
            <div className={styles.right_section}>
                <div className={styles.title_box}>
                    <div>پیشنهاد</div>
                    <div>شــــگفـت</div>
                    <div>انـــــگـــــــیز</div>
                </div>

                <div className={styles.timer}>
                    <div className={styles.timer_box}>10</div>

                    <span>:</span>

                    <div className={styles.timer_box}>30</div>

                    <span>:</span>

                    <div className={styles.timer_box}>06</div>
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

                    <SwiperSlide
                        className={`${styles.product} ${styles.last_product}`}
                    >
                        <div>
                            <span>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </span>
                            مشاهده همه
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}
