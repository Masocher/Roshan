import styles from "../../styles/home/Categories.module.css";
import img_1 from "../../../public/images/slider-1.jpg"
import img_2 from "../../../public/images/slider-2.jpg"
import img_3 from "../../../public/images/slider-3.jpg"
import img_4 from "../../../public/images/slider-4.jpg"
import Image from "next/image";

export default function Categories() {
    return (
        <div className={styles.container}>
            <div className={styles.category_box}>
                <Image
                    className={styles.category_img}
                    src={img_1}
                    alt="دسته بندی"
                    width={100}
                    height={100}
                    quality={100}
                    priority
                />

                <div className={styles.category_title}>
                    لورم ایپسوم یک متن ساختگی است
                    <div className={styles.show_btn}>مشاهده</div>
                </div>
            </div>

            <div className={styles.category_box}>
                <Image
                    className={styles.category_img}
                    src={img_2}
                    alt="دسته بندی"
                    width={100}
                    height={100}
                    quality={100}
                    priority
                />

                <div className={styles.category_title}>
                    لورم ایپسوم یک متن ساختگی است
                    <div className={styles.show_btn}>مشاهده</div>
                </div>
            </div>

            <div className={styles.category_box}>
                <Image
                    className={styles.category_img}
                    src={img_3}
                    alt="دسته بندی"
                    width={100}
                    height={100}
                    quality={100}
                    priority
                />

                <div className={styles.category_title}>
                    لورم ایپسوم یک متن ساختگی است
                    <div className={styles.show_btn}>مشاهده</div>
                </div>
            </div>

            <div className={styles.category_box}>
                <Image
                    className={styles.category_img}
                    src={img_4}
                    alt="دسته بندی"
                    width={100}
                    height={100}
                    quality={100}
                    priority
                />

                <div className={styles.category_title}>
                    لورم ایپسوم یک متن ساختگی است
                    <div className={styles.show_btn}>مشاهده</div>
                </div>
            </div>
        </div>
    );
}
