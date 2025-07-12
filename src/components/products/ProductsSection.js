import styles from "../../styles/products/ProductsSection.module.css";
import FilterBox from "./FilterBox";
import ProductsAll from "./ProductsAll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSort, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import spiner from "../../../public/images/loading.svg";
import { useRouter } from "next/router";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setBrandQuery, setCategoryQuery } from "@/store/Reducer";

export default function ProductsSection({ categoriesList, brandsList }) {
  const dispatch = useDispatch();

  const category = useSelector((state) => state.category);
  const brand = useSelector((state) => state.brand);

  const router = useRouter();

  const spinerStyles2 = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
    height: "fit-content",
    margin: "50px 0 0 0",
  };

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    categName: category || "",
    brandName: brand || "",
  });
  const [minPriceText, setMinPriceText] = useState("");
  const [maxPriceText, setMaxPriceText] = useState("");
  const [priceRange, setPriceRange] = useState({
    min_price: "",
    max_price: "",
  });
  const [ordering, setOrdering] = useState("");
  const [loading, setLoading] = useState(false);
  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(false);
  const [next, setNext] = useState(1);
  const [finished, setFinished] = useState(false);
  const [loading_2, setLoading_2] = useState(false);

  const [searchText, setSearchText] = useState(router.query.search || "");

  const loaderRef = useRef(null);
  const loadingRef = useRef(false);

  const [queriesStatus, setQueriesStatus] = useState(false);

  const fetchProducts =
    category || brand
      ? useCallback(async (page = 1, reset = false) => {
          if (loadingRef.current || (finished && !reset)) return;

          loadingRef.current = true;
          if (reset) setLoading(true);
          else setLoading_2(true);

          try {
            setQueriesStatus(true);

            let query = `?page=${page}`;
            if (category) query += `&category__name=${category}`;
            if (brand) query += `&brand__name=${brand}`;

            const res = await fetch(`/api/products/${query}`);
            const data = await res.json();

            if (reset) {
              setProducts(data.results);
            } else {
              setProducts((prev) => [...prev, ...data.results]);
            }

            setNext(data.next ? page + 1 : null);
            setFinished(!data.next);
          } catch (error) {
            toast.error("خطا در دریافت محصولات");
          }

          if (reset) setLoading(false);
          else setLoading_2(false);

          loadingRef.current = false;
        })
      : useCallback(
          async (page = 1, reset = false) => {
            if (loadingRef.current || (finished && !reset)) return;

            loadingRef.current = true;
            if (reset) setLoading(true);
            else setLoading_2(true);

            try {
              setQueriesStatus(false);

              let query = `?page=${page}`;
              if (ordering) query += `&ordering=${ordering}`;
              if (filters.categName)
                query += `&category__name=${filters.categName}`;
              if (filters.brandName)
                query += `&brand__name=${filters.brandName}`;
              if (priceRange.min_price)
                query += `&min_price=${priceRange.min_price}`;
              if (priceRange.max_price)
                query += `&max_price=${priceRange.max_price}`;
              if (searchText)
                query += `&search=${encodeURIComponent(searchText)}`;

              const res = await fetch(`/api/products/${query}`);
              const data = await res.json();

              if (reset) {
                setProducts(data.results);
              } else {
                setProducts((prev) => [...prev, ...data.results]);
              }

              setNext(data.next ? page + 1 : null);
              setFinished(!data.next);
            } catch (err) {
              toast.error("خطا در دریافت محصولات");
            }

            if (reset) setLoading(false);
            else setLoading_2(false);

            loadingRef.current = false;
          },
          [ordering, filters, priceRange, finished, searchText]
        );

  useEffect(() => {
    setSearchText(router.query.search || "");
  }, [router.query.search]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          fetchProducts(next);
        }
      },
      { threshold: 1 }
    );

    const el = loaderRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [fetchProducts, next]);

  useEffect(() => {
    setProducts([]);
    setNext(1);
    setFinished(false);
    loadingRef.current = false;
    fetchProducts(1, true);
  }, [filters, priceRange, ordering, searchText, category, brand]);

  return (
    <div className={styles.container}>
      <Toaster position="bottom-left" reverseOrder={true} />

      {searchText && (
        <div className={styles.searchTag}>
          <span
            onClick={() => {
              const query = { ...router.query };
              delete query.search;
              router.push(
                {
                  pathname: router.pathname,
                  query,
                },
                undefined,
                { shallow: true }
              );
            }}
          >
            <FontAwesomeIcon icon={faClose} />
          </span>
          جستجوی شما :
          <div className={styles.clearSearchBtn} aria-label="حذف سرچ">
            <div>{searchText}</div>
          </div>
        </div>
      )}

      <div
        className={`${styles.reset_btn_2} ${
          priceRange.min_price === "" &&
          priceRange.max_price === "" &&
          filters.categName === "" &&
          filters.brandName === ""
            ? ""
            : styles.show
        } ${searchText ? "" : styles.show_2}`}
        onClick={() => {
          dispatch(setCategoryQuery(""));
          dispatch(setBrandQuery(""));
          setOption1(false);
          setOption2(false);
          setOption3(false);
          setPriceRange({ min_price: "", max_price: "" });
          setFilters({ categName: "", brandName: "" });
          setOrdering("");
          setNext(1);
          setFinished(false);
          loadingRef.current = false;
          fetchProducts(1, false);
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
          onClick={() => setOrdering("")}
        >
          جدید ترین
        </div>

        <div
          className={`${styles.f_box} ${
            ordering === "-hits_count" ? styles.show : ""
          }`}
          onClick={() => setOrdering("-hits_count")}
        >
          پر فروش ترین
        </div>

        <div
          className={`${styles.f_box} ${
            ordering === "price" ? styles.show : ""
          }`}
          onClick={() => setOrdering("price")}
        >
          ارزان ترین
        </div>

        <div
          className={`${styles.f_box} ${
            ordering === "-price" ? styles.show : ""
          }`}
          onClick={() => setOrdering("-price")}
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
          setFiltersStatus={() => {}}
          categoriesList={categoriesList}
          brandsList={brandsList}
        />

        <ProductsAll loading={loading} productsList={products} />
      </div>

      <div ref={loaderRef}>
        {loading_2 && (
          <div className="loader" style={spinerStyles2}>
            <Image src={spiner} width={80} height={80} alt="لودینگ" />
          </div>
        )}
      </div>
    </div>
  );
}
