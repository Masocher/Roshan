import styles from "../../styles/home/Categories.module.css";
import img_1 from "../../../public/images/slider-1.jpg";
import img_3 from "../../../public/images/slider-3.jpg";
import img_4 from "../../../public/images/slider-4.jpg";
import img_5 from "../../../public/images/slider-5.jpg";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setCategoryQuery } from "@/store/Reducer";

export default function Categories() {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <Link
        href={"/products"}
        onClick={() => dispatch(setCategoryQuery("چکش"))}
        className={styles.category_box}
      >
        <Image
          className={styles.category_img}
          src={img_3}
          alt="دسته بندی"
          width={100}
          height={100}
          quality={100}
          priority
          unoptimized
        />
      </Link>

      <Link
        href={"/products"}
        onClick={() => dispatch(setCategoryQuery("چکش"))}
        className={styles.category_box}
      >
        <Image
          className={styles.category_img}
          src={img_5}
          alt="دسته بندی"
          width={100}
          height={100}
          quality={100}
          priority
          unoptimized
        />
      </Link>

      <Link
        href={"/products"}
        onClick={() => dispatch(setCategoryQuery("چکش"))}
        className={styles.category_box}
      >
        <Image
          className={styles.category_img}
          src={img_1}
          alt="دسته بندی"
          width={100}
          height={100}
          quality={100}
          priority
          unoptimized
        />
      </Link>

      <Link
        href={"/products"}
        onClick={() => dispatch(setCategoryQuery("چکش"))}
        className={styles.category_box}
      >
        <Image
          className={styles.category_img}
          src={img_4}
          alt="دسته بندی"
          width={100}
          height={100}
          quality={100}
          priority
          unoptimized
        />
      </Link>
    </div>
  );
}
