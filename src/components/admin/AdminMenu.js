import styles from "../../styles/admin/AdminMenu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faTruckRampBox,
  faList,
  faCopyright,
  faComments,
  faUsers,
  faSackDollar,
  faCubes,
  faPercent,
  faMessage,
  faGear,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AdminMenu() {
  const router = useRouter();

  return (
    <div className={styles.admin_menu}>
      <div className={styles.main_title}>
        <div>پنل ادمین</div>

        <span>فرشاد چراغی</span>
      </div>

      <div className={styles.menu_items}>
        <Link
          href={"/admin-panel/products"}
          className={`${styles.menu_item} ${
            router.pathname === "/admin-panel/products" ? styles.show : ""
          }`}
        >
          <span>
            <FontAwesomeIcon icon={faBoxOpen} />
          </span>

          <div>محصولات</div>
        </Link>

        <Link
          href={"/admin-panel/orders"}
          className={`${styles.menu_item} ${
            router.pathname === "/admin-panel/orders" ? styles.show : ""
          }`}
        >
          <span>
            <FontAwesomeIcon icon={faTruckRampBox} />
          </span>

          <div>سفارشات</div>
        </Link>

        <Link
          href={"/admin-panel/categories"}
          className={`${styles.menu_item} ${
            router.pathname === "/admin-panel/categories" ? styles.show : ""
          }`}
        >
          <span>
            <FontAwesomeIcon icon={faList} />
          </span>

          <div>دسته بندی ها</div>
        </Link>

        <Link
          href={"/admin-panel/brands"}
          className={`${styles.menu_item} ${
            router.pathname === "/admin-panel/brands" ? styles.show : ""
          }`}
        >
          <span>
            <FontAwesomeIcon icon={faCopyright} />
          </span>

          <div>برند ها</div>
        </Link>

        <Link
          href={"/admin-panel/comments"}
          className={`${styles.menu_item} ${
            router.pathname === "/admin-panel/comments" ? styles.show : ""
          }`}
        >
          <span>
            <FontAwesomeIcon icon={faComments} />
          </span>

          <div>کامنت ها</div>
        </Link>

        <Link
          href={"/admin-panel/users"}
          className={`${styles.menu_item} ${
            router.pathname === "/admin-panel/users" ? styles.show : ""
          }`}
        >
          <span>
            <FontAwesomeIcon icon={faUsers} />
          </span>

          <div>کاربران</div>
        </Link>

        <Link
          href={"/admin-panel/codes"}
          className={`${styles.menu_item} ${
            router.pathname === "/admin-panel/codes" ? styles.show : ""
          }`}
        >
          <span>
            <FontAwesomeIcon icon={faSackDollar} />
          </span>

          <div>کد های تخفیف</div>
        </Link>

        <Link
          href={"/admin-panel/offers"}
          className={`${styles.menu_item} ${
            router.pathname === "/admin-panel/offers" ? styles.show : ""
          }`}
        >
          <span>
            <FontAwesomeIcon icon={faCubes} />
          </span>

          <div>آفر ها</div>
        </Link>

        <Link
          href={"/admin-panel/discounts"}
          className={`${styles.menu_item} ${
            router.pathname === "/admin-panel/discounts" ? styles.show : ""
          }`}
        >
          <span>
            <FontAwesomeIcon icon={faPercent} />
          </span>

          <div>تخفیفات</div>
        </Link>

        <Link
          href={"/admin-panel/tickets"}
          className={`${styles.menu_item} ${
            router.pathname === "/admin-panel/tickets" ? styles.show : ""
          }`}
        >
          <span>
            <FontAwesomeIcon icon={faMessage} />
          </span>

          <div>تیکت ها</div>
        </Link>

        <Link
          href={"/admin/settings"}
          className={`${styles.menu_item} ${
            router.pathname === "/admin-panel/settings" ? styles.show : ""
          }`}
        >
          <span>
            <FontAwesomeIcon icon={faGear} />
          </span>

          <div>تنظیمات</div>
        </Link>
      </div>

      <Link href={"/"} className={styles.back_to_home_btn}>
        <div>برگشت به فروشگاه</div>
        <span>
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
      </Link>
    </div>
  );
}
