import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/admin/Categories.module.css";
import {
    faGear,
    faTrashCan,
    faPlus,
    faClose,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import spiner from "../../../public/images/loading.svg";
import Image from "next/image";

export default function Categories() {
    const [loading, setLoading] = useState(true);

    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        setLoading(true);
        axios.defaults.withCredentials = true;
        axios
            .get("/api/admin/categories/")
            .then((res) => {
                setCategories(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        getCategories();
    }, []);

    const [popUp, setPopUp] = useState(false);

    const [name, setName] = useState("");
    const [parent, setParent] = useState("");

    const addCategory = () => {
        axios
            .post("/api/admin/categories/", {
                name: name,
                parent: parent,
            })
            .then((res) => {
                getCategories();
                toast.success("دسته بندی با موفقیت ساخته شد");
                setName("");
                setParent("");
                setPopUp(false);
            })
            .catch((err) => {
                if (err.response && err.response.data) {
                    if (err.response.data.name) {
                        toast.error(
                            "نام دسته بندی : " + err.response.data.name
                        );
                    } else {
                        console.log(err);
                    }
                }
            });
    };

    const deleteCategory = (slug) => {
        axios
            .delete(`/api/admin/categories/${slug}/`)
            .then((res) => {
                getCategories();
                toast.success("دسته بندی با موفقیت حذف شد");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
                <div className={styles.loading_wrapper}>
                    <Image src={spiner} width={80} height={80} alt="لودینگ" />
                </div>
            </div>

            <Toaster position="bottom-left" reverseOrder={true} />

            <div className={styles.add_btn} onClick={() => setPopUp(true)}>
                <span>
                    <FontAwesomeIcon icon={faPlus} />
                </span>
                دسته بندی جدید
            </div>

            <div
                className={`${styles.add_category_pop_up} ${
                    popUp ? styles.show : ""
                }`}
            >
                <form>
                    <div className={styles.main_title}>
                        <span onClick={() => setPopUp(false)}>
                            <FontAwesomeIcon icon={faClose} />
                        </span>
                        ایجاد دسته بندی
                    </div>

                    <div className={styles.inputs}>
                        <input
                            className={styles.name}
                            type="text"
                            placeholder="نام دسته بندی"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            maxLength={128}
                            style={{ marginLeft: "20px" }}
                        />

                        <input
                            className={styles.name}
                            type="text"
                            placeholder="مجموعه ( الزامی نیست )"
                            onChange={(e) => setParent(e.target.value)}
                            value={parent}
                            maxLength={128}
                        />
                    </div>

                    <div
                        className={styles.add_category_btn}
                        onClick={() => addCategory()}
                    >
                        افزودن دسته بندی
                    </div>
                </form>
            </div>

            <div className={styles.categories}>
                <div className={styles.categories_top}>
                    <div className={styles.categories_title}>شماره</div>
                    <div className={styles.categories_title}>نام</div>
                    <div className={styles.categories_title}>تعداد محصولات</div>
                    <div className={styles.hidden_title}></div>
                </div>

                {categories.map((categ, index) => (
                    <div className={styles.category} key={index}>
                        <div className={styles.category_id}>{index + 1}</div>

                        <div className={styles.category_name}>{categ.name}</div>

                        <div className={styles.category_value}>
                            {categ.products_count}
                        </div>

                        <div className={styles.category_buttons}>
                            <div
                                className={styles.category_delete}
                                onClick={() => deleteCategory(categ.slug)}
                            >
                                <FontAwesomeIcon icon={faTrashCan} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
