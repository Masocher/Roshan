import styles from "../../styles/product/ProductSinglePage.module.css";
import Header from "@/components/global/Header";
import BlackBackground from "@/components/global/BlacKBackground";
import MiniMenu from "@/components/global/MiniMenu";
import Footer from "@/components/global/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faEye,
    faShoppingBasket,
    faStar,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import img from "../../../public/images/1.webp";
import Comment from "@/components/global/Comment";
import LeaveComment from "@/components/product/LeaveComment";
import { useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import ProductBox from "@/components/global/ProductBox";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function ProductSinglePage() {
    let [categoriesStatus, setCategoriesStatus] = useState(false);
    const [commentFormStatus, setCommentFormStatus] = useState(false);

    const matches1 = useMediaQuery(1500);
    const matches2 = useMediaQuery(1200);
    const matches3 = useMediaQuery(950);
    const matches4 = useMediaQuery(580);

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
                <div className={styles.top_section}>
                    <div className={styles.right_section}>
                        <Image
                            className={styles.product_image}
                            src={img}
                            alt="عکس محصول"
                        />
                    </div>

                    <div className={styles.center_section}>
                        <div className={styles.product_category}>
                            <span>
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </span>
                            وسایل آشپزخانه
                        </div>

                        <div className={styles.product_name}>
                            هود آشپزخانه مدل سیمرغ
                        </div>

                        <div className={styles.about}>
                            <div className={styles.features_title}>
                                معرفی محصول
                            </div>

                            <div className={styles.about_product}>
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                                صنعت چاپ و با استفاده از طراحان گرافیک است
                                چاپگرها و متون بلکه روزنامه و مجله در ستون و
                                سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی
                                مورد نیاز و کاربردهای متنوع با هدف بهبود
                                ابزارهای کاربردی می باشد کتابهای زیادی در شصت و
                                سه درصد گذشته حال و آینده شناخت فراوان جامعه و
                                متخصصان را می طلبد
                            </div>
                        </div>

                        <div className={styles.features}>
                            <div className={styles.features_title}>
                                ویژگی ها
                            </div>

                            <div className={styles.feature_box}>
                                <div className={styles.feature_title}>
                                    جنس محصول
                                </div>

                                <div className={styles.feature_about}>
                                    تمام فلزی
                                </div>
                            </div>

                            <div className={styles.feature_box}>
                                <div className={styles.feature_title}>
                                    جنس محصول
                                </div>

                                <div className={styles.feature_about}>
                                    تمام فلزی
                                </div>
                            </div>

                            <div className={styles.feature_box}>
                                <div className={styles.feature_title}>
                                    جنس محصول
                                </div>

                                <div className={styles.feature_about}>
                                    تمام فلزی
                                </div>
                            </div>

                            <div className={styles.feature_box}>
                                <div className={styles.feature_title}>
                                    جنس محصول
                                </div>

                                <div className={styles.feature_about}>
                                    تمام فلزی
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.left_section}>
                    <div className={styles.product_score}>
                        <div className={styles.rate_range}>
                            <div>4.5</div>
                            از
                            <span>5</span>
                        </div>

                        <div className={styles.rated_stars}>
                            <div>
                                <span>
                                    <FontAwesomeIcon icon={faStar} />
                                </span>
                                <span>
                                    <FontAwesomeIcon icon={faStar} />
                                </span>
                                <span>
                                    <FontAwesomeIcon icon={faStar} />
                                </span>
                                <span>
                                    <FontAwesomeIcon icon={faStar} />
                                </span>
                                <span>
                                    <FontAwesomeIcon icon={faStar} />
                                </span>
                            </div>

                            <span className={styles.total_rate}>
                                از مجموع 2 امتیاز
                            </span>
                        </div>
                    </div>

                    <div className={styles.pricing}>
                        <div className={styles.product_price}>
                            1,500,00
                            <div className={styles.toman}>تومان</div>
                        </div>

                        <dvi className={styles.pricing_options}>
                            <div className={styles.add_to_basket_btn}>
                                <span>
                                    <FontAwesomeIcon icon={faShoppingBasket} />
                                </span>
                                افزودن به سبد خرید
                            </div>

                            <div className={styles.product_views}>
                                <span>
                                    <FontAwesomeIcon icon={faEye} />
                                </span>
                                590
                            </div>
                        </dvi>
                    </div>

                    <div className={styles.more_off}>
                        با خرید هر 5 عدد از این محصول تخفیف بیشتر دریافت کنید
                    </div>
                </div>

                <div className={styles.similar_products}>
                    <div className={styles.title}>کالا های مشابه</div>

                    <Swiper
                        className={styles.products}
                        slidesPerView={
                            matches4
                                ? 2
                                : matches3
                                ? 3
                                : matches2
                                ? 4
                                : matches1
                                ? 5
                                : 6
                        }
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

                <div className={styles.bottom_section}>
                    <div className={styles.right_section}>
                        <div className={styles.comment_add}>
                            <div className={styles.submit_comment}>
                                <div className={styles.title}>
                                    درباره این محصول دیدگاه ثبت کنید
                                </div>

                                <div
                                    className={styles.submit}
                                    onClick={() => setCommentFormStatus(true)}
                                >
                                    ثبت دیدگاه
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.bottom_left_section}>
                        <div className={styles.title}>
                            امتیاز و دیدگاه کاربران
                        </div>

                        <div className={styles.comments}>
                            <div className={styles.comment_box}>
                                <Comment />
                            </div>

                            <div className={styles.comment_box}>
                                <Comment />
                            </div>

                            <div className={styles.comment_box}>
                                <Comment />
                            </div>

                            <div className={styles.comment_box}>
                                <Comment />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <LeaveComment
                status={commentFormStatus}
                setStatus={setCommentFormStatus}
            />
            <Footer />
        </div>
    );
}
