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

  let siteData = null;

  try {
    const res = await fetch("https://abazarak.ir/api/site/");

    if (res.ok) {
      siteData = await res.json();
    }
  } catch (err) {
    console.log("خطا در دریافت اطلاعات", err);
  }

  return {
    props: {
      user,
      siteData,
    },
  };
}

export default function Home({ user, siteData }) {
  console.log(siteData);

  let [categoriesStatus, setCategoriesStatus] = useState(false);

  return (
    <div>
      <BlackBackground
        status={categoriesStatus}
        setStatus={setCategoriesStatus}
      />
      <Alert />
      <MiniMenu status={categoriesStatus} setStatus={setCategoriesStatus} />
      <Header
        status={categoriesStatus}
        setStatus={setCategoriesStatus}
        user={user}
      />
      <HomeSlider />
      <AmazingOffer data={siteData.amazing_discounts} />
      <BestSellers data={siteData.best_sellers} />
      <Categories />
      <Affordables data={siteData.economic_products} />
      <BrandsSlider />
      <Footer />
    </div>
  );
}
