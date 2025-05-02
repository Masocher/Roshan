import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/admin/Products.module.css";
import {
    faSearch,
    faAngleLeft,
    faAngleRight,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Loading from "../global/Loading";

export default function Products() {
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const [products, setProducts] = useState([]);

    const getProducts = async (url) => {
        setLoading(true);
        axios.defaults.withCredentials = true;
        const response = await axios
            .get(url)
            .catch((err) => router.push("404"));

        const result = await response.data.results;
        setProducts(result);
        setLoading(false);
    };

    const [buttonsStatus, setButtonsStatus] = useState(false);
    const [inventory, setInventory] = useState(true);

    const filter = () => {
        if (!inventory) {
            getProducts("https://abazarak.ir/api/admin/products/?supply=1");
        } else {
            getProducts("https://abazarak.ir/api/admin/products/");
        }
    };

    const [activeProducts, setActiveProducts] = useState(true);

    const filter2 = () => {
        if (!activeProducts) {
            getProducts("https://abazarak.ir/api/admin/products/?active=false");
        } else {
            getProducts("https://abazarak.ir/api/admin/products/");
        }
    };

    useEffect(() => {
        setLoading(true);
        setInventory(!inventory);
        setActiveProducts(!activeProducts);
        filter();
        filter2();
        setLoading(false);
    }, []);

    const [searchText, setSearchText] = useState("");

    const search = () => {
        setButtonsStatus(true);
        setLoading(true);
        axios.defaults.withCredentials = true;
        axios
            .get(`https://abazarak.ir/api/admin/products/?search=${searchText}`)
            .then((res) => {
                setProducts(res.data.results);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    if (loading) {
        return <Loading />;
    } else {
        return (
            <div className={styles.container}>
                <div className={styles.search_box}>
                    <Link
                        className={styles.add_btn}
                        href={"/admin/products/create"}
                    >
                        <span>
                            <FontAwesomeIcon icon={faPlus} />
                        </span>
                        محصول جدید
                    </Link>

                    <form className={styles.products_search}>
                        <input
                            type="text"
                            placeholder="جستجوی محصول ..."
                            onChange={(e) => {
                                if (e.target.value === "") {
                                    setSearchText(e.target.value);
                                    setButtonsStatus(false);
                                    filter();
                                } else {
                                    setSearchText(e.target.value);
                                }
                            }}
                        />

                        <span
                            onClick={() => search()}
                            style={
                                searchText === ""
                                    ? { display: "none" }
                                    : { display: "block" }
                            }
                        >
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                    </form>

                    <div
                        className={styles.search_buttons}
                        style={
                            buttonsStatus
                                ? { display: "none" }
                                : { display: "flex" }
                        }
                    >
                        <div
                            className={`${styles.inventory_button} ${
                                activeProducts ? styles.show : ""
                            }`}
                            onClick={() => {
                                setActiveProducts(!activeProducts);
                                setInventory(false);
                                filter2();
                            }}
                        >
                            <div>
                                <span></span>
                            </div>
                            غیر فعال ها
                        </div>

                        <div
                            className={`${styles.inventory_button} ${
                                inventory ? styles.show : ""
                            }`}
                            onClick={() => {
                                setInventory(!inventory);
                                setActiveProducts(false);
                                filter();
                            }}
                        >
                            <div>
                                <span></span>
                            </div>
                            موجودی ها
                        </div>
                    </div>
                </div>

                <div className={styles.products}>
                    <div className={styles.products_top}>
                        <div className={styles.products_title}>شماره</div>
                        <div className={styles.products_title}>عکس</div>
                        <div className={styles.products_title}>نام</div>
                        <div className={styles.products_title}>قیمت</div>
                        <div className={styles.products_title}>تاریخ</div>
                        <div className={styles.products_title}>وضعیت</div>
                    </div>

                    {products.map((product, index) => (
                        <Link
                            onClick={() =>
                                localStorage.setItem("productId", product.id)
                            }
                            href={`/admin/products/${product.id}`}
                            className={styles.product}
                            key={product.id}
                        >
                            <div className={styles.product_id}>{index + 1}</div>

                            <Image
                                className={styles.product_image}
                                src={product.image}
                                alt="عکس محصول"
                                width={100}
                                height={100}
                                quality={100}
                            />

                            <div className={styles.product_name}>
                                {product.name}
                            </div>

                            <div className={styles.product_price}>
                                {product.price}
                            </div>

                            <div className={styles.product_date}>
                                {product.date}
                            </div>

                            <div className={styles.product_active}>
                                {product.active ? "فعال" : "غیر فعال"}
                            </div>
                        </Link>
                    ))}
                </div>

                <div className={styles.pagination}>
                    <div className={styles.perv_btn}>
                        <span>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </span>
                        قبلی
                    </div>
                    <div className={`${styles.page_btn} ${styles.show}`}>1</div>
                    <div className={`${styles.page_btn} ${""}`}>2</div>
                    <div className={`${styles.page_btn} ${""}`}>3</div>
                    <div className={`${styles.page_btn} ${""}`}>4</div>
                    <div className={`${styles.page_btn} ${""}`}>5</div>
                    <div className={styles.next_btn}>
                        بعدی
                        <span>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
