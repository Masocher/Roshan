import styles from "../../styles/products/FilterBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faAngleDown,
    faCheck,
    faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function FilterBox({
    filters,
    setFilters,
    categName,
    brandName,
    setPriceRange,
    min_price,
    max_price,
    minPriceText,
    maxPriceText,
    setMinPriceText,
    setMaxPriceText,
}) {
    const [option1, setOption1] = useState(false);
    const [option2, setOption2] = useState(false);
    const [option3, setOption3] = useState(false);

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios
            .get("https://abazarak.ir/api/categories/")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios
            .get("https://abazarak.ir/api/brands/")
            .then((response) => {
                setBrands(response.data);
            })
            .catch((err) => console.log(err));
    }, []);

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

                        {categories.map((categ) => (
                            <div
                                className={styles.option}
                                key={categ.id}
                                onClick={() => {
                                    if (categ.name === categName) {
                                        setFilters({
                                            ...filters,
                                            categName: "",
                                        });
                                    } else {
                                        setFilters({
                                            ...filters,
                                            categName: categ.name,
                                        });
                                    }
                                }}
                            >
                                <span>
                                    <div
                                        className={
                                            categ.name === categName
                                                ? styles.show
                                                : ""
                                        }
                                    >
                                        <FontAwesomeIcon icon={faCheck} />
                                    </div>
                                </span>
                                {categ.name}
                            </div>
                        ))}
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

                        {brands.map((brand) => (
                            <div
                                className={styles.option}
                                onClick={() => {
                                    if (brand.name === brandName) {
                                        setFilters({
                                            ...filters,
                                            brandName: "",
                                        });
                                    } else {
                                        setFilters({
                                            ...filters,
                                            brandName: brand.name,
                                        });
                                    }
                                }}
                                key={brand.id}
                            >
                                <span>
                                    <div
                                        className={
                                            brand.name === brandName
                                                ? styles.show
                                                : ""
                                        }
                                    >
                                        <FontAwesomeIcon icon={faCheck} />
                                    </div>
                                </span>
                                {brand.name}
                            </div>
                        ))}
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
                                    type="number"
                                    placeholder="کف قیمت"
                                    onChange={(e) => {
                                        setMinPriceText(e.target.value);
                                    }}
                                />

                                <div className={styles.toman}>تومان</div>
                            </div>

                            <div className={styles.input_box}>
                                <div className={styles.title}>تا</div>

                                <input
                                    className={styles.price_input}
                                    type="number"
                                    placeholder="سقف قیمت"
                                    onChange={(e) => {
                                        setMaxPriceText(e.target.value);
                                    }}
                                />

                                <div className={styles.toman}>تومان</div>
                            </div>

                            <button
                                className={styles.price_btn}
                                onClick={() =>
                                    setPriceRange({
                                        min_price: minPriceText,
                                        max_price: maxPriceText,
                                    })
                                }
                            >
                                اعمال
                            </button>
                        </form>
                    </div>
                </div>

                <div
                    className={`${styles.reset_btn} ${
                        min_price === "" &&
                        max_price === "" &&
                        categName === "" &&
                        brandName === ""
                            ? ""
                            : styles.show
                    }`}
                    onClick={() => {
                        setOption1(false);
                        setOption2(false);
                        setOption3(false);

                        setPriceRange({
                            min_price: "",
                            max_price: "",
                        });

                        setFilters({
                            categName: "",
                            brandName: "",
                        });
                    }}
                >
                    <span>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                    حذف فیلتر ها
                </div>
            </div>
        </div>
    );
}
