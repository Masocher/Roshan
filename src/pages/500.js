import styles from "../styles/global/Custom404.module.css";
import Head from "next/head";

export default function Custom500() {
  return (
    <>
      <Head>
        <title>خطای داخلی سرور - 500 | فروشگاه ابازارک</title>
        <meta
          name="description"
          content="صفحه مورد نظر شما یافت نشد. لطفا به صفحه اصلی بازگردید."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className={styles.container}>
        <div className={styles.main_text}>500</div>
        <div className={styles.message}>سایت به مشکل خورده ، بعدا امتحان کنید</div>
      </div>
    </>
  );
}
