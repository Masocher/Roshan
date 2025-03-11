import styles from "../../styles/products/ProductsSection.module.css";
import FilterBox from "./FilterBox";
import ProductsAll from "./ProductsAll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSort,
    faAngleRight,
    faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "@/store/Actions";
import axios from "axios";

export default function ProductsSection() {
    const dispatch = useDispatch();

    const [filters, setFilters] = useState({
        categName: "",
        brandName: "",
    });

    const [minPriceText, setMinPriceText] = useState("");
    const [maxPriceText, setMaxPriceText] = useState("");

    const [priceRange, setPriceRange] = useState({
        min_price: "",
        max_price: "",
    });

    const [ordering, setOrdering] = useState("");

    const selectFilter = () => {
        axios.defaults.withCredentials = true;
        axios
            .get(
                `https://abazarak.ir/api/products/${
                    ordering === "" ? "" : `?ordering=${ordering}`
                }${
                    filters.categName === ""
                        ? ""
                        : `${ordering === "" ? "?" : "&"}category__name=${
                              filters.categName
                          }`
                }${
                    filters.brandName === ""
                        ? ""
                        : `${
                              filters.categName === "" && ordering === ""
                                  ? "?"
                                  : "&"
                          }brand__name=${filters.brandName}`
                }${
                    priceRange.max_price === "" && priceRange.min_price === ""
                        ? ""
                        : `${
                              filters.categName === "" &&
                              filters.brandName === "" &&
                              ordering === ""
                                  ? "?"
                                  : "&"
                          }min_price=${priceRange.min_price}&max_price=${
                              priceRange.max_price
                          }`
                }`
            )
            .then((response) => dispatch(getProducts(response.data.results)))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        selectFilter();
    }, [ordering, filters, priceRange]);

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
                    className={`${styles.f_box} ${
                        ordering === "" ? styles.show : ""
                    }`}
                    onClick={() => {
                        setOrdering("");
                    }}
                >
                    جدید ترین
                </div>

                <div
                    className={`${styles.f_box} ${
                        ordering === "hits_count" ? styles.show : ""
                    }`}
                    onClick={() => {
                        setOrdering("hits_count");
                    }}
                >
                    پر فروش ترین
                </div>

                <div
                    className={`${styles.f_box} ${
                        ordering === "price" ? styles.show : ""
                    }`}
                    onClick={() => {
                        setOrdering("price");
                    }}
                >
                    ارزان ترین
                </div>

                <div
                    className={`${styles.f_box} ${
                        ordering === "-price" ? styles.show : ""
                    }`}
                    onClick={() => {
                        setOrdering("-price");
                    }}
                >
                    گران ترین
                </div>
            </div>

            <div className={styles.products_container}>
                <FilterBox
                    filters={filters}
                    setFilters={setFilters}
                    categName={filters.categName}
                    brandName={filters.brandName}
                    setPriceRange={setPriceRange}
                    min_price={priceRange.min_price}
                    max_price={priceRange.max_price}
                    minPriceText={minPriceText}
                    maxPriceText={maxPriceText}
                    setMinPriceText={setMinPriceText}
                    setMaxPriceText={setMaxPriceText}
                />
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
