import styles from "../../styles/admin/Discounts.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Discounts() {
  const [loading, setLoading] = useState(false);

  const [discounts, setDiscounts] = useState([]);

  const getDiscounts = () => {
    setLoading(true);
    axios.defaults.withCredentials = true;
    axios
      .get("/api/admin/discounts/")
      .then((response) => {
        setDiscounts(response.data);
        console.log(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getDiscounts();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.top_box}>
        <Link href={"/admin/discounts/create"} className={styles.add_btn}>
          <span>
            <FontAwesomeIcon icon={faPlus} />
          </span>
          تخفیف جدید
        </Link>
      </div>

      <div className={styles.discounts}>
        <div className={styles.discounts_top}>
          <div className={styles.discounts_title}>شماره</div>
          <div className={styles.discounts_title}>وضعیت</div>
          <div className={styles.discounts_title}>تعداد محصولات</div>
          <div className={styles.discounts_title}>مقدار تخفیف</div>
        </div>

        {discounts.length > 0 ? (
          discounts.map((discount, index) => (
            <Link
              className={styles.discount}
              href={`/admin/discounts/${discount.id}`}
              key={discount.id}
            >
              <div className={styles.discount_id}>{index + 1}</div>

              <div className={styles.discount_num}>
                {discount.is_active ? "فعال" : "غیر فعال"}
              </div>

              <div className={styles.discount_num}>
                {discount.products_count}
              </div>

              <div className={styles.discount_value}>
                {discount.discount_value} درصد
              </div>
            </Link>
          ))
        ) : (
          <div className={styles.no_discount}>تخفیفی یافت نشد !</div>
        )}
      </div>
    </div>
  );
}
