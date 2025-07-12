import styles from "../../../styles/admin-options/EditComment.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCheckCircle,
  faRotate,
  faStar,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import spiner from "../../../../public/images/loading.svg";
import axios from "axios";

axios.defaults.withCredentials = true;

export async function getServerSideProps(context) {
  const { id } = context.params;

  const res = await fetch(`https://abazarak.ir/api/admin/comments/${id}`, {
    headers: {
      Cookie: context.req.headers.cookie || "",
    },
  });

  const comment = await res.json();

  return {
    props: {
      singleComment: comment,
    },
  };
}

export default function EditComment({ singleComment }) {
  const [loading, setLoading] = useState(false);

  const [comment, setComment] = useState(singleComment || []);

  const router = useRouter();

  const [status, setStatus] = useState(comment.accepted);

  const [answer, setAnswer] = useState("");

  const getAnswer = () => {
    if (answer.length === 0) {
      toast.error("حداقل یک کاراکتر وارد کنید !");
    } else {
      setLoading(true);
      axios
        .post(`/api/admin/comments/${comment.id}/answer_comment/`, {
          content: answer,
        })
        .then(() => {
          toast.success("پاسخ با موفقیت ثبت شد");
          setAnswer("");
          setLoading(false);
        })
        .catch(() => {
          toast.error("خطایی رخ داد !");
          setLoading(false);
        });
    }
  };

  const deleteComment = () => {
    setLoading(true);
    axios
      .delete(`/api/admin/comments/${comment.id}`)
      .then(() => {
        toast.success("کامنت با موفقیت حذف شد");
        setLoading(false);
        router.push("/admin-panel/comments");
      })
      .catch(() => toast.error("خطایی رخ داد !"));
  };

  const acceptComment = () => {
    setLoading(true);
    axios
      .patch(`/api/admin/comments/${comment.id}/`, {
        accepted: !status,
      })
      .then((response) => {
        setStatus(response.data.accepted);
        setLoading(false);
        toast.success("وضعیت کامنت با موفقیت تغییر کرد");
      })
      .catch(() => {
        toast.error("خطایی رخ داد !");
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
        <div className={styles.loading_wrapper}>
          <div className={styles.loading_wrapper_title}>روشن ابزار</div>
          <Image src={spiner} width={40} height={40} alt="لودینگ" />
        </div>
      </div>

      <Toaster position="bottom-left" reverseOrder={true} />

      <div className={styles.main_title}>
        <Link className={styles.back_btn} href={"/admin-panel/comments"}>
          <span>
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
          بازگشت
        </Link>
        صفحه کامنت
      </div>

      <div className={styles.comment}>
        <div className={styles.first_section}>
          <div className={styles.main_information}>
            <div className={styles.name}>{comment.author.get_full_name}</div>
            <div className={styles.phone}>{comment.author.number}</div>
          </div>

          <div className={styles.rate}>
            <div className={styles.title}>امتیاز</div>

            <div className={styles.stars}>
              <span className={`${comment.score >= 1 ? styles.show : ""}`}>
                <FontAwesomeIcon icon={faStar} />
              </span>

              <span className={`${comment.score >= 2 ? styles.show : ""}`}>
                <FontAwesomeIcon icon={faStar} />
              </span>

              <span className={`${comment.score >= 3 ? styles.show : ""}`}>
                <FontAwesomeIcon icon={faStar} />
              </span>

              <span className={`${comment.score >= 4 ? styles.show : ""}`}>
                <FontAwesomeIcon icon={faStar} />
              </span>

              <span className={`${comment.score >= 5 ? styles.show : ""}`}>
                <FontAwesomeIcon icon={faStar} />
              </span>
            </div>
          </div>

          <div className={styles.date}>
            <div className={styles.title}>تاریخ</div>

            <div className={styles.content}>{comment.created_at}</div>
          </div>

          <div className={styles.comment_btn} onClick={() => deleteComment()}>
            <div>
              <span>
                <FontAwesomeIcon icon={faTrashCan} />
              </span>
              حذف
            </div>
          </div>

          <div
            className={`${styles.comment_btn} ${status ? styles.show : ""}`}
            onClick={() => {
              if (status === true) {
                setStatus(false);
              } else {
                null;
              }
            }}
          >
            <div
              onClick={() => {
                acceptComment();
              }}
            >
              <span>
                <FontAwesomeIcon icon={status ? faRotate : faCheckCircle} />
              </span>
              {status ? "تایید شده" : "تایید"}
            </div>
          </div>
        </div>

        <div className={styles.second_section}>
          <div className={styles.user_comment}>
            <div className={styles.title}>متن کامنت</div>

            <div className={styles.content}>{comment.content}</div>
          </div>

          <Link
            className={styles.product}
            href={`/product/${comment.product_slug}`}
          >
            <Image
              src={comment.product_image}
              className={styles.product_image}
              alt="عکس محصول"
              height={100}
              width={100}
            />

            <div className={styles.product_name}>{comment.product_name}</div>
          </Link>
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

          <div className={styles.submit_btn} onClick={() => getAnswer()}>
            ثبت پاسخ
          </div>
        </div>
      </div>
    </div>
  );
}
