import styles from "../../../styles/admin-options/EditUser.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faTruckFast,
  faCreditCard,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import spiner from "../../../../public/images/loading.svg";
import Image from "next/image";

export async function getServerSideProps(context) {
  const { id } = context.params;

  const res = await fetch(`https://abazarak.ir/api/admin/accounts/${id}/`, {
    headers: {
      Cookie: context.req.headers.cookie || "",
    },
  });

  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const user = await res.json();

  return {
    props: {
      userData: user,
    },
  };
}

export default function EditUser({ userData }) {
  console.log(userData);

  const router = useRouter();

  const [user, setUser] = useState(userData || []);

  const [loading, setLoading] = useState(false);

  const [userActiveStatus, setUserActiveStatus] = useState(user.is_active);
  const [userAdminStatus, setUserAdminStatus] = useState(user.is_staff);

  const changeUserActiveStatus = () => {
    setLoading(true);
    axios.defaults.withCredentials = true;
    axios
      .patch(`/api/admin/accounts/${user.id}/`, {
        is_active: !userActiveStatus,
      })
      .then((response) => {
        console.log("active : " + response.data.is_active);

        setUserActiveStatus(response.data.is_active);
        toast.success("حالت کاربر با موفقیت تغییر کرد");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const changeUserAdminStatus = () => {
    setLoading(true);
    axios.defaults.withCredentials = true;
    axios
      .patch(`/api/admin/accounts/${user.id}/`, {
        is_staff: !userAdminStatus,
      })
      .then((response) => {
        console.log("admin : " + response.data.is_staff);

        setUserAdminStatus(response.data.is_staff);
        toast.success("حالت ادمین با موفقیت تغییر کرد");
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

      <Toaster position="bottom-left" reverseOrder={true} />

      <div className={styles.main_title}>
        <div className={styles.back_btn} onClick={() => router.back()}>
          <span>
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
          بازگشت
        </div>
        صفحه کاربر
      </div>

      <div className={styles.user}>
        <div className={styles.first_section}>
          <div className={styles.inf_box}>
            <div className={styles.title}>نام</div>

            <div className={styles.content}>{user.get_full_name}</div>
          </div>

          <div className={styles.inf_box}>
            <div className={styles.title}>شماره موبایل</div>

            <div className={styles.content} style={{ direction: "ltr" }}>
              {user.number}
            </div>
          </div>

          <div className={styles.inf_box}>
            <div className={styles.title}>وضعیت کاربر</div>

            <div className={styles.content}>
              {user.is_active ? "فعال" : "غیر فعال"}
            </div>
          </div>

          <div className={styles.inf_box}>
            <div className={styles.title}>وضعیت شماره موبایل</div>

            <div className={styles.content}>
              {user.is_verified ? "فعال" : "غیر فعال"}
            </div>
          </div>

          <div className={styles.inf_box}>
            <div className={styles.title}>تاریخ پیوستن</div>

            <div className={styles.content}>{user.date_joined}</div>
          </div>

          <div className={styles.inf_box}>
            <div className={styles.title}>حالت ادمین</div>

            <div className={styles.content}>
              {user.is_staff ? "فعال" : "غیر فعال"}
            </div>
          </div>
        </div>

        <div className={styles.second_section}>
          <div className={styles.admin_btn}>
            <div className={styles.title}>حالت ادمین</div>

            <div
              className={`${styles.inventory_button} ${
                userAdminStatus ? styles.show : ""
              }`}
              onClick={() => {
                changeUserAdminStatus();
              }}
            >
              <div>
                <span></span>
              </div>
            </div>
          </div>

          <div className={styles.admin_btn}>
            <div className={styles.title}>حالت کاربر</div>

            <div
              className={`${styles.inventory_button} ${
                userActiveStatus ? styles.show : ""
              }`}
              onClick={() => {
                changeUserActiveStatus();
              }}
            >
              <div>
                <span></span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.third_section}>
          <div className={styles.title}>تاریخچه سفارشات</div>

          <div className={styles.content}>
            {user.orders.length > 0 ? (
              user.orders.map((order) => (
                <Link
                  href={`/admin/orders/${order.id}`}
                  className={styles.order}
                  key={order.id}
                >
                  <div className={styles.order_datails}>
                    <div className={styles.order_date}>{order.created_at}</div>

                    <div className={styles.order_status}>
                      <div className={`${order.shipped ? styles.show : ""}`}>
                        <FontAwesomeIcon icon={faTruckFast} />
                      </div>

                      <div className={`${order.paid ? styles.show : ""}`}>
                        <FontAwesomeIcon icon={faCreditCard} />
                      </div>
                    </div>
                  </div>

                  <div className={styles.order_num}>
                    تعداد محصولات : {order.items_count}
                  </div>

                  <div className={styles.order_price}>{order.total_price}</div>
                </Link>
              ))
            ) : (
              <div>سفارشی یافت نشد !</div>
            )}
          </div>
        </div>

        <div className={styles.fourth_section}>
          <div className={styles.title}>تاریخچه کامنت ها</div>

          <div className={styles.content}>
            {user.comments.length > 0 ? (
              user.comments.map((comment) => (
                <Link
                  href={`/admin/comments/${comment.id}`}
                  className={styles.comment}
                  key={comment.id}
                >
                  <div className={styles.comment_top_section}>
                    <div className={styles.product_name}>
                      {comment.product_name}
                    </div>

                    <div className={styles.product_score}>
                      <span
                        className={`${comment.score >= 1 ? styles.show : ""}`}
                      >
                        <FontAwesomeIcon icon={faStar} />
                      </span>

                      <span
                        className={`${comment.score >= 2 ? styles.show : ""}`}
                      >
                        <FontAwesomeIcon icon={faStar} />
                      </span>

                      <span
                        className={`${comment.score >= 3 ? styles.show : ""}`}
                      >
                        <FontAwesomeIcon icon={faStar} />
                      </span>

                      <span
                        className={`${comment.score >= 4 ? styles.show : ""}`}
                      >
                        <FontAwesomeIcon icon={faStar} />
                      </span>

                      <span
                        className={`${comment.score >= 5 ? styles.show : ""}`}
                      >
                        <FontAwesomeIcon icon={faStar} />
                      </span>
                    </div>
                  </div>

                  {comment.content}

                  <div className={styles.comment_date}>
                    {comment.created_at}
                  </div>
                </Link>
              ))
            ) : (
              <div>کامنتی یافت نشد !</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
