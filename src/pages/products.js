import Header from "@/components/global/Header";
import BlackBackground from "@/components/global/BlacKBackground";
import ProductsSection from "@/components/products/ProductsSection";
import MiniMenu from "@/components/global/MiniMenu";
import Footer from "@/components/global/Footer";
import { useState } from "react";
import axios from "axios";

export default function Products() {
    let [categoriesStatus, setCategoriesStatus] = useState(false);

    axios.defaults.withCredentials = true;
    axios
        .post("https://roshan-api.liara.run/api/admin/products/")
        .then((response) => console.log(response))
        .catch((err) => console.log(err));

    return (
        <div>
            <BlackBackground
                status={categoriesStatus}
                setStatus={setCategoriesStatus}
            />
            <MiniMenu
                status={categoriesStatus}
                setStatus={setCategoriesStatus}
            />
            <Header status={categoriesStatus} setStatus={setCategoriesStatus} />
            <ProductsSection />
            <Footer />
        </div>
    );
}
