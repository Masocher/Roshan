import styles from "../../styles/articles/Article.module.css";
import Header from "@/components/global/Header";
import BlackBackground from "@/components/global/BlacKBackground";
import MiniMenu from "@/components/global/MiniMenu";
import Footer from "@/components/global/Footer";
import { useState } from "react";
import Image from "next/image";
import img from "../../../public/images/slider-1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import img2 from "../../../public/images/1.webp";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Article() {
    let [categoriesStatus, setCategoriesStatus] = useState(false);

    const matches2 = useMediaQuery(1200);
    const matches3 = useMediaQuery(950);
    const matches4 = useMediaQuery(580);
    const matches5 = useMediaQuery(380);

    return (
        <div>
            <BlackBackground
                status={categoriesStatus}
                setStatus={setCategoriesStatus}
            />
            <MiniMenu
                status={categoriesStatus}
                setStatus={setCategoriesStatus}
            />
            <Header status={categoriesStatus} setStatus={setCategoriesStatus} />

            <div className={styles.container}>
                <div className={styles.right_section}>
                    <div className={styles.category_row}>
                        <Link
                            href={"/articles"}
                            className={styles.category_content}
                        >
                            مقالات
                            <span>
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </span>
                        </Link>

                        <div className={styles.category_main}>
                            آچار قفلی به چه درد میخورد ؟
                        </div>
                    </div>

                    <div className={styles.article_title}>
                        آچار قفلی به چه درد میخورد ؟
                    </div>

                    <div className={styles.article_assets}>
                        <div className={styles.article_asset}>
                            <span>
                                <FontAwesomeIcon icon={faClock} />
                            </span>
                            زمان مطالعه : 5 دقیقه
                        </div>

                        <div className={styles.article_asset}>
                            14 فروردین 1403
                        </div>
                    </div>

                    <Image
                        className={styles.article_cover}
                        src={img}
                        alt="کاور مقاله"
                    />

                    <div className={styles.article_body}>
                        <div className={styles.article_tit}>
                            <span></span>
                            مزایای آچار قفلی
                        </div>

                        <div className={styles.article_parag}>
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                            صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و
                            متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم
                            است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
                            متنوع با هدف بهبود ابزارهای کاربردی می باشد. لورم
                            ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                            و با استفاده از طراحان گرافیک است چاپگرها و متون
                            بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                            و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
                            متنوع با هدف بهبود ابزارهای کاربردی می باشد. لورم
                            ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                            و با استفاده از طراحان گرافیک است چاپگرها و متون
                            بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                            و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
                            متنوع با هدف بهبود ابزارهای کاربردی می باشد
                        </div>

                        <div className={styles.article_tit}>
                            <span></span>
                            معایب آچار قفلی
                        </div>

                        <div className={styles.article_list}>
                            <div className={styles.article_list_item}>
                                <span></span>
                                محکم بودن
                            </div>

                            <div className={styles.article_list_item}>
                                <span></span>
                                محکم بودن
                            </div>

                            <div className={styles.article_list_item}>
                                <span></span>
                                محکم بودن
                            </div>

                            <div className={styles.article_list_item}>
                                <span></span>
                                محکم بودن
                            </div>

                            <div className={styles.article_list_item}>
                                <span></span>
                                محکم بودن
                            </div>
                        </div>

                        <div className={styles.article_advice}>
                            آچار قفلی را باید با احتیاط استفاده کنید ‍!
                        </div>

                        <div className={styles.article_alert}>
                            آچار قفلی را باید با احتیاط استفاده کنید ‍!
                        </div>

                        <div className={styles.article_important_alert}>
                            آچار قفلی را باید با احتیاط استفاده کنید ‍!
                        </div>
                    </div>

                    <div className={styles.seen_num}>
                        <span>
                            <FontAwesomeIcon icon={faEye} />
                        </span>
                        55
                    </div>
                </div>

                <div className={styles.left_section}>
                    <div className={styles.products_slider_wrapper}>
                        <Swiper
                            className={styles.products_slider}
                            slidesPerView={
                                matches5
                                    ? 1
                                    : matches4
                                    ? 2
                                    : matches3
                                    ? 3
                                    : matches2
                                    ? 4
                                    : 1
                            }
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            loop={"true"}
                            modules={[Autoplay]}
                        >
                            <SwiperSlide className={styles.product}>
                                <div className={styles.product_inf}>
                                    <Image
                                        className={styles.product_image}
                                        src={img2}
                                        alt="عکس محصول"
                                    />

                                    <div className={styles.product_name}>
                                        هود آشپزخانه مدل سیمرغ
                                    </div>

                                    <div className={styles.product_price}>
                                        1,500,000
                                        <div className={styles.toman}>
                                            تومان
                                        </div>
                                    </div>

                                    <div className={styles.show_and_buy_btn}>
                                        مشاهده و خرید
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide className={styles.product}>
                                <div className={styles.product_inf}>
                                    <Image
                                        className={styles.product_image}
                                        src={img2}
                                        alt="عکس محصول"
                                    />

                                    <div className={styles.product_name}>
                                        هود آشپزخانه مدل سیمرغ
                                    </div>

                                    <div className={styles.product_price}>
                                        1,500,000
                                        <div className={styles.toman}>
                                            تومان
                                        </div>
                                    </div>

                                    <div className={styles.show_and_buy_btn}>
                                        مشاهده و خرید
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide className={styles.product}>
                                <div className={styles.product_inf}>
                                    <Image
                                        className={styles.product_image}
                                        src={img2}
                                        alt="عکس محصول"
                                    />

                                    <div className={styles.product_name}>
                                        هود آشپزخانه مدل سیمرغ
                                    </div>

                                    <div className={styles.product_price}>
                                        1,500,000
                                        <div className={styles.toman}>
                                            تومان
                                        </div>
                                    </div>

                                    <div className={styles.show_and_buy_btn}>
                                        مشاهده و خرید
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide className={styles.product}>
                                <div className={styles.product_inf}>
                                    <Image
                                        className={styles.product_image}
                                        src={img2}
                                        alt="عکس محصول"
                                    />

                                    <div className={styles.product_name}>
                                        هود آشپزخانه مدل سیمرغ
                                    </div>

                                    <div className={styles.product_price}>
                                        1,500,000
                                        <div className={styles.toman}>
                                            تومان
                                        </div>
                                    </div>

                                    <div className={styles.show_and_buy_btn}>
                                        مشاهده و خرید
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide className={styles.product}>
                                <div className={styles.product_inf}>
                                    <Image
                                        className={styles.product_image}
                                        src={img2}
                                        alt="عکس محصول"
                                    />

                                    <div className={styles.product_name}>
                                        هود آشپزخانه مدل سیمرغ
                                    </div>

                                    <div className={styles.product_price}>
                                        1,500,000
                                        <div className={styles.toman}>
                                            تومان
                                        </div>
                                    </div>

                                    <div className={styles.show_and_buy_btn}>
                                        مشاهده و خرید
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide className={styles.product}>
                                <div className={styles.product_inf}>
                                    <Image
                                        className={styles.product_image}
                                        src={img2}
                                        alt="عکس محصول"
                                    />

                                    <div className={styles.product_name}>
                                        هود آشپزخانه مدل سیمرغ
                                    </div>

                                    <div className={styles.product_price}>
                                        1,500,000
                                        <div className={styles.toman}>
                                            تومان
                                        </div>
                                    </div>

                                    <div className={styles.show_and_buy_btn}>
                                        مشاهده و خرید
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide className={styles.product}>
                                <div className={styles.product_inf}>
                                    <Image
                                        className={styles.product_image}
                                        src={img2}
                                        alt="عکس محصول"
                                    />

                                    <div className={styles.product_name}>
                                        هود آشپزخانه مدل سیمرغ
                                    </div>

                                    <div className={styles.product_price}>
                                        1,500,000
                                        <div className={styles.toman}>
                                            تومان
                                        </div>
                                    </div>

                                    <div className={styles.show_and_buy_btn}>
                                        مشاهده و خرید
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    <div className={styles.mini_articles}>
                        <div className={styles.mini_article}>
                            <Image
                                className={styles.mini_article_cover}
                                src={img}
                                alt="کاور مقاله"
                            />

                            <div className={styles.mini_article_information}>
                                <div className={styles.title}>
                                    آچار قفلی به چه درد میخورد ؟
                                </div>

                                <div className={styles.article_asset}>
                                    زمان مطالعه : 5 دقیقه
                                </div>
                            </div>
                        </div>

                        <div className={styles.mini_article}>
                            <Image
                                className={styles.mini_article_cover}
                                src={img}
                                alt="کاور مقاله"
                            />

                            <div className={styles.mini_article_information}>
                                <div className={styles.title}>
                                    آچار قفلی به چه درد میخورد ؟
                                </div>

                                <div className={styles.article_asset}>
                                    زمان مطالعه : 5 دقیقه
                                </div>
                            </div>
                        </div>

                        <div className={styles.mini_article}>
                            <Image
                                className={styles.mini_article_cover}
                                src={img}
                                alt="کاور مقاله"
                            />

                            <div className={styles.mini_article_information}>
                                <div className={styles.title}>
                                    آچار قفلی به چه درد میخورد ؟
                                </div>

                                <div className={styles.article_asset}>
                                    زمان مطالعه : 5 دقیقه
                                </div>
                            </div>
                        </div>

                        <div className={styles.mini_article}>
                            <Image
                                className={styles.mini_article_cover}
                                src={img}
                                alt="کاور مقاله"
                            />

                            <div className={styles.mini_article_information}>
                                <div className={styles.title}>
                                    آچار قفلی به چه درد میخورد ؟
                                </div>

                                <div className={styles.article_asset}>
                                    زمان مطالعه : 5 دقیقه
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
