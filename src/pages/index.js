import Alert from "@/components/home/Alert";
import Header from "@/components/global/Header";
import MiniMenu from "@/components/global/MiniMenu";
import HomeSlider from "@/components/home/HomeSlider";
import AmazingOffer from "@/components/home/AmazingOffer";
import Categories from "@/components/home/Categories";
import LatestArticles from "@/components/home/LatestArticles";
import BrandsSlider from "@/components/global/BrandsSlider";
import Footer from "@/components/global/Footer";

export default function Home() {
    return (
        <div>
            <Alert />
            <Header />
            <MiniMenu />
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
