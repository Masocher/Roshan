import styles from "../../styles/home/Categories.module.css";
import img from "../../../public/images/11.jpg";
import Image from "next/image";

export default function Categories() {
    return (
        <div className={styles.container}>
            <div className={styles.category_box}>
                <Image
                    className={styles.category_img}
                    src={img}
                    alt="دسته بندی"
                />

                <div className={styles.category_title}>
                    لورم ایپسوم یک متن ساختگی است
                    <div className={styles.show_btn}>مشاهده</div>
                </div>
            </div>

            <div className={styles.category_box}>
                <Image
                    className={styles.category_img}
                    src={img}
                    alt="دسته بندی"
                />

                <div className={styles.category_title}>
                    لورم ایپسوم یک متن ساختگی است
                    <div className={styles.show_btn}>مشاهده</div>
                </div>
            </div>

            <div className={styles.category_box}>
                <Image
                    className={styles.category_img}
                    src={img}
                    alt="دسته بندی"
                />

                <div className={styles.category_title}>
                    لورم ایپسوم یک متن ساختگی است
                    <div className={styles.show_btn}>مشاهده</div>
                </div>
            </div>

            <div className={styles.category_box}>
                <Image
                    className={styles.category_img}
                    src={img}
                    alt="دسته بندی"
                />

                <div className={styles.category_title}>
                    لورم ایپسوم یک متن ساختگی است
                    <div className={styles.show_btn}>مشاهده</div>
                </div>
            </div>
        </div>
    );
}
