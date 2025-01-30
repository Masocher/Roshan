import styles from "../../../styles/admin-options/ShowTicket.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRight,
    faCheck,
    faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ShowTicket() {
    const router = useRouter();

    const [seenStatus, setSeenStatus] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.main_title}>
                <div className={styles.back_btn} onClick={() => router.back()}>
                    <span>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                    بازگشت
                </div>
                صفحه تیکت
            </div>

            <div className={styles.ticket}>
                <div className={styles.first_section}>
                    <div className={styles.main_information}>
                        <div className={styles.name}>امیر مسعود چراغی</div>
                        <div className={styles.phone}>09054182307</div>
                    </div>

                    <div className={styles.date}>
                        <div className={styles.title}>تاریخ</div>

                        <div className={styles.content}>1403/1/14</div>
                    </div>

                    <div
                        className={`${styles.comment_btn} ${
                            seenStatus ? styles.show : ""
                        }`}
                        onClick={() => {
                            if (seenStatus) {
                                setSeenStatus(false);
                            } else {
                                null;
                            }
                        }}
                    >
                        <div onClick={() => setSeenStatus(true)}>
                            <span>
                                <FontAwesomeIcon
                                    icon={seenStatus ? faCheck : faEye}
                                />
                            </span>
                            {seenStatus ? "مشاهده شده" : "مشاهده کردم"}
                        </div>
                    </div>
                </div>

                <div className={styles.second_section}>
                    <div className={styles.title}>عنوان تیکت</div>

                    <div className={styles.content}>
                        لورم ایپسوم یک متن ساختگی است
                    </div>
                </div>

                <div className={styles.second_section}>
                    <div className={styles.title}>متن تیکت</div>

                    <div className={styles.content}>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و
                        برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با
                        هدف بهبود ابزارهای کاربردی می باشد
                    </div>
                </div>

                <div className={styles.third_section}>
                    <div className={styles.section_title}>پاسخ دادن</div>

                    <textarea
                        className={styles.reply_input}
                        typeof="text"
                        placeholder="پاسخ خودرا اینجا وارد کنید"
                    />

                    <div className={styles.submit_btn}>ثبت پاسخ</div>
                </div>
            </div>
        </div>
    );
}
