import styles from "../../styles/admin/Codes.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import spiner from "../../../public/images/loading.svg";
import Image from "next/image";
import { toast, Toaster } from "react-hot-toast";
import AdminMenu from "@/components/admin/AdminMenu";

export async function getServerSideProps(context) {
  const res = await fetch("https://abazarak.ir/api/admin/cupons/", {
    headers: {
      Cookie: context.req.headers.cookie || "",
    },
  });

  if (!res.ok) {
    return { notFound: true };
  }

  const data = await res.json();
  const codesList = data;

  return {
    props: { codesList },
  };
}

export default function Codes({ codesList }) {
  const [codes, setCodes] = useState(codesList || []);

  const [loading, setLoading] = useState(false);

  const getCodes = () => {
    setLoading(true);
    axios.defaults.withCredentials = true;
    axios
      .get("/api/admin/cupons/")
      .then((response) => {
        setCodes(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const deleteCode = (id) => {
    setLoading(true);
    axios.defaults.withCredentials = true;
    axios
      .delete(`/api/admin/cupons/${id}/`)
      .then((response) => {
        getCodes();
        setLoading(false);
        toast.success("کد تخفیف با موفقیت حذف شد");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
        <div className={styles.loading_wrapper}>
          <Image src={spiner} width={80} height={80} alt="لودینگ" />
        </div>
      </div>

      <Toaster position="bottom-left" reverseOrder={true} />

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
            <div key={code.id} className={styles.offer}>
              <div className={styles.offer_id}>{index + 1}</div>

              <div className={styles.offer_date}>1403/1/14</div>

              <div className={styles.offer_code}>{code.code}</div>

              <div className={styles.offer_value}>
                {code.discount_value}{" "}
                {code.discount_type === "percent" ? "درصد" : "تومان"}
              </div>

              <div className={styles.code_buttons}>
                <div
                  className={styles.code_delete}
                  onClick={() => deleteCode(code.id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.no_code}>کد تخفیفی یافت نشد !</div>
        )}
      </div>

      <AdminMenu />
    </div>
  );
}
