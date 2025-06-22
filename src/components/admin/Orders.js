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
import Loading from "../global/Loading";

export default function Orders() {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.defaults.withCredentials = true;
    axios
      .get("/api/admin/orders/")
      .then((response) => {
        setOrders(response.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const [paidFilter, setPaidFilter] = useState("");
  const [shippedFilter, setShippedFilter] = useState("");
  const [searchContent, setSearchContent] = useState("");

  const getOrders = () => {
    axios.defaults.withCredentials = true;

    axios
      .get(
        `/api/admin/orders/?paid=${paidFilter}&shipped=${shippedFilter}&id=${searchContent}`
      )
      .then((response) => setOrders(response.data.results))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOrders();
  }, [paidFilter, shippedFilter, searchContent]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className={styles.container}>
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

          {orders.length === 0 ? (
            <div className={styles.no_order}>سفارشی یافت نشد !</div>
          ) : (
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
}
