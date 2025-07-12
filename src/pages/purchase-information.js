import styles from "../styles/shopping/PurchaseInformation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faLocationDot,
  faEarthAmericas,
  faPlus,
  faUser,
  faAddressCard,
  faClose,
  faAngleLeft,
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import Gateway from "../components/global/Gateway";
import Loading from "@/components/global/Loading";
import cities from "../cities.json";
import spiner from "../../public/images/loading.svg";
import Head from "next/head";

export async function getServerSideProps(context) {
  const { req } = context;
  const cookie = req.headers.cookie || "";

  try {
    const res = await fetch("https://abazarak.ir/api/ordering/preview/", {
      headers: {
        Cookie: cookie,
      },
    });

    if (!res.ok) {
      return {
        redirect: {
          destination: "/sign-in",
          permanent: false,
        },
      };
    }

    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      return {
        redirect: {
          destination: "/shopping-cart",
          permanent: false,
        },
      };
    }

    return {
      props: {
        serverData: data,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default function PurchaseInformation({ serverData }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [gatewayStatus, setGatewayStatus] = useState(false);
  const [addressBoxStatus, setAddressBoxStatus] = useState(false);

  const [createAddressStatus, setCreateAddressStatus] = useState(false);

  const [provinceSelected, setProvinceSelected] = useState("");
  const [citySelected, setCitySelected] = useState("");

  const [provinceStatus, setProvinceStatus] = useState(false);
  const [cityStatus, setCityStatus] = useState(false);

  const [products, setProducts] = useState(serverData.items);
  const [addresses, setAddresses] = useState(serverData.addresses);
  const [productsPrice, setProductsPrice] = useState({
    base_price: serverData.base_price || "",
    discount_amount: serverData.discount_amount || "",
    final_price: serverData.final_price || "",
    shipping_fee: serverData.shipping_fee || "",
    pay_price: serverData.pay_price || "",
  });

  const [provinces, setProvinces] = useState([
    { province_id: 1, name: "آذربایجان شرقی" },
    { province_id: 2, name: "آذربایجان غربی" },
    { province_id: 3, name: "اردبیل" },
    { province_id: 4, name: "اصفهان" },
    { province_id: 5, name: "البرز" },
    { province_id: 6, name: "ایلام" },
    { province_id: 7, name: "بوشهر" },
    { province_id: 8, name: "تهران" },
    { province_id: 9, name: "چهارمحال و بختیاری" },
    { province_id: 10, name: "خراسان جنوبی" },
    { province_id: 11, name: "خراسان رضوی" },
    { province_id: 12, name: "خراسان شمالی" },
    { province_id: 13, name: "خوزستان" },
    { province_id: 14, name: "زنجان" },
    { province_id: 15, name: "سمنان" },
    { province_id: 16, name: "سیستان و بلوچستان" },
    { province_id: 17, name: "فارس" },
    { province_id: 18, name: "قزوین" },
    { province_id: 19, name: "قم" },
    { province_id: 20, name: "کردستان" },
    { province_id: 21, name: "کرمان" },
    { province_id: 22, name: "کرمانشاه" },
    { province_id: 23, name: "کهگیلویه و بویراحمد" },
    { province_id: 24, name: "گلستان" },
    { province_id: 25, name: "لرستان" },
    { province_id: 26, name: "گیلان" },
    { province_id: 27, name: "مازندران" },
    { province_id: 28, name: "مرکزی" },
    { province_id: 29, name: "هرمزگان" },
    { province_id: 30, name: "همدان" },
    { province_id: 31, name: "یزد" },
  ]);

  const [provinceId, setProvinceId] = useState();
  const [cityId, setCityId] = useState();
  const [address, setAddress] = useState("");
  const [pelak, setPelak] = useState("");
  const [postalCode, setPostalCode] = useState("3513987658");

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");

  const [changeAddress, setChangeAddress] = useState(true);

  const selectAddress = () => {
    const selected = addresses.find((ad) => ad.id === selectedAddressId);
    if (selected) {
      setSelectedAddress(selected);
    }
  };

  const createAddress = () => {
    setChangeAddress(!changeAddress);
    axios.defaults.withCredentials = true;
    axios
      .post("/api/ordering/addresses/", {
        province: provinceId,
        city: cityId,
        address: address,
        pelak: pelak,
        postal_code: postalCode,
      })
      .then((response) => {
        setCreateAddressStatus(false);
        setProvinceId("");
        setCityId("");
        setAddress("");
        setPelak("");
        setPostalCode("");
        setProvinceSelected("");
        setCitySelected("");
        setProvinceStatus(false);
        setCityStatus(false);
        setAddressBoxStatus(true);
        setSelectedAddressId(response.data.id);
        toast.success("آدرس شما با موفقیت ایجاد شد");
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          if (err.response.data.province) {
            toast.error("استان : " + err.response.data.province);
          } else if (err.response.data.city) {
            toast.error("شهر : " + err.response.data.city);
          } else if (err.response.data.postal_code) {
            toast.error("کد پستی : " + err.response.data.postal_code);
          } else if (err.response.data.pelak) {
            toast.error("پلاک : " + err.response.data.pelak);
          } else if (err.response.data.address) {
            toast.error("آدرس : " + err.response.data.address);
          }
        } else {
          toast.error("خطایی رخ داد !");
        }
      });
  };

  useEffect(() => {
    if (addresses.length > 0 && selectedAddressId === null) {
      setSelectedAddressId(addresses[0].id);
      setSelectedAddress(addresses[0]);
    }
  }, [addresses]);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("/api/ordering/preview/")
      .then((response) => {
        setAddresses(response.data.addresses);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          if (err.status === 401) {
            toast.error("برای ورود به صفحه ثبت سفارش ابتدا وارد حساب خود شوید");
            router.push("/sign-in");
          } else {
            toast.error("خطایی رخ داد !");
          }
        } else {
          toast.error("خطایی رخ داد !");
        }
      });
  }, [changeAddress]);

  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const [orderId, setOrderId] = useState(null);

  const checkout = () => {
    if (!fullName || !phoneNumber || !selectedAddressId) {
      toast.error("لطفا تمام فیلدها را پر کنید");
      return;
    }

    setLoading(true);

    axios.defaults.withCredentials = true;
    axios
      .post("/api/ordering/checkout/", {
        full_name: fullName,
        number: phoneNumber,
        address: selectedAddressId,
      })
      .then((response) => {
        setOrderId(response.data.order_id);
        setGatewayStatus(true);
        toast.success(response.data.detail);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          if (err.response.data.full_name) {
            toast.error("نام و نام خانوادگی : " + err.response.data.full_name);
            setFullNameError(true);
          } else if (err.response.data.number) {
            toast.error("شماره تلفن : " + err.response.data.number);
            setPhoneNumberError(true);
          } else if (err.response.data.address) {
            toast.error("آدرس : یک آدرس معتبر وارد کنید");
          } else if (err.response.status === 403) {
            toast.error(err.response.data.detail);
            router.push("/shopping-cart");
          } else {
            toast.error(err.response.data.detail);
          }
        } else {
          toast.error("خطایی رخ داد !");
        }
        setLoading(false);
      });
  };

  const [backStatus, setBackStatus] = useState(false);

  useEffect(() => {
    if (backStatus) {
      const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = "";
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [backStatus]);

  useEffect(() => {
    if (backStatus) {
      const timer = setTimeout(() => {
        router.push("/user-orders");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [backStatus, router]);

  if (products.length === 0) {
    return <Loading />;
  } else {
    return (
      <>
        <Head>
          <Head>
            <title>تکمیل خرید | فروشگاه ابازارک</title>
            <meta
              name="description"
              content="بررسی نهایی و ثبت سفارش ابزارآلات صنعتی در فروشگاه ابازارک. پرداخت امن، ارسال سریع و تضمین کیفیت محصولات."
            />
            <meta name="robots" content="noindex, nofollow" />
          </Head>
        </Head>

        <div className={styles.container}>
          <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
            <div className={styles.loading_wrapper}>
              <div className={styles.loading_wrapper_title}>روشن ابزار</div>
              <Image src={spiner} width={40} height={40} alt="لودینگ" />
            </div>
          </div>

          <Toaster position="bottom-left" reverseOrder={true} />

          <Gateway
            gatewayStatus={gatewayStatus}
            productsPrice={productsPrice}
            setBackStatus={setBackStatus}
            orderId={orderId}
          />

          <div
            className={`${styles.address_container} ${
              addressBoxStatus ? styles.show : ""
            }`}
          >
            <div className={styles.select_address}>
              <div className={styles.address_main_title}>انتخاب آدرس</div>

              <div className={styles.addresses}>
                {addresses.map((address) => (
                  <div
                    className={`${styles.address} ${
                      address.id === selectedAddressId ? styles.show : ""
                    }`}
                    key={address.id}
                    onClick={() => setSelectedAddressId(address.id)}
                  >
                    <div className={styles.address_title}>
                      <div
                        className={`${styles.check_box}  ${
                          address.id === selectedAddressId ? styles.show : ""
                        }`}
                      >
                        <span></span>
                      </div>

                      {address.address}
                    </div>

                    <div className={styles.address_inf}>
                      <span>
                        <FontAwesomeIcon icon={faAddressCard} />
                      </span>
                      {address.postal_code}
                    </div>

                    <div className={styles.address_inf}>
                      <span>
                        <FontAwesomeIcon icon={faLocationDot} />
                      </span>
                      {address.city_name}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.select_address_buttons}>
                <div
                  className={`${styles.new_address} ${styles.new_address_2}`}
                  onClick={() => {
                    setAddressBoxStatus(false);
                    selectAddress();
                  }}
                >
                  <span>
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </span>
                  انتخاب
                </div>

                <div
                  className={styles.new_address}
                  onClick={() => {
                    setAddressBoxStatus(false);
                    setCreateAddressStatus(true);
                  }}
                >
                  <span>
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                  افزودن آدرس جدید
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${styles.address_container} ${
              createAddressStatus ? styles.show : ""
            }`}
          >
            <div className={styles.select_address}>
              <div className={styles.address_main_title}>
                افزودن آدرس جدید
                <div
                  className={styles.close_btn}
                  onClick={() => setCreateAddressStatus(false)}
                >
                  <FontAwesomeIcon icon={faClose} />
                </div>
              </div>

              <div className={styles.address_inputs}>
                <div className={styles.address_section}>
                  <div
                    className={styles.select_box}
                    onClick={() => {
                      setProvinceStatus(!provinceStatus);
                      setCityStatus(false);
                    }}
                  >
                    <div>
                      {provinceSelected === ""
                        ? "انتخاب استان"
                        : provinceSelected}
                    </div>

                    <span>
                      <FontAwesomeIcon icon={faAngleLeft} />
                    </span>
                  </div>

                  <div
                    className={`${styles.select_box} ${
                      provinceSelected === "" ? styles.show : ""
                    }`}
                    onClick={() => {
                      setCityStatus(!cityStatus);
                      setProvinceStatus(false);
                    }}
                  >
                    <div>
                      {citySelected === "" ? "انتخاب شهر" : citySelected}
                    </div>

                    <span>
                      <FontAwesomeIcon icon={faAngleLeft} />
                    </span>
                  </div>
                </div>

                <div
                  className={`${styles.province_box} ${
                    provinceStatus ? styles.show : ""
                  }`}
                >
                  {provinces.map((p) => (
                    <div
                      className={styles.province}
                      key={p.province_id}
                      onClick={() => {
                        setProvinceSelected(p.name);
                        setProvinceId(p.province_id);
                        setProvinceStatus(false);
                        setCitySelected("");
                      }}
                    >
                      {p.name}
                    </div>
                  ))}
                </div>

                <div
                  className={`${styles.city_box} ${
                    cityStatus ? styles.show : ""
                  }`}
                >
                  {cities
                    .filter((city) => city.province_id == provinceId)
                    .map((c) => (
                      <div
                        className={styles.province}
                        key={c.city_id}
                        onClick={() => {
                          setCitySelected(c.name);
                          setCityId(c.city_id);
                          setCityStatus(false);
                        }}
                      >
                        {c.name}
                      </div>
                    ))}
                </div>

                <div className={styles.address_section}>
                  <input
                    type="text"
                    placeholder="کد پستی تحویل گیرنده"
                    onChange={(e) => setPostalCode(e.target.value)}
                    value={postalCode}
                  />

                  <input
                    type="text"
                    placeholder="پلاک تحویل گیرنده"
                    onChange={(e) => setPelak(e.target.value)}
                    value={pelak}
                  />
                </div>

                <textarea
                  placeholder="آدرس تحویل گیرنده"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />

                <div
                  className={styles.create_address_btn}
                  onClick={() => createAddress()}
                >
                  افزودن آدرس
                </div>
              </div>
            </div>
          </div>

          <div className={styles.top_section}>
            <Link href={"/shopping-cart"} className={styles.main_title}>
              <span>
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
              تکمیل سفارش
            </Link>

            <div className={styles.logo_box}>روشن مارکت</div>
          </div>

          <div className={styles.right_section}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className={`${styles.user_inf_form} ${
                fullNameError ? styles.name_error : ""
              } ${phoneNumberError ? styles.number_error : ""}`}
            >
              <div className={styles.title}>
                <span>
                  <FontAwesomeIcon icon={faUser} />
                </span>
                اطلاعات دریافت کننده
              </div>

              <input
                type="text"
                placeholder="نام و نام خانوادگی"
                onChange={(e) => {
                  setFullName(e.target.value);
                  setFullNameError(false);
                }}
              />

              <input
                type="text"
                placeholder="شماره تلفن"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setPhoneNumberError(false);
                }}
              />
            </form>

            <div className={styles.location_box}>
              <div className={styles.title}>انتخاب آدرس</div>

              <div className={styles.selected_address_box}>
                <div className={styles.title_box}>
                  <div className={styles.title}>
                    <span>
                      <FontAwesomeIcon icon={faEarthAmericas} />
                    </span>
                    {addresses.length === 0
                      ? "آدرسی در لیست شما وجود ندارد ، آدرس جدید ایجاد کنید"
                      : "ارسال به آدرس انتخاب شده"}
                  </div>

                  {addresses.length === 0 ? (
                    <div
                      className={`${styles.select_address_btn} ${styles.select_address_btn_1}`}
                      onClick={() => setCreateAddressStatus(true)}
                    >
                      <span>
                        <FontAwesomeIcon icon={faPlus} />
                      </span>
                      افزودن آدرس جدید
                    </div>
                  ) : (
                    <div
                      className={styles.select_address_btn}
                      onClick={() => setAddressBoxStatus(true)}
                    >
                      {selectedAddress === "" ? "انتخاب آدرس" : "تغییر آدرس"}
                      <span>
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </span>
                    </div>
                  )}
                </div>

                {selectedAddress === "" ? (
                  <div className={styles.please_select_address}>
                    <span>
                      <FontAwesomeIcon icon={faExclamationCircle} />
                    </span>
                    لطفا یک آدرس انتخاب کنید
                  </div>
                ) : (
                  <div className={styles.selected_address}>
                    <span>
                      <FontAwesomeIcon icon={faLocationDot} />
                    </span>
                    {selectedAddress.address}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.products}>
              {products.map((product) => (
                <div className={styles.product_box} key={product.id}>
                  <div className={styles.product_right_content}>
                    <Image
                      className={styles.cart_product_img}
                      src={product.product.image}
                      alt="عکس محصول"
                      width={100}
                      height={100}
                      quality={100}
                    />

                    <div className={styles.cart_product_inf}>
                      <div className={styles.product_title}>
                        {product.product.name}
                      </div>

                      <div className={styles.cart_product_value}>
                        <div className={styles.cart_product_num}>
                          {product.quantity} <span>عدد</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.product_left_content}>
                    <div className={styles.cart_product_price}>
                      {product.price}
                      <div className={styles.toman}>تومان</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.purchase_inf}>
            <div className={styles.inf_box}>
              <div className={styles.title}>قیمت محصولات</div>

              <div className={styles.badge}>
                {productsPrice.base_price}
                <div className={styles.toman}>تومان</div>
              </div>
            </div>

            <div className={`${styles.inf_box} ${styles.inf_box_1}`}>
              <div className={styles.title}>تخفیف</div>

              <div className={styles.badge}>
                {productsPrice.discount_amount}
                <div className={styles.toman}>تومان</div>
              </div>
            </div>

            <div className={`${styles.inf_box} ${styles.inf_box_2}`}>
              <div className={styles.title}>جمع کل</div>

              <div className={styles.badge}>
                {productsPrice.final_price}
                <div className={styles.toman}>تومان</div>
              </div>
            </div>

            <div className={`${styles.inf_box} ${styles.inf_box_3}`}>
              <div className={styles.title}>هزینه ارسال</div>

              <div className={styles.badge}>
                {productsPrice.shipping_fee}
                <div className={styles.toman}>تومان</div>
              </div>
            </div>

            <div className={`${styles.inf_box} ${styles.inf_box_4}`}>
              <div className={styles.title}>مبلغ قابل پرداخت</div>

              <div className={styles.badge}>
                <span>{productsPrice.pay_price}</span>
                <div className={styles.toman}>تومان</div>
              </div>
            </div>

            <div className={styles.buy_btn} onClick={() => checkout()}>
              ثبت سفارش
            </div>
          </div>
        </div>
      </>
    );
  }
}
