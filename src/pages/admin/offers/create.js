import styles from "../../../styles/admin-options/CreateOffer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import spiner from "../../../../public/images/loading.svg";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

export default function CreateOffer() {
  const [loading, setLoading] = useState(false);
  const [loading_2, setLoading_2] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);

  const [percentFilter, setPercentFilter] = useState(false);
  const [tomanFilter, setTomanFilter] = useState(true);

  const [value, setValue] = useState("");
  const [atLeast, setAtLeast] = useState("");

  const [searchedProducts, setSearchedProducts] = useState([]);
  const [text, setText] = useState("");

  const searchProduct = () => {
    if (text === "") {
      return toast.error("حداقل یک کاراکتر وارد کنید");
    }
    setLoading_2(true);
    axios.defaults.withCredentials = true;
    axios
      .get(`/api/admin/products/fetch/?search=${text}`)
      .then((response) => {
        setSearchedProducts(response.data);
        setLoading_2(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading_2(false);
      });
  };

  const [selectedProducts, setSelectedproducts] = useState([]);
  const [selectedProductsIdList, setSelectedproductsIdList] = useState([]);

  const selectProducts = (product) => {
    const status = selectedProducts.filter((p) => p.id === product.id);

    if (status.length > 0) {
      toast.error("محصول در لیست وجود دارد !");
    } else {
      setSelectedproducts([...selectedProducts, product]);
      setSelectedproductsIdList([...selectedProductsIdList, product.id]);
      toast.success("محصول به لیست اضافه شد");
    }
  };

  const unSelectProduct = (id) => {
    setSelectedproducts(selectedProducts.filter((p) => p.id !== id));
    setSelectedproductsIdList(selectedProductsIdList.filter((p) => p !== id));
    toast.success("محصول از لیست حذف شد");
  };

  const sendData = () => {
    setLoading(true);
    axios.defaults.withCredentials = true;
    axios
      .post("/api/admin/offers/", {
        discount_type: percentFilter ? "percent" : "amount",
        discount_value: value,
        products: selectedProductsIdList,
        at_least: atLeast,
      })
      .then((res) => {
        setPercentFilter(false);
        setTomanFilter(true);
        setValue("");
        setAtLeast("");
        setSelectedproducts([]);
        setSelectedproductsIdList([]);
        setLoading(false);
        toast.success("کد تخفیف با موفقیت ایجاد شد");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          if (error.response.data.discount_type) {
            toast.error("نوع تخفیف : " + error.response.data.discount_type);
          } else if (error.response.data.discount_value) {
            toast.error("مقدار تخفیف : " + error.response.data.discount_value);
          } else if (error.response.data.non_field_errors) {
            error.response.data.non_field_errors.map((err) => toast.error(err));
          } else if (error.response.data.at_least) {
            toast.error("حداقل تعداد : " + error.response.data.at_least);
          } else {
            console.log(error);
          }
        }

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

      <div
        onClick={() => setInputFocus(false)}
        className={`${styles.dark_background} ${inputFocus ? styles.show : ""}`}
      ></div>

      <div className={styles.main_title}>
        <Link className={styles.back_btn} href={"/admin-panel/offers"}>
          <span>
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
          بازگشت
        </Link>
        افزودن آفر
      </div>

      <div className={styles.code}>
        <div className={styles.second_section}>
          <div className={styles.feature_box}>
            <div className={styles.title}>تخفیف تومانی</div>

            <div
              className={`${styles.inventory_button} ${
                tomanFilter ? styles.show : ""
              }`}
              onClick={() => {
                setPercentFilter(false);
                setTomanFilter(true);
              }}
            >
              <div>
                <span></span>
              </div>
            </div>
          </div>

          <div className={styles.feature_box}>
            <div className={styles.title}>تخفیف درصدی</div>

            <div
              className={`${styles.inventory_button} ${
                percentFilter ? styles.show : ""
              }`}
              onClick={() => {
                setPercentFilter(true);
                setTomanFilter(false);
              }}
            >
              <div>
                <span></span>
              </div>
            </div>
          </div>

          <div className={`${styles.feature_box} ${styles.main_feature}`}>
            <div className={styles.title}>مقدار تخفیف</div>

            <input
              type="text"
              placeholder={`مقدار تخفیف را به ${
                tomanFilter ? "تومان" : "درصد"
              } وارد کنید`}
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
          </div>

          <div className={styles.feature_box}>
            <div className={styles.title}>حداقل تعداد</div>

            <input
              type="text"
              onChange={(e) => setAtLeast(e.target.value)}
              value={atLeast}
            />
          </div>
        </div>

        <div className={`${styles.third_section} ${styles.third_section_2}`}>
          <div className={styles.title}>انتخاب محصولات</div>

          <form
            className={styles.select_category}
            onSubmit={(e) => {
              e.preventDefault();
              searchProduct();
            }}
          >
            <input
              placeholder="نام محصول"
              type="text"
              onClick={() => setInputFocus(true)}
              onChange={(e) => {
                setText(e.target.value);
              }}
              value={text}
            />

            <button className={styles.submit_btn} type="submit">
              جستجو
            </button>
          </form>

          <div className={styles.selected_products}>
            {selectedProducts.length > 0
              ? selectedProducts.map((p) => (
                  <div
                    className={styles.selected_product}
                    key={p.id}
                    onClick={() => unSelectProduct(p.id)}
                  >
                    <span>
                      <FontAwesomeIcon icon={faClose} />
                    </span>

                    <Image
                      src={p.image}
                      alt="عکس محصول"
                      className={styles.selected_product_image}
                      width={100}
                      height={100}
                    />
                  </div>
                ))
              : ""}
          </div>

          {loading_2 ? (
            <div className={styles.loading_wrapper_2}>
              <Image src={spiner} width={80} height={80} alt="لودینگ" />
            </div>
          ) : (
            <div
              className={`${styles.products} ${inputFocus ? styles.show : ""}`}
            >
              {searchedProducts.length > 0 ? (
                searchedProducts.map((product) => (
                  <div
                    className={`${styles.product} ${selectedProducts.forEach(
                      (element) => {
                        element.id === product.id ? styles.show : "";
                      }
                    )}`}
                    key={product.id}
                    onClick={() => selectProducts(product)}
                  >
                    <Image
                      className={styles.product_image}
                      src={product.image}
                      alt="عکس محصول"
                      width={100}
                      height={100}
                      quality={100}
                    />

                    <div className={styles.product_name}>{product.name}</div>

                    <div className={styles.product_price}>
                      {product.final_price} تومان
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.no_product}>محصولی یافت نشد !</div>
              )}
            </div>
          )}
        </div>

        <div className={styles.edit_btn} onClick={() => sendData()}>
          افزودن آفر
        </div>
      </div>
    </div>
  );
}
