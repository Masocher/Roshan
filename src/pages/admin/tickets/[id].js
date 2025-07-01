import styles from "../../../styles/admin-options/ShowTicket.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCheck,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import spiner from "../../../../public/images/loading.svg";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export async function getServerSideProps(context) {
  const { id } = context.params;

  const res = await fetch(`https://abazarak.ir/api/admin/tickets/${id}/`, {
    headers: {
      Cookie: context.req.headers.cookie || "",
    },
  });

  if (!res.ok) {
    return { notfound: true };
  }

  const data = await res.json();
  const ticketData = data;

  return {
    props: {
      ticketData,
    },
  };
}

export default function ShowTicket({ ticketData }) {
  console.log(ticketData);

  const [loading, setLoading] = useState(false);

  const [seenStatus, setSeenStatus] = useState(ticketData.is_seen);

  const [answer, setAnswer] = useState("");

  const seen = () => {
    setLoading(true);
    axios.defaults.withCredentials = true;
    axios
      .post(`/api/admin/tickets/${ticketData.id}/toggle_seen/`)
      .then((response) => {
        toast.success("وضعیت تیکت تغییر کرد");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const toAnswer = () => {
    console.log("پاسخ داده شد");
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
        <div className={styles.loading_wrapper}>
          <Image src={spiner} width={80} height={80} alt="لودینگ" />
        </div>
      </div>

      <Toaster position="bottom-left" reverseOrder={true} />

      <div className={styles.main_title}>
        <Link href={"/admin"} className={styles.back_btn}>
          <span>
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
          بازگشت
        </Link>
        صفحه تیکت
      </div>

      <div className={styles.ticket}>
        <div className={styles.first_section}>
          <div className={styles.main_information}>
            <div className={styles.name}>{ticketData.full_name}</div>
            <div className={styles.phone}>{ticketData.number}</div>
          </div>

          <div className={styles.date}>
            <div className={styles.title}>تاریخ</div>

            <div className={styles.content}>{ticketData.created_at}</div>
          </div>

          <div
            className={`${styles.comment_btn} ${seenStatus ? styles.show : ""}`}
          >
            <div
              onClick={() => {
                setSeenStatus(!seenStatus);
                seen();
              }}
            >
              <span>
                <FontAwesomeIcon icon={seenStatus ? faCheck : faEye} />
              </span>
              {seenStatus ? "مشاهده شده" : "مشاهده کردم"}
            </div>
          </div>
        </div>

        <div className={styles.second_section}>
          <div className={styles.title}>متن تیکت</div>

          <div className={styles.content}>{ticketData.content}</div>
        </div>

        <div className={styles.third_section}>
          <div className={styles.section_title}>پاسخ دادن</div>

          <textarea
            className={styles.reply_input}
            typeof="text"
            placeholder="پاسخ خودرا اینجا وارد کنید"
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
          />

          <div className={styles.submit_btn} onClick={() => toAnswer()}>
            ثبت پاسخ
          </div>
        </div>
      </div>
    </div>
  );
}
