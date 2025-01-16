import styles from "../../styles/product/ProductSinglePage.module.css";
import { useRouter } from "next/router";
import Header from "@/components/global/Header";
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

export default function ProductSinglePage() {
    const [commentFormStatus, setCommentFormStatus] = useState(false);

    const router = useRouter();

    return (
        <div>
            <Header />

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
            <MiniMenu />
            <Footer />
        </div>
    );
}
