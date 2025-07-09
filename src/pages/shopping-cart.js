import styles from "../styles/shopping/ShoppingCart.module.css";
import Header from "@/components/global/Header";
import BlackBackground from "@/components/global/BlacKBackground";
import MiniMenu from "@/components/global/MiniMenu";
import Footer from "@/components/global/Footer";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faTrashCan,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Loading from "@/components/global/Loading";
import spiner from "../../public/images/loading.svg";
import Head from "next/head";

axios.defaults.withCredentials = true;

export async function getServerSideProps(context) {
  let user = null;
  let initialData = {
    items: [],
    base_price: 0,
    discount_amount: 0,
    final_price: 0,
    cupon: null,
  };

  const res = await fetch("https://abazarak.ir/api/auth/me/", {
    headers: {
      cookie: context.req.headers.cookie || "",
    },
  });

  if (res.ok) {
    user = await res.json();
  }

  const res2 = await fetch("https://abazarak.ir/api/ordering/cart/", {
    headers: {
      cookie: context.req.headers.cookie || "",
    },
  });

  if (res2.ok) {
    const data = await res2.json();
    initialData = data;
  } else if (res2.status === 401) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
      initialData,
    },
  };
}

export default function ShoppingCart({ user, initialData }) {
  const [categoriesStatus, setCategoriesStatus] = useState(false);
  const [products, setProducts] = useState(initialData.items);
  const [productsPrice, setProductsPrice] = useState({
    base_price: initialData.base_price,
    discount_amount: initialData.discount_amount,
    final_price: initialData.final_price,
  });
  const [bonusStatus, setBonusStatus] = useState(initialData.cupon);
  const [loading2, setLoading2] = useState(false);
  const [bonusCode, setBonusCode] = useState("");

  const changeProduct = useCallback(
    (id, actionType) => {
      if (loading2) return;
      setLoading2(true);
      axios
        .post("/api/ordering/cart/change-item/", {
          item_id: id,
          action: actionType,
        })
        .then((response) => {
          setProducts(response.data.items);
          setProductsPrice({
            base_price: response.data.base_price,
            discount_amount: response.data.discount_amount,
            final_price: response.data.final_price,
          });
          setBonusStatus(response.data.cupon);

          if (actionType === "inc") {
            toast.success("تعداد انتخاب شده محصول اضافه شد");
          } else if (actionType === "dec") {
            toast.success("تعداد انتخاب شده محصول کم شد");
          } else if (actionType === "del") {
            toast.success("محصول با موفقیت حذف شد");
          }
        })
        .catch((err) => {
          toast.error("خطایی رخ داد !");
        })
        .finally(() => {
          setLoading2(false);
        });
    },
    [loading2]
  );

  const setBonus = useCallback(() => {
    if (loading2) return;
    if (bonusCode.trim().length === 0) {
      toast.error("یک مقدار معتبر وارد کنید");
      return;
    }
    setLoading2(true);
    axios
      .post("/api/ordering/cart/apply-cupon/", {
        code: bonusCode.trim(),
      })
      .then((response) => {
        toast.success("کد تخفیف روی سبد خرید شما اعمال شد");
        setProductsPrice({
          base_price: response.data.base_price,
          discount_amount: response.data.discount_amount,
          final_price: response.data.final_price,
        });
        setBonusCode("");
        setBonusStatus(response.data.cupon);
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          toast.error("کد تخفیف وارد شده صحیح نیست");
        } else {
          toast.error("خطا در اعمال کد تخفیف");
        }
        setBonusCode("");
      })
      .finally(() => setLoading2(false));
  }, [bonusCode, loading2]);

  const removeBonus = useCallback(() => {
    if (loading2) return;
    setLoading2(true);
    axios
      .post("/api/ordering/cart/remove-cupon/")
      .then((response) => {
        toast.success("کد تخفیف با موفقیت حذف شد");
        setProductsPrice({
          base_price: response.data.base_price,
          discount_amount: response.data.discount_amount,
          final_price: response.data.final_price,
        });
        setBonusStatus(response.data.cupon);
      })
      .catch(() => {
        toast.error("خطا در حذف کد تخفیف");
      })
      .finally(() => setLoading2(false));
  }, [loading2]);

  if (!products) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>سبد خرید | فروشگاه ابازارک</title>
        <meta
          name="description"
          content="مشاهده و مدیریت سبد خرید خود در فروشگاه ابازارک. اضافه کردن، حذف و پرداخت آسان ابزارآلات و تجهیزات صنعتی."
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#212121" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ابازارک" />
        <meta property="og:title" content="سبد خرید | فروشگاه ابازارک" />
        <meta
          property="og:description"
          content="مدیریت آسان سبد خرید ابزار و تجهیزات صنعتی در ابازارک"
        />
        <meta property="og:url" content="https://abazarak.ir/cart" />
        <meta
          property="og:image"
          content="https://abazarak.ir/images/cart-og-image.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="سبد خرید | فروشگاه ابازارک" />
        <meta
          name="twitter:description"
          content="پرداخت سریع و مدیریت سبد خرید ابزارآلات صنعتی"
        />
        <meta
          name="twitter:image"
          content="https://abazarak.ir/images/cart-og-image.jpg"
        />

        <link rel="canonical" href="https://abazarak.ir/cart" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ShoppingCart",
              name: "سبد خرید ابازارک",
              url: "https://abazarak.ir/cart",
              description:
                "صفحه مدیریت سبد خرید و پرداخت ابزارآلات صنعتی فروشگاه ابازارک",
            }),
          }}
        />
      </Head>

      <div className={styles.container}>
        <div className={`${styles.loading} ${loading2 ? styles.show : ""}`}>
          <div className={styles.loading_wrapper}>
            <Image src={spiner} width={80} height={80} alt="لودینگ" />
          </div>
        </div>

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

        <div className={styles.cart_wrapper}>
          {products.length === 0 ? (
            <div className={styles.no_product}>
              <span>
                <FontAwesomeIcon icon={faCartPlus} />
              </span>
              سبد خرید شما خالی است
              <Link href={"/products"} className={styles.show_products_btn}>
                مشاهده محصولات
              </Link>
            </div>
          ) : (
            <div className={styles.right_section}>
              {products.map((product) => (
                <div className={styles.cart_product} key={product.id}>
                  <div className={styles.product_right_content}>
                    <Link href={`${product.product.slug}`}>
                      <Image
                        className={styles.cart_product_img}
                        src={product.product.image}
                        alt="عکس محصول"
                        width={100}
                        height={100}
                        quality={100}
                      />
                    </Link>

                    <div className={styles.cart_product_inf}>
                      <Link
                        href={`${product.product.slug}`}
                        className={styles.product_title}
                      >
                        {product.product.name}
                      </Link>

                      <div className={styles.cart_product_value}>
                        <span>
                          <FontAwesomeIcon
                            icon={faPlus}
                            onClick={() => changeProduct(product.id, "inc")}
                            style={{
                              cursor: loading2 ? "not-allowed" : "pointer",
                            }}
                          />
                        </span>

                        <div className={styles.cart_product_num}>
                          {product.quantity}
                        </div>

                        <span>
                          <FontAwesomeIcon
                            icon={faMinus}
                            onClick={() => {
                              if (loading2) return;
                              if (product.quantity > 1) {
                                changeProduct(product.id, "dec");
                              } else {
                                toast.error("کمتر از این مقدار مجاز نیست");
                              }
                            }}
                            style={{
                              cursor: loading2 ? "not-allowed" : "pointer",
                            }}
                          />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.product_left_content}>
                    <span
                      onClick={() => {
                        if (!loading2) changeProduct(product.id, "del");
                      }}
                      style={{ cursor: loading2 ? "not-allowed" : "pointer" }}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </span>

                    <div className={styles.cart_product_price}>
                      {product.product.final_price}
                      <div className={styles.toman}>تومان</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div
            className={`${styles.left_section} ${
              products.length === 0 ? styles.show : ""
            }`}
          >
            <div className={styles.title}>اطلاعات پرداخت</div>

            {bonusStatus === null ? (
              <form
                className={styles.bonus_code_box}
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!loading2) setBonus();
                }}
              >
                <input
                  type="text"
                  placeholder="کد تخفیف را وارد کنید"
                  onChange={(e) => setBonusCode(e.target.value)}
                  value={bonusCode}
                  disabled={loading2}
                />

                <button type="submit" disabled={loading2}>
                  اعمال تخفیف
                </button>
              </form>
            ) : (
              <div className={styles.bonus_box}>
                <div className={styles.bonus_title}>کد تخفیف</div>

                <div className={styles.bottom_content}>
                  <div className={styles.bonus_code}>{bonusStatus.code}</div>

                  <div
                    className={styles.delete_bonus}
                    onClick={() => {
                      if (!loading2) removeBonus();
                    }}
                    style={{ cursor: loading2 ? "not-allowed" : "pointer" }}
                  >
                    <span>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                    حذف کردن
                  </div>
                </div>
              </div>
            )}

            <div className={styles.value_box}>
              <div className={styles.value_title}>جمع کل</div>

              <div className={styles.value}>
                {productsPrice.base_price}
                <div className={styles.toman}>تومان</div>
              </div>
            </div>

            <div className={styles.value_box}>
              <div className={styles.value_title}>تخفیف</div>

              <div className={`${styles.value} ${styles.off_value}`}>
                {productsPrice.discount_amount}
                <div className={styles.toman}>تومان</div>
              </div>
            </div>

            <div className={`${styles.value_box} ${styles.buy_value}`}>
              <div className={styles.value_title}>مبلغ قابل پرداخت</div>

              <div className={styles.value}>
                {productsPrice.final_price}
                <div className={styles.toman}>تومان</div>
              </div>
            </div>

            <Link href={"/purchase-information"} className={styles.buy_btn}>
              تایید و تکمیل سفارش
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
