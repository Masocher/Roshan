import styles from "../../styles/admin-options/CreateProduct.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRight,
    faPlus,
    faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export default function CreateProduct() {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.main_title}>
                <div className={styles.back_btn} onClick={() => router.back()}>
                    <span>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                    بازگشت
                </div>
                افزودن محصول جدید
            </div>

            <form
                className={styles.create_product}
                onSubmit={(e) => e.preventDefault}
            >
                <div className={styles.first_section}>
                    <div className={styles.image}>
                        <div className={styles.add_layer}>
                            <span>
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                            افزودن عکس
                        </div>
                    </div>

                    <div className={styles.main_information}>
                        <input
                            className={styles.name}
                            type="text"
                            placeholder="نام محصول"
                        />

                        <textarea
                            className={styles.about}
                            type="text"
                            placeholder="توضیحات محصول"
                        />
                    </div>
                </div>

                <div className={styles.second_section}>
                    <input
                        className={styles.price}
                        type="text"
                        placeholder="قیمت محصول"
                    />

                    <input
                        className={styles.value}
                        type="text"
                        placeholder="تعداد موجودی محصول"
                    />
                </div>

                <div className={styles.third_section}>
                    <input
                        className={styles.category}
                        type="text"
                        placeholder="دسته بندی محصول"
                    />

                    <input
                        className={styles.brand}
                        type="text"
                        placeholder="برند محصول"
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
                            />
                            <input
                                type="text"
                                placeholder="نوع ویژگی"
                                className={styles.feature}
                            />
                            <div className={styles.add_feature_btn}>افزودن</div>
                        </div>

                        <div className={styles.features}>
                            <div className={styles.feature_box}>
                                <div className={styles.title}>جنس</div>
                                <div className={styles.desc}>فلزی</div>
                                <div className={styles.close_btn}>
                                    <FontAwesomeIcon icon={faClose} />
                                </div>
                            </div>

                            <div className={styles.feature_box}>
                                <div className={styles.title}>جنس</div>
                                <div className={styles.desc}>فلزی</div>
                                <div className={styles.close_btn}>
                                    <FontAwesomeIcon icon={faClose} />
                                </div>
                            </div>

                            <div className={styles.feature_box}>
                                <div className={styles.title}>جنس</div>
                                <div className={styles.desc}>فلزی</div>
                                <div className={styles.close_btn}>
                                    <FontAwesomeIcon icon={faClose} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.inventory_button}>
                        <div>
                            <span></span>
                        </div>
                        فعال کردن
                    </div>
                </div>

                <div className={styles.edit_btn}>افزودن محصول</div>
            </form>
        </div>
    );
}
