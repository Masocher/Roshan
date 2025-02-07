import styles from "../../styles/admin-options/Settings.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRight,
    faPlus,
    faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export default function Settings() {
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
                تنظیمات کلی
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
                            افزودن لوگو
                        </div>
                    </div>

                    <div className={styles.main_information}>
                        <input
                            className={styles.name}
                            type="text"
                            placeholder="نام وبسایت"
                        />

                        <textarea
                            className={styles.about}
                            type="text"
                            placeholder="درباره ما"
                        />
                    </div>
                </div>

                <div className={styles.second_section}>
                    <input
                        className={styles.price}
                        type="text"
                        placeholder="آدرس مغازه"
                    />

                    <input
                        className={styles.value}
                        type="text"
                        placeholder="شماره تلفن پشتیبانی"
                    />
                </div>

                <div className={styles.third_section}>
                    <input
                        className={styles.support_email}
                        type="text"
                        placeholder="ایمیل پشتیبانی"
                    />

                    <input
                        className={styles.brand}
                        type="text"
                        placeholder="هزینه ارسال پست ( تومان )"
                    />
                </div>

                <div className={styles.fourth_section}>
                    <div className={styles.title}>کف قیمیتی ها</div>

                    <div className={styles.select_category}>
                        <input placeholder="نام محصول" type="text" />

                        <div className={styles.submit_btn}>ثبت</div>
                    </div>

                    <div className={styles.products}>
                        <div className={styles.product}>
                            <span>
                                <FontAwesomeIcon icon={faClose} />
                            </span>
                            هود آشپزی مدل سیمرغ
                        </div>

                        <div className={styles.product}>
                            <span>
                                <FontAwesomeIcon icon={faClose} />
                            </span>
                            هود آشپزی مدل سیمرغ
                        </div>

                        <div className={styles.product}>
                            <span>
                                <FontAwesomeIcon icon={faClose} />
                            </span>
                            هود آشپزی مدل سیمرغ
                        </div>

                        <div className={styles.product}>
                            <span>
                                <FontAwesomeIcon icon={faClose} />
                            </span>
                            هود آشپزی مدل سیمرغ
                        </div>

                        <div className={styles.product}>
                            <span>
                                <FontAwesomeIcon icon={faClose} />
                            </span>
                            هود آشپزی مدل سیمرغ
                        </div>

                        <div className={styles.product}>
                            <span>
                                <FontAwesomeIcon icon={faClose} />
                            </span>
                            هود آشپزی مدل سیمرغ
                        </div>

                        <div className={styles.product}>
                            <span>
                                <FontAwesomeIcon icon={faClose} />
                            </span>
                            هود آشپزی مدل سیمرغ
                        </div>
                    </div>
                </div>

                <div className={styles.fourth_section}>
                    <div className={styles.title}>محصولات شگفت انگیز</div>

                    <div className={styles.select_category}>
                        <input placeholder="نام محصول" type="text" />

                        <div className={styles.submit_btn}>ثبت</div>
                    </div>

                    <div className={styles.products}>
                        <div className={styles.product}>
                            <span>
                                <FontAwesomeIcon icon={faClose} />
                            </span>
                            هود آشپزی مدل سیمرغ
                        </div>

                        <div className={styles.product}>
                            <span>
                                <FontAwesomeIcon icon={faClose} />
                            </span>
                            هود آشپزی مدل سیمرغ
                        </div>

                        <div className={styles.product}>
                            <span>
                                <FontAwesomeIcon icon={faClose} />
                            </span>
                            هود آشپزی مدل سیمرغ
                        </div>

                        <div className={styles.product}>
                            <span>
                                <FontAwesomeIcon icon={faClose} />
                            </span>
                            هود آشپزی مدل سیمرغ
                        </div>

                        <div className={styles.product}>
                            <span>
                                <FontAwesomeIcon icon={faClose} />
                            </span>
                            هود آشپزی مدل سیمرغ
                        </div>

                        <div className={styles.product}>
                            <span>
                                <FontAwesomeIcon icon={faClose} />
                            </span>
                            هود آشپزی مدل سیمرغ
                        </div>

                        <div className={styles.product}>
                            <span>
                                <FontAwesomeIcon icon={faClose} />
                            </span>
                            هود آشپزی مدل سیمرغ
                        </div>
                    </div>
                </div>

                <div className={styles.fifth_section}>
                    <div className={styles.add_feature}>
                        <div className={styles.title}>افزودن لینک فوتر</div>

                        <div className={styles.feature_inputs}>
                            <input
                                type="text"
                                placeholder="عنوان لینک فوتر"
                                className={styles.feature_title}
                            />
                            <input
                                type="text"
                                placeholder="لینک"
                                className={styles.feature_title}
                            />
                            <input
                                type="text"
                                placeholder="ستون لینک فوتر"
                                className={styles.feature}
                            />
                            <div className={styles.add_feature_btn}>افزودن</div>
                        </div>

                        <div className={styles.features}>
                            <div className={styles.feature_box}>
                                <div className={styles.title}>
                                    همراه با روشن مارکت
                                </div>
                                <div className={styles.desc}>ارتباط با ما</div>
                                <div className={styles.close_btn}>
                                    <FontAwesomeIcon icon={faClose} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.sixth_section}>
                    <div className={styles.home_category}>
                        <div className={styles.upload_category_cover}>
                            <span>
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                            افزودن عکس دسته بندی
                        </div>

                        <input type="text" placeholder="انتخاب دسته بندی" />
                    </div>

                    <div className={styles.home_category}>
                        <div className={styles.upload_category_cover}>
                            <span>
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                            افزودن عکس دسته بندی
                        </div>

                        <input type="text" placeholder="انتخاب دسته بندی" />
                    </div>

                    <div className={styles.home_category}>
                        <div className={styles.upload_category_cover}>
                            <span>
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                            افزودن عکس دسته بندی
                        </div>

                        <input type="text" placeholder="انتخاب دسته بندی" />
                    </div>

                    <div className={styles.home_category}>
                        <div className={styles.upload_category_cover}>
                            <span>
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                            افزودن عکس دسته بندی
                        </div>

                        <input type="text" placeholder="انتخاب دسته بندی" />
                    </div>
                </div>

                <div className={styles.edit_btn}>ذخیره تنظیمات</div>
            </form>
        </div>
    );
}
