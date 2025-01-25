import styles from "../styles/contact-us/ContactUs.module.css";
import Header from "@/components/global/Header";
import BlackBackground from "@/components/global/BlacKBackground";
import MiniMenu from "@/components/global/MiniMenu";
import Footer from "@/components/global/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faLocationDot,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function ContactUs() {
    let [categoriesStatus, setCategoriesStatus] = useState(false);

    return (
        <div className={styles.container}>
            <BlackBackground
                status={categoriesStatus}
                setStatus={setCategoriesStatus}
            />
            <MiniMenu
                status={categoriesStatus}
                setStatus={setCategoriesStatus}
            />
            <Header status={categoriesStatus} setStatus={setCategoriesStatus} />

            <div className={styles.wrapper}>
                <div className={styles.left_section}>
                    <div className={styles.inf_box}>
                        <div className={styles.inf_title}>
                            <FontAwesomeIcon icon={faLocationDot} />
                        </div>

                        <div className={styles.inf_value}>لرستان - دورود</div>
                    </div>

                    <div className={styles.inf_box}>
                        <div className={styles.inf_title}>
                            <FontAwesomeIcon icon={faPhone} />
                        </div>

                        <div className={styles.inf_value}>09054182307</div>
                    </div>

                    <div className={styles.inf_box}>
                        <div className={styles.inf_title}>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>

                        <div className={styles.inf_value}>
                            Masocherr@gmail.com
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={(e) => e.preventDefault()}
                    className={styles.right_section}
                >
                    <div className={styles.main_title}>ارسال پیام</div>

                    <input
                        className={`${styles.inf_input} ${styles.input_box}`}
                        type="text"
                        placeholder="نام و نام خانوادگی"
                    />

                    <input
                        className={`${styles.inf_input} ${styles.input_box}`}
                        type="text"
                        placeholder="شماره موبایل"
                    />

                    <input
                        className={`${styles.title_input} ${styles.input_box}`}
                        type="text"
                        placeholder="عنوان پیام را وارد کنید"
                    />

                    <textarea
                        className={`${styles.body_input} ${styles.input_box}`}
                        placeholder="متن پیام را وارد کنید"
                    />

                    <button className={styles.send_message_btn} type="submit">
                        ارسال پیام
                    </button>
                </form>
            </div>

            <Footer />
        </div>
    );
}
