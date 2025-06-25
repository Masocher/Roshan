import styles from "../../styles/admin/Codes.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import spiner from "../../../public/images/loading.svg";
import Image from "next/image";

export default function Codes() {
  const [codes, setCodes] = useState([]);

  const [loading, setLoading] = useState(true);

  const getCodes = () => {
    setLoading(true);
    axios
      .get("/api/admin/cupons/")
      .then((response) => {
        console.log(response.data);
        setCodes(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getCodes();
  }, []);

  return (
    <div className={styles.container}>
      <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
        <div className={styles.loading_wrapper}>
          <Image src={spiner} width={80} height={80} alt="لودینگ" />
        </div>
      </div>

      <div className={styles.top_box}>
        <Link href={"/admin/codes/create"} className={styles.add_btn}>
          <span>
            <FontAwesomeIcon icon={faPlus} />
          </span>
          کد تخفیف جدید
        </Link>
      </div>

      <div className={styles.offers}>
        <div className={styles.offers_top}>
          <div className={styles.offers_title}>شماره</div>
          <div className={styles.offers_title}>فعال تا</div>
          <div className={styles.offers_title}>کد تخفیف</div>
          <div className={styles.offers_title}>مقدار</div>
          <div className={styles.hidden_title}></div>
        </div>

        {codes.length > 0 ? (
          codes.map((code, index) => (
            <Link
              key={code.id}
              className={styles.offer}
              href={`/admin/codes/${0}`}
            >
              <div className={styles.offer_id}>{index + 1}</div>

              <div className={styles.offer_date}>1403/1/14</div>

              <div className={styles.offer_code}>{code.code}</div>

              <div className={styles.offer_value}>
                {code.discount_value}{" "}
                {code.discount_type === "percent" ? "درصد" : "تومان"}
              </div>
            </Link>
          ))
        ) : (
          <div className={styles.no_code}>کد تخفیفی یافت نشد !</div>
        )}
      </div>
    </div>
  );
}
