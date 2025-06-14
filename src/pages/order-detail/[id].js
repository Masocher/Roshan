import styles from "../../styles/user-pannel/OrderDetailsSinglePage.module.css";
import Header from "@/components/global/Header";
import MiniMenu from "@/components/global/MiniMenu";
import BlackBackground from "@/components/global/BlacKBackground";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faClose,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import img from "../../../public/images/1.webp";
import Image from "next/image";
import Loading from "@/components/global/Loading";

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

  return {
    props: {
      user,
    },
  };
}

export default function OrderDetailsSinglePage({ user }) {
  let [categoriesStatus, setCategoriesStatus] = useState(false);

  const router = useRouter();

  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    const fetchData = async () => {
      const response = await axios.get(
        `/api/ordering/history/${localStorage.getItem("orderId")}/`
      );
      const result = await response.data;
      setOrder(result);
      setLoading(false);
    };

    fetchData();
  }, []);

  {
    if (loading) {
      return <Loading />;
    } else {
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
                <span onClick={() => router.back()}>
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
                جزئیات سفارش {localStorage.getItem("orderId")}
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
                    <span className={`${order.paid ? styles.show : ""}`}>
                      <FontAwesomeIcon
                        icon={order.shipped ? faCheck : faClose}
                      />
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

                  <div className={styles.content}>50,000</div>
                </div>

                <div className={styles.payment_status}>
                  <div className={styles.title}>کد تخفیف</div>

                  <div className={styles.content}>yalda00</div>
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
                    {order.billing === null
                      ? "پرداخت نشده"
                      : order.billing.paid_at}
                  </div>
                </div>

                <div className={styles.payment_status}>
                  <div className={styles.title}>کد رهگیری</div>

                  <div className={styles.content}>6533120</div>
                </div>
              </div>

              <div className={styles.address}>
                <div className={styles.title}>آدرس</div>

                <div className={styles.content}>
                  {order.address_data.address}
                </div>
              </div>

              <div className={styles.third_section}>
                <div className={styles.title}>محصولات انتخاب شده</div>

                <div className={styles.products}>
                  <div className={styles.product}>
                    <Image
                      src={img}
                      alt="عکس محصول"
                      className={styles.product_img}
                    />

                    <div className={styles.product_inf}>
                      <div className={styles.badge}>تعداد : 2</div>

                      <div className={styles.cart_product_num}>1,500,000</div>

                      <div className={styles.product_name}>
                        هود آشپزی مدل سیمرغ
                      </div>
                    </div>
                  </div>

                  <div className={styles.product}>
                    <Image
                      src={img}
                      alt="عکس محصول"
                      className={styles.product_img}
                    />

                    <div className={styles.product_inf}>
                      <div className={styles.badge}>تعداد : 2</div>

                      <div className={styles.cart_product_num}>1,500,000</div>

                      <div className={styles.product_name}>
                        هود آشپزی مدل سیمرغهود آشپزی مدل سیمرغهود آشپزی مدل
                        سیمرغ
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
