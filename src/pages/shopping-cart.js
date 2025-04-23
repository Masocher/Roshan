import styles from "../styles/shopping/ShoppingCart.module.css";
import Header from "@/components/global/Header";
import BlackBackground from "@/components/global/BlacKBackground";
import MiniMenu from "@/components/global/MiniMenu";
import Footer from "@/components/global/Footer";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faMinus,
    faTrashCan,
    faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { changeSlug } from "@/store/Actions";
import Loading from "@/components/global/Loading";
import spiner from "../../public/images/loading.svg";

export default function ShoppingCart() {
    const dispatch = useDispatch();

    const router = useRouter();

    let [categoriesStatus, setCategoriesStatus] = useState(false);

    const [products, setProducts] = useState([]);
    const [productsPrice, setProductsPrice] = useState({
        base_price: "",
        discount_amount: "",
        final_price: "",
    });
    const [bonusStatus, setBonusStatus] = useState(null);

    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.defaults.withCredentials = true;
        axios
            .get("https://abazarak.ir/api/ordering/cart/")
            .then((response) => {
                setProducts(response.data.items);

                setProductsPrice({
                    base_price: response.data.base_price,
                    discount_amount: response.data.discount_amount,
                    final_price: response.data.final_price,
                });

                setBonusStatus(response.data.cupon);
                setLoading(false);
            })
            .catch((err) => {
                if (err.status === 401) {
                    toast.error(
                        "برای ورود به سبد خرید ابتدا وارد حساب خود شوید"
                    );
                    router.push("/sign-in");
                } else {
                    console.log(err);
                }
                setLoading(false);
            });
    }, []);

    const changeProduct = (id, type) => {
        setLoading2(true);
        axios.defaults.withCredentials = true;
        axios
            .post("https://abazarak.ir/api/ordering/cart/change-item/", {
                item_id: `${id}`,
                action: type,
            })
            .then((response) => {
                setProducts(response.data.items);

                setProductsPrice({
                    base_price: response.data.base_price,
                    discount_amount: response.data.discount_amount,
                    final_price: response.data.final_price,
                });

                setBonusStatus(response.data.cupon);

                if (type === "inc") {
                    toast.success("تعداد انتخاب شده محصول اضافه شد");
                } else if (type === "dec") {
                    toast.success("تعداد انتخاب شده محصول کم شد");
                } else if (type === "del") {
                    toast.success("محصول با موفقیت حذف شد");
                }

                setLoading2(false);
            })
            .catch((err) => {
                console.log(err);

                toast.error(err.response.data.detail);

                setLoading2(false);
            });
    };

    const [bonusCode, setBonusCode] = useState("");

    const setBonus = (code) => {
        setLoading2(true);

        if (code.length === 0) {
            toast.error("یک مقدار معتبر وارد کنید");

            setLoading2(false);
        } else {
            axios.defaults.withCredentials = true;
            axios
                .post("https://abazarak.ir/api/ordering/cart/apply-cupon/", {
                    code: `${code}`,
                })
                .then((response) => {
                    toast.success("کد تخفیف روی سبد خرید شما اعمال شد");

                    setProductsPrice({
                        base_price: response.data.base_price,
                        discount_amount: response.data.discount_amount,
                        final_price: response.data.final_price,
                    });

                    setBonusCode("");

                    setBonusStatus(response.data.cupon);

                    setLoading2(false);
                })
                .catch((err) => {
                    if (err.status === 400) {
                        toast.error("کد تخفیف وارد شده صحیح نیست");
                    }
                    setBonusCode("");

                    setLoading2(false);
                });
        }
    };

    const removeBonus = () => {
        axios.defaults.withCredentials = true;
        axios
            .post("https://abazarak.ir/api/ordering/cart/remove-cupon/")
            .then((response) => {
                toast.success("کد تخفیف با موفقیت حذف شد");

                setProductsPrice({
                    base_price: response.data.base_price,
                    discount_amount: response.data.discount_amount,
                    final_price: response.data.final_price,
                });

                setBonusStatus(response.data.cupon);
            })
            .catch((err) => console.log(err));
    };

    if (loading) {
        return <Loading />;
    } else {
        return (
            <div className={styles.container}>
                <div
                    className={`${styles.loading} ${
                        loading2 ? styles.show : ""
                    }`}
                >
                    <div className={styles.loading_wrapper}>
                        <Image
                            src={spiner}
                            width={80}
                            height={80}
                            alt="لودینگ"
                        />
                    </div>
                </div>

                <Toaster position="bottom-left" reverseOrder={true} />

                <BlackBackground
                    status={categoriesStatus}
                    setStatus={setCategoriesStatus}
                />
                <MiniMenu
                    status={categoriesStatus}
                    setStatus={setCategoriesStatus}
                />
                <Header
                    status={categoriesStatus}
                    setStatus={setCategoriesStatus}
                />

                <div className={styles.cart_wrapper}>
                    {products.length === 0 ? (
                        <div className={styles.no_product}>
                            <span>
                                <FontAwesomeIcon icon={faCartPlus} />
                            </span>
                            سبد خرید شما خالی است
                            <Link
                                href={"/products"}
                                className={styles.show_products_btn}
                            >
                                مشاهده محصولات
                            </Link>
                        </div>
                    ) : (
                        <div className={styles.right_section}>
                            {products.map((product) => (
                                <div
                                    className={styles.cart_product}
                                    key={product.product.id}
                                >
                                    <div
                                        className={styles.product_right_content}
                                    >
                                        <Link href={`${product.product.slug}`}>
                                            <Image
                                                className={
                                                    styles.cart_product_img
                                                }
                                                src={product.product.image}
                                                alt="عکس محصول"
                                                width={100}
                                                height={100}
                                                quality={100}
                                            />
                                        </Link>

                                        <div
                                            className={styles.cart_product_inf}
                                        >
                                            <Link
                                                href={`${product.product.slug}`}
                                                className={styles.product_title}
                                                onClick={() =>
                                                    dispatch(
                                                        changeSlug(
                                                            product.product.slug
                                                        )
                                                    )
                                                }
                                            >
                                                {product.product.name}
                                            </Link>

                                            <div
                                                className={
                                                    styles.cart_product_value
                                                }
                                            >
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faPlus}
                                                        onClick={() =>
                                                            changeProduct(
                                                                product.id,
                                                                "inc"
                                                            )
                                                        }
                                                    />
                                                </span>

                                                <div
                                                    className={
                                                        styles.cart_product_num
                                                    }
                                                >
                                                    {product.quantity}
                                                </div>

                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faMinus}
                                                        onClick={() => {
                                                            if (
                                                                product.quantity >
                                                                1
                                                            ) {
                                                                changeProduct(
                                                                    product.id,
                                                                    "dec"
                                                                );
                                                            } else {
                                                                toast.error(
                                                                    "کمتر از این مقدار مجاز نیست"
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className={styles.product_left_content}
                                    >
                                        <span
                                            onClick={() => {
                                                changeProduct(
                                                    product.id,
                                                    "del"
                                                );
                                                toast.success(
                                                    "محصول مورد نظر با موفقیت حذف شد"
                                                );
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrashCan}
                                            />
                                        </span>

                                        <div
                                            className={
                                                styles.cart_product_price
                                            }
                                        >
                                            {product.product.final_price}
                                            <div className={styles.toman}>
                                                تومان
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div
                        className={`${styles.left_section} ${
                            products.length === 0 ? styles.show : ""
                        }`}
                    >
                        <div className={styles.title}>اطلاعات پرداخت</div>

                        {bonusStatus === null ? (
                            <form
                                className={styles.bonus_code_box}
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <input
                                    type="text"
                                    placeholder="کد تخفیف را وارد کنید"
                                    onChange={(e) => {
                                        setBonusCode(e.target.value);
                                    }}
                                    value={bonusCode}
                                />

                                <button
                                    type="submit"
                                    onClick={() => setBonus(bonusCode)}
                                >
                                    اعمال تخفیف
                                </button>
                            </form>
                        ) : (
                            <div className={styles.bonus_box}>
                                <div className={styles.bonus_title}>
                                    کد تخفیف
                                </div>

                                <div className={styles.bottom_content}>
                                    <div className={styles.bonus_code}>
                                        {bonusStatus.code}
                                    </div>

                                    <div
                                        className={styles.delete_bonus}
                                        onClick={() => removeBonus()}
                                    >
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faTrashCan}
                                            />
                                        </span>
                                        حذف کردن
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className={styles.value_box}>
                            <div className={styles.value_title}>جمع کل</div>

                            <div className={styles.value}>
                                {productsPrice.base_price}
                                <div className={styles.toman}>تومان</div>
                            </div>
                        </div>

                        <div className={styles.value_box}>
                            <div className={styles.value_title}>تخفیف</div>

                            <div
                                className={`${styles.value} ${styles.off_value}`}
                            >
                                {productsPrice.discount_amount}
                                <div className={styles.toman}>تومان</div>
                            </div>
                        </div>

                        <div
                            className={`${styles.value_box} ${styles.buy_value}`}
                        >
                            <div className={styles.value_title}>
                                مبلغ قابل پرداخت
                            </div>

                            <div className={styles.value}>
                                {productsPrice.final_price}
                                <div className={styles.toman}>تومان</div>
                            </div>
                        </div>

                        <Link
                            href={"/purchase-information"}
                            className={styles.buy_btn}
                        >
                            تایید و تکمیل سفارش
                        </Link>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}
