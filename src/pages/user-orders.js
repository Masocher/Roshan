import styles from "../styles/user-pannel/UserOrders.module.css";
import Header from "@/components/global/Header";
import MiniMenu from "@/components/global/MiniMenu";
import BlackBackground from "@/components/global/BlacKBackground";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faCheck,
  faClose,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import Gateway from "./gateway";
import Link from "next/link";

export async function getServerSideProps(context) {
  let initialOrders = [];

  let user = null;

  try {
    const res = await fetch("https://abazarak.ir/api/auth/me/", {
      headers: {
        Cookie: context.req.headers.cookie || "",
      },
    });

    if (res.ok) {
      user = await res.json();
    }
  } catch (err) {
    console.error("خطا در دریافت اطلاعات کاربر:", err);
  }

  try {
    const res = await fetch("https://abazarak.ir/api/ordering/history/", {
      headers: {
        Cookie: context.req.headers.cookie || "",
      },
    });

    if (res.status === 401) {
      return {
        redirect: {
          destination: "/sign-in",
          permanent: false,
        },
      };
    }

    initialOrders = await res.json();
  } catch (error) {
    console.error("خطا در دریافت سفارش ها", error);
  }

  return {
    props: {
      user,
      initialOrders,
    },
  };
}

export default function UserOrders({ user, initialOrders }) {
  console.log(initialOrders);

  let [categoriesStatus, setCategoriesStatus] = useState(false);
  const [orders, setOrders] = useState(initialOrders);

  const [gatewayStatus, setGatewayStatus] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [productsPrice, setProductsPrice] = useState({
    pay_price: "",
  });

  return (
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
                    50,000 تومان
                  </div>

                  <div>
                    <span>تخفیف : </span>
                    {order.discount_amount} تومان
                  </div>

                  <div>
                    <span>کل مبلغ : </span>
                    {order.total_price} تومان
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
                          order.shipped ? "show" : ""
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
                          setProductsPrice({
                            pay_price: order.total_price,
                          });
                          setOrderId(order.id);
                          setGatewayStatus(true);
                        }}
                      >
                        تکمیل و پرداخت
                      </div>
                    )}

                    <Link
                      onClick={() => localStorage.setItem("orderId", order.id)}
                      href={`/order-detail/${order.id}`}
                      className={styles.show_details_btn}
                      style={{
                        margin: "0",
                        textDecoration: "none",
                      }}
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
      </div>
    </div>
  );
}
