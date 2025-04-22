import styles from "../../styles/products/ProductsAll.module.css";
import ProductBox from "../global/ProductBox";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export default function ProductsAll() {
    const products = useSelector((rootReducer) => rootReducer.productsReducer);

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
                                localStorage.setItem(
                                    "productSlug",
                                    product.slug
                                )
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
