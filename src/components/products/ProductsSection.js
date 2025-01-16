import styles from "../../styles/products/ProductsSection.module.css";
import FilterBox from "./FilterBox";
import ProductsAll from "./ProductsAll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSort,
    faAngleRight,
    faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function ProductsSection() {
    const [option1, setOption1] = useState(true);
    const [option2, setOption2] = useState(false);
    const [option3, setOption3] = useState(false);
    const [option4, setOption4] = useState(false);
    const [option5, setOption5] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.f_boxes}>
                <div className={styles.title}>
                    <span>
                        <FontAwesomeIcon icon={faSort} />
                    </span>
                    مرتب سازی :
                </div>

                <div
                    className={`${styles.f_box} ${option1 ? styles.show : ""}`}
                    onClick={() => {
                        setOption1(true);
                        setOption2(false);
                        setOption3(false);
                        setOption4(false);
                        setOption5(false);
                    }}
                >
                    همه
                </div>
                <div
                    className={`${styles.f_box} ${option2 ? styles.show : ""}`}
                    onClick={() => {
                        setOption1(false);
                        setOption2(true);
                        setOption3(false);
                        setOption4(false);
                        setOption5(false);
                    }}
                >
                    پر فروش ترین
                </div>

                <div
                    className={`${styles.f_box} ${option3 ? styles.show : ""}`}
                    onClick={() => {
                        setOption1(false);
                        setOption2(false);
                        setOption3(true);
                        setOption4(false);
                        setOption5(false);
                    }}
                >
                    جدید ترین
                </div>

                <div
                    className={`${styles.f_box} ${option4 ? styles.show : ""}`}
                    onClick={() => {
                        setOption1(false);
                        setOption2(false);
                        setOption3(false);
                        setOption4(true);
                        setOption5(false);
                    }}
                >
                    گران ترین
                </div>

                <div
                    className={`${styles.f_box} ${option5 ? styles.show : ""}`}
                    onClick={() => {
                        setOption1(false);
                        setOption2(false);
                        setOption3(false);
                        setOption4(false);
                        setOption5(true);
                    }}
                >
                    ارزان ترین
                </div>
            </div>

            <div className={styles.products_container}>
                <FilterBox />
                <ProductsAll />
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
        </div>
    );
}
