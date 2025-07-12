import styles from "../../../styles/admin-options/CreateProduct.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faPlus,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import spiner from "../../../../public/images/loading.svg";
import Image from "next/image";
import Link from "next/link";

axios.defaults.withCredentials = true;

export default function CreateProduct() {
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [supply, setSupply] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [active, setActive] = useState(true);
  const [specification, setSpecification] = useState([]);

  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    if (!event) return;
    setLoading(true);
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    } else {
      setImage(null);
      setPreviewImage(null);
    }
    setLoading(false);
  };

  const [specTitle, setSpecTitle] = useState("");
  const [specDescription, setSpecDescription] = useState("");

  const addSpecification = () => {
    if (specTitle.trim() === "" || specDescription.trim() === "") {
      toast.error("مقادیر ویژگی را کامل پر کنید");
      return;
    }

    if (specification.find((spec) => spec.key === specTitle.trim())) {
      toast.error("ویژگی با این عنوان قبلاً اضافه شده است");
      return;
    }

    setSpecification([
      ...specification,
      { key: specTitle.trim(), value: specDescription.trim() },
    ]);
    toast.success("ویژگی با موفقیت اضافه شد");
    setSpecTitle("");
    setSpecDescription("");
  };

  const deleteSpecification = (tit) => {
    const newSpecifications = specification.filter((spec) => spec.key !== tit);
    setSpecification(newSpecifications);
    toast.success("ویژگی با موفقیت حذف شد");
  };

  const handleSubmit = async () => {
    if (loading) return;

    if (!name.trim()) {
      toast.error("نام محصول را وارد کنید");
      return;
    }
    if (!description.trim()) {
      toast.error("توضیحات محصول را وارد کنید");
      return;
    }
    if (!image) {
      toast.error("عکس محصول را انتخاب کنید");
      return;
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
      toast.error("قیمت محصول را به درستی وارد کنید");
      return;
    }
    if (!supply || isNaN(supply) || Number(supply) < 0) {
      toast.error("موجودی محصول را به درستی وارد کنید");
      return;
    }
    if (!category.trim()) {
      toast.error("دسته بندی محصول را وارد کنید");
      return;
    }
    if (!brand.trim()) {
      toast.error("برند محصول را وارد کنید");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", description);
    formData.append("image", image);
    formData.append("price", price);
    formData.append("supply", supply);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("active", active);
    formData.append("specifications", JSON.stringify(specification));

    try {
      const response = await axios.post("/api/admin/products/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImage(null);
      setPreviewImage(null);
      setName("");
      setDescription("");
      setPrice("");
      setSupply("");
      setBrand("");
      setCategory("");
      setActive(true);
      setSpecification([]);

      toast.success("محصول با موفقیت ایجاد شد !");
    } catch (error) {
      if (error.response && error.response.data) {
        const data = error.response.data;
        if (data.name) toast.error("نام محصول : " + data.name);
        else if (data.desc) toast.error("توضیحات محصول : " + data.desc);
        else if (data.image) toast.error("عکس محصول : " + data.image);
        else if (data.price) toast.error("قیمت محصول : " + data.price);
        else if (data.supply) toast.error("موجودی محصول : " + data.supply);
        else if (data.category)
          toast.error("دسته بندی محصول : " + data.category);
        else if (data.brand) toast.error("برند محصول : " + data.brand);
        else {
          toast.error("خطایی رخ داد !");
        }
      } else {
        toast.error("خطا در ارسال درخواست");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.loading} ${loading ? styles.show : ""}`}>
        <div className={styles.loading_wrapper}>
          <Image src={spiner} width={40} height={40} alt="لودینگ" />
        </div>
      </div>

      <Toaster position="bottom-left" reverseOrder={true} />

      <div className={styles.main_title}>
        <Link className={styles.back_btn} href={"/admin-panel/products"}>
          <span>
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
          بازگشت
        </Link>
        افزودن محصول جدید
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
                  : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "pointer",
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              {!image && (
                <div className={styles.add_layer}>
                  <span>
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                  افزودن عکس
                </div>
              )}
            </div>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
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
              disabled={loading}
            />

            <textarea
              className={styles.about}
              placeholder="توضیحات محصول"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              disabled={loading}
            />
          </div>
        </div>

        <div className={styles.second_section}>
          <input
            className={styles.price}
            type="number"
            placeholder="قیمت محصول"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            maxLength={9}
            disabled={loading}
            min="0"
            step="any"
          />

          <input
            className={styles.value}
            type="number"
            placeholder="تعداد موجودی محصول"
            onChange={(e) => setSupply(e.target.value)}
            value={supply}
            disabled={loading}
            min="0"
            step="1"
          />
        </div>

        <div className={styles.third_section}>
          <input
            className={styles.category}
            type="text"
            placeholder="دسته بندی محصول"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            disabled={loading}
          />

          <input
            className={styles.brand}
            type="text"
            placeholder="برند محصول"
            onChange={(e) => setBrand(e.target.value)}
            value={brand}
            disabled={loading}
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
                onChange={(e) => setSpecTitle(e.target.value)}
                value={specTitle}
                disabled={loading}
              />
              <input
                type="text"
                placeholder="نوع ویژگی"
                className={styles.feature}
                onChange={(e) => setSpecDescription(e.target.value)}
                value={specDescription}
                disabled={loading}
              />
              <div
                className={`${styles.add_feature_btn} ${
                  specTitle.trim() === "" || specDescription.trim() === ""
                    ? styles.disabled
                    : ""
                }`}
                onClick={() => {
                  if (loading) return;
                  if (specTitle.trim() && specDescription.trim())
                    addSpecification();
                }}
                style={{
                  pointerEvents:
                    specTitle.trim() === "" || specDescription.trim() === ""
                      ? "none"
                      : "auto",
                  opacity:
                    specTitle.trim() === "" || specDescription.trim() === ""
                      ? 0.5
                      : 1,
                }}
              >
                افزودن
              </div>
            </div>

            <div className={styles.features}>
              {specification.map((spec) => (
                <div className={styles.feature_box} key={spec.key}>
                  <div className={styles.title}>{spec.key}</div>
                  <div className={styles.desc}>{spec.value}</div>
                  <div
                    className={styles.close_btn}
                    onClick={() => !loading && deleteSpecification(spec.key)}
                    style={{ cursor: loading ? "not-allowed" : "pointer" }}
                  >
                    <FontAwesomeIcon icon={faClose} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`${styles.inventory_button} ${
              active ? styles.show : ""
            }`}
            onClick={() => !loading && setActive(!active)}
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
          >
            <div>
              <span></span>
            </div>
            فعال کردن
          </div>
        </div>

        <div
          className={`${styles.edit_btn} ${loading ? styles.disabled : ""}`}
          onClick={async () => await handleSubmit()}
          style={{ pointerEvents: loading ? "none" : "auto" }}
        >
          افزودن محصول
        </div>
      </form>
    </div>
  );
}
