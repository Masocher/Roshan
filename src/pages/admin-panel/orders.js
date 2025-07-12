import Head from "next/head";
import styles from "../../styles/admin/Orders.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import spiner from "../../../public/images/loading.svg";
import Image from "next/image";
import AdminMenu from "@/components/admin/AdminMenu";

axios.defaults.withCredentials = true;

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [paidFilter, setPaidFilter] = useState("");
  const [shippedFilter, setShippedFilter] = useState("");
  const [searchContent, setSearchContent] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getOrders = (page = 1) => {
    setLoading(true);
    axios
      .get(
        `/api/admin/orders/?paid=${paidFilter}&shipped=${shippedFilter}&id=${searchContent}&page=${page}`
      )
      .then((response) => {
        setOrders(response.data.results);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      })
      .catch(() => {
        toast.error("خطایی رخ داد !");
        setLoading(false);
      });
  };

  useEffect(() => {
    getOrders(1);
    setCurrentPage(1);
  }, [paidFilter, shippedFilter]);

  const handlePageClick = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    getOrders(page);
  };

  const renderPageButtons = () => {
    const pages = [];

    if (totalPages <= 1) return null;

    const addPage = (page) => {
      pages.push(
        <div
          key={page}
          className={`${styles.page_btn} ${
            currentPage === page ? styles.show : ""
          }`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </div>
      );
    };

    addPage(1);

    if (currentPage - 1 > 1) addPage(currentPage - 1);
    if (currentPage !== 1 && currentPage !== totalPages) addPage(currentPage);
    if (currentPage + 1 < totalPages) addPage(currentPage + 1);

    if (totalPages > 1) addPage(totalPages);

    return pages;
  };

  return (
    <>
      <Head>
        <title>ابازارک | پنل مدیریت | سفارشات</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content={"پنل مدیریت سایت ابازارک | سفارشات"}
        />
      </Head>

      <div className={styles.container}>
        <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
          <div className={styles.loading_wrapper}>
            <div className={styles.loading_wrapper_title}>روشن ابزار</div>
            <Image src={spiner} width={40} height={40} alt="لودینگ" />
          </div>
        </div>

        <div className={styles.search_box}>
          <form
            className={styles.products_search}
            onSubmit={(e) => {
              e.preventDefault();
              setPaidFilter("");
              setShippedFilter("");
              getOrders();
            }}
          >
            <input
              type="text"
              placeholder="جستجوی کد سفارش ..."
              onChange={(e) => {
                setSearchContent(e.target.value);
              }}
            />

            <button type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>

          <div className={styles.search_buttons}>
            <div
              className={`${styles.inventory_button} ${
                paidFilter === false ? styles.show : ""
              }`}
              onClick={() => {
                setPaidFilter(paidFilter === "" ? false : "");
                setShippedFilter("");
              }}
            >
              <div>
                <span></span>
              </div>
              پرداخت نشده ها
            </div>

            <div
              className={`${styles.inventory_button} ${
                shippedFilter === false ? styles.show : ""
              }`}
              onClick={() => {
                setPaidFilter("");
                setShippedFilter(shippedFilter === "" ? false : "");
              }}
            >
              <div>
                <span></span>
              </div>
              ارسال نشده ها
            </div>
          </div>
        </div>

        <div className={styles.orders}>
          <div className={styles.orders_top}>
            <div className={styles.orders_title}>شماره</div>
            <div className={styles.orders_title}>تلفن</div>
            <div className={styles.orders_title}>قیمت</div>
            <div className={styles.orders_title}>وضعیت پرداخت</div>
            <div className={styles.orders_title}>تاریخ</div>
            <div className={styles.orders_title}>وضعیت ارسال</div>
          </div>

          {orders.length > 0 ? (
            orders.map((order, index) => (
              <Link
                key={order.id}
                className={styles.order}
                href={`/admin/orders/${order.id}`}
              >
                <div className={styles.order_id}>{index + 1}</div>
                <div className={styles.phone_number}>{order.number}</div>
                <div className={styles.order_value}>
                  {order.pay_price} تومان
                </div>
                <div className={styles.order_price}>
                  {order.paid ? "پرداخت شده" : "پرداخت نشده"}
                </div>
                <div className={styles.order_date}>{order.created_at}</div>
                <div className={styles.order_active}>
                  {order.shipped ? "ارسال شده" : "ارسال نشده"}
                </div>
              </Link>
            ))
          ) : (
            <div className={styles.no_order}>سفارشی یافت نشد !</div>
          )}
        </div>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <div
              className={styles.perv_btn}
              onClick={() => handlePageClick(currentPage - 1)}
            >
              <span>
                <FontAwesomeIcon icon={faAngleLeft} />
              </span>
              قبلی
            </div>

            {renderPageButtons()}

            <div
              className={styles.next_btn}
              onClick={() => handlePageClick(currentPage + 1)}
            >
              بعدی
              <span>
                <FontAwesomeIcon icon={faAngleRight} />
              </span>
            </div>
          </div>
        )}

        <AdminMenu />
      </div>
    </>
  );
}
