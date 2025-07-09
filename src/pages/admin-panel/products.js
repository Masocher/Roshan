import Head from "next/head";
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
import AdminMenu from "@/components/admin/AdminMenu";

axios.defaults.withCredentials = true;

export async function getServerSideProps(context) {
  const res = await fetch("https://abazarak.ir//api/admin/check/", {
    headers: {
      Cookie: context.req.headers.cookie || "",
    },
  });

  if (!res.ok) {
    return { notFound: true };
  }

  return {
    props: {
      status: true,
    },
  };
}

export default function Products() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [notActiveFilter, setNotActiveFilter] = useState("");
  const [notSupplyFilter, setNotSupplyFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = (page = 1) => {
    setLoading(true);
    const url = `/api/admin/products/?active=${notActiveFilter}&supply=${notSupplyFilter}&page=${page}&search=${searchText}`;
    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.results);
        setTotalPages(response.data.total_pages || 1);
        setCurrentPage(page);
        setLoading(false);
      })
      .catch(() => {
        toast.error("خطایی رخ داد !");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts(1);
  }, [notActiveFilter, notSupplyFilter]);

  const search = () => {
    fetchProducts(1);
  };

  return (
    <>
      <Head>
        <title>ابازارک | پنل مدیریت | محصولات</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content={"پنل مدیریت سایت ابازارک | محصولات"}
        />
      </Head>

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
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />

            <button type="submit" onClick={() => search()}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
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
          <div
            className={styles.perv_btn}
            onClick={() => {
              if (currentPage > 1) fetchProducts(currentPage - 1);
            }}
          >
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
            قبلی
          </div>

          <div
            className={`${styles.page_btn} ${
              currentPage === 1 ? styles.show : ""
            }`}
            onClick={() => fetchProducts(1)}
          >
            1
          </div>

          {currentPage - 1 > 1 && (
            <div
              className={styles.page_btn}
              onClick={() => fetchProducts(currentPage - 1)}
            >
              {currentPage - 1}
            </div>
          )}

          {currentPage !== 1 && currentPage !== totalPages && (
            <div className={`${styles.page_btn} ${styles.show}`}>
              {currentPage}
            </div>
          )}

          {currentPage + 1 < totalPages && (
            <div
              className={styles.page_btn}
              onClick={() => fetchProducts(currentPage + 1)}
            >
              {currentPage + 1}
            </div>
          )}

          {totalPages > 1 && (
            <div
              className={`${styles.page_btn} ${
                currentPage === totalPages ? styles.show : ""
              }`}
              onClick={() => fetchProducts(totalPages)}
            >
              {totalPages}
            </div>
          )}

          <div
            className={styles.next_btn}
            onClick={() => {
              if (currentPage < totalPages) fetchProducts(currentPage + 1);
            }}
          >
            بعدی
            <span>
              <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </div>
        </div>

        <AdminMenu />
      </div>
    </>
  );
}
