import axios from "axios";
import styles from "../../styles/admin/Users.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import spiner from "../../../public/images/loading.svg";
import Image from "next/image";

export default function Users() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [numberFilter, setNumberFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [adminFilter, setAdminFilter] = useState("ّ");

  const [searchText, setSearchText] = useState("");

  const getUsers = () => {
    setLoading(true);
    axios.defaults.withCredentials = true;
    axios
      .get(
        `/api/admin/accounts/?number=${searchText}&is_active=${userFilter}&is_verified=${numberFilter}&is_staff=${adminFilter}`
      )
      .then((response) => {
        setUsers(response.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getUsers();
  }, [adminFilter, numberFilter, userFilter, searchText]);

  return (
    <div className={styles.container}>
      <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
        <div className={styles.loading_wrapper}>
          <Image src={spiner} width={80} height={80} alt="لودینگ" />
        </div>
      </div>

      <div className={styles.search_box}>
        <form className={styles.users_search}>
          <input
            type="text"
            placeholder="جستجوی کاربر ..."
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />

          <span>
            <FontAwesomeIcon icon={faSearch} />
          </span>
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
              <div className={styles.user_id}>{index + 1}</div>

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
    </div>
  );
}
