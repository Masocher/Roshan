import styles from "../styles/shopping/PurchaseInformation.module.css";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import img1 from "../../public/images/12.png";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

axios.defaults.withCredentials = true;

export default function Gateway({ gatewayStatus, productsPrice, orderId }) {
  const router = useRouter();

  const [bankStatus, setBankStatus] = useState(true);

  const completeOrder = () => {
    axios
      .get("/api/ordering/preview/")
      .then((response) => {
        if (response.data.items.length === 0) {
          router.push("/user-orders");
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          toast.error("برای ورود به صفحه ثبت سفارش ابتدا وارد حساب خود شوید");
          router.push("/sign-in");
        } else {
          toast.error("خطایی رخ داد !");
        }
      });

    axios
      .post(`/api/ordering/history/${orderId}/payment_gateway/`)
      .then((response) => {
        router.push(response.data.gateway_url);
      })
      .catch((err) => toast.error("خطایی رخ داد !"));
  };

  return (
    <div
      className={`${styles.gateway_container} ${
        gatewayStatus ? styles.show : ""
      }`}
    >
      <div className={styles.payment_gateway}>
        <div className={styles.gateway_main_title}>
          انتخاب درگاه پرداخت
          <Link href={"/user-orders"} className={styles.show_order}>
            نمایش سفارش
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </Link>
        </div>

        <div className={`${styles.gateway} ${bankStatus ? styles.show : ""}`}>
          <div className={styles.title}>
            <div
              className={`${styles.check_box} ${bankStatus ? styles.show : ""}`}
            >
              <span></span>
            </div>
            زرین پال
          </div>

          <Image src={img1} className={styles.gateway_image} alt="لوگوی بانک" />
        </div>

        <div className={styles.value_box}>
          <div className={styles.title}>مقدار قابل پرداخت</div>

          <div className={styles.value}>
            {productsPrice.pay_price}
            <div className={styles.toman}>تومان</div>
          </div>
        </div>

        <div
          className={`${styles.complete_btn} ${bankStatus ? styles.show : ""}`}
          onClick={() => completeOrder()}
        >
          تکمیل سفارش
        </div>
      </div>
    </div>
  );
}
