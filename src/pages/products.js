import Header from "@/components/global/Header";
import BlackBackground from "@/components/global/BlacKBackground";
import ProductsSection from "@/components/products/ProductsSection";
import MiniMenu from "@/components/global/MiniMenu";
import Footer from "@/components/global/Footer";
import { useState } from "react";

export async function getServerSideProps(context) {
  let products = [];
  let categoriesList = [];
  let brandsList = [];
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

  try {
    const [productsRes, categoriesRes, brandsRes] = await Promise.all([
      fetch("https://abazarak.ir/api/products/"),
      fetch("https://abazarak.ir/api/categories/"),
      fetch("https://abazarak.ir/api/brands/"),
    ]);

    if (productsRes.ok) {
      const data = await productsRes.json();
      products = data;
    }

    if (categoriesRes.ok) {
      const data = await categoriesRes.json();
      categoriesList = data;
    }

    if (brandsRes.ok) {
      const data = await brandsRes.json();
      brandsList = data;
    }
  } catch (error) {
    console.error("خطا در دریافت اطلاعات", error);
  }

  return {
    props: {
      user,
      products,
      categoriesList,
      brandsList,
    },
  };
}

export default function Products({
  user,
  products,
  categoriesList,
  brandsList,
}) {
  console.log(products);

  let [categoriesStatus, setCategoriesStatus] = useState(false);
  const [productsList, setProductsList] = useState(products.results);

  return (
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
        initialProducts={productsList}
        categoriesList={categoriesList}
        brandsList={brandsList}
        currentPage={products.current}
        nextPage={products.next}
        previousPage={products.previous}
      />
      <Footer />
    </div>
  );
}
