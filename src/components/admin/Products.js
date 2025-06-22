import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/admin/Products.module.css";
import {
  faSearch,
  faAngleLeft,
  faAngleRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import spiner from "../../../public/images/loading.svg";

export default function Products() {
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);

  const [buttonsStatus, setButtonsStatus] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [notActiveFilter, setNotActiveFilter] = useState("");
  const [notSupplyFilter, setNotSupplyFilter] = useState("");

  const getProducts = () => {
    setLoading(true);
    axios.defaults.withCredentials = true;
    axios
      .get(
        `/api/admin/products/?active=${notActiveFilter}&supply=${notSupplyFilter}`
      )
      .then((response) => {
        setProducts(response.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getProducts();
  }, [notActiveFilter, notSupplyFilter]);

  const search = () => {
    setLoading(true);
    axios.defaults.withCredentials = true;
    axios
      .get(`/api/admin/products/?search=${searchText}`)
      .then((res) => {
        setProducts(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
        <div className={styles.loading_wrapper}>
          <Image src={spiner} width={80} height={80} alt="لودینگ" />
        </div>
      </div>

      <div className={styles.search_box}>
        <Link className={styles.add_btn} href={"/admin/products/create"}>
          <span>
            <FontAwesomeIcon icon={faPlus} />
          </span>
          محصول جدید
        </Link>

        <form
          className={styles.products_search}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="جستجوی محصول ..."
            onChange={(e) => {
              if (e.target.value === "") {
                setSearchText(e.target.value);
                setButtonsStatus(false);
                getProducts();
              } else {
                setSearchText(e.target.value);
              }
            }}
          />

          <span
            onClick={() => search()}
            style={
              searchText === "" ? { display: "none" } : { display: "block" }
            }
          >
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </form>

        <div className={styles.search_buttons}>
          <div
            className={`${styles.inventory_button} ${
              notActiveFilter === false ? styles.show : ""
            }`}
            onClick={() => {
              setNotActiveFilter(notActiveFilter === "" ? false : "");
              setNotSupplyFilter("");
            }}
          >
            <div>
              <span></span>
            </div>
            محصولات غیر فعال
          </div>

          <div
            className={`${styles.inventory_button} ${
              notSupplyFilter === 0 ? styles.show : ""
            }`}
            onClick={() => {
              setNotSupplyFilter(notSupplyFilter === "" ? 0 : "");
              setNotActiveFilter("");
            }}
          >
            <div>
              <span></span>
            </div>
            اتمام موجودی ها
          </div>
        </div>
      </div>

      <div className={styles.products}>
        <div className={styles.products_top}>
          <div className={styles.products_title}>شماره</div>
          <div className={styles.products_title}>عکس</div>
          <div className={styles.products_title}>نام</div>
          <div className={styles.products_title}>قیمت</div>
          <div className={styles.products_title}>تاریخ</div>
          <div className={styles.products_title}>وضعیت</div>
        </div>

        {products.length === 0 ? (
          <div className={styles.no_product}>محصولی یافت نشد !</div>
        ) : (
          products.map((product, index) => (
            <Link
              href={`/admin/products/${product.id}`}
              className={styles.product}
              key={product.id}
            >
              <div className={styles.product_id}>{index + 1}</div>

              <Image
                className={styles.product_image}
                src={product.image}
                alt="عکس محصول"
                width={100}
                height={100}
                quality={100}
              />

              <div className={styles.product_name}>{product.name}</div>

              <div className={styles.product_price}>{product.price}</div>

              <div className={styles.product_date}>{product.date}</div>

              <div className={styles.product_active}>
                {product.active ? "فعال" : "غیر فعال"}
              </div>
            </Link>
          ))
        )}
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
