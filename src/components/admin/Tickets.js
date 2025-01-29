import styles from "../../styles/admin/Tickets.module.css";
import Link from "next/link";

export default function Tickets() {
    return (
        <div className={styles.container}>
            <div className={styles.top_box}>
                <div className={styles.inventory_button}>
                    <div>
                        <span></span>
                    </div>
                    مشاهده نشده ها
                </div>

                <div className={styles.inventory_button}>
                    <div>
                        <span></span>
                    </div>
                    مشاهده شده ها
                </div>

                <div className={styles.inventory_button}>
                    <div>
                        <span></span>
                    </div>
                    همه
                </div>
            </div>

            <div className={styles.tickets}>
                <div className={styles.tickets_top}>
                    <div className={styles.tickets_title}>شماره</div>
                    <div className={styles.tickets_title}>نام</div>
                    <div className={styles.tickets_title}>تلفن</div>
                    <div className={styles.tickets_title}>وضعیت</div>
                </div>

                <Link
                    href={`/admin/show-ticket/${0}`}
                    className={styles.ticket}
                >
                    <div className={styles.ticket_id}>1</div>

                    <div className={styles.ticket_name}>عبدالله</div>

                    <div className={styles.ticket_phone}>09054182307</div>

                    <div className={styles.ticket_status}>مشاهده شده</div>
                </Link>

                <Link
                    href={`/admin/show-ticket/${0}`}
                    className={styles.ticket}
                >
                    <div className={styles.ticket_id}>1</div>

                    <div className={styles.ticket_name}>عبدالله</div>

                    <div className={styles.ticket_phone}>09054182307</div>

                    <div className={styles.ticket_status}>مشاهده شده</div>
                </Link>

                <Link
                    href={`/admin/show-ticket/${0}`}
                    className={styles.ticket}
                >
                    <div className={styles.ticket_id}>1</div>

                    <div className={styles.ticket_name}>عبدالله</div>

                    <div className={styles.ticket_phone}>09054182307</div>

                    <div className={styles.ticket_status}>مشاهده شده</div>
                </Link>

                <Link
                    href={`/admin/show-ticket/${0}`}
                    className={styles.ticket}
                >
                    <div className={styles.ticket_id}>1</div>

                    <div className={styles.ticket_name}>عبدالله</div>

                    <div className={styles.ticket_phone}>09054182307</div>

                    <div className={styles.ticket_status}>مشاهده شده</div>
                </Link>

                <Link
                    href={`/admin/show-ticket/${0}`}
                    className={styles.ticket}
                >
                    <div className={styles.ticket_id}>1</div>

                    <div className={styles.ticket_name}>عبدالله</div>

                    <div className={styles.ticket_phone}>09054182307</div>

                    <div className={styles.ticket_status}>مشاهده شده</div>
                </Link>

                <Link
                    href={`/admin/show-ticket/${0}`}
                    className={styles.ticket}
                >
                    <div className={styles.ticket_id}>1</div>

                    <div className={styles.ticket_name}>عبدالله</div>

                    <div className={styles.ticket_phone}>09054182307</div>

                    <div className={styles.ticket_status}>مشاهده شده</div>
                </Link>

                <Link
                    href={`/admin/show-ticket/${0}`}
                    className={styles.ticket}
                >
                    <div className={styles.ticket_id}>1</div>

                    <div className={styles.ticket_name}>عبدالله</div>

                    <div className={styles.ticket_phone}>09054182307</div>

                    <div className={styles.ticket_status}>مشاهده شده</div>
                </Link>

                <Link
                    href={`/admin/show-ticket/${0}`}
                    className={styles.ticket}
                >
                    <div className={styles.ticket_id}>1</div>

                    <div className={styles.ticket_name}>عبدالله</div>

                    <div className={styles.ticket_phone}>09054182307</div>

                    <div className={styles.ticket_status}>مشاهده شده</div>
                </Link>

                <Link
                    href={`/admin/show-ticket/${0}`}
                    className={styles.ticket}
                >
                    <div className={styles.ticket_id}>1</div>

                    <div className={styles.ticket_name}>عبدالله</div>

                    <div className={styles.ticket_phone}>09054182307</div>

                    <div className={styles.ticket_status}>مشاهده شده</div>
                </Link>

                <Link
                    href={`/admin/show-ticket/${0}`}
                    className={styles.ticket}
                >
                    <div className={styles.ticket_id}>1</div>

                    <div className={styles.ticket_name}>عبدالله</div>

                    <div className={styles.ticket_phone}>09054182307</div>

                    <div className={styles.ticket_status}>مشاهده شده</div>
                </Link>

                <Link
                    href={`/admin/show-ticket/${0}`}
                    className={styles.ticket}
                >
                    <div className={styles.ticket_id}>1</div>

                    <div className={styles.ticket_name}>عبدالله</div>

                    <div className={styles.ticket_phone}>09054182307</div>

                    <div className={styles.ticket_status}>مشاهده شده</div>
                </Link>
            </div>
        </div>
    );
}
