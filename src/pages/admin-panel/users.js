import Head from "next/head";
import axios from "axios";
import styles from "../../styles/admin/Users.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import spiner from "../../../public/images/loading.svg";
import Image from "next/image";
import AdminMenu from "@/components/admin/AdminMenu";

axios.defaults.withCredentials = true;

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [numberFilter, setNumberFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [adminFilter, setAdminFilter] = useState("");

  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getUsers = (page = 1) => {
    setLoading(true);
    axios
      .get(
        `/api/admin/accounts/?number=${searchText}&is_active=${userFilter}&is_verified=${numberFilter}&is_staff=${adminFilter}&page=${page}`
      )
      .then((response) => {
        setUsers(response.data.results);
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
    getUsers(1);
  }, [adminFilter, numberFilter, userFilter]);

  const getPaginationButtons = () => {
    const buttons = [];
    if (totalPages <= 1) return buttons;

    buttons.push(1);

    if (currentPage - 1 > 1) buttons.push(currentPage - 1);

    if (currentPage !== 1 && currentPage !== totalPages)
      buttons.push(currentPage);

    if (currentPage + 1 < totalPages) buttons.push(currentPage + 1);

    if (totalPages !== 1) buttons.push(totalPages);

    const uniqueButtons = [...new Set(buttons)].sort((a, b) => a - b);

    return uniqueButtons;
  };

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      getUsers(page);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      getUsers(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      getUsers(currentPage + 1);
    }
  };

  return (
    <>
      <Head>
        <title>ابازارک | پنل مدیریت | کاربران</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content={"پنل مدیریت سایت ابازارک | کاربران"}
        />
      </Head>

      <div className={styles.container}>
        <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
          <div className={styles.loading_wrapper}>
            <Image src={spiner} width={80} height={80} alt="لودینگ" />
          </div>
        </div>

        <div className={styles.search_box}>
          <form
            className={styles.users_search}
            onSubmit={(e) => {
              e.preventDefault();
              setAdminFilter("");
              setNumberFilter("");
              setUserFilter("");
              getUsers();
            }}
          >
            <input
              type="text"
              placeholder="جستجوی کاربر ..."
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />

            <button type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>

          <div className={styles.search_buttons}>
            <div
              className={`${styles.inventory_button} ${
                adminFilter === true ? styles.show : ""
              }`}
              onClick={() => {
                setNumberFilter("");
                setUserFilter("");
                setAdminFilter(adminFilter === "" ? true : "");
              }}
            >
              <div>
                <span></span>
              </div>
              کاربران ادمین
            </div>

            <div
              className={`${styles.inventory_button} ${
                userFilter === false ? styles.show : ""
              }`}
              onClick={() => {
                setNumberFilter("");
                setAdminFilter("");
                setUserFilter(userFilter === "" ? false : "");
              }}
            >
              <div>
                <span></span>
              </div>
              کابران غیر فعال
            </div>

            <div
              className={`${styles.inventory_button} ${
                numberFilter === false ? styles.show : ""
              }`}
              onClick={() => {
                setUserFilter("");
                setAdminFilter("");
                setNumberFilter(numberFilter === "" ? false : "");
              }}
            >
              <div>
                <span></span>
              </div>
              تلفن های تایید نشده
            </div>
          </div>
        </div>

        <div className={styles.users}>
          <div className={styles.users_top}>
            <div className={styles.users_title}>شماره</div>
            <div className={styles.users_title}>نام</div>
            <div className={styles.users_title}>تلفن</div>
            <div className={styles.users_title}>وضعیت کاربر</div>
            <div className={styles.users_title}>وضعیت تلفن</div>
            <div className={styles.hidden_title}></div>
          </div>

          {users.length > 0 ? (
            users.map((user, index) => (
              <Link
                key={user.id}
                className={styles.user}
                href={`/admin/users/${user.id}`}
              >
                <div className={styles.user_id}>
                  {index + 1 + (currentPage - 1) * 10}
                </div>

                <div className={styles.user_name}>{user.get_full_name}</div>

                <div className={styles.user_phone}>{user.number}</div>

                <div className={styles.user_status}>
                  {user.is_active ? "فعال" : "غیر فعال"}
                </div>

                <div className={styles.user_phone_status}>
                  {user.is_verified ? "تایید شده" : "تایید نشده"}
                </div>
              </Link>
            ))
          ) : (
            <div className={styles.no_user}>کاربری یافت نشد !</div>
          )}
        </div>

        <div className={styles.pagination}>
          <div
            className={`${styles.perv_btn} ${
              currentPage === 1 ? styles.disabled : ""
            }`}
            onClick={handlePrevClick}
            style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
          >
            <span>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
            قبلی
          </div>

          {getPaginationButtons().map((page) => (
            <div
              key={page}
              className={`${styles.page_btn} ${
                page === currentPage ? styles.show : ""
              }`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </div>
          ))}

          <div
            className={`${styles.next_btn} ${
              currentPage === totalPages ? styles.disabled : ""
            }`}
            onClick={handleNextClick}
            style={{
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
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
