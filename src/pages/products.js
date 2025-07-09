import Header from "@/components/global/Header";
import BlackBackground from "@/components/global/BlacKBackground";
import ProductsSection from "@/components/products/ProductsSection";
import MiniMenu from "@/components/global/MiniMenu";
import Footer from "@/components/global/Footer";
import { useState } from "react";
import Head from "next/head";

export async function getServerSideProps(context) {
  let categoriesList = [];
  let brandsList = [];
  let user = null;

  const res = await fetch("https://abazarak.ir/api/auth/me/", {
    headers: {
      Cookie: context.req.headers.cookie || "",
    },
  });

  if (res.ok) {
    user = await res.json();
  }

  const [categoriesRes, brandsRes] = await Promise.all([
    fetch("https://abazarak.ir/api/categories/"),
    fetch("https://abazarak.ir/api/brands/"),
  ]);

  if (categoriesRes.ok) {
    const data = await categoriesRes.json();
    categoriesList = data;
  }

  if (brandsRes.ok) {
    const data = await brandsRes.json();
    brandsList = data;
  }

  return {
    props: {
      user,
      categoriesList,
      brandsList,
    },
  };
}

export default function Products({ user, categoriesList, brandsList }) {
  let [categoriesStatus, setCategoriesStatus] = useState(false);

  return (
    <>
      <Head>
        <title>محصولات | فروشگاه ابازارک</title>
        <meta
          name="description"
          content="خرید انواع ابزار، یراق، پیچ و مهره، تجهیزات صنعتی از فروشگاه اینترنتی ابازارک با قیمت مناسب و ارسال سریع"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#212121" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ابازارک" />
        <meta property="og:title" content="محصولات | فروشگاه ابازارک" />
        <meta
          property="og:description"
          content="خرید ابزار و یراق صنعتی با قیمت مناسب"
        />
        <meta property="og:url" content="https://abazarak.ir/products" />
        <meta
          property="og:image"
          content="https://abazarak.ir/images/og-image.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="محصولات | فروشگاه ابازارک" />
        <meta
          name="twitter:description"
          content="فروش ابزارآلات و تجهیزات صنعتی با ارسال سریع"
        />
        <meta
          name="twitter:image"
          content="https://abazarak.ir/images/og-image.jpg"
        />

        <link rel="canonical" href="https://abazarak.ir/products" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "محصولات ابازارک",
              url: "https://abazarak.ir/products",
              about: "فروش انواع ابزار، یراق، پیچ، مهره و تجهیزات صنعتی",
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
        <ProductsSection
          categoriesList={categoriesList}
          brandsList={brandsList}
        />
        <Footer />
      </div>
    </>
  );
}
