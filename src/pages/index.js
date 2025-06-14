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

// export async function getServerSideProps(context) {
//   const { req } = context;

//   const cookie = req.headers.cookie || "";

//   console.log(cookie.access_token);

//   let authStatus = false;
//   let userName = null;
//   let userNumber = null;

//   try {
//     const res = await fetch("https://abazarak.ir/api/auth/me", {
//       method: "GET",
//       headers: {
//         Cookie: cookie,
//       },
//     });

//     if (res.ok) {
//       const data = await res.json();
//       authStatus = true;
//       userName = data.full_name;
//       userNumber = data.number;
//       cookie = cookie;
//     }
//   } catch (err) {}

//   return {
//     props: {
//       authStatus,
//       userName,
//       userNumber,
//     },
//   };
// }

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

export default function Home({ user }) {
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
      <AmazingOffer />
      <BestSellers />
      <Categories />
      <Affordables />
      <BrandsSlider />
      <Footer />
    </div>
  );
}
