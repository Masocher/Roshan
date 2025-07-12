import Head from "next/head";
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

axios.defaults.withCredentials = true;

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [accepted, setAccepted] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getComments = (page = 1) => {
    setLoading(true);
    axios
      .get(`/api/admin/comments/?accepted=${accepted}&page=${page}`)
      .then((response) => {
        setComments(response.data.results);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      })
      .catch(() => {
        toast.error("خطایی رخ داد !");
        setLoading(false);
      });
  };

  useEffect(() => {
    getComments(currentPage);
  }, [accepted, currentPage]);

  const renderPagination = () => {
    let pages = [];
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    if (currentPage > 2) {
      pages.push(1);
    }

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    if (currentPage < totalPages - 1) {
      pages.push(totalPages);
    }

    return pages.map((page, index) => {
      if (page === "...") {
        return (
          <div key={index} className={styles.page_btn}>
            ...
          </div>
        );
      }
      return (
        <div
          key={index}
          className={`${styles.page_btn} ${
            page === currentPage ? styles.show : ""
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </div>
      );
    });
  };

  return (
    <>
      <Head>
        <title>ابازارک | پنل مدیریت | کامنت ها</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content={"پنل مدیریت سایت ابازارک | کامنت ها"}
        />
      </Head>

      <div className={styles.container}>
        <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
          <div className={styles.loading_wrapper}>
            <div className={styles.loading_wrapper_title}>روشن ابزار</div>
            <Image src={spiner} width={40} height={40} alt="لودینگ" />
          </div>
        </div>

        <div className={styles.top_box}>
          <div
            className={`${styles.inventory_button} ${
              accepted === false ? styles.show : ""
            }`}
            onClick={() => {
              setCurrentPage(1);
              setAccepted(accepted === false ? "" : false);
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
              setCurrentPage(1);
              setAccepted(accepted === true ? "" : true);
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

                <div className={styles.comment_name}>
                  {comment.product_name}
                </div>

                <div className={styles.comment_stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className={`${comment.score >= star ? styles.show : ""}`}
                    >
                      <FontAwesomeIcon icon={faStar} />
                    </div>
                  ))}
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

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <div
              className={styles.perv_btn}
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            >
              <span>
                <FontAwesomeIcon icon={faAngleLeft} />
              </span>
              قبلی
            </div>
            {renderPagination()}
            <div
              className={styles.next_btn}
              onClick={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
            >
              بعدی
              <span>
                <FontAwesomeIcon icon={faAngleRight} />
              </span>
            </div>
          </div>
        )}

        <AdminMenu />
      </div>
    </>
  );
}
