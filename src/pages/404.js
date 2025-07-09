import styles from "../styles/global/Custom404.module.css";
import Link from "next/link";
import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>صفحه یافت نشد - 404 | فروشگاه ابازارک</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="صفحه مورد نظر شما یافت نشد. لطفا به صفحه اصلی بازگردید."
        />
      </Head>

      <div className={styles.container}>
        <div className={styles.main_text}>404</div>
        <div className={styles.message}>صفحه مورد نظر یافت نشد</div>
        <Link href="/" className={styles.back_btn}>
          برگشت به خانه
        </Link>
      </div>
    </>
  );
}
