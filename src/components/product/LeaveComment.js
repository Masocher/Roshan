import styles from "../../styles/product/LeaveComment.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import spiner from "../../../public/images/loading.svg";

axios.defaults.withCredentials = true;

export default function LeaveComment({
  status,
  setStatus,
  product_image,
  product_name,
  product_slug,
}) {
  const [starNum, setStarNum] = useState(1);

  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);

  const addComment = async () => {
    if (!content) {
      toast.error("متن دیدگاه نمیتواند خالی باشد");
      return;
    }

    if (!window.grecaptcha) {
      toast.error("reCAPTCHA بارگذاری نشد.");
      return;
    }

    try {
      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: "comment" }
      );

      setLoading(true);
      axios
        .post(`/api/products/${product_slug}/add_comment/`, {
          content: content,
          score: starNum,
          recaptcha: token,
        })
        .then(() => {
          setStarNum(1);
          setContent("");
          toast.success("دیدگاه شما بعد از تایید مدیر ثبت خواهد شد !");
          setStatus(false);
          setLoading(false);
        })
        .catch((err) => {
          if (err.status === 401) {
            toast.error("برای ثبت دیدگاه ابتدا وارد حساب خود شوید");
            setStatus(false);
          } else if (err.status === 400) {
            toast.error("متن دیدگاه : " + err.response.data.content);
          } else {
            toast.error("خطایی رخ داد !");
          }
          setLoading(false);
        });
    } catch (error) {
      toast.error("احراز reCAPTCHA با خطا مواجه شد.");
    }
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

      <div
        className={`${styles.black_back} ${status ? styles.show : ""}`}
      ></div>

      <div
        className={`${styles.leave_comment_wrapper} ${
          status ? styles.show : ""
        }`}
      >
        <div className={styles.leave_comment_box}>
          <div className={styles.top_content}>
            <div className={styles.back_btn} onClick={() => setStatus(false)}>
              <span>
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
              بازگشت
            </div>

            <div className={styles.main_title}>ثبت دیدگاه</div>
          </div>

          <div className={styles.about_product}>
            <Image
              src={product_image}
              alt="عکس محصول"
              className={styles.product_img}
              width={100}
              height={100}
              quality={100}
            />

            <div className={styles.product_title}>{product_name}</div>
          </div>

          <div className={styles.stars}>
            <div className={styles.title}>از 1 تا 5 امتیاز بدهید</div>

            <div className={styles.star_boxes}>
              <div
                className={`${styles.star_box} ${
                  starNum >= 1 ? styles.show : ""
                }`}
                onClick={() => setStarNum(1)}
              >
                <span>
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <div>1</div>
              </div>

              <div
                className={`${styles.star_box} ${
                  starNum >= 2 ? styles.show : ""
                }`}
                onClick={() => setStarNum(2)}
              >
                <span>
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <div>2</div>
              </div>

              <div
                className={`${styles.star_box} ${
                  starNum >= 3 ? styles.show : ""
                }`}
                onClick={() => setStarNum(3)}
              >
                <span>
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <div>3</div>
              </div>

              <div
                className={`${styles.star_box} ${
                  starNum >= 4 ? styles.show : ""
                }`}
                onClick={() => setStarNum(4)}
              >
                <span>
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <div>4</div>
              </div>

              <div
                className={`${styles.star_box} ${
                  starNum === 5 ? styles.show : ""
                }`}
                onClick={() => setStarNum(5)}
              >
                <span>
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <div>5</div>
              </div>
            </div>
          </div>

          <form
            className={styles.leave_comment_form}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className={styles.title}>متن دیدگاه :</div>

            <textarea
              placeholder="نظر خودرا به اشتراک بگذارید..."
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />

            <button
              className={styles.submit_comment_btn}
              onClick={() => addComment()}
            >
              ثبت دیدگاه
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
