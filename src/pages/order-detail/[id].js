import styles from "../../styles/user-pannel/OrderDetailsSinglePage.module.css";
import Header from "@/components/global/Header";
import MiniMenu from "@/components/global/MiniMenu";
import BlackBackground from "@/components/global/BlacKBackground";
import { useRouter } from "next/router";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faClose,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import img from "../../../public/images/1.webp";
import Image from "next/image";
import Link from "next/link";

export async function getServerSideProps(context) {
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

  const { id } = context.params;

  try {
    const res = await fetch(`https://abazarak.ir/api/ordering/history/${id}/`, {
      headers: {
        Cookie: context.req.headers.cookie || "",
      },
    });

    if (!res.ok) {
      return {
        notFound: true,
      };
    }

    const order = await res.json();
    return {
      props: {
        user,
        orderList: order,
      },
    };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return {
        redirect: {
          destination: "/sign-in",
          permanent: false,
        },
      };
    }

    return {
      notFound: true,
    };
  }
}

export default function OrderDetailsSinglePage({ user, orderList }) {
  let [categoriesStatus, setCategoriesStatus] = useState(false);

  const [order, setOrder] = useState(orderList);

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

      <div className={styles.orders_container}>
        <div className={styles.user_orders_main_title}>
          <div className={styles.title}>
            <Link
              href={"/user-orders"}
              style={{ color: "#000", marginTop: "5px", marginLeft: "15px" }}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
            جزئیات سفارش {order.id}
          </div>
        </div>

        <div className={styles.order}>
          <div className={styles.first_section}>
            <div className={styles.payment_status}>
              <div className={styles.title}>{order.full_name}</div>

              <div className={styles.content} style={{ direction: "ltr" }}>
                {order.number}
              </div>
            </div>

            <div className={styles.payment_status}>
              <div className={styles.title}>وضعیت ارسال</div>

              <div className={styles.content}>
                <span className={`${order.shipped ? styles.show : ""}`}>
                  <FontAwesomeIcon icon={order.shipped ? faCheck : faClose} />
                </span>
                <div>{order.shipped ? "ارسال شده" : "ارسال نشده"}</div>
              </div>
            </div>

            <div className={styles.payment_status}>
              <div className={styles.title}>وضعیت پرداخت</div>

              <div className={styles.content}>
                <span className={`${order.paid ? styles.show : ""}`}>
                  <FontAwesomeIcon icon={order.paid ? faCheck : faClose} />
                </span>
                <div>{order.paid ? "پرداخت شده" : "پرداخت نشده"}</div>
              </div>
            </div>

            <div className={styles.payment_status}>
              <div className={styles.title}>تاریخ سفارش</div>

              <div className={styles.content}>
                <div>{order.created_at}</div>
              </div>
            </div>

            <div className={styles.payment_status}>
              <div className={styles.title}>هزینه ارسال</div>

              <div className={styles.content}>
                {order.shipping
                  ? order.shipping.shipping_fee
                  : "در انتظار برای ارسال"}
              </div>
            </div>

            <div className={styles.payment_status}>
              <div className={styles.title}>کد تخفیف</div>

              <div className={styles.content}>بدون کد تخفیف</div>
            </div>

            <div className={styles.payment_status}>
              <div className={styles.title}>تخفیف</div>

              <div className={styles.content}>{order.discount_amount}</div>
            </div>

            <div className={styles.payment_status}>
              <div className={styles.title}>کل مبلغ</div>

              <div className={styles.content}>{order.total_price}</div>
            </div>

            <div className={styles.payment_status}>
              <div className={styles.title}>تاریخ پرداخت</div>

              <div className={styles.content}>
                {order.billing === null ? "پرداخت نشده" : order.billing.paid_at}
              </div>
            </div>

            <div className={styles.payment_status}>
              <div className={styles.title}>کد رهگیری</div>

              <div className={styles.content}>
                {order.shipping
                  ? order.shipping.tracking_code
                  : "در انتظار برای ارسال"}
              </div>
            </div>
          </div>

          <div className={styles.address}>
            <div className={styles.title}>آدرس</div>

            <div className={styles.content}>{order.address_data.address}</div>
          </div>

          <div className={styles.third_section}>
            <div className={styles.title}>محصولات انتخاب شده</div>

            <div className={styles.products}>
              {order.items.length > 0
                ? order.items.map((item) => (
                    <div className={styles.product} key={item.id}>
                      <Image
                        src={item.product.image}
                        alt="عکس محصول"
                        className={styles.product_img}
                        width={800}
                        height={800}
                        quality={100}
                        priority
                      />

                      <div className={styles.product_inf}>
                        <div className={styles.badge}>
                          تعداد : {item.quantity}
                        </div>

                        <div className={styles.cart_product_num}>
                          {item.product.price}
                        </div>

                        <div className={styles.product_name}>
                          {item.product.name}
                        </div>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
