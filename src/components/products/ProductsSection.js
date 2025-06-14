import styles from "../../styles/products/ProductsSection.module.css";
import FilterBox from "./FilterBox";
import ProductsAll from "./ProductsAll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faAngleRight,
  faAngleLeft,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductsSection({
  initialProducts,
  categoriesList,
  brandsList,
}) {
  const [products, setProducts] = useState(initialProducts || []);

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

  const [loading, setLoading] = useState(false);

  const selectFilter = () => {
    setLoading(true);
    axios.defaults.withCredentials = true;
    axios
      .get(
        `/api/products/${ordering === "" ? "" : `?ordering=${ordering}`}${
          filters.categName === ""
            ? ""
            : `${ordering === "" ? "?" : "&"}category__name=${
                filters.categName
              }`
        }${
          filters.brandName === ""
            ? ""
            : `${
                filters.categName === "" && ordering === "" ? "?" : "&"
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
      .then((response) => {
        setProducts(response.data.results);
        setLoading(false);
        console.log("محصولات از کلاینت رندر شدن");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const [filtersStatus, setFiltersStatus] = useState(false);

  useEffect(() => {
    if (filtersStatus === false) {
      return;
    }

    selectFilter();
  }, [ordering, filters, priceRange]);

  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(false);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.reset_btn_2} ${
          priceRange.min_price === "" &&
          priceRange.max_price === "" &&
          filters.categName === "" &&
          filters.brandName === ""
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

      <div className={styles.f_boxes}>
        <div className={styles.title}>
          <span>
            <FontAwesomeIcon icon={faSort} />
          </span>
          مرتب سازی :
        </div>

        <div
          className={`${styles.f_box} ${ordering === "" ? styles.show : ""}`}
          onClick={() => {
            setOrdering("");
            setFiltersStatus(true);
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
            setFiltersStatus(true);
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
            setFiltersStatus(true);
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
            setFiltersStatus(true);
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
          option1={option1}
          option2={option2}
          option3={option3}
          setOption1={setOption1}
          setOption2={setOption2}
          setOption3={setOption3}
          setFiltersStatus={setFiltersStatus}
          categoriesList={categoriesList}
          brandsList={brandsList}
        />
        <ProductsAll loading={loading} productsList={products} />
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
