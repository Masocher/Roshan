import styles from "../../styles/admin/Brands.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPlus, faClose } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import spiner from "../../../public/images/loading.svg";
import Image from "next/image";
import AdminMenu from "@/components/admin/AdminMenu";

export async function getServerSideProps(context) {
  const res = await fetch("https://abazarak.ir/api/admin/brands/", {
    headers: {
      Cookie: context.req.headers.cookie || "",
    },
  });

  if (!res.ok) {
    return { notFound: true };
  }

  const data = await res.json();
  const brandsList = data;

  return {
    props: { brandsList },
  };
}

export default function Brands({ brandsList }) {
  const [loading, setLoading] = useState(false);

  const [brands, setBrands] = useState(brandsList || []);

  const getBrands = () => {
    setLoading(true);
    axios.defaults.withCredentials = true;
    axios
      .get("/api/admin/brands/")
      .then((res) => {
        setBrands(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const [popUp, setPopUp] = useState(false);

  const [name, setName] = useState("");

  const addBrand = () => {
    axios
      .post("/api/admin/brands/", {
        name: name,
      })
      .then((res) => {
        getBrands();
        toast.success("برند با موفقیت ساخته شد");
        setName("");
        setPopUp(false);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          if (err.response.data.name) {
            toast.error("نام برند : " + err.response.data.name);
          } else {
            console.log(err);
          }
        }
      });
  };

  const deleteBrand = (slug) => {
    axios
      .delete(`/api/admin/brands/${slug}/`)
      .then((res) => {
        getBrands();
        toast.success("برند با موفقیت حذف شد");
      })
      .catch((err) => {
        console.log(err);
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

      <div className={styles.add_btn} onClick={() => setPopUp(true)}>
        <span>
          <FontAwesomeIcon icon={faPlus} />
        </span>
        برند جدید
      </div>

      <div className={`${styles.add_brand_pop_up} ${popUp ? styles.show : ""}`}>
        <form>
          <div className={styles.main_title}>
            <span onClick={() => setPopUp(false)}>
              <FontAwesomeIcon icon={faClose} />
            </span>
            ایجاد برند
          </div>

          <div className={styles.inputs}>
            <input
              className={styles.name}
              type="text"
              placeholder="نام برند"
              onChange={(e) => setName(e.target.value)}
              value={name}
              maxLength={128}
              style={{ marginLeft: "10px" }}
            />

            <div className={styles.add_brand_btn} onClick={() => addBrand()}>
              افزودن برند
            </div>
          </div>
        </form>
      </div>

      <div className={styles.brands}>
        <div className={styles.brands_top}>
          <div className={styles.brands_title}>شماره</div>
          <div className={styles.brands_title}>نام</div>
          <div className={styles.brands_title}>تعداد محصولات</div>
          <div className={styles.hidden_title}></div>
        </div>

        {brands.map((brand, index) => (
          <div className={styles.brand} key={index}>
            <div className={styles.brand_id}>{index + 1}</div>

            <div className={styles.brand_name}>{brand.name}</div>

            <div className={styles.brand_value}>{brand.products_count}</div>

            <div className={styles.brand_buttons}>
              <div
                className={styles.brand_delete}
                onClick={() => deleteBrand(brand.slug)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdminMenu />
    </div>
  );
}
