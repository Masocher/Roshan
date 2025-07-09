import styles from "../../styles/admin-options/Settings.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faClose } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";
import spiner from "../../../public/images/loading.svg";
import Image from "next/image";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;

export async function getServerSideProps(context) {
  const res = await fetch("https://abazarak.ir/api/admin/settings/", {
    headers: {
      Cookie: context.req.headers.cookie || "",
    },
  });

  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const settings = await res.json();

  return {
    props: {
      settings,
    },
  };
}

export default function Settings({ settings }) {
  const [shippingFee, setShippingFee] = useState(settings.shipping_price || "");

  const [loading, setLoading] = useState(false);

  const [loading_2, setLoading_2] = useState(false);
  const [loading_3, setLoading_3] = useState(false);

  const [inputFocus, setInputFocus] = useState(false);
  const [inputFocus_2, setInputFocus_2] = useState(false);

  const [searchedProducts, setSearchedProducts] = useState([]);
  const [searchedProducts_2, setSearchedProducts_2] = useState([]);

  const [text, setText] = useState("");
  const [text_2, setText_2] = useState("");

  const searchProduct = (theText) => {
    if (theText === "") {
      return toast.error("حداقل یک کاراکتر وارد کنید");
    }
    setLoading_2(true);
    axios
      .get(`/api/admin/products/fetch/?search=${theText}`)
      .then((response) => {
        setSearchedProducts(response.data);
        setLoading_2(false);
      })
      .catch(() => {
        toast.error("خطایی رخ داد !");
        setLoading_2(false);
      });
  };

  const searchProduct_2 = (theText) => {
    if (theText === "") {
      return toast.error("حداقل یک کاراکتر وارد کنید");
    }
    setLoading_3(true);
    axios
      .get(`/api/admin/products/fetch/?search=${theText}`)
      .then((response) => {
        setSearchedProducts_2(response.data);
        setLoading_3(false);
      })
      .catch((err) => {
        toast.error("خطایی رخ داد !");
        setLoading_3(false);
      });
  };

  const [selectedProducts, setSelectedproducts] = useState(
    settings.economic_products_data || []
  );
  const [selectedProductsIdList, setSelectedproductsIdList] = useState(
    settings.economic_products || []
  );

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

  const [selectedProducts_2, setSelectedproducts_2] = useState(
    settings.amazing_discounts_data || []
  );
  const [selectedProductsIdList_2, setSelectedproductsIdList_2] = useState(
    settings.amazing_discounts || []
  );

  const selectProducts_2 = (product) => {
    const status = selectedProducts_2.filter((p) => p.id === product.id);

    if (status.length > 0) {
      toast.error("محصول در لیست وجود دارد !");
    } else {
      setSelectedproducts_2([...selectedProducts_2, product]);
      setSelectedproductsIdList_2([...selectedProductsIdList_2, product.id]);
      toast.success("محصول به لیست اضافه شد");
    }
  };

  const unSelectProduct_2 = (id) => {
    setSelectedproducts_2(selectedProducts_2.filter((p) => p.id !== id));
    setSelectedproductsIdList_2(
      selectedProductsIdList_2.filter((p) => p !== id)
    );
    toast.success("محصول از لیست حذف شد");
  };

  const editSettings = () => {
    setLoading(true);
    axios
      .put("/api/admin/settings/", {
        amazing_discounts: selectedProductsIdList_2,
        economic_products: selectedProductsIdList,
        shipping_price: shippingFee,
      })
      .then(() => {
        toast.success("تنظیمات با موفقیت تغییر کرد");
        setLoading(false);
      })
      .catch(() => {
        toast.error("خطایی رخ داد !");
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
        onClick={() => {
          setText("");
          setSearchedProducts([]);
          setInputFocus(false);
        }}
        className={`${styles.dark_background} ${inputFocus ? styles.show : ""}`}
      ></div>

      <div
        onClick={() => {
          setText_2("");
          setSearchedProducts_2([]);
          setInputFocus_2(false);
        }}
        className={`${styles.dark_background} ${
          inputFocus_2 ? styles.show : ""
        }`}
      ></div>

      <div className={styles.main_title}>
        <Link className={styles.back_btn} href={"/admin-panel/products"}>
          <span>
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
          بازگشت
        </Link>
        تنظیمات کلی
      </div>

      <div className={styles.create_product}>
        <div className={styles.fourth_section}>
          <div className={styles.title}>هزینه پست ( به تومان )</div>

          <input
            className={styles.brand}
            type="text"
            placeholder="هزینه ارسال پست ( تومان )"
            onChange={(e) => setShippingFee(e.target.value)}
            value={shippingFee}
          />
        </div>

        <form
          className={`${styles.fourth_section} ${
            inputFocus ? styles.show : ""
          }`}
          onSubmit={(e) => {
            e.preventDefault();
            searchProduct(text);
          }}
        >
          <div className={styles.title}>کف قیمیتی ها</div>

          <div className={styles.select_category}>
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
          </div>

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
        </form>

        <form
          className={`${styles.fourth_section} ${
            inputFocus_2 ? styles.show : ""
          }`}
          onSubmit={(e) => {
            e.preventDefault();
            searchProduct_2(text_2);
          }}
        >
          <div className={styles.title}>محصولات شگفت انگیز</div>

          <div className={styles.select_category}>
            <input
              placeholder="نام محصول"
              type="text"
              onClick={() => setInputFocus_2(true)}
              onChange={(e) => {
                setText_2(e.target.value);
              }}
              value={text_2}
            />

            <button className={styles.submit_btn} type="submit">
              جستجو
            </button>
          </div>

          <div className={styles.selected_products}>
            {selectedProducts_2.length > 0
              ? selectedProducts_2.map((p) => (
                  <div
                    className={styles.selected_product}
                    key={p.id}
                    onClick={() => unSelectProduct_2(p.id)}
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

          {loading_3 ? (
            <div className={styles.loading_wrapper_2}>
              <Image src={spiner} width={80} height={80} alt="لودینگ" />
            </div>
          ) : (
            <div
              className={`${styles.products} ${
                inputFocus_2 ? styles.show : ""
              }`}
            >
              {searchedProducts_2.length > 0 ? (
                searchedProducts_2.map((product) => (
                  <div
                    className={`${styles.product} ${selectedProducts_2.forEach(
                      (element) => {
                        element.id === product.id ? styles.show : "";
                      }
                    )}`}
                    key={product.id}
                    onClick={() => selectProducts_2(product)}
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
        </form>

        {/* <div className={styles.fifth_section}>
          <div className={styles.add_feature}>
            <div className={styles.title}>افزودن لینک فوتر</div>

            <div className={styles.feature_inputs}>
              <input
                type="text"
                placeholder="عنوان لینک فوتر"
                className={styles.feature_title}
              />
              <input
                type="text"
                placeholder="لینک"
                className={styles.feature_title}
              />
              <input
                type="text"
                placeholder="ستون لینک فوتر"
                className={styles.feature_title}
              />
              <div className={styles.add_feature_btn}>افزودن</div>
            </div>

            <div className={styles.features}>
              <div className={styles.feature_box}>
                <div className={styles.title}>همراه با روشن مارکت</div>
                <div className={styles.desc}>ارتباط با ما</div>
                <div className={styles.close_btn}>
                  <FontAwesomeIcon icon={faClose} />
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className={styles.sixth_section}>
          <div className={styles.home_category}>
            <div className={styles.upload_category_cover}>
              <span>
                <FontAwesomeIcon icon={faPlus} />
              </span>
              افزودن عکس دسته بندی
            </div>

            <input type="text" placeholder="انتخاب دسته بندی" />
          </div>

          <div className={styles.home_category}>
            <div className={styles.upload_category_cover}>
              <span>
                <FontAwesomeIcon icon={faPlus} />
              </span>
              افزودن عکس دسته بندی
            </div>

            <input type="text" placeholder="انتخاب دسته بندی" />
          </div>

          <div className={styles.home_category}>
            <div className={styles.upload_category_cover}>
              <span>
                <FontAwesomeIcon icon={faPlus} />
              </span>
              افزودن عکس دسته بندی
            </div>

            <input type="text" placeholder="انتخاب دسته بندی" />
          </div>

          <div className={styles.home_category}>
            <div className={styles.upload_category_cover}>
              <span>
                <FontAwesomeIcon icon={faPlus} />
              </span>
              افزودن عکس دسته بندی
            </div>

            <input type="text" placeholder="انتخاب دسته بندی" />
          </div>
        </div> */}

        <div className={styles.edit_btn} onClick={() => editSettings()}>
          ذخیره تنظیمات
        </div>
      </div>
    </div>
  );
}
