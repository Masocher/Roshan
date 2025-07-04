import styles from "../../styles/admin/Discounts.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import AdminMenu from "@/components/admin/AdminMenu";

export async function getServerSideProps(context) {
  const res = await fetch("https://abazarak.ir/api/admin/discounts/", {
    headers: {
      Cookie: context.req.headers.cookie || "",
    },
  });

  if (!res.ok) {
    return { notFound: true };
  }

  const data = await res.json();
  const discountsList = data;

  return {
    props: { discountsList },
  };
}

export default function Discounts({ discountsList }) {
  const [discounts, setDiscounts] = useState(discountsList || []);

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

      <AdminMenu />
    </div>
  );
}
