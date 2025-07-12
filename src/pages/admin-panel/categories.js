import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/admin/Categories.module.css";
import { faTrashCan, faPlus, faClose } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import spiner from "../../../public/images/loading.svg";
import Image from "next/image";
import AdminMenu from "@/components/admin/AdminMenu";

axios.defaults.withCredentials = true;

export async function getServerSideProps(context) {
  const res = await fetch("https://abazarak.ir/api/admin/categories/", {
    headers: {
      Cookie: context.req.headers.cookie || "",
    },
  });

  if (!res.ok) {
    return { notFound: true };
  }

  const data = await res.json();
  const categoriesList = data;

  return {
    props: { categoriesList },
  };
}

export default function Categories({ categoriesList }) {
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState(categoriesList || []);

  const getCategories = () => {
    setLoading(true);
    axios
      .get("/api/admin/categories/")
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("خطایی رخ داد !");
        setLoading(false);
      });
  };

  const [popUp, setPopUp] = useState(false);

  const [name, setName] = useState("");
  const [parent, setParent] = useState("");

  const addCategory = () => {
    setLoading(true);
    axios
      .post("/api/admin/categories/", {
        name: name,
        parent: parent,
      })
      .then(() => {
        getCategories();
        toast.success("دسته بندی با موفقیت ساخته شد");
        setName("");
        setParent("");
        setPopUp(false);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          if (err.response.data.name) {
            toast.error("نام دسته بندی : " + err.response.data.name);
          } else {
            toast.error("خطایی رخ داد !");
          }
        }
        setLoading(false);
      });
  };

  const deleteCategory = (slug) => {
    setLoading(true);
    axios
      .delete(`/api/admin/categories/${slug}/`)
      .then(() => {
        getCategories();
        toast.success("دسته بندی با موفقیت حذف شد");
        setLoading(false);
      })
      .catch(() => {
        toast.error("خطایی رخ داد !");
        setLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>ابازارک | پنل مدیریت | دسته بندی ها</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content={"پنل مدیریت سایت ابازارک | دسته بندی ها"}
        />
      </Head>

      <div className={styles.container}>
        <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
          <div className={styles.loading_wrapper}>
            <div className={styles.loading_wrapper_title}>روشن ابزار</div>
            <Image src={spiner} width={40} height={40} alt="لودینگ" />
          </div>
        </div>

        <Toaster position="bottom-left" reverseOrder={true} />

        <div className={styles.add_btn} onClick={() => setPopUp(true)}>
          <span>
            <FontAwesomeIcon icon={faPlus} />
          </span>
          دسته بندی جدید
        </div>

        <div
          className={`${styles.add_category_pop_up} ${
            popUp ? styles.show : ""
          }`}
        >
          <form>
            <div className={styles.main_title}>
              <span onClick={() => setPopUp(false)}>
                <FontAwesomeIcon icon={faClose} />
              </span>
              ایجاد دسته بندی
            </div>

            <div className={styles.inputs}>
              <input
                className={styles.name}
                type="text"
                placeholder="نام دسته بندی"
                onChange={(e) => setName(e.target.value)}
                value={name}
                maxLength={128}
                style={{ marginLeft: "20px" }}
              />

              <input
                className={styles.name}
                type="text"
                placeholder="زیردسته ( الزامی نیست )"
                onChange={(e) => setParent(e.target.value)}
                value={parent}
                maxLength={128}
              />
            </div>

            <div
              className={styles.add_category_btn}
              onClick={() => addCategory()}
            >
              افزودن دسته بندی
            </div>
          </form>
        </div>

        <div className={styles.categories}>
          <div className={styles.categories_top}>
            <div className={styles.categories_title}>شماره</div>
            <div className={styles.categories_title}>نام</div>
            <div className={styles.categories_title}>تعداد محصولات</div>
            <div className={styles.hidden_title}></div>
          </div>

          {categories.map((categ, index) => (
            <div className={styles.category} key={index}>
              <div className={styles.category_id}>{index + 1}</div>

              <div className={styles.category_name}>{categ.name}</div>

              <div className={styles.category_value}>
                {categ.products_count}
              </div>

              <div className={styles.category_buttons}>
                <div
                  className={styles.category_delete}
                  onClick={() => deleteCategory(categ.slug)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <AdminMenu />
      </div>
    </>
  );
}
