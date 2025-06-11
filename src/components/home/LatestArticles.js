import styles from "../../styles/home/LatestArticles.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import img_1 from "../../../public/images/slider-1.jpg";
import img_2 from "../../../public/images/slider-2.jpg";
import img_3 from "../../../public/images/slider-3.jpg";
import img_4 from "../../../public/images/slider-4.jpg";
import img_5 from "../../../public/images/slider-5.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Link from "next/link";

export default function LatestArticles() {
    const matches3 = useMediaQuery(950);
    const matches4 = useMediaQuery(580);

    return (
        <div className={styles.container}>
            <div className={styles.main_title}>
                جدیدترین مقالات
                <Link href={"/articles"} className={styles.show_all_btn}>
                    مشاهده همه
                    <span>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </span>
                </Link>
            </div>

            <Swiper
                className={styles.articles}
                slidesPerView={matches4 ? 1 : matches3 ? 2 : 3}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                loop={"true"}
                modules={[Autoplay]}
            >
                <SwiperSlide className={styles.article}>
                    <Link
                        href={`/articles/0`}
                        className={styles.article_content}
                    >
                        <Image
                            className={styles.article_cover}
                            src={img_1}
                            alt="عکس مقاله"
                            width={100}
                            height={100}
                            quality={100}
                            priority
                            unoptimized
                        />

                        <div className={styles.article_information}>
                            <div className={styles.article_title}>
                                لورم ایپسوم یک متن ساختگی است
                            </div>

                            <div className={styles.article_decription}>
                                لورم ایپسوم یک متن ساختگی است لورم ایپسوم یک متن
                                ساختگی است لورم ایپسوم یک متن ساختگی است لورم
                                ایپسوم یک متن ساختگی است لورم ایپسوم یک متن
                                ساختگی است لورم ایپسوم یک متن ساختگی است لورم
                                ایپسوم یک متن ساختگی است
                            </div>

                            <div className={styles.article_date}>
                                <span>
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                </span>
                                13 فروردین 1404
                            </div>
                        </div>
                    </Link>
                </SwiperSlide>

                <SwiperSlide className={styles.article}>
                    <Link
                        href={`/articles/1`}
                        className={styles.article_content}
                    >
                        <Image
                            className={styles.article_cover}
                            src={img_2}
                            alt="عکس مقاله"
                            width={100}
                            height={100}
                            quality={100}
                            priority
                            unoptimized
                        />

                        <div className={styles.article_information}>
                            <div className={styles.article_title}>
                                لورم ایپسوم یک متن ساختگی است
                            </div>

                            <div className={styles.article_decription}>
                                لورم ایپسوم یک متن ساختگی است لورم ایپسوم یک متن
                                ساختگی است لورم ایپسوم یک متن ساختگی است لورم
                                ایپسوم یک متن ساختگی است لورم ایپسوم یک متن
                                ساختگی است لورم ایپسوم یک متن ساختگی است لورم
                                ایپسوم یک متن ساختگی است
                            </div>

                            <div className={styles.article_date}>
                                <span>
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                </span>
                                13 فروردین 1404
                            </div>
                        </div>
                    </Link>
                </SwiperSlide>

                <SwiperSlide className={styles.article}>
                    <Link
                        href={`/articles/2`}
                        className={styles.article_content}
                    >
                        <Image
                            className={styles.article_cover}
                            src={img_3}
                            alt="عکس مقاله"
                            width={100}
                            height={100}
                            quality={100}
                            priority
                            unoptimized
                        />

                        <div className={styles.article_information}>
                            <div className={styles.article_title}>
                                لورم ایپسوم یک متن ساختگی است
                            </div>

                            <div className={styles.article_decription}>
                                لورم ایپسوم یک متن ساختگی است لورم ایپسوم یک متن
                                ساختگی است لورم ایپسوم یک متن ساختگی است لورم
                                ایپسوم یک متن ساختگی است لورم ایپسوم یک متن
                                ساختگی است لورم ایپسوم یک متن ساختگی است لورم
                                ایپسوم یک متن ساختگی است
                            </div>

                            <div className={styles.article_date}>
                                <span>
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                </span>
                                13 فروردین 1404
                            </div>
                        </div>
                    </Link>
                </SwiperSlide>

                <SwiperSlide className={styles.article}>
                    <Link
                        href={`/articles/3`}
                        className={styles.article_content}
                    >
                        <Image
                            className={styles.article_cover}
                            src={img_4}
                            alt="عکس مقاله"
                            width={100}
                            height={100}
                            quality={100}
                            priority
                            unoptimized
                        />

                        <div className={styles.article_information}>
                            <div className={styles.article_title}>
                                لورم ایپسوم یک متن ساختگی است
                            </div>

                            <div className={styles.article_decription}>
                                لورم ایپسوم یک متن ساختگی است لورم ایپسوم یک متن
                                ساختگی است لورم ایپسوم یک متن ساختگی است لورم
                                ایپسوم یک متن ساختگی است لورم ایپسوم یک متن
                                ساختگی است لورم ایپسوم یک متن ساختگی است لورم
                                ایپسوم یک متن ساختگی است
                            </div>

                            <div className={styles.article_date}>
                                <span>
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                </span>
                                13 فروردین 1404
                            </div>
                        </div>
                    </Link>
                </SwiperSlide>

                <SwiperSlide className={styles.article}>
                    <Link
                        href={`/articles/4`}
                        className={styles.article_content}
                    >
                        <Image
                            className={styles.article_cover}
                            src={img_5}
                            alt="عکس مقاله"
                            width={100}
                            height={100}
                            quality={100}
                            priority
                            unoptimized
                        />

                        <div className={styles.article_information}>
                            <div className={styles.article_title}>
                                لورم ایپسوم یک متن ساختگی است
                            </div>

                            <div className={styles.article_decription}>
                                لورم ایپسوم یک متن ساختگی است لورم ایپسوم یک متن
                                ساختگی است لورم ایپسوم یک متن ساختگی است لورم
                                ایپسوم یک متن ساختگی است لورم ایپسوم یک متن
                                ساختگی است لورم ایپسوم یک متن ساختگی است لورم
                                ایپسوم یک متن ساختگی است
                            </div>

                            <div className={styles.article_date}>
                                <span>
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                </span>
                                13 فروردین 1404
                            </div>
                        </div>
                    </Link>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
