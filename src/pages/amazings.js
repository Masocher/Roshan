import Head from "next/head";
import styles from "../styles/amazings/Amazings.module.css";
import Header from "@/components/global/Header";
import BlackBackground from "@/components/global/BlacKBackground";
import MiniMenu from "@/components/global/MiniMenu";
import Footer from "@/components/global/Footer";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import ProductBox from "@/components/global/ProductBox";
import spiner from "../../public/images/loading.svg";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export async function getServerSideProps(context) {
  let user = null;

  const res = await fetch("https://abazarak.ir/api/auth/me/", {
    headers: {
      Cookie: context.req.headers.cookie || "",
    },
  });

  return {
    props: {
      user,
    },
  };
}

export default function Amazings({ user }) {
  let [categoriesStatus, setCategoriesStatus] = useState(false);

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(1);
  const [finished, setFinished] = useState(false);
  const [loading_2, setLoading_2] = useState(false);

  const loaderRef = useRef(null);
  const loadingRef = useRef(false);

  const fetchProducts = useCallback(
    async (page = 1, reset = false) => {
      if (loadingRef.current || (finished && !reset)) return;

      loadingRef.current = true;
      if (reset) setLoading(true);
      else setLoading_2(true);

      try {
        const res = await fetch("https://abazarak.ir/api/site/amazings/");
        const data = await res.json();

        if (reset) {
          setProducts(data.results);
        } else {
          setProducts((prev) => [...prev, ...data.results]);
        }

        setNext(data.next ? page + 1 : null);
        setFinished(!data.next);
      } catch (err) {
        toast.error("خطا در دریافت محصولات");
      }

      if (reset) setLoading(false);
      else setLoading_2(false);

      loadingRef.current = false;
    },
    [finished]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          fetchProducts(next);
        }
      },
      { threshold: 1 }
    );

    const el = loaderRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [fetchProducts, next]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Head>
        <title>محصولات شگفت‌انگیز | فروشگاه ابازارک</title>
        <meta
          name="description"
          content="تخفیف‌های ویژه و قیمت‌های استثنایی در بخش محصولات شگفت‌انگیز فروشگاه ابازارک. خرید ابزار، یراق و تجهیزات صنعتی با ارسال سریع."
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#212121" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ابازارک" />
        <meta
          property="og:title"
          content="محصولات شگفت‌انگیز | فروشگاه ابازارک"
        />
        <meta
          property="og:description"
          content="تخفیف‌های ویژه برای خرید ابزار و تجهیزات صنعتی با قیمت فوق‌العاده از ابازارک"
        />
        <meta
          property="og:url"
          content="https://abazarak.ir/amazing-products"
        />
        <meta
          property="og:image"
          content="https://abazarak.ir/images/amazing-products-og.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="محصولات شگفت‌انگیز | فروشگاه ابازارک"
        />
        <meta
          name="twitter:description"
          content="خرید ابزار و یراق با تخفیف‌های استثنایی از فروشگاه ابازارک"
        />
        <meta
          name="twitter:image"
          content="https://abazarak.ir/images/amazing-products-og.jpg"
        />

        <link rel="canonical" href="https://abazarak.ir/amazing-products" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "محصولات شگفت‌انگیز ابازارک",
              url: "https://abazarak.ir/amazing-products",
              description:
                "تخفیف‌های شگفت‌انگیز برای خرید ابزار، یراق و تجهیزات صنعتی از فروشگاه ابازارک",
            }),
          }}
        />
      </Head>

      <div>
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
          <div className={`${styles.loading} ${loading_2 ? styles.show : ""}`}>
            <div className={styles.loading_wrapper}>
              <Image src={spiner} width={40} height={40} alt="لودینگ" />
            </div>
          </div>

          <Toaster position="bottom-left" reverseOrder={true} />

          <div className={styles.main_title}>
            <Link href={"/"} className={styles.back_btn}>
              <div>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
              برگشت
            </Link>
            پیشنهاد شگفت انگیز
          </div>

          <div className={styles.products}>
            {loading ? (
              <div className={styles.loader}>
                <Image src={spiner} width={40} height={40} alt="لودینگ" />
              </div>
            ) : (
              products.map((product, index) => (
                <div className={styles.product_box} key={index}>
                  <ProductBox
                    slug={product.slug}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    finalPrice={product.final_price}
                    discount={product.discount}
                    amazing={product.is_amazing}
                    amazingBox={true}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
