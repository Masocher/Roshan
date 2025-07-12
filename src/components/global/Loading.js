import styles from "../../styles/global/Loading.module.css";
import spiner from "../../../public/images/loading.svg";
import Image from "next/image";

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>روشن ابزار</div>
      <Image
        src={spiner}
        width={50}
        height={50}
        style={{ color: "#12a386" }}
        alt="لودینگ"
      />
    </div>
  );
}
