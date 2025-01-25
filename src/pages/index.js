import Alert from "@/components/home/Alert";
import Header from "@/components/global/Header";
import BlackBackground from "@/components/global/BlacKBackground";
import MiniMenu from "@/components/global/MiniMenu";
import HomeSlider from "@/components/home/HomeSlider";
import AmazingOffer from "@/components/home/AmazingOffer";
import Categories from "@/components/home/Categories";
import LatestArticles from "@/components/home/LatestArticles";
import BrandsSlider from "@/components/global/BrandsSlider";
import Footer from "@/components/global/Footer";
import { useState } from "react";

export default function Home() {
    let [categoriesStatus, setCategoriesStatus] = useState(false);

    return (
        <div>
            <BlackBackground
                status={categoriesStatus}
                setStatus={setCategoriesStatus}
            />
            <Alert />
            <MiniMenu
                status={categoriesStatus}
                setStatus={setCategoriesStatus}
            />
            <Header status={categoriesStatus} setStatus={setCategoriesStatus} />
            <HomeSlider />
            <AmazingOffer />
            <Alert />
            <Categories />
            <LatestArticles />
            <BrandsSlider />
            <Footer />
        </div>
    );
}
