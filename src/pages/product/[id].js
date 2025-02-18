import styles from "../../styles/product/ProductSinglePage.module.css";
import Header from "@/components/global/Header";
import BlackBackground from "@/components/global/BlacKBackground";
import MiniMenu from "@/components/global/MiniMenu";
import Footer from "@/components/global/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faEye,
    faAward,
    faShoppingBasket,
    faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import Comment from "@/components/global/Comment";
import LeaveComment from "@/components/product/LeaveComment";
import { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import ProductBox from "@/components/global/ProductBox";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { changeSlug } from "@/store/Actions";
import { Toaster, toast } from "react-hot-toast";

export default function ProductSinglePage() {
    const dispatch = useDispatch();

    const [deleteStatus, setDeleteStatus] = useState();

    let [categoriesStatus, setCategoriesStatus] = useState(false);
    const [commentFormStatus, setCommentFormStatus] = useState(false);

    const matches1 = useMediaQuery(1500);
    const matches2 = useMediaQuery(1200);
    const matches3 = useMediaQuery(950);
    const matches4 = useMediaQuery(580);

    const slug = useSelector((rootReducer) => rootReducer.slugReducer);

    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios
            .get(`https://roshan-api.liara.run/api/products/${slug}/`)
            .then((response) => {
                setProduct(response.data);
                setDeleteStatus(product.in_cart);
            })
            .catch((err) => console.log(err));
    }, [slug]);

    useEffect(() => {
        if (product) {
            if (product.in_cart === null) {
                console.log("trying");
            } else {
                setDeleteStatus(product.in_cart);
                console.log("success");
            }
        } else {
            console.log("getting product inf ...");
        }
    }, [product]);

    const addToCart = () => {
        axios
            .post(
                `https://roshan-api.liara.run/api/products/${product.slug}/add_cart/`
            )
            .then((response) => {
                toast.success("این محصول به سبد خرید شما اضافه شد");
                setDeleteStatus(true);
            })
            .catch((err) => {
                if (err.status === 401) {
                    toast.error(
                        "برای افزودن محصولات به سبد خرید ابتدا وارد حساب خود شوید"
                    );
                }

                if (err.status === 400) {
                    toast.error("این محصول از قبل در سبد خرید شما موجود است");
                }
            });
    };

    const removeFromCart = () => {
        axios
            .post(
                `https://roshan-api.liara.run/api/products/${product.slug}/remove_cart/`
            )
            .then((response) => {
                toast.success("این محصول از سبد خرید شما حذف شد");
                setDeleteStatus(false);
            })
            .catch((err) => console.log(err));
    };

    if (product === null || product.in_cart === null) {
        <div className={styles.loading}>Loading ...</div>;
    } else {
        return (
            <div>
                <Toaster position="bottom-left" reverseOrder={true} />

                <BlackBackground
                    status={categoriesStatus}
                    setStatus={setCategoriesStatus}
                />
                <MiniMenu
                    status={categoriesStatus}
                    setStatus={setCategoriesStatus}
                />
                <Header
                    status={categoriesStatus}
                    setStatus={setCategoriesStatus}
                />

                <div className={styles.container}>
                    <div className={styles.top_section}>
                        <div className={styles.right_section}>
                            <Image
                                className={styles.product_image}
                                src={product.image}
                                alt="عکس محصول"
                                width={100}
                                height={100}
                                quality={100}
                            />
                        </div>

                        <div className={styles.center_section}>
                            {product.is_amazing ? (
                                <div className={styles.amazing_row}>
                                    این محصول <span>شگفت انگیز</span> است
                                </div>
                            ) : (
                                ""
                            )}

                            <div className={styles.product_category_section}>
                                <div className={styles.product_category}>
                                    <span>
                                        <FontAwesomeIcon icon={faAngleLeft} />
                                    </span>
                                    {product.category}
                                </div>

                                <div className={styles.product_brand}>
                                    <span>
                                        <FontAwesomeIcon icon={faAward} />
                                    </span>
                                    {product.brand}
                                </div>
                            </div>

                            <div className={styles.product_name}>
                                {product.name}
                            </div>

                            <div className={styles.features}>
                                <div className={styles.features_title}>
                                    ویژگی ها
                                </div>

                                <div className={styles.feature_box}>
                                    <div className={styles.feature_title}>
                                        تعداد باقی مانده
                                    </div>

                                    <div className={styles.feature_about}>
                                        {product.supply} عدد
                                    </div>
                                </div>

                                {product.specifications.map((spec) => (
                                    <div
                                        className={styles.feature_box}
                                        key={spec.id}
                                    >
                                        <div className={styles.feature_title}>
                                            {spec.key}
                                        </div>

                                        <div className={styles.feature_about}>
                                            {spec.value}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.about}>
                                <div className={styles.features_title}>
                                    معرفی محصول
                                </div>

                                <div className={styles.about_product}>
                                    {product.desc}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.left_section}>
                        <div
                            className={`${styles.no_score} ${
                                product.score_avg === null ? styles.show : ""
                            }`}
                        >
                            برای این محصول امتیازی ثبت نشده است !
                        </div>

                        <div
                            className={`${styles.product_score} ${
                                product.score_avg === null ? styles.show : ""
                            }`}
                        >
                            <div className={styles.rate_range}>
                                <div>{product.score_avg}</div>
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
                            <div
                                className={`${styles.product_price} ${
                                    product.discount === null ? "" : styles.show
                                }`}
                            >
                                {product.price}
                                <div className={styles.toman}>تومان</div>
                            </div>

                            <div
                                className={`${styles.new_price} ${
                                    product.discount === null ? "" : styles.show
                                }`}
                            >
                                <div className={styles.discount_percent}>
                                    {product.discount === null
                                        ? 0
                                        : product.discount}
                                    %
                                </div>

                                <div className={styles.new_p}>
                                    {product.final_price}
                                    <div className={styles.toman}>تومان</div>
                                </div>
                            </div>

                            <div className={styles.pricing_options}>
                                <div
                                    className={`${styles.add_to_basket_btn} ${
                                        deleteStatus ? styles.show : ""
                                    }`}
                                    onClick={() => addToCart()}
                                >
                                    <span>
                                        <FontAwesomeIcon
                                            icon={faShoppingBasket}
                                        />
                                    </span>
                                    افزودن به سبد خرید
                                </div>

                                <div
                                    className={`${
                                        styles.remove_from_basket_btn
                                    } ${deleteStatus ? styles.show : ""}`}
                                    onClick={() => {
                                        removeFromCart();
                                    }}
                                >
                                    <span>
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </span>
                                    حذف از سبد خرید
                                </div>

                                <div className={styles.product_views}>
                                    <span>
                                        <FontAwesomeIcon icon={faEye} />
                                    </span>
                                    {product.hits_count}
                                </div>
                            </div>
                        </div>

                        <div
                            className={`${styles.more_off} ${
                                product.offers.length === 0 ? styles.show : ""
                            }`}
                        >
                            {product.offers.map((offer) => (
                                <div key={offer.id}>
                                    به ازای هر {offer.at_least} عدد از این محصول
                                    ، {offer.discount_value}
                                    {offer.discount_type === "percent"
                                        ? " درصد "
                                        : " تومان "}
                                    تخفیف بیشتر دریافت کنید !
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        className={`${styles.similar_products} ${
                            product.related_products.length === 0
                                ? styles.show
                                : ""
                        }`}
                    >
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
                            {product.related_products.map((prd) => (
                                <SwiperSlide
                                    key={prd.id}
                                    className={styles.product}
                                    onClick={() =>
                                        dispatch(changeSlug(prd.slug))
                                    }
                                >
                                    <ProductBox
                                        slug={prd.slug}
                                        image={prd.image}
                                        name={prd.name}
                                        price={prd.price}
                                        finalPrice={prd.final_price}
                                        discount={prd.discount}
                                        amazing={prd.is_amazing}
                                    />
                                </SwiperSlide>
                            ))}
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
                                        onClick={() =>
                                            setCommentFormStatus(true)
                                        }
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
                                {product.comments.length === 0 ? (
                                    <div className={styles.no_comment}>
                                        دیدگاهی وجود ندارد
                                    </div>
                                ) : (
                                    product.comments.map((com) => (
                                        <div
                                            className={styles.comment_box}
                                            key={com.id}
                                        >
                                            <Comment
                                                content={com.content}
                                                user={com.author}
                                                date={com.created_at}
                                            />
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <LeaveComment
                    status={commentFormStatus}
                    setStatus={setCommentFormStatus}
                    product_image={product.image}
                    product_name={product.name}
                    product_slug={product.slug}
                />
                <Footer />
            </div>
        );
    }
}
