import styles from "../../styles/products/ProductsAll.module.css";
import ProductBox from "../global/ProductBox";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changeSlug, getProducts } from "@/store/Actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export default function ProductsAll() {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const products = useSelector((rootReducer) => rootReducer.productsReducer);

    useEffect(() => {
        setLoading(true);
        axios
            .get("https://roshan-api.liara.run/api/products/")
            .then((response) => {
                dispatch(getProducts(response.data.results));
            })
            .catch((error) => console.log(error));
        setLoading(false);
    }, []);

    if (loading) {
        <div className={styles.loading}>در حال دریافت اطلاعات</div>;
    } else {
        return (
            <div className={styles.container}>
                <div className={styles.products}>
                    {products.length === 0 ? (
                        <div className={styles.no_product}>
                            <span>
                                <FontAwesomeIcon icon={faExclamationTriangle} />
                            </span>
                            محصولی یافت نشد
                        </div>
                    ) : (
                        products.map((product) => (
                            <div
                                className={styles.product_box}
                                key={product.id}
                                onClick={() =>
                                    dispatch(changeSlug(product.slug))
                                }
                            >
                                <ProductBox
                                    slug={product.slug}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    finalPrice={product.final_price}
                                    discount={product.discount}
                                    amazing={product.is_amazing}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    }
}
