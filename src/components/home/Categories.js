import styles from "../../styles/home/Categories.module.css";
import img from "../../../public/images/1.webp";
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
                </div>
            </div>
        </div>
    );
}
