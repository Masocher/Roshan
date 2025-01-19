import Header from "@/components/global/Header";
import BlackBackground from "@/components/global/BlacKBackground";
import ProductsSection from "@/components/products/ProductsSection";
import MiniMenu from "@/components/global/MiniMenu";
import Footer from "@/components/global/Footer";
import { useState } from "react";

export default function Products() {
    let [categoriesStatus, setCategoriesStatus] = useState(false);

    return (
        <div>
            <BlackBackground
                status={categoriesStatus}
                setStatus={setCategoriesStatus}
            />
            <Header status={categoriesStatus} setStatus={setCategoriesStatus} />
            <ProductsSection />
            <MiniMenu
                status={categoriesStatus}
                setStatus={setCategoriesStatus}
            />
            <Footer />
        </div>
    );
}
