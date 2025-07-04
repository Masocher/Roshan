import styles from "../../styles/admin/Comments.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleLeft,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import spiner from "../../../public/images/loading.svg";
import Image from "next/image";
import AdminMenu from "@/components/admin/AdminMenu";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [accepted, setAccepted] = useState("");

  const getComments = () => {
    setLoading(true);
    axios.defaults.withCredentials = true;
    axios
      .get(`/api/admin/comments/?accepted=${accepted}`)
      .then((response) => {
        setComments(response.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getComments();
  }, [accepted]);

  return (
    <div className={styles.container}>
      <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
        <div className={styles.loading_wrapper}>
          <Image src={spiner} width={80} height={80} alt="لودینگ" />
        </div>
      </div>

      <div className={styles.top_box}>
        <div
          className={`${styles.inventory_button} ${
            accepted === false ? styles.show : ""
          }`}
          onClick={() => {
            if (accepted === false) {
              setAccepted("");
            } else {
              setAccepted(false);
            }
          }}
        >
          <div>
            <span></span>
          </div>
          تایید نشده ها
        </div>

        <div
          className={`${styles.inventory_button} ${
            accepted === true ? styles.show : ""
          }`}
          onClick={() => {
            if (accepted === true) {
              setAccepted("");
            } else {
              setAccepted(true);
            }
          }}
        >
          <div>
            <span></span>
          </div>
          تایید شده ها
        </div>
      </div>

      <div className={styles.comments}>
        <div className={styles.comments_top}>
          <div className={styles.comments_title}>شماره</div>
          <div className={styles.comments_title}>نویسنده</div>
          <div className={styles.comments_title}>محصول</div>
          <div className={styles.comments_title}>امتیاز</div>
          <div className={styles.comments_title}>تاریخ</div>
          <div className={styles.comments_title}>وضعیت</div>
        </div>

        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <Link
              className={styles.comment}
              href={`/admin/comments/${comment.id}`}
              key={comment.id}
            >
              <div className={styles.comment_id}>{index + 1}</div>

              <div className={styles.comment_user}>{comment.author}</div>

              <div className={styles.comment_name}>{comment.product_name}</div>

              <div className={styles.comment_stars}>
                <div className={`${comment.score >= 1 ? styles.show : ""}`}>
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <div className={`${comment.score >= 2 ? styles.show : ""}`}>
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <div className={`${comment.score >= 3 ? styles.show : ""}`}>
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <div className={`${comment.score >= 4 ? styles.show : ""}`}>
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <div className={`${comment.score >= 5 ? styles.show : ""}`}>
                  <FontAwesomeIcon icon={faStar} />
                </div>
              </div>

              <div className={styles.comment_date}>{comment.created_at}</div>

              <div className={styles.comment_status}>
                {comment.accepted ? "تایید شده" : "تایید نشده"}
              </div>
            </Link>
          ))
        ) : (
          <div className={styles.no_comment}>نظری یافت نشد !</div>
        )}
      </div>

      <div className={styles.pagination}>
        <div className={styles.perv_btn}>
          <span>
            <FontAwesomeIcon icon={faAngleLeft} />
          </span>
          قبلی
        </div>
        <div className={`${styles.page_btn} ${styles.show}`}>1</div>
        <div className={`${styles.page_btn} ${""}`}>2</div>
        <div className={`${styles.page_btn} ${""}`}>3</div>
        <div className={`${styles.page_btn} ${""}`}>4</div>
        <div className={`${styles.page_btn} ${""}`}>5</div>
        <div className={styles.next_btn}>
          بعدی
          <span>
            <FontAwesomeIcon icon={faAngleRight} />
          </span>
        </div>
      </div>

      <AdminMenu />
    </div>
  );
}
