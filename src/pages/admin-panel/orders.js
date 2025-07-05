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
    axios.defaults.withCredentials = true;
    axios
      .get(
        `/api/admin/orders/?paid=${paidFilter}&shipped=${shippedFilter}&id=${searchContent}&page=${page}`
      )
      .then((response) => {
        setOrders(response.data.results);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getOrders(1);
    setCurrentPage(1);
  }, [paidFilter, shippedFilter, searchContent]);

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

    if (currentPage > 3) {
      pages.push(
        <div key="dots1" className={styles.dots}>
          ...
        </div>
      );
    }

    if (currentPage - 1 > 1) addPage(currentPage - 1);
    if (currentPage !== 1 && currentPage !== totalPages) addPage(currentPage);
    if (currentPage + 1 < totalPages) addPage(currentPage + 1);

    if (currentPage < totalPages - 2) {
      pages.push(
        <div key="dots2" className={styles.dots}>
          ...
        </div>
      );
    }

    if (totalPages > 1) addPage(totalPages);

    return pages;
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
        <div className={styles.loading_wrapper}>
          <Image src={spiner} width={80} height={80} alt="لودینگ" />
        </div>
      </div>

      <div className={styles.search_box}>
        <form className={styles.products_search}>
          <input
            type="text"
            placeholder="جستجوی کد سفارش ..."
            onChange={(e) => {
              setPaidFilter("");
              setShippedFilter("");
              setSearchContent(e.target.value);
            }}
          />

          <span>
            <FontAwesomeIcon icon={faSearch} />
          </span>
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
                {order.total_price} تومان
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

      <AdminMenu />
    </div>
  );
}
