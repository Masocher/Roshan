import Head from "next/head";
import axios from "axios";
import styles from "../../styles/admin/Tickets.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import spiner from "../../../public/images/loading.svg";
import Image from "next/image";
import AdminMenu from "@/components/admin/AdminMenu";

axios.defaults.withCredentials = true;

export default function Tickets() {
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);

  const [unSeenFilter, setUnSeenFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getTickets = (pageNumber = 1) => {
    setLoading(true);
    axios
      .get(`/api/admin/tickets/?is_seen=${unSeenFilter}&page=${pageNumber}`)
      .then((response) => {
        setTickets(response.data.results);
        setTotalPages(response.data.total_pages || 1);
        setPage(pageNumber);
        setLoading(false);
      })
      .catch(() => {
        toast.error("خطایی رخ داد !");
        setLoading(false);
      });
  };

  useEffect(() => {
    getTickets(1);
  }, [unSeenFilter]);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const handlePageClick = (p) => {
    if (p === "..." || p === page) return;
    getTickets(p);
  };

  return (
    <>
      <Head>
        <title>ابازارک | پنل مدیریت | تیکت ها</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content={"پنل مدیریت سایت ابازارک | تیکت ها"}
        />
      </Head>

      <div className={styles.container}>
        <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
          <div className={styles.loading_wrapper}>
            <Image src={spiner} width={80} height={80} alt="لودینگ" />
          </div>
        </div>

        <div className={styles.top_box}>
          <div
            className={`${styles.inventory_button} ${
              unSeenFilter === false ? styles.show : ""
            }`}
            onClick={() => setUnSeenFilter(unSeenFilter === false ? "" : false)}
          >
            <div>
              <span></span>
            </div>
            مشاهده نشده ها
          </div>
        </div>

        <div className={styles.tickets}>
          <div className={styles.tickets_top}>
            <div className={styles.tickets_title}>شماره</div>
            <div className={styles.tickets_title}>نام</div>
            <div className={styles.tickets_title}>تلفن</div>
            <div className={styles.tickets_title}>وضعیت</div>
          </div>

          {tickets.length > 0 ? (
            tickets.map((ticket, index) => (
              <Link
                href={`/admin/tickets/${ticket.id}`}
                className={styles.ticket}
                key={ticket.id}
              >
                <div className={styles.ticket_id}>
                  {(page - 1) * 10 + index + 1}
                </div>

                <div className={styles.ticket_name}>{ticket.full_name}</div>

                <div className={styles.ticket_phone}>{ticket.number}</div>

                <div className={styles.ticket_status}>
                  {ticket.is_seen ? "مشاهده شده" : "مشاهده نشده"}
                </div>
              </Link>
            ))
          ) : (
            <div className={styles.no_ticket}>تیکتی یافت نشد !</div>
          )}
        </div>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <div
              className={`${styles.perv_btn} ${
                page === 1 ? styles.disabled : ""
              }`}
              onClick={() => page > 1 && getTickets(page - 1)}
            >
              <span>&lt;</span> قبلی
            </div>

            {getPageNumbers().map((p, i) =>
              p === "..." ? (
                <div key={i} className={styles.dots}>
                  ...
                </div>
              ) : (
                <div
                  key={i}
                  className={`${styles.page_btn} ${
                    p === page ? styles.show : ""
                  }`}
                  onClick={() => handlePageClick(p)}
                >
                  {p}
                </div>
              )
            )}

            <div
              className={`${styles.next_btn} ${
                page === totalPages ? styles.disabled : ""
              }`}
              onClick={() => page < totalPages && getTickets(page + 1)}
            >
              بعدی <span>&gt;</span>
            </div>
          </div>
        )}

        <AdminMenu />
      </div>
    </>
  );
}
