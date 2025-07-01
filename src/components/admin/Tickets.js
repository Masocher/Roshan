import axios from "axios";
import styles from "../../styles/admin/Tickets.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import spiner from "../../../public/images/loading.svg";
import Image from "next/image";

export default function Tickets() {
  const [loading, setLoading] = useState(false);

  const [tickets, setTickets] = useState([]);

  const [unSeenFilter, setUnSeenFilter] = useState("");

  const getTickets = () => {
    setLoading(true);
    axios.defaults.withCredentials = true;
    axios
      .get(`/api/admin/tickets/?is_seen=${unSeenFilter}`)
      .then((response) => {
        setTickets(response.data.results);
        console.log(response.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getTickets();
  }, [unSeenFilter]);

  return (
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
        >
          <div
            onClick={() => setUnSeenFilter(unSeenFilter === false ? "" : false)}
          >
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
              <div className={styles.ticket_id}>{index + 1}</div>

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
    </div>
  );
}
