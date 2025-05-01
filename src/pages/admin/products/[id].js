import styles from "../../../styles/admin-options/CreateProduct.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRight,
    faClose,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Loading from "@/components/global/Loading";
import spiner from "../../../../public/images/loading.svg";
import Image from "next/image";

export default function EditProduct() {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(false);

    const [image, setImage] = useState(null);
    const [imageDefault, setImageDefault] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [supply, setSupply] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [active, setActive] = useState(false);
    const [specification, setSpecification] = useState("");

    const handleImageChange = (event) => {
        setLoading2(true);
        if (event) {
            const file = event.target.files[0];
            setImage(file);
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            setLoading2(false);
        } else {
            setImage(imageDefault);
            setPreviewImage(imageDefault);
            setLoading2(false);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        axios.defaults.withCredentials = true;
        const response = await axios.get(
            `https://abazarak.ir/api/admin/products/${localStorage.getItem(
                "productId"
            )}/`
        );
        setImage(response.data.image);
        setImageDefault(response.data.image);
        setName(response.data.name);
        setDescription(response.data.desc);
        setPrice(response.data.price);
        setSupply(response.data.supply);
        setCategory(response.data.category);
        setBrand(response.data.brand);
        setActive(response.data.active);
        setSpecification(response.data.specifications);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [specTitle, setSpecTitle] = useState("");
    const [specDescription, setSpecDescription] = useState("");

    const addSpecification = (tit, desc) => {
        setLoading2(true);
        if (tit === "" || desc === "") {
            toast.error("مقادیر ویژگی را کامل پر کنید");
            setLoading2(false);
        } else {
            setSpecification([...specification, { key: tit, value: desc }]);
            toast.success("ویژگی با موفقیت اضافه شد");
            setSpecTitle("");
            setSpecDescription("");
            setLoading2(false);
        }
    };

    const deleteSpecification = (tit) => {
        setLoading2(true);
        const newSpecifications = specification.filter(
            (spec) => spec.key !== tit
        );
        setSpecification(newSpecifications);
        toast.success("ویژگی با موفقیت حذف شد");
        setLoading2(false);
    };

    const handleSubmit = async () => {
        setLoading2(true);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("desc", description);
        formData.append("price", price);
        formData.append("supply", supply);
        formData.append("category", category);
        formData.append("brand", brand);
        formData.append("active", active);
        formData.append("specifications", JSON.stringify(specification));
        console.log(formData);

        if (image !== imageDefault) {
            formData.append("image", image);
        }

        try {
            axios.defaults.withCredentials = true;
            const response = await axios.patch(
                `https://abazarak.ir/api/admin/products/${localStorage.getItem(
                    "productId"
                )}/`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Response:", response.data);

            setName("");
            setDescription("");
            setPrice("");
            setSupply("");
            setBrand("");
            setCategory("");
            setActive(false);
            setSpecification([]);

            fetchData();

            toast.success("محصول با موفقیت ویرایش شد !");

            setLoading2(false);
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.name) {
                    toast.error("نام محصول : " + error.response.data.name);
                } else if (error.response.data.description) {
                    toast.error(
                        "توضیحات محصول : " + error.response.data.description
                    );
                } else if (error.response.data.desc) {
                    toast.error("توضیحات محصول : " + error.response.data.desc);
                } else if (error.response.data.image) {
                    toast.error("عکس محصول : " + error.response.data.image);
                } else if (error.response.data.price) {
                    toast.error("قیمت محصول : " + error.response.data.price);
                } else if (error.response.data.supply) {
                    toast.error("موجودی محصول : " + error.response.data.supply);
                } else if (error.response.data.category) {
                    toast.error(
                        "دسته بندی محصول : " + error.response.data.category
                    );
                } else if (error.response.data.brand) {
                    toast.error("برند محصول : " + error.response.data.brand);
                } else {
                    console.log(error);
                }
            }

            setLoading2(false);
        }
    };

    if (loading) {
        return <Loading />;
    } else {
        return (
            <div className={styles.container}>
                <div
                    className={`${styles.loading} ${
                        loading2 ? styles.show : ""
                    }`}
                >
                    <div className={styles.loading_wrapper}>
                        <Image
                            src={spiner}
                            width={80}
                            height={80}
                            alt="لودینگ"
                        />
                    </div>
                </div>

                <Toaster position="bottom-left" reverseOrder={true} />

                <div className={styles.main_title}>
                    <div
                        className={styles.back_btn}
                        onClick={() => router.push("/admin")}
                    >
                        <span>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </span>
                        بازگشت
                    </div>
                    ویرایش محصول
                </div>

                <form
                    className={styles.create_product}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div className={styles.first_section}>
                        <div className={styles.image}>
                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "8px",
                                    backgroundImage: previewImage
                                        ? `url(${previewImage})`
                                        : `url(${image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                                onClick={() =>
                                    document.getElementById("fileInput").click()
                                }
                            >
                                {!image && (
                                    <div className={styles.add_layer}>
                                        <span>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </span>
                                        ویرایش عکس
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                id="fileInput"
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>

                        <div className={styles.main_information}>
                            <input
                                className={styles.name}
                                type="text"
                                placeholder="نام محصول"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                maxLength={128}
                            />

                            <textarea
                                className={styles.about}
                                type="text"
                                placeholder="توضیحات محصول"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />
                        </div>
                    </div>

                    <div className={styles.second_section}>
                        <input
                            className={styles.price}
                            type="text"
                            placeholder="قیمت محصول"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            maxLength={9}
                        />

                        <input
                            className={styles.value}
                            type="text"
                            placeholder="تعداد موجودی محصول"
                            onChange={(e) => setSupply(e.target.value)}
                            value={supply}
                        />
                    </div>

                    <div className={styles.third_section}>
                        <input
                            className={styles.category}
                            type="text"
                            placeholder="دسته بندی محصول"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        />

                        <input
                            className={styles.brand}
                            type="text"
                            placeholder="برند محصول"
                            onChange={(e) => setBrand(e.target.value)}
                            value={brand}
                        />
                    </div>

                    <div className={styles.fourth_section}>
                        <div className={styles.add_feature}>
                            <div className={styles.title}>افزودن ویژگی</div>

                            <div className={styles.feature_inputs}>
                                <input
                                    type="text"
                                    placeholder="عنوان ویژگی"
                                    className={styles.feature_title}
                                    onChange={(e) =>
                                        setSpecTitle(e.target.value)
                                    }
                                    value={specTitle}
                                />
                                <input
                                    type="text"
                                    placeholder="نوع ویژگی"
                                    className={styles.feature}
                                    onChange={(e) =>
                                        setSpecDescription(e.target.value)
                                    }
                                    value={specDescription}
                                />
                                <div
                                    className={styles.add_feature_btn}
                                    onClick={() =>
                                        addSpecification(
                                            specTitle,
                                            specDescription
                                        )
                                    }
                                >
                                    افزودن
                                </div>
                            </div>

                            <div className={styles.features}>
                                {specification.length === 0
                                    ? null
                                    : specification.map((spec, index) => (
                                          <div
                                              className={styles.feature_box}
                                              key={index}
                                          >
                                              <div className={styles.title}>
                                                  {spec.key}
                                              </div>
                                              <div className={styles.desc}>
                                                  {spec.value}
                                              </div>
                                              <div
                                                  className={styles.close_btn}
                                                  onClick={() =>
                                                      deleteSpecification(
                                                          spec.key
                                                      )
                                                  }
                                              >
                                                  <FontAwesomeIcon
                                                      icon={faClose}
                                                  />
                                              </div>
                                          </div>
                                      ))}
                            </div>
                        </div>

                        <div
                            className={`${styles.inventory_button} ${
                                active ? styles.show : ""
                            }`}
                            onClick={() => {
                                setActive(!active);
                            }}
                        >
                            <div>
                                <span></span>
                            </div>
                            فعال کردن
                        </div>
                    </div>

                    <div
                        className={styles.edit_btn}
                        onClick={() => handleSubmit()}
                    >
                        ذخیره تغییرات
                    </div>
                </form>
            </div>
        );
    }
}
