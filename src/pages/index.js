import Head from "next/head";
import Alert from "@/components/home/Alert";
import Header from "@/components/global/Header";
import BlackBackground from "@/components/global/BlacKBackground";
import MiniMenu from "@/components/global/MiniMenu";
import HomeSlider from "@/components/home/HomeSlider";
import AmazingOffer from "@/components/home/AmazingOffer";
import BestSellers from "@/components/home/BestSellers";
import Categories from "@/components/home/Categories";
import Affordables from "@/components/home/Affordables";
import BrandsSlider from "@/components/global/BrandsSlider";
import Footer from "@/components/global/Footer";
import { useState } from "react";

export async function getServerSideProps(context) {
  let user = null;

  const res = await fetch("https://abazarak.ir/api/auth/me/", {
    headers: {
      Cookie: context.req.headers.cookie || "",
    },
  });

  if (res.ok) {
    user = await res.json();
  }

  let siteData = null;

  const res2 = await fetch("https://abazarak.ir/api/site/");

  if (res2.ok) {
    siteData = await res2.json();
  }

  return {
    props: {
      user,
      siteData,
    },
  };
}

export default function Home({ user, siteData }) {
  const [categoriesStatus, setCategoriesStatus] = useState(false);

  return (
    <>
      <Head>
        <title>ابازارک | خرید آنلاین ابزار، یراق و تجهیزات صنعتی</title>
        <meta
          name="description"
          content="فروشگاه اینترنتی ابازارک - خرید ابزار، یراق، پیچ و مهره، لوازم صنعتی با بهترین قیمت و ارسال سریع به سراسر ایران"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#212121" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ابازارک" />
        <meta
          property="og:title"
          content="ابازارک | خرید آنلاین ابزار، یراق و تجهیزات صنعتی"
        />
        <meta
          property="og:description"
          content="خرید ابزار، یراق، پیچ و مهره، لوازم صنعتی با بهترین قیمت و ارسال سریع"
        />
        <meta property="og:url" content="https://abazarak.ir/" />
        <meta
          property="og:image"
          content="https://abazarak.ir/images/og-image.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="ابازارک | خرید ابزار و یراق صنعتی"
        />
        <meta
          name="twitter:description"
          content="خرید انواع ابزارآلات صنعتی، یراق و لوازم با ارسال سریع به سراسر کشور"
        />
        <meta
          name="twitter:image"
          content="https://abazarak.ir/images/og-image.jpg"
        />

        <link rel="canonical" href="https://abazarak.ir/" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "ابازارک",
              url: "https://abazarak.ir",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://abazarak.ir/search?query={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>

      <div>
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
        <HomeSlider />
        <AmazingOffer data={siteData.amazing_discounts} />
        <Alert />
        <BestSellers data={siteData.best_sellers} />
        <Categories />
        <Affordables data={siteData.economic_products} />
        <BrandsSlider />
        <Footer />
      </div>
    </>
  );
}
