import styles from "../../styles/products/ProductsAll.module.css";
import ProductBox from "../global/ProductBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import spiner from "../../../public/images/loading.svg";
import Image from "next/image";

export default function ProductsAll({ loading, productsList }) {
  const products = productsList;

  const spinerStyles = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    userSelect: "none",
    padding: "50px 0",
    borderRight: "1px solid #eee",
    borderBottom: "1px solid #eee",
  };

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
        ) : loading ? (
          <div className="loader" style={spinerStyles}>
            <Image src={spiner} width={80} height={80} alt="لودینگ" />
          </div>
        ) : (
          products.map((product) => (
            <div className={styles.product_box} key={product.id}>
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
