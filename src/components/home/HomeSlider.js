import styles from "../../styles/home/HomeSlider.module.css";
import Image from "next/image";
import slide_1 from "../../../public/images/slider-1.jpg";
import slide_2 from "../../../public/images/slider-2.jpg";
import slide_3 from "../../../public/images/slider-3.jpg";
import slide_4 from "../../../public/images/slider-4.jpg";
import slide_5 from "../../../public/images/slider-5.jpg";
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
            <div>بهترین های جوشکاری !</div>

            <div className={styles.show_btn}>
              مشاهده
              <span>
                <FontAwesomeIcon icon={faAngleLeft} />
              </span>
            </div>
          </div>

          <Image
            src={slide_1}
            alt="عکس پس زمینه"
            className={styles.top_image}
            priority
          />
        </SwiperSlide>

        <SwiperSlide className={styles.product}>
          <div className={styles.title_box}>
            <div>دنیای آچار</div>

            <div className={styles.show_btn}>
              مشاهده
              <span>
                <FontAwesomeIcon icon={faAngleLeft} />
              </span>
            </div>
          </div>

          <Image
            src={slide_2}
            alt="عکس پس زمینه"
            className={styles.top_image}
            priority
          />
        </SwiperSlide>

        <SwiperSlide className={styles.product}>
          <div className={styles.title_box}>
            <div>اوستای خودت باش !</div>

            <div className={styles.show_btn}>
              مشاهده
              <span>
                <FontAwesomeIcon icon={faAngleLeft} />
              </span>
            </div>
          </div>

          <Image
            src={slide_3}
            alt="عکس پس زمینه"
            className={styles.top_image}
            priority
          />
        </SwiperSlide>

        <SwiperSlide className={styles.product}>
          <div className={styles.title_box}>
            <div>ابزار های مکانیکی</div>

            <div className={styles.show_btn}>
              مشاهده
              <span>
                <FontAwesomeIcon icon={faAngleLeft} />
              </span>
            </div>
          </div>

          <Image
            src={slide_4}
            alt="عکس پس زمینه"
            className={styles.top_image}
            priority
          />
        </SwiperSlide>

        <SwiperSlide className={styles.product}>
          <div className={styles.title_box}>
            <div>هرچی لازم داری اینجاست</div>

            <div className={styles.show_btn}>
              مشاهده
              <span>
                <FontAwesomeIcon icon={faAngleLeft} />
              </span>
            </div>
          </div>

          <Image
            src={slide_5}
            alt="عکس پس زمینه"
            className={styles.top_image}
            priority
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
