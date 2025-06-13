import Header from "@/components/global/Header";
import BlackBackground from "@/components/global/BlacKBackground";
import ProductsSection from "@/components/products/ProductsSection";
import MiniMenu from "@/components/global/MiniMenu";
import Footer from "@/components/global/Footer";
import { useState } from "react";

export async function getServerSideProps(context) {
  let products = [];

  try {
    const res = await fetch("https://abazarak.ir/api/products/");

    if (res.ok) {
      const data = await res.json();
      products = data.results;
    }
  } catch (error) {
    console.error("خطا در دریافت محصولات:", error);
  }

  return {
    props: {
      products,
    },
  };
}

export default function Products({ products }) {
  let [categoriesStatus, setCategoriesStatus] = useState(false);

  return (
    <div>
      <BlackBackground
        status={categoriesStatus}
        setStatus={setCategoriesStatus}
      />
      <MiniMenu status={categoriesStatus} setStatus={setCategoriesStatus} />
      <Header status={categoriesStatus} setStatus={setCategoriesStatus} />
      <ProductsSection initialProducts={products} />
      <Footer />
    </div>
  );
}
