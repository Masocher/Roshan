import Head from "next/head";
import styles from "../../styles/admin/Offers.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import AdminMenu from "@/components/admin/AdminMenu";

export async function getServerSideProps(context) {
  const res = await fetch("https://abazarak.ir/api/admin/offers/", {
    headers: {
      Cookie: context.req.headers.cookie || "",
    },
  });

  if (!res.ok) {
    return { notFound: true };
  }

  const data = await res.json();
  const offersList = data;

  return {
    props: { offersList },
  };
}

export default function Offers({ offersList }) {
  const [offers, setOffers] = useState(offersList || []);

  return (
    <>
      <Head>
        <title>ابازارک | پنل مدیریت | آفر ها</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content={"پنل مدیریت سایت ابازارک | آفر ها"} />
      </Head>

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

                <div className={styles.offer_product}>
                  {offer.products_count}
                </div>

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

        <AdminMenu />
      </div>
    </>
  );
}
