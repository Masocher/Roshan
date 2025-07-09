import Head from "next/head";
import styles from "../styles/user-pannel/UserOrders.module.css";
import Header from "@/components/global/Header";
import MiniMenu from "@/components/global/MiniMenu";
import BlackBackground from "@/components/global/BlacKBackground";
import { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faCheck,
  faClose,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import Gateway from "./gateway";
import Link from "next/link";
import Image from "next/image";
import spiner from "../../public/images/loading.svg";

export async function getServerSideProps(context) {
  let initialOrders = [];
  let nextPage = null;
  let user = null;

  const res = await fetch("https://abazarak.ir/api/auth/me/", {
    headers: {
      Cookie: context.req.headers.cookie || "",
    },
  });

  if (res.ok) user = await res.json();

  const res2 = await fetch("https://abazarak.ir/api/ordering/history/", {
    headers: {
      Cookie: context.req.headers.cookie || "",
    },
  });

  if (res2.status === 401) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const data = await res2.json();
  initialOrders = data.results || [];
  nextPage = data.next || null;

  return {
    props: {
      user,
      initialOrders,
      nextPage,
    },
  };
}

export default function UserOrders({ user, initialOrders, nextPage }) {
  const spinerStyles2 = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
    height: "fit-content",
    margin: "50px 0 0 0",
  };

  const [categoriesStatus, setCategoriesStatus] = useState(false);
  const [orders, setOrders] = useState(initialOrders || []);
  const [next, setNext] = useState(nextPage);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const loaderRef = useRef(null);
  const loadingRef = useRef(false);

  const fetchOrders = useCallback(async () => {
    if (loadingRef.current || !next || finished) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const res = await fetch(`/api/ordering/history/?page=${next}`, {
        credentials: "include",
      });
      const data = await res.json();
      setOrders((prev) => [...prev, ...data.results]);
      setNext(data.next);
      if (data.next === null) setFinished(true);
    } catch (err) {
      toast.error("خطایی رخ داد !");
    }
    setLoading(false);
    loadingRef.current = false;
  }, [next, finished]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          fetchOrders();
        }
      },
      { threshold: 1 }
    );

    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [fetchOrders]);

  const [gatewayStatus, setGatewayStatus] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [productsPrice, setProductsPrice] = useState({ pay_price: "" });

  return (
    <>
      <Head>
        <title>تاریخچه سفارشات | فروشگاه ابازارک</title>
        <meta
          name="description"
          content="مشاهده تاریخچه سفارشات و وضعیت پرداخت و ارسال سفارش‌های شما در فروشگاه اینترنتی ابازارک."
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#212121" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ابازارک" />
        <meta property="og:title" content="تاریخچه سفارشات | فروشگاه ابازارک" />
        <meta
          property="og:description"
          content="پیگیری و مشاهده وضعیت سفارشات شما در فروشگاه ابزار و تجهیزات صنعتی ابازارک."
        />
        <meta property="og:url" content="https://abazarak.ir/user-orders" />
        <meta
          property="og:image"
          content="https://abazarak.ir/images/og-image.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="تاریخچه سفارشات | فروشگاه ابازارک"
        />
        <meta
          name="twitter:description"
          content="مشاهده و پیگیری سفارشات شما در فروشگاه ابازارک."
        />
        <meta
          name="twitter:image"
          content="https://abazarak.ir/images/og-image.jpg"
        />

        <link rel="canonical" href="https://abazarak.ir/user-orders" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "تاریخچه سفارشات ابازارک",
              url: "https://abazarak.ir/user-orders",
              about:
                "مشاهده و پیگیری سفارشات کاربران فروشگاه ابزارآلات صنعتی ابازارک",
            }),
          }}
        />
      </Head>

      <div className={styles.container}>
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
        <Gateway
          gatewayStatus={gatewayStatus}
          productsPrice={productsPrice}
          orderId={orderId}
        />

        <div className={styles.orders_container}>
          <div className={styles.user_orders_main_title}>
            <div className={styles.title}>
              <span>
                <FontAwesomeIcon icon={faReceipt} />
              </span>
              تاریخچه سفارشات
            </div>
          </div>

          <div className={styles.user_orders}>
            {orders.length === 0 ? (
              <div className={styles.no_order}>سفارشی یافت نشد !</div>
            ) : (
              orders.map((order) => (
                <div className={styles.order} key={order.id}>
                  <div className={styles.order_informations}>
                    <div>
                      <span>تاریخ : </span>
                      {order.created_at}
                    </div>
                    <div>
                      <span>هزینه ارسال : </span>
                      {order.shipping_fee} تومان
                    </div>
                    <div>
                      <span>تخفیف : </span>
                      {order.discount_amount} تومان
                    </div>
                    <div>
                      <span>کل مبلغ : </span>
                      {order.pay_price} تومان
                    </div>
                  </div>

                  <div className={styles.order_address}>
                    <span>آدرس :</span>
                    {order.address_data.address}
                  </div>

                  <div className={styles.codes}>
                    <div className={styles.tracking_code}>
                      <span>کد سفارش : </span>
                      {order.id}
                    </div>
                    <div className={styles.tracking_code}>
                      <span>کد رهگیری : </span>
                      {order.paid === false
                        ? "در انتظار پرداخت"
                        : order.shipped === false
                        ? "در انتظار تحویل مرسوله به پست"
                        : order.shipping.tracking_code}
                    </div>
                  </div>

                  <div className={styles.order_assets}>
                    <div className={styles.order_assets_wrapper}>
                      <div className={styles.order_status}>
                        <div
                          className={`${styles.status_box} ${
                            order.paid ? styles.status_box_show : ""
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={order.paid ? faCheck : faClose}
                          />
                        </div>
                        {order.paid ? "پرداخت شده" : "پرداخت نشده"}
                      </div>

                      <div className={styles.order_status}>
                        <div
                          className={`${styles.status_box} ${
                            order.shipped ? styles.status_box_show : ""
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={order.shipped ? faCheck : faClose}
                          />
                        </div>
                        {order.shipped ? "ارسال شده" : "ارسال نشده"}
                      </div>
                    </div>

                    <div className={styles.right_content}>
                      {!order.paid && (
                        <div
                          className={styles.show_details_btn}
                          onClick={() => {
                            setProductsPrice({ pay_price: order.final_price });
                            setOrderId(order.id);
                            setGatewayStatus(true);
                          }}
                        >
                          تکمیل و پرداخت
                        </div>
                      )}

                      <Link
                        href={`/order-detail/${order.id}`}
                        className={styles.show_details_btn}
                        style={{ margin: "0", textDecoration: "none" }}
                      >
                        جزئیات سفارش
                        <span>
                          <FontAwesomeIcon icon={faAngleLeft} />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div ref={loaderRef}>
            {loading && (
              <div className="loader" style={spinerStyles2}>
                <Image src={spiner} width={80} height={80} alt="لودینگ" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
