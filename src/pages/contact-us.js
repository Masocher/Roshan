import Head from "next/head";
import styles from "../styles/contact-us/ContactUs.module.css";
import Header from "@/components/global/Header";
import BlackBackground from "@/components/global/BlacKBackground";
import MiniMenu from "@/components/global/MiniMenu";
import Footer from "@/components/global/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import spiner from "../../public/images/loading.svg";
import Image from "next/image";

axios.defaults.withCredentials = true;

export async function getServerSideProps(context) {
  let user = null;

  try {
    const res = await fetch("https://abazarak.ir/api/auth/me/", {
      headers: {
        Cookie: context.req.headers.cookie || "",
      },
    });

    if (res.ok) {
      user = await res.json();
    }
  } catch (err) {
    console.error("خطا در دریافت اطلاعات کاربر:", err);
  }

  return {
    props: {
      user,
    },
  };
}

export default function ContactUs({ user }) {
  let [categoriesStatus, setCategoriesStatus] = useState(false);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [content, setContent] = useState("");

  const sendTicket = async () => {
    if (!name) {
      toast.error("نام و نام خانوداگی نمیتواند خالی باشد !");
      return;
    }
    if (!number) {
      toast.error("شماره تلفن نمیتواند خالی باشد !");
      return;
    }
    if (!content) {
      toast.error("متن پیام نمیتواند خالی باشد !");
      return;
    }

    if (!window.grecaptcha) {
      toast.error("reCAPTCHA بارگذاری نشد.");
      return;
    }

    try {
      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: "ticket" }
      );

      setLoading(true);
      axios
        .post("/api/site/ticket/", {
          full_name: name,
          number,
          content,
          recaptcha: token,
        })
        .then(() => {
          setName("");
          setNumber("");
          setContent("");
          toast.success("پیام به مدیر فروشگاه ارسال شد");
          setLoading(false);
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            if (error.response.data.full_name) {
              toast.error(
                "نام و نام خانوادگی : " + error.response.data.full_name
              );
            } else if (error.response.data.number) {
              toast.error("شماره تلفن : " + error.response.data.number);
            } else if (error.response.data.content) {
              toast.error("متن پیام : " + error.response.data.content);
            } else {
              toast.error("خطایی رخ داد !");
            }
          }
          setLoading(false);
        });
    } catch (error) {
      toast.error("احراز reCAPTCHA با خطا مواجه شد.");
    }
  };

  return (
    <>
      <Head>
        <title>تماس با ما | ابازارک</title>
        <meta
          name="description"
          content="راه‌های تماس با فروشگاه اینترنتی ابازارک، ارسال پیام، شماره تماس و آدرس ما را اینجا پیدا کنید."
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#212121" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ابازارک" />
        <meta property="og:title" content="تماس با ما | ابازارک" />
        <meta
          property="og:description"
          content="راه‌های تماس با فروشگاه اینترنتی ابازارک، ارسال پیام، شماره تماس و آدرس"
        />
        <meta property="og:url" content="https://abazarak.ir/contact-us" />
        <meta
          property="og:image"
          content="https://abazarak.ir/images/og-image.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="تماس با ما | ابازارک" />
        <meta
          name="twitter:description"
          content="راه‌های تماس با فروشگاه اینترنتی ابازارک، ارسال پیام، شماره تماس و آدرس"
        />
        <meta
          name="twitter:image"
          content="https://abazarak.ir/images/og-image.jpg"
        />

        <link rel="canonical" href="https://abazarak.ir/contact-us" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              name: "تماس با ما - ابازارک",
              url: "https://abazarak.ir/contact-us",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+989054182307",
                contactType: "customer service",
                areaServed: "IR",
                availableLanguage: ["فارسی"],
              },
            }),
          }}
        />
      </Head>

      <div className={styles.container}>
        <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
          <div className={styles.loading_wrapper}>
            <Image src={spiner} width={80} height={80} alt="لودینگ" />
          </div>
        </div>

        <Toaster position="bottom-left" reverseOrder={true} />

        <BlackBackground
          status={categoriesStatus}
          setStatus={setCategoriesStatus}
        />
        <MiniMenu status={categoriesStatus} setStatus={setCategoriesStatus} />
        <Header
          status={categoriesStatus}
          setStatus={setCategoriesStatus}
          user={user}
        />

        <div className={styles.wrapper}>
          <div className={styles.left_section}>
            <div className={styles.inf_box}>
              <div className={styles.inf_title}>
                <FontAwesomeIcon icon={faLocationDot} />
              </div>

              <div className={styles.inf_value}>لرستان - دورود</div>
            </div>

            <div className={styles.inf_box}>
              <div className={styles.inf_title}>
                <FontAwesomeIcon icon={faPhone} />
              </div>

              <div className={styles.inf_value}>09054182307</div>
            </div>

            <div className={styles.inf_box}>
              <div className={styles.inf_title}>
                <FontAwesomeIcon icon={faEnvelope} />
              </div>

              <div className={styles.inf_value}>Masocherr@gmail.com</div>
            </div>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className={styles.right_section}
          >
            <div className={styles.main_title}>ارسال پیام</div>

            <input
              className={`${styles.inf_input} ${styles.input_box}`}
              type="text"
              placeholder="نام و نام خانوادگی"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            <input
              className={`${styles.inf_input} ${styles.input_box}`}
              type="text"
              placeholder="شماره تلفن"
              onChange={(e) => setNumber(e.target.value)}
              value={number}
            />

            <textarea
              className={`${styles.body_input} ${styles.input_box}`}
              placeholder="متن پیام را وارد کنید"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />

            <button
              className={styles.send_message_btn}
              onClick={() => sendTicket()}
            >
              ارسال پیام
            </button>
          </form>
        </div>

        <Footer />
      </div>
    </>
  );
}
