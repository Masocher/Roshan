import styles from "../../styles/products/FilterBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faAngleDown,
    faCheck,
    faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function FilterBox() {
    const [option1, setOption1] = useState(false);
    const [option2, setOption2] = useState(false);
    const [option3, setOption3] = useState(false);

    const [categ1, setCateg1] = useState(false);
    const [categ2, setCateg2] = useState(false);
    const [categ3, setCateg3] = useState(false);

    const [categ4, setCateg4] = useState(false);
    const [categ5, setCateg5] = useState(false);
    const [categ6, setCateg6] = useState(false);

    return (
        <div className={styles.container}>
            <div
                onClick={() => {
                    setOption1(false);
                    setOption2(false);
                    setOption3(false);
                }}
                className={`${styles.black_box} ${
                    option1 || option2 || option3 ? styles.show : ""
                }`}
            ></div>

            <div className={styles.title_box}>فیلتر ها</div>

            <div className={styles.filters}>
                <div
                    className={`${styles.filter_box} ${
                        option1 ? styles.show : ""
                    }`}
                >
                    <div className={styles.filter_box_inf}>
                        <div
                            onClick={() => {
                                setOption1(!option1);
                                setOption2(false);
                                setOption3(false);
                            }}
                        >
                            دسته بندی
                        </div>

                        <span
                            onClick={() => {
                                setOption1(!option1);
                                setOption2(false);
                                setOption3(false);
                            }}
                        >
                            <FontAwesomeIcon
                                icon={option1 ? faAngleDown : faAngleLeft}
                            />
                        </span>
                    </div>

                    <div className={styles.options}>
                        <div className={styles.hidden_title}>
                            دسته بندی
                            <span
                                onClick={() => {
                                    setOption1(false);
                                    setOption2(false);
                                    setOption3(false);
                                }}
                            >
                                <FontAwesomeIcon icon={faClose} />
                            </span>
                        </div>

                        <div
                            className={styles.option}
                            onClick={() => {
                                setCateg1(!categ1);
                                setCateg2(false);
                                setCateg3(false);
                            }}
                        >
                            <span>
                                <div className={categ1 ? styles.show : ""}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                            </span>
                            ابزار اندازه گیری
                        </div>

                        <div
                            className={styles.option}
                            onClick={() => {
                                setCateg1(false);
                                setCateg2(!categ2);
                                setCateg3(false);
                            }}
                        >
                            <span>
                                <div className={categ2 ? styles.show : ""}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                            </span>
                            ابزار خانگی
                        </div>

                        <div
                            className={styles.option}
                            onClick={() => {
                                setCateg1(false);
                                setCateg2(false);
                                setCateg3(!categ3);
                            }}
                        >
                            <span>
                                <div className={categ3 ? styles.show : ""}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                            </span>
                            ابزار مکانیکی
                        </div>
                    </div>
                </div>

                <div
                    className={`${styles.filter_box} ${
                        option2 ? styles.show : ""
                    }`}
                >
                    <div
                        className={styles.filter_box_inf}
                        onClick={() => {
                            setOption1(false);
                            setOption2(!option2);
                            setOption3(false);
                        }}
                    >
                        <div>برند</div>

                        <span
                            onClick={() => {
                                setOption1(false);
                                setOption2(!option2);
                                setOption3(false);
                            }}
                        >
                            <FontAwesomeIcon
                                icon={option2 ? faAngleDown : faAngleLeft}
                            />
                        </span>
                    </div>

                    <div className={styles.options}>
                        <div className={styles.hidden_title}>
                            برند
                            <span
                                onClick={() => {
                                    setOption1(false);
                                    setOption2(false);
                                    setOption3(false);
                                }}
                            >
                                <FontAwesomeIcon icon={faClose} />
                            </span>
                        </div>

                        <div
                            className={styles.option}
                            onClick={() => setCateg4(!categ4)}
                        >
                            <span>
                                <div className={categ4 ? styles.show : ""}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                            </span>
                            ابزار اندازه گیری
                        </div>

                        <div
                            className={styles.option}
                            onClick={() => setCateg5(!categ5)}
                        >
                            <span>
                                <div className={categ5 ? styles.show : ""}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                            </span>
                            ابزار خانگی
                        </div>

                        <div
                            className={styles.option}
                            onClick={() => setCateg6(!categ6)}
                        >
                            <span>
                                <div className={categ6 ? styles.show : ""}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                            </span>
                            ابزار مکانیکی
                        </div>
                    </div>
                </div>

                <div
                    className={`${styles.filter_box} ${
                        option3 ? styles.show : ""
                    }`}
                >
                    <div
                        className={styles.filter_box_inf}
                        onClick={() => {
                            setOption1(false);
                            setOption2(false);
                            setOption3(!option3);
                        }}
                    >
                        <div>محدوده قیمت</div>

                        <span
                            onClick={() => {
                                setOption1(false);
                                setOption2(false);
                                setOption3(!option3);
                            }}
                        >
                            <FontAwesomeIcon
                                icon={option3 ? faAngleDown : faAngleLeft}
                            />
                        </span>
                    </div>

                    <div className={styles.options}>
                        <div className={styles.hidden_title}>
                            محدوده قیمت
                            <span
                                onClick={() => {
                                    setOption1(false);
                                    setOption2(false);
                                    setOption3(false);
                                }}
                            >
                                <FontAwesomeIcon icon={faClose} />
                            </span>
                        </div>

                        <form
                            className={styles.price_range}
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div className={styles.input_box}>
                                <div className={styles.title}>از</div>

                                <input
                                    className={styles.price_input}
                                    type="text"
                                    placeholder="کف قیمت"
                                />

                                <div className={styles.toman}>تومان</div>
                            </div>

                            <div className={styles.input_box}>
                                <div className={styles.title}>تا</div>

                                <input
                                    className={styles.price_input}
                                    type="text"
                                    placeholder="سقف قیمت"
                                />

                                <div className={styles.toman}>تومان</div>
                            </div>

                            <button className={styles.price_btn} type="submit">
                                اعمال
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
