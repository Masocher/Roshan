import styles from "../styles/shopping/PurchaseInformation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faArrowRight,
    faLocationDot,
    faEarthAmericas,
    faTruck,
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
import Gateway from "./gateway";
import Loading from "@/components/global/Loading";

export default function PurchaseInformation() {
    const router = useRouter();

    const [gatewayStatus, setGatewayStatus] = useState(false);
    const [addressBoxStatus, setAddressBoxStatus] = useState(false);

    const [createAddressStatus, setCreateAddressStatus] = useState(false);

    const [provinceSelected, setProvinceSelected] = useState("");
    const [citySelected, setCitySelected] = useState("");

    const [provinceStatus, setProvinceStatus] = useState(false);
    const [cityStatus, setCityStatus] = useState(false);

    const [products, setProducts] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [productsPrice, setProductsPrice] = useState({
        base_price: "",
        discount_amount: "",
        final_price: "",
        shipping_fee: "",
        pay_price: "",
    });
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);

    const [provinceId, setProvinceId] = useState();
    const [cityId, setCityId] = useState();
    const [address, setAddress] = useState("");
    const [pelak, setPelak] = useState("");
    const [postalCode, setPostalCode] = useState("3513987658");

    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState("");

    const [changeAddress, setChangeAddress] = useState(true);

    const selectAddress = () => {
        addresses.filter((ad) => {
            ad.id === selectedAddressId ? setSelectedAddress(ad) : null;
        });
    };

    const createAddress = () => {
        setChangeAddress(!changeAddress);
        axios.defaults.withCredentials = true;
        axios
            .post("https://abazarak.ir/api/ordering/addresses/", {
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
                toast.success("آدرس شما با موفقیت ایجاد شد");
                setProvinceSelected("");
                setCitySelected("");
                setProvinceStatus(false);
                setCityStatus(false);
                setAddressBoxStatus(true);
                setSelectedAddressId(response.data.id);
            })
            .catch((err) => {
                console.log(err);

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
            });
    };

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios
            .get("https://abazarak.ir/api/ordering/preview/")
            .then((response) => {
                setProducts(response.data.items);

                if (response.data.items.length === 0) {
                    router.push("/shopping-cart");
                    toast.error("ابتدا محصولاتی برای سفارش انتخاب کنید");
                }

                setAddresses(response.data.addresses);

                setProductsPrice({
                    base_price: response.data.base_price,
                    discount_amount: response.data.discount_amount,
                    final_price: response.data.final_price,
                    shipping_fee: response.data.shipping_fee,
                    pay_price: response.data.pay_price,
                });

                setProvinces(response.data.provinces);
                setCities(response.data.cities);
            })
            .catch((err) => {
                if (err.status === 401) {
                    toast.error(
                        "برای ورود به صفحه ثبت سفارش ابتدا وارد حساب خود شوید"
                    );
                    router.push("/sign-in");
                } else {
                    console.log(err);
                }
            });
    }, []);

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios
            .get("https://abazarak.ir/api/ordering/preview/")
            .then((response) => {
                setAddresses(response.data.addresses);
            })
            .catch((err) => {
                if (err.status === 401) {
                    toast.error(
                        "برای ورود به صفحه ثبت سفارش ابتدا وارد حساب خود شوید"
                    );
                    router.push("/sign-in");
                } else {
                    console.log(err);
                }
            });
    }, [changeAddress]);

    const [fullName, setFullName] = useState("");
    const [fullNameError, setFullNameError] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberError, setPhoneNumberErrorr] = useState(false);

    const [orderId, setOrderId] = useState(null);

    const checkout = () => {
        axios.defaults.withCredentials = true;
        axios
            .post("https://abazarak.ir/api/ordering/checkout/", {
                full_name: fullName,
                number: phoneNumber,
                address: selectedAddressId,
            })
            .then((response) => {
                setOrderId(response.data.order_id);
                setGatewayStatus(true);
                toast.success(response.data.detail);
            })
            .catch((err) => {
                if (err.response.data.full_name) {
                    toast.error(
                        "نام و نام خانوادگی : " + err.response.data.full_name
                    );
                    setFullNameError(true);
                } else if (err.response.data.number) {
                    toast.error("شماره تلفن : " + err.response.data.number);
                    setPhoneNumberErrorr(true);
                } else if (err.response.data.address) {
                    toast.error("آدرس : یک آدرس معتبر وارد کنید");
                } else if (err.status == 403) {
                    toast.error(err.response.data.detail);
                    router.push("/shopping-cart");
                } else {
                    toast.error(err.response.data.detail);
                }
            });
    };

    const [backStatus, setBackStatus] = useState(false);

    useEffect(() => {
        if (backStatus) {
            const handleBeforeUnload = (event) => {};

            window.addEventListener("beforeunload", handleBeforeUnload);

            return () => {
                window.removeEventListener("beforeunload", handleBeforeUnload);
            };
        }
    }, []);

    useEffect(() => {
        if (backStatus) {
            const timer = setTimeout(() => {
                router.push("/user-orders");
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [router]);

    if (products.length === 0) {
        return <Loading />;
    } else {
        return (
            <div className={styles.container}>
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
                        <div className={styles.address_main_title}>
                            انتخاب آدرس
                        </div>

                        <div className={styles.addresses}>
                            {addresses.map((address) => (
                                <div
                                    className={`${styles.address} ${
                                        address.id === selectedAddressId
                                            ? styles.show
                                            : ""
                                    }`}
                                    key={address.id}
                                    onClick={() =>
                                        setSelectedAddressId(address.id)
                                    }
                                >
                                    <div className={styles.address_title}>
                                        <div
                                            className={`${styles.check_box}  ${
                                                address.id === selectedAddressId
                                                    ? styles.show
                                                    : ""
                                            }`}
                                        >
                                            <span></span>
                                        </div>

                                        {address.address}
                                    </div>

                                    <div className={styles.address_inf}>
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faAddressCard}
                                            />
                                        </span>
                                        {address.postal_code}
                                    </div>

                                    <div className={styles.address_inf}>
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faLocationDot}
                                            />
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
                                        provinceSelected === ""
                                            ? styles.show
                                            : ""
                                    }`}
                                    onClick={() => {
                                        setCityStatus(!cityStatus);
                                        setProvinceStatus(false);
                                    }}
                                >
                                    <div>
                                        {citySelected === ""
                                            ? "انتخاب شهر"
                                            : citySelected}
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
                                    .filter(
                                        (city) => city.province == provinceId
                                    )
                                    .map((c) => (
                                        <div
                                            className={styles.province}
                                            key={c.province_id}
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
                                    onChange={(e) =>
                                        setPostalCode(e.target.value)
                                    }
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
                                setPhoneNumberErrorr(false);
                            }}
                        />
                    </form>

                    <div className={styles.location_box}>
                        <div className={styles.title}>انتخاب آدرس</div>

                        <div className={styles.selected_address_box}>
                            <div className={styles.title_box}>
                                <div className={styles.title}>
                                    <span>
                                        <FontAwesomeIcon
                                            icon={faEarthAmericas}
                                        />
                                    </span>
                                    {addresses.length === 0
                                        ? "آدرسی در لیست شما وجود ندارد ، آدرس جدید ایجاد کنید"
                                        : "ارسال به آدرس انتخاب شده"}
                                </div>

                                {addresses.length === 0 ? (
                                    <div
                                        className={`${styles.select_address_btn} ${styles.select_address_btn_1}`}
                                        onClick={() =>
                                            setCreateAddressStatus(true)
                                        }
                                    >
                                        <span>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </span>
                                        افزودن آدرس جدید
                                    </div>
                                ) : (
                                    <div
                                        className={styles.select_address_btn}
                                        onClick={() =>
                                            setAddressBoxStatus(true)
                                        }
                                    >
                                        {selectedAddress === ""
                                            ? "انتخاب آدرس"
                                            : "تغییر آدرس"}
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faArrowLeft}
                                            />
                                        </span>
                                    </div>
                                )}
                            </div>

                            {selectedAddress === "" ? (
                                <div className={styles.please_select_address}>
                                    <span>
                                        <FontAwesomeIcon
                                            icon={faExclamationCircle}
                                        />
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

                    <div className={styles.send_type}>
                        <span>
                            <FontAwesomeIcon icon={faTruck} />
                        </span>
                        ارسال معمولی
                    </div>

                    <div className={styles.products}>
                        {products.map((product) => (
                            <div
                                className={styles.product_box}
                                key={product.id}
                            >
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

                                        <div
                                            className={
                                                styles.cart_product_value
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.cart_product_num
                                                }
                                            >
                                                {product.quantity}{" "}
                                                <span>عدد</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.product_left_content}>
                                    <div className={styles.cart_product_price}>
                                        {product.price}
                                        <div className={styles.toman}>
                                            تومان
                                        </div>
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
                            {productsPrice.pay_price}
                            <div className={styles.toman}>تومان</div>
                        </div>
                    </div>

                    <div className={styles.buy_btn} onClick={() => checkout()}>
                        ثبت سفارش
                    </div>
                </div>
            </div>
        );
    }
}
