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
    faExclamationTriangle,
    faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { changeSlug } from "@/store/Actions";

export default function ShoppingCart() {
    const dispatch = useDispatch();

    const router = useRouter();

    let [categoriesStatus, setCategoriesStatus] = useState(false);
    const [productValue, setProductValue] = useState(1);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios
            .get("https://roshan-api.liara.run/api/ordering/cart/")
            .then((response) => {
                setProducts(response.data);
                console.log(response.data);
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
            });
    }, []);

    const changeProduct = (id, type) => {
        axios.defaults.withCredentials = true;
        axios
            .post(
                "https://roshan-api.liara.run/api/ordering/cart/change-item/",
                { item_id: `${id}`, action: type }
            )
            .then((response) => setProducts(response.data))
            .catch((err) => console.log(err));
    };

    return (
        <div className={styles.container}>
            <Toaster position="bottom-left" reverseOrder={true} />

            <BlackBackground
                status={categoriesStatus}
                setStatus={setCategoriesStatus}
            />
            <MiniMenu
                status={categoriesStatus}
                setStatus={setCategoriesStatus}
            />
            <Header status={categoriesStatus} setStatus={setCategoriesStatus} />

            <div className={styles.cart_wrapper}>
                {products.length === 0 || products.items.length === 0 ? (
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
                        {products.items.map((product) => (
                            <div
                                className={styles.cart_product}
                                key={product.product.id}
                            >
                                <div className={styles.product_right_content}>
                                    <Link href={`${product.product.slug}`}>
                                        <Image
                                            className={styles.cart_product_img}
                                            src={product.product.image}
                                            alt="عکس محصول"
                                            width={100}
                                            height={100}
                                            quality={100}
                                        />
                                    </Link>

                                    <div className={styles.cart_product_inf}>
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
                                                            product.quantity > 1
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

                                <div className={styles.product_left_content}>
                                    <span
                                        onClick={() => {
                                            changeProduct(product.id, "del");
                                            toast.success(
                                                "محصول مورد نظر با موفقیت حذف شد"
                                            );
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </span>

                                    <div className={styles.cart_product_price}>
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
                        products.length === 0 || products.items.length === 0
                            ? styles.show
                            : ""
                    }`}
                >
                    <div className={styles.title}>اطلاعات پرداخت</div>

                    <form
                        className={styles.bonus_code_box}
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type="text"
                            placeholder="کد تخفیف را وارد کنید"
                        />

                        <button type="submit">اعمال تخفیف</button>
                    </form>

                    <div className={styles.value_box}>
                        <div className={styles.value_title}>جمع کل</div>

                        <div className={styles.value}>
                            {products.base_price}
                            <div className={styles.toman}>تومان</div>
                        </div>
                    </div>

                    <div className={styles.value_box}>
                        <div className={styles.value_title}>تخفیف</div>

                        <div className={`${styles.value} ${styles.off_value}`}>
                            {products.discount_amount}
                            <div className={styles.toman}>تومان</div>
                        </div>
                    </div>

                    <div className={`${styles.value_box} ${styles.buy_value}`}>
                        <div className={styles.value_title}>
                            مبلغ قابل پرداخت
                        </div>

                        <div className={styles.value}>
                            {products.final_price}
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
