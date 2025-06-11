import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/articles/Articles.module.css";
import {
    faAngleLeft,
    faAngleRight,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import img from "../../public/images/slider-1.jpg";
import Link from "next/link";
import Header from "@/components/global/Header";
import BlackBackground from "@/components/global/BlacKBackground";
import MiniMenu from "@/components/global/MiniMenu";
import Footer from "@/components/global/Footer";
import { useState } from "react";

export default function Articles() {
    let [categoriesStatus, setCategoriesStatus] = useState(false);

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

            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.right_content}>
                        <div className={styles.big_article_wrapper}>
                            <Image
                                alt="عکس مقاله"
                                src={img}
                                className={styles.big_article}
                            />

                            <div className={styles.title}>
                                آچار قفلی به چه درد میخورد ؟
                                <div className={styles.show_btn}>
                                    نمایش مقاله
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.left_section}>
                        <div className={styles.article_image_box}>
                            <Image
                                alt="عکس مقاله"
                                src={img}
                                className={styles.mini_article}
                            />

                            <div className={styles.title}>
                                آچار قفلی به چه درد میخورد ؟
                            </div>
                        </div>

                        <div className={styles.article_image_box}>
                            <Image
                                alt="عکس مقاله"
                                src={img}
                                className={styles.mini_article}
                            />

                            <div className={styles.title}>
                                آچار قفلی به چه درد میخورد ؟
                            </div>
                        </div>

                        <div className={styles.article_image_box}>
                            <Image
                                alt="عکس مقاله"
                                src={img}
                                className={styles.mini_article}
                            />

                            <div className={styles.title}>
                                آچار قفلی به چه درد میخورد ؟
                            </div>
                        </div>

                        <div className={styles.article_image_box}>
                            <Image
                                alt="عکس مقاله"
                                src={img}
                                className={styles.mini_article}
                            />

                            <div className={styles.title}>
                                آچار قفلی به چه درد میخورد ؟
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.search_wrapper}>
                    <form className={styles.search_box}>
                        <input type="text" placeholder="جستجو در مقالات ..." />

                        <div>
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                    </form>
                </div>

                <div className={styles.articles_list}>
                    <Link href={"/articles/0"} className={styles.article_box}>
                        <Image
                            src={img}
                            alt={"عکس مقاله"}
                            className={styles.article_cover}
                        />

                        <div className={styles.article_title}>
                            آچار قفلی به چه درد میخورد ؟
                        </div>

                        <div className={styles.article_asset}>
                            <span>
                                <FontAwesomeIcon icon={faClock} />
                            </span>
                            زمان مطالعه : 5 دقیقه
                        </div>
                    </Link>

                    <Link href={"/articles/0"} className={styles.article_box}>
                        <Image
                            src={img}
                            alt={"عکس مقاله"}
                            className={styles.article_cover}
                        />

                        <div className={styles.article_title}>
                            آچار قفلی به چه درد میخورد ؟
                        </div>

                        <div className={styles.article_asset}>
                            <span>
                                <FontAwesomeIcon icon={faClock} />
                            </span>
                            زمان مطالعه : 5 دقیقه
                        </div>
                    </Link>

                    <Link href={"/articles/0"} className={styles.article_box}>
                        <Image
                            src={img}
                            alt={"عکس مقاله"}
                            className={styles.article_cover}
                        />

                        <div className={styles.article_title}>
                            آچار قفلی به چه درد میخورد ؟
                        </div>

                        <div className={styles.article_asset}>
                            <span>
                                <FontAwesomeIcon icon={faClock} />
                            </span>
                            زمان مطالعه : 5 دقیقه
                        </div>
                    </Link>

                    <Link href={"/articles/0"} className={styles.article_box}>
                        <Image
                            src={img}
                            alt={"عکس مقاله"}
                            className={styles.article_cover}
                        />

                        <div className={styles.article_title}>
                            آچار قفلی به چه درد میخورد ؟
                        </div>

                        <div className={styles.article_asset}>
                            <span>
                                <FontAwesomeIcon icon={faClock} />
                            </span>
                            زمان مطالعه : 5 دقیقه
                        </div>
                    </Link>

                    <Link href={"/articles/0"} className={styles.article_box}>
                        <Image
                            src={img}
                            alt={"عکس مقاله"}
                            className={styles.article_cover}
                        />

                        <div className={styles.article_title}>
                            آچار قفلی به چه درد میخورد ؟
                        </div>

                        <div className={styles.article_asset}>
                            <span>
                                <FontAwesomeIcon icon={faClock} />
                            </span>
                            زمان مطالعه : 5 دقیقه
                        </div>
                    </Link>

                    <Link href={"/articles/0"} className={styles.article_box}>
                        <Image
                            src={img}
                            alt={"عکس مقاله"}
                            className={styles.article_cover}
                        />

                        <div className={styles.article_title}>
                            آچار قفلی به چه درد میخورد ؟
                        </div>

                        <div className={styles.article_asset}>
                            <span>
                                <FontAwesomeIcon icon={faClock} />
                            </span>
                            زمان مطالعه : 5 دقیقه
                        </div>
                    </Link>

                    <Link href={"/articles/0"} className={styles.article_box}>
                        <Image
                            src={img}
                            alt={"عکس مقاله"}
                            className={styles.article_cover}
                        />

                        <div className={styles.article_title}>
                            آچار قفلی به چه درد میخورد ؟
                        </div>

                        <div className={styles.article_asset}>
                            <span>
                                <FontAwesomeIcon icon={faClock} />
                            </span>
                            زمان مطالعه : 5 دقیقه
                        </div>
                    </Link>

                    <Link href={"/articles/0"} className={styles.article_box}>
                        <Image
                            src={img}
                            alt={"عکس مقاله"}
                            className={styles.article_cover}
                        />

                        <div className={styles.article_title}>
                            آچار قفلی به چه درد میخورد ؟
                        </div>

                        <div className={styles.article_asset}>
                            <span>
                                <FontAwesomeIcon icon={faClock} />
                            </span>
                            زمان مطالعه : 5 دقیقه
                        </div>
                    </Link>

                    <Link href={"/articles/0"} className={styles.article_box}>
                        <Image
                            src={img}
                            alt={"عکس مقاله"}
                            className={styles.article_cover}
                        />

                        <div className={styles.article_title}>
                            آچار قفلی به چه درد میخورد ؟
                        </div>

                        <div className={styles.article_asset}>
                            <span>
                                <FontAwesomeIcon icon={faClock} />
                            </span>
                            زمان مطالعه : 5 دقیقه
                        </div>
                    </Link>

                    <Link href={"/articles/0"} className={styles.article_box}>
                        <Image
                            src={img}
                            alt={"عکس مقاله"}
                            className={styles.article_cover}
                        />

                        <div className={styles.article_title}>
                            آچار قفلی به چه درد میخورد ؟
                        </div>

                        <div className={styles.article_asset}>
                            <span>
                                <FontAwesomeIcon icon={faClock} />
                            </span>
                            زمان مطالعه : 5 دقیقه
                        </div>
                    </Link>

                    <Link href={"/articles/0"} className={styles.article_box}>
                        <Image
                            src={img}
                            alt={"عکس مقاله"}
                            className={styles.article_cover}
                        />

                        <div className={styles.article_title}>
                            آچار قفلی به چه درد میخورد ؟
                        </div>

                        <div className={styles.article_asset}>
                            <span>
                                <FontAwesomeIcon icon={faClock} />
                            </span>
                            زمان مطالعه : 5 دقیقه
                        </div>
                    </Link>

                    <Link href={"/articles/0"} className={styles.article_box}>
                        <Image
                            src={img}
                            alt={"عکس مقاله"}
                            className={styles.article_cover}
                        />

                        <div className={styles.article_title}>
                            آچار قفلی به چه درد میخورد ؟
                        </div>

                        <div className={styles.article_asset}>
                            <span>
                                <FontAwesomeIcon icon={faClock} />
                            </span>
                            زمان مطالعه : 5 دقیقه
                        </div>
                    </Link>

                    <Link href={"/articles/0"} className={styles.article_box}>
                        <Image
                            src={img}
                            alt={"عکس مقاله"}
                            className={styles.article_cover}
                        />

                        <div className={styles.article_title}>
                            آچار قفلی به چه درد میخورد ؟
                        </div>

                        <div className={styles.article_asset}>
                            <span>
                                <FontAwesomeIcon icon={faClock} />
                            </span>
                            زمان مطالعه : 5 دقیقه
                        </div>
                    </Link>

                    <Link href={"/articles/0"} className={styles.article_box}>
                        <Image
                            src={img}
                            alt={"عکس مقاله"}
                            className={styles.article_cover}
                        />

                        <div className={styles.article_title}>
                            آچار قفلی به چه درد میخورد ؟
                        </div>

                        <div className={styles.article_asset}>
                            <span>
                                <FontAwesomeIcon icon={faClock} />
                            </span>
                            زمان مطالعه : 5 دقیقه
                        </div>
                    </Link>

                    <Link href={"/articles/0"} className={styles.article_box}>
                        <Image
                            src={img}
                            alt={"عکس مقاله"}
                            className={styles.article_cover}
                        />

                        <div className={styles.article_title}>
                            آچار قفلی به چه درد میخورد ؟
                        </div>

                        <div className={styles.article_asset}>
                            <span>
                                <FontAwesomeIcon icon={faClock} />
                            </span>
                            زمان مطالعه : 5 دقیقه
                        </div>
                    </Link>

                    <Link href={"/articles/0"} className={styles.article_box}>
                        <Image
                            src={img}
                            alt={"عکس مقاله"}
                            className={styles.article_cover}
                        />

                        <div className={styles.article_title}>
                            آچار قفلی به چه درد میخورد ؟
                        </div>

                        <div className={styles.article_asset}>
                            <span>
                                <FontAwesomeIcon icon={faClock} />
                            </span>
                            زمان مطالعه : 5 دقیقه
                        </div>
                    </Link>

                    <Link href={"/articles/0"} className={styles.article_box}>
                        <Image
                            src={img}
                            alt={"عکس مقاله"}
                            className={styles.article_cover}
                        />

                        <div className={styles.article_title}>
                            آچار قفلی به چه درد میخورد ؟
                        </div>

                        <div className={styles.article_asset}>
                            <span>
                                <FontAwesomeIcon icon={faClock} />
                            </span>
                            زمان مطالعه : 5 دقیقه
                        </div>
                    </Link>

                    <Link href={"/articles/0"} className={styles.article_box}>
                        <Image
                            src={img}
                            alt={"عکس مقاله"}
                            className={styles.article_cover}
                        />

                        <div className={styles.article_title}>
                            آچار قفلی به چه درد میخورد ؟
                        </div>

                        <div className={styles.article_asset}>
                            <span>
                                <FontAwesomeIcon icon={faClock} />
                            </span>
                            زمان مطالعه : 5 دقیقه
                        </div>
                    </Link>
                </div>

                <div className={styles.pagination}>
                    <div className={styles.perv_btn}>
                        <span>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </span>
                        قبلی
                    </div>
                    <div className={`${styles.page_btn} ${styles.show}`}>1</div>
                    <div className={`${styles.page_btn} ${""}`}>2</div>
                    <div className={`${styles.page_btn} ${""}`}>3</div>
                    <div className={`${styles.page_btn} ${""}`}>4</div>
                    <div className={`${styles.page_btn} ${""}`}>5</div>
                    <div className={styles.next_btn}>
                        بعدی
                        <span>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </span>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
