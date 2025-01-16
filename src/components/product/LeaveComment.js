import styles from "../../styles/product/LeaveComment.module.css";
import Image from "next/image";
import img from "../../../public/images/1.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function LeaveComment({ status, setStatus }) {
    return (
        <div className={styles.container}>
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
                        <div
                            className={styles.back_btn}
                            onClick={() => setStatus(false)}
                        >
                            <span>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </span>
                            بازگشت
                        </div>

                        <div className={styles.main_title}>ثبت دیدگاه</div>
                    </div>

                    <div className={styles.about_product}>
                        <Image
                            src={img}
                            alt="عکس محصول"
                            className={styles.product_img}
                        />

                        <div className={styles.product_title}>
                            هود آشپزخانه مدل سیمرغ
                        </div>
                    </div>

                    <form className={styles.leave_comment_form}>
                        <div className={styles.title}>متن دیدگاه :</div>

                        <textarea placeholder="نظر خودرا به اشتراک بگذارید..." />

                        <button className={styles.submit_comment_btn}>
                            ثبت دیدگاه
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
