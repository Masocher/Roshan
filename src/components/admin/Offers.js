import styles from "../../styles/admin/Offers.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Offers() {
  const [loading, setLoading] = useState(false);

  const [offers, setOffers] = useState([]);

  const getOffers = () => {
    setLoading(true);
    axios.defaults.withCredentials = true;
    axios
      .get("/api/admin/offers/")
      .then((response) => {
        console.log(response);
        setOffers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getOffers();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.top_box}>
        <Link href={"/admin/offers/create"} className={styles.add_btn}>
          <span>
            <FontAwesomeIcon icon={faPlus} />
          </span>
          آفر جدید
        </Link>
      </div>

      <div className={styles.offers}>
        <div className={styles.offers_top}>
          <div className={styles.offers_title}>شماره</div>
          <div className={styles.offers_title}>محصولات</div>
          <div className={styles.offers_title}>حداقل تعداد</div>
          <div className={styles.offers_title}>نوع تخفیف</div>
          <div className={styles.offers_title}>مقدار تخفیف</div>
        </div>

        {offers.length > 0 ? (
          offers.map((offer, index) => (
            <Link
              className={styles.offer}
              key={offer.id}
              href={`/admin/offers/${offer.id}`}
            >
              <div className={styles.offer_id}>{index + 1}</div>

              <div className={styles.offer_product}>{offer.products}</div>

              <div className={styles.offer_num}>{offer.at_least}</div>

              <div className={styles.offer_status}>
                {offer.discount_type === "percent" ? "درصدی" : "تومانی"}
              </div>

              <div className={styles.offer_value}>
                {offer.discount_value}{" "}
                {offer.discount_type === "percent" ? "درصد" : "تومان"}
              </div>
            </Link>
          ))
        ) : (
          <div className={styles.no_offer}>آفری یافت نشد !</div>
        )}
      </div>
    </div>
  );
}
