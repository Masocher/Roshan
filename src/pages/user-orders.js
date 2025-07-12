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
import Gateway from "../components/global/Gateway";
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
        <meta name="robots" content="noindex, nofollow" />
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
                        : order.tracking_code}
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
                            setProductsPrice({ pay_price: order.pay_price });
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
                <div className={styles.loading_wrapper_title}>روشن ابزار</div>
                <Image src={spiner} width={40} height={40} alt="لودینگ" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
