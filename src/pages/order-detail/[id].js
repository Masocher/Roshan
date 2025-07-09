import Head from "next/head";
import styles from "../../styles/user-pannel/OrderDetailsSinglePage.module.css";
import Header from "@/components/global/Header";
import MiniMenu from "@/components/global/MiniMenu";
import BlackBackground from "@/components/global/BlacKBackground";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faClose,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const cookies = context.req.headers.cookie || "";

  try {
    const [userRes, orderRes] = await Promise.all([
      fetch("https://abazarak.ir/api/auth/me/", {
        headers: { Cookie: cookies },
      }),
      fetch(`https://abazarak.ir/api/ordering/history/${id}/`, {
        headers: { Cookie: cookies },
      }),
    ]);

    if (userRes.status === 401 || orderRes.status === 401) {
      return {
        redirect: {
          destination: "/sign-in",
          permanent: false,
        },
      };
    }

    if (!orderRes.ok) {
      return { notFound: true };
    }

    const user = userRes.ok ? await userRes.json() : null;
    const order = await orderRes.json();

    return {
      props: {
        user,
        orderList: order,
      },
    };
  } catch (error) {
    console.error("خطا در دریافت اطلاعات:", error);
    return { notFound: true };
  }
}

export default function OrderDetailsSinglePage({ user, orderList }) {
  const [categoriesStatus, setCategoriesStatus] = useState(false);

  return (
    <>
      <Head>
        <title>جزئیات سفارش {orderList?.id ?? ""} - فروشگاه آبازرک</title>
        <meta
          name="description"
          content={`جزئیات سفارش شما با شماره ${orderList?.id ?? ""} شامل ${
            orderList?.items?.length ?? 0
          } محصول. وضعیت پرداخت: ${
            orderList?.paid ? "پرداخت شده" : "پرداخت نشده"
          }، وضعیت ارسال: ${orderList?.shipped ? "ارسال شده" : "ارسال نشده"}`}
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

        <div className={styles.orders_container}>
          <div className={styles.user_orders_main_title}>
            <div className={styles.title}>
              <Link href={"/user-orders"} legacyBehavior>
                <a
                  style={{ color: "#000", marginTop: 5, marginLeft: 15 }}
                  aria-label="بازگشت به سفارشات"
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </a>
              </Link>
              جزئیات سفارش {orderList?.id ?? ""}
            </div>
          </div>

          <div className={styles.order}>
            <div className={styles.first_section}>
              <div className={styles.payment_status}>
                <div className={styles.title}>
                  {orderList?.full_name ?? "-"}
                </div>
                <div className={styles.content} style={{ direction: "ltr" }}>
                  {orderList?.number ?? "-"}
                </div>
              </div>

              <div className={styles.payment_status}>
                <div className={styles.title}>وضعیت ارسال</div>
                <div className={styles.content}>
                  <span className={orderList?.shipped ? styles.show : ""}>
                    <FontAwesomeIcon
                      icon={orderList?.shipped ? faCheck : faClose}
                    />
                  </span>
                  <div>{orderList?.shipped ? "ارسال شده" : "ارسال نشده"}</div>
                </div>
              </div>

              <div className={styles.payment_status}>
                <div className={styles.title}>وضعیت پرداخت</div>
                <div className={styles.content}>
                  <span className={orderList?.paid ? styles.show : ""}>
                    <FontAwesomeIcon
                      icon={orderList?.paid ? faCheck : faClose}
                    />
                  </span>
                  <div>{orderList?.paid ? "پرداخت شده" : "پرداخت نشده"}</div>
                </div>
              </div>

              <div className={styles.payment_status}>
                <div className={styles.title}>تاریخ سفارش</div>
                <div className={styles.content}>
                  {orderList?.created_at ?? "-"}
                </div>
              </div>

              <div className={styles.payment_status}>
                <div className={styles.title}>هزینه ارسال</div>
                <div className={styles.content}>
                  {orderList?.shipping_fee
                    ? orderList.shipping_fee + " تومان"
                    : "-"}
                </div>
              </div>

              <div className={styles.payment_status}>
                <div className={styles.title}>کد تخفیف</div>
                <div className={styles.content}>بدون کد تخفیف</div>
              </div>

              <div className={styles.payment_status}>
                <div className={styles.title}>تخفیف</div>
                <div className={styles.content}>
                  {orderList?.discount_amount ?? "-"}
                </div>
              </div>

              <div className={styles.payment_status}>
                <div className={styles.title}>کل مبلغ</div>
                <div className={styles.content}>
                  {orderList?.pay_price ? orderList.pay_price + " تومان" : "-"}
                </div>
              </div>

              <div className={styles.payment_status}>
                <div className={styles.title}>تاریخ پرداخت</div>
                <div className={styles.content}>
                  {orderList?.billing?.paid_at ?? "پرداخت نشده"}
                </div>
              </div>

              <div className={styles.payment_status}>
                <div className={styles.title}>کد رهگیری</div>
                <div className={styles.content}>
                  {orderList?.shipping?.tracking_code ?? "در انتظار برای ارسال"}
                </div>
              </div>
            </div>

            <div className={styles.address}>
              <div className={styles.title}>آدرس</div>
              <div className={styles.content}>
                {orderList?.address_data?.address ?? "-"}
              </div>
            </div>

            <div className={styles.third_section}>
              <div className={styles.title}>محصولات انتخاب شده</div>
              <div className={styles.products}>
                {orderList?.items?.length > 0 ? (
                  orderList.items.map((item) => (
                    <div className={styles.product} key={item.id}>
                      <Image
                        src={item.product?.image ?? "/placeholder.png"}
                        alt={item.product?.name ?? "عکس محصول"}
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
                          {item.product?.price ?? "-"}
                        </div>
                        <div className={styles.product_name}>
                          {item.product?.name ?? "-"}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>هیچ محصولی موجود نیست</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
