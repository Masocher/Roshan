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
import ReplyComment from "@/components/global/ReplyComment";
import LeaveComment from "@/components/product/LeaveComment";
import { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import ProductBox from "@/components/global/ProductBox";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Loading from "@/components/global/Loading";
import spiner from "../../../public/images/loading.svg";
import Head from "next/head";

axios.defaults.withCredentials = true;

export async function getServerSideProps(context) {
  let user = null;
  const { slug } = context.params;

  const userRes = await fetch("https://abazarak.ir/api/auth/me/", {
    headers: {
      Cookie: context.req.headers.cookie || "",
    },
  });
  if (userRes.ok) user = await userRes.json();

  const productRes = await fetch(`https://abazarak.ir/api/products/${slug}/`, {
    headers: {
      Cookie: context.req.headers.cookie || "",
    },
  });

  if (!productRes.ok) return { notFound: true };

  const product = await productRes.json();

  return { props: { user, productSingle: product } };
}

export default function ProductSinglePage({ user, productSingle }) {
  const [loading, setLoading] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(productSingle.in_cart);
  const [commentFormStatus, setCommentFormStatus] = useState(false);
  const [categoriesStatus, setCategoriesStatus] = useState(false);
  const [product, setProduct] = useState(productSingle);

  const matches1 = useMediaQuery(1500);
  const matches2 = useMediaQuery(1200);
  const matches3 = useMediaQuery(950);
  const matches4 = useMediaQuery(580);

  useEffect(() => {
    if (product?.in_cart !== null) {
      setDeleteStatus(product.in_cart);
    }
  }, [product]);

  const addToCart = async () => {
    setLoading(true);
    axios
      .post(`/api/products/${product.slug}/add_cart/`, {})
      .then((res) => {
        console.log(res);
        console.log(productSingle);

        setDeleteStatus(true);
        toast.success("این محصول به سبد خرید شما اضافه شد");
        setLoading(false);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          toast.error(
            "برای افزودن محصولات به سبد خرید ابتدا وارد حساب خود شوید"
          );
        } else if (err?.response?.status === 400) {
          toast.error("این محصول از قبل در سبد خرید شما موجود است");
        } else {
          toast.error("خطایی رخ داد !");
        }
        setLoading(false);
      });
  };

  const removeFromCart = async () => {
    try {
      setLoading(true);
      await axios.post(
        `/api/products/${product.slug}/remove_cart/`,
        {},
        { withCredentials: true }
      );
      toast.success("این محصول از سبد خرید شما حذف شد");
      setDeleteStatus(false);
    } catch (err) {
      toast.error("خطایی رخ داد !");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <Loading />;

  return (
    <>
      <Head>
        <title>{product.name} | فروشگاه آبازرگ</title>
        <meta
          name="description"
          content={product.desc?.slice(0, 160) || "مشاهده و خرید محصول"}
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="canonical"
          href={`https://abazarak.ir/products/${product.slug}`}
        />

        <meta property="og:type" content="product" />
        <meta property="og:title" content={product.name} />
        <meta
          property="og:description"
          content={product.desc?.slice(0, 160) || "مشاهده و خرید محصول"}
        />
        <meta property="og:image" content={product.image} />
        <meta
          property="og:url"
          content={`https://abazarak.ir/products/${product.slug}`}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta
          name="twitter:description"
          content={product.desc?.slice(0, 160) || "مشاهده و خرید محصول"}
        />
        <meta name="twitter:image" content={product.image} />
      </Head>

      <div>
        <Toaster position="bottom-left" reverseOrder={true} />
        <BlackBackground
          status={categoriesStatus}
          setStatus={setCategoriesStatus}
        />
        <MiniMenu status={categoriesStatus} setStatus={setCategoriesStatus} />
        <Header
          status={categoriesStatus}
          setStatus={setCategoriesStatus}
          user={user}
        />

        <div className={styles.container}>
          <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
            <div className={styles.loading_wrapper}>
              <Image src={spiner} width={80} height={80} alt="لودینگ" />
            </div>
          </div>

          <div className={styles.top_section}>
            <div className={styles.right_section}>
              <Image
                className={styles.product_image}
                src={product.image}
                alt="عکس محصول"
                width={800}
                height={800}
                quality={100}
                priority
              />
            </div>

            <div className={styles.center_section}>
              {product.is_amazing && (
                <div className={styles.amazing_row}>
                  این محصول <span>شگفت انگیز</span> است
                </div>
              )}

              <div className={styles.product_category_section}>
                {product.category && (
                  <div className={styles.product_category}>
                    <span>
                      <FontAwesomeIcon icon={faAngleLeft} />
                    </span>
                    {product.category}
                  </div>
                )}
                {product.brand && (
                  <div className={styles.product_brand}>
                    <span>
                      <FontAwesomeIcon icon={faAward} />
                    </span>
                    {product.brand}
                  </div>
                )}
              </div>

              <div className={styles.product_name}>{product.name}</div>

              <div className={styles.features}>
                <div className={styles.features_title}>ویژگی ها</div>
                <div className={styles.feature_box}>
                  <div className={styles.feature_title}>تعداد باقی مانده</div>
                  <div className={styles.feature_about}>
                    {product.supply} عدد
                  </div>
                </div>
                {product.specifications?.map((spec) => (
                  <div className={styles.feature_box} key={spec.key}>
                    <div className={styles.feature_title}>{spec.key}</div>
                    <div className={styles.feature_about}>{spec.value}</div>
                  </div>
                ))}
              </div>

              <div className={styles.about}>
                <div className={styles.features_title}>معرفی محصول</div>
                <div className={styles.about_product}>{product.desc}</div>
              </div>
            </div>
          </div>

          <div className={styles.left_section}>
            {product.score_avg === null && (
              <div className={styles.no_score}>
                برای این محصول امتیازی ثبت نشده است !
              </div>
            )}

            {product.score_avg !== null && (
              <div className={styles.product_score}>
                <div className={styles.rate_range}>
                  <div>{product.score_avg}</div> از <span>5</span>
                </div>

                <div className={styles.rated_stars}>
                  <div>
                    <span className={product.score_avg >= 1 ? styles.show : ""}>
                      <FontAwesomeIcon icon={faStar} />
                    </span>
                    <span className={product.score_avg >= 2 ? styles.show : ""}>
                      <FontAwesomeIcon icon={faStar} />
                    </span>
                    <span className={product.score_avg >= 3 ? styles.show : ""}>
                      <FontAwesomeIcon icon={faStar} />
                    </span>
                    <span className={product.score_avg >= 4 ? styles.show : ""}>
                      <FontAwesomeIcon icon={faStar} />
                    </span>
                    <span className={product.score_avg >= 5 ? styles.show : ""}>
                      <FontAwesomeIcon icon={faStar} />
                    </span>
                  </div>

                  <span className={styles.total_rate}>
                    از مجموع {product.comments_count} امتیاز
                  </span>
                </div>
              </div>
            )}

            <div className={styles.pricing}>
              <div className={styles.product_price}>
                {product.price}
                <div className={styles.toman}>تومان</div>
              </div>

              {product.discount && (
                <div className={styles.new_price}>
                  <div className={styles.discount_percent}>
                    {product.discount}%
                  </div>
                  <div className={styles.new_p}>
                    {product.final_price}
                    <div className={styles.toman}>تومان</div>
                  </div>
                </div>
              )}

              <div className={styles.pricing_options}>
                {!deleteStatus && (
                  <div className={styles.add_to_basket_btn} onClick={addToCart}>
                    <span>
                      <FontAwesomeIcon icon={faShoppingBasket} />
                    </span>
                    افزودن به سبد خرید
                  </div>
                )}
                {deleteStatus && (
                  <div
                    className={styles.remove_from_basket_btn}
                    onClick={removeFromCart}
                  >
                    <span>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                    حذف از سبد خرید
                  </div>
                )}
                <div className={styles.product_views}>
                  <span>
                    <FontAwesomeIcon icon={faEye} />
                  </span>
                  {product.hits_count}
                </div>
              </div>
            </div>

            {product.offers?.length > 0 && (
              <div className={styles.more_off}>
                {product.offers.map((offer) => (
                  <div key={offer.id}>
                    به ازای هر {offer.at_least} عدد از این محصول،{" "}
                    {offer.discount_value}
                    {offer.discount_type === "percent"
                      ? " درصد "
                      : " تومان "}{" "}
                    تخفیف بیشتر دریافت کنید!
                  </div>
                ))}
              </div>
            )}
          </div>

          {product.related_products?.length > 0 && (
            <div className={styles.similar_products}>
              <div className={styles.title}>کالاهای مشابه</div>
              <Swiper
                className={styles.products}
                slidesPerView={
                  matches4 ? 2 : matches3 ? 3 : matches2 ? 4 : matches1 ? 5 : 6
                }
              >
                {product.related_products.map((prd) => (
                  <SwiperSlide key={prd.id} className={styles.product}>
                    <ProductBox {...prd} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

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
              <div className={styles.title}>امتیاز و دیدگاه کاربران</div>
              <div className={styles.comments}>
                {product.comments?.length === 0 ? (
                  <div className={styles.no_comment}>دیدگاهی وجود ندارد</div>
                ) : (
                  product.comments.map((com) => (
                    <div className={styles.comment_box} key={com.id}>
                      <Comment {...com} status={com.answers.length > 0} />
                      {com.answers?.map((repCom) => (
                        <ReplyComment key={repCom.id} {...repCom} />
                      ))}
                    </div>
                  ))
                )}
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
      </div>
    </>
  );
}
