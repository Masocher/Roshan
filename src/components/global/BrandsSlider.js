import styles from "../../styles/global/BrandsSlider.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import img2 from "../../../public/images/2.webp";
import img3 from "../../../public/images/3.webp";
import img4 from "../../../public/images/4.webp";
import img5 from "../../../public/images/5.webp";
import img6 from "../../../public/images/6.webp";
import img7 from "../../../public/images/7.webp";
import img8 from "../../../public/images/8.webp";
import img9 from "../../../public/images/9.webp";
import img10 from "../../../public/images/10.webp";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function BrandsSlider() {
  const matches2 = useMediaQuery(1200);
  const matches3 = useMediaQuery(950);
  const matches4 = useMediaQuery(580);

  return (
    <div className={styles.container}>
      <div className={styles.title_box}>بــرند ها</div>

      <Swiper
        className={styles.brands}
        slidesPerView={matches4 ? 3 : matches3 ? 5 : matches2 ? 6 : 8}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={"true"}
        modules={[Autoplay]}
      >
        <SwiperSlide className={styles.product}>
          <Image src={img2} alt="عکس برند" className={styles.brand_img} />
        </SwiperSlide>

        <SwiperSlide className={styles.product}>
          <Image src={img3} alt="عکس برند" className={styles.brand_img} />
        </SwiperSlide>

        <SwiperSlide className={styles.product}>
          <Image src={img4} alt="عکس برند" className={styles.brand_img} />
        </SwiperSlide>

        <SwiperSlide className={styles.product}>
          <Image src={img5} alt="عکس برند" className={styles.brand_img} />
        </SwiperSlide>

        <SwiperSlide className={styles.product}>
          <Image src={img6} alt="عکس برند" className={styles.brand_img} />
        </SwiperSlide>

        <SwiperSlide className={styles.product}>
          <Image src={img7} alt="عکس برند" className={styles.brand_img} />
        </SwiperSlide>

        <SwiperSlide className={styles.product}>
          <Image src={img8} alt="عکس برند" className={styles.brand_img} />
        </SwiperSlide>

        <SwiperSlide className={styles.product}>
          <Image src={img9} alt="عکس برند" className={styles.brand_img} />
        </SwiperSlide>

        <SwiperSlide className={styles.product}>
          <Image src={img10} alt="عکس برند" className={styles.brand_img} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
