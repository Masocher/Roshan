import styles from "../../styles/home/HomeSlider.module.css";
import Image from "next/image";
import img from "../../../public/images/11.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export default function HomeSlider() {
    return (
        <div className={styles.products_container}>
            <Swiper
                className={styles.products}
                slidesPerView={1}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                loop={"true"}
                modules={[Autoplay]}
            >
                <SwiperSlide className={styles.product}>
                    <div className={styles.title_box}>
                        <div>با کیفیت ترین ابزار ها</div>

                        <div className={styles.show_btn}>
                            مشاهده
                            <span>
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </span>
                        </div>
                    </div>

                    <Image
                        src={img}
                        alt="عکس پس زمینه"
                        className={styles.top_image}
                        priority
                    />
                </SwiperSlide>

                <SwiperSlide className={styles.product}>
                    <div className={styles.title_box}>
                        <div>محبوب ترین ابزار ها</div>

                        <div className={styles.show_btn}>
                            مشاهده
                            <span>
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </span>
                        </div>
                    </div>

                    <Image
                        src={img}
                        alt="عکس پس زمینه"
                        className={styles.top_image}
                        priority
                    />
                </SwiperSlide>

                <SwiperSlide className={styles.product}>
                    <div className={styles.title_box}>
                        <div>جدید ترین ابزار ها</div>

                        <div className={styles.show_btn}>
                            مشاهده
                            <span>
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </span>
                        </div>
                    </div>

                    <Image
                        src={img}
                        alt="عکس پس زمینه"
                        className={styles.top_image}
                        priority
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
