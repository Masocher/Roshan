import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/admin/Products.module.css";
import {
    faGear,
    faSearch,
    faTrashCan,
    faAngleLeft,
    faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import img from "../../../public/images/1.webp";
import Image from "next/image";

export default function Products() {
    return (
        <div className={styles.container}>
            <div className={styles.search_box}>
                <form className={styles.products_search}>
                    <input type="text" placeholder="جستجوی محصول ..." />

                    <span>
                        <FontAwesomeIcon icon={faSearch} />
                    </span>
                </form>

                <div className={styles.inventory_button}>
                    <div>
                        <span></span>
                    </div>
                    فقط کالا های موجود
                </div>
            </div>

            <div className={styles.products}>
                <div className={styles.products_top}>
                    <div className={styles.products_title}>شماره</div>
                    <div className={styles.products_title}>عکس</div>
                    <div className={styles.products_title}>نام</div>
                    <div className={styles.products_title}>قیمت</div>
                    <div className={styles.products_title}>تاریخ</div>
                    <div className={styles.products_title}>وضعیت</div>
                    <div className={styles.hidden_box}></div>
                </div>

                <div className={styles.product}>
                    <div className={styles.product_id}>1</div>

                    <Image
                        className={styles.product_image}
                        src={img}
                        alt="عکس محصول"
                    />

                    <div className={styles.product_name}>
                        لورم ایپسوم یک متن سخاتگی است
                    </div>

                    <div className={styles.product_price}>1,500,000</div>
                    <div className={styles.product_date}>1403/1/14</div>
                    <div className={styles.product_active}>فعال</div>

                    <div className={styles.product_buttons}>
                        <div className={styles.product_delete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>

                        <div className={styles.product_edit}>
                            <FontAwesomeIcon icon={faGear} />
                        </div>
                    </div>
                </div>

                <div className={styles.product}>
                    <div className={styles.product_id}>1</div>

                    <Image
                        className={styles.product_image}
                        src={img}
                        alt="عکس محصول"
                    />

                    <div className={styles.product_name}>
                        لورم ایپسوم یک متن سخاتگی است
                    </div>

                    <div className={styles.product_price}>1,500,000</div>
                    <div className={styles.product_date}>1403/1/14</div>
                    <div className={styles.product_active}>فعال</div>

                    <div className={styles.product_buttons}>
                        <div className={styles.product_delete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>

                        <div className={styles.product_edit}>
                            <FontAwesomeIcon icon={faGear} />
                        </div>
                    </div>
                </div>

                <div className={styles.product}>
                    <div className={styles.product_id}>1</div>

                    <Image
                        className={styles.product_image}
                        src={img}
                        alt="عکس محصول"
                    />

                    <div className={styles.product_name}>
                        لورم ایپسوم یک متن سخاتگی است
                    </div>

                    <div className={styles.product_price}>1,500,000</div>
                    <div className={styles.product_date}>1403/1/14</div>
                    <div className={styles.product_active}>فعال</div>

                    <div className={styles.product_buttons}>
                        <div className={styles.product_delete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>

                        <div className={styles.product_edit}>
                            <FontAwesomeIcon icon={faGear} />
                        </div>
                    </div>
                </div>

                <div className={styles.product}>
                    <div className={styles.product_id}>1</div>

                    <Image
                        className={styles.product_image}
                        src={img}
                        alt="عکس محصول"
                    />

                    <div className={styles.product_name}>
                        لورم ایپسوم یک متن سخاتگی است
                    </div>

                    <div className={styles.product_price}>1,500,000</div>
                    <div className={styles.product_date}>1403/1/14</div>
                    <div className={styles.product_active}>فعال</div>

                    <div className={styles.product_buttons}>
                        <div className={styles.product_delete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>

                        <div className={styles.product_edit}>
                            <FontAwesomeIcon icon={faGear} />
                        </div>
                    </div>
                </div>

                <div className={styles.product}>
                    <div className={styles.product_id}>1</div>

                    <Image
                        className={styles.product_image}
                        src={img}
                        alt="عکس محصول"
                    />

                    <div className={styles.product_name}>
                        لورم ایپسوم یک متن سخاتگی است
                    </div>

                    <div className={styles.product_price}>1,500,000</div>
                    <div className={styles.product_date}>1403/1/14</div>
                    <div className={styles.product_active}>فعال</div>

                    <div className={styles.product_buttons}>
                        <div className={styles.product_delete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>

                        <div className={styles.product_edit}>
                            <FontAwesomeIcon icon={faGear} />
                        </div>
                    </div>
                </div>

                <div className={styles.product}>
                    <div className={styles.product_id}>1</div>

                    <Image
                        className={styles.product_image}
                        src={img}
                        alt="عکس محصول"
                    />

                    <div className={styles.product_name}>
                        لورم ایپسوم یک متن سخاتگی است
                    </div>

                    <div className={styles.product_price}>1,500,000</div>
                    <div className={styles.product_date}>1403/1/14</div>
                    <div className={styles.product_active}>فعال</div>

                    <div className={styles.product_buttons}>
                        <div className={styles.product_delete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>

                        <div className={styles.product_edit}>
                            <FontAwesomeIcon icon={faGear} />
                        </div>
                    </div>
                </div>

                <div className={styles.product}>
                    <div className={styles.product_id}>1</div>

                    <Image
                        className={styles.product_image}
                        src={img}
                        alt="عکس محصول"
                    />

                    <div className={styles.product_name}>
                        لورم ایپسوم یک متن سخاتگی است
                    </div>

                    <div className={styles.product_price}>1,500,000</div>
                    <div className={styles.product_date}>1403/1/14</div>
                    <div className={styles.product_active}>فعال</div>

                    <div className={styles.product_buttons}>
                        <div className={styles.product_delete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>

                        <div className={styles.product_edit}>
                            <FontAwesomeIcon icon={faGear} />
                        </div>
                    </div>
                </div>

                <div className={styles.product}>
                    <div className={styles.product_id}>1</div>

                    <Image
                        className={styles.product_image}
                        src={img}
                        alt="عکس محصول"
                    />

                    <div className={styles.product_name}>
                        لورم ایپسوم یک متن سخاتگی است
                    </div>

                    <div className={styles.product_price}>1,500,000</div>
                    <div className={styles.product_date}>1403/1/14</div>
                    <div className={styles.product_active}>فعال</div>

                    <div className={styles.product_buttons}>
                        <div className={styles.product_delete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>

                        <div className={styles.product_edit}>
                            <FontAwesomeIcon icon={faGear} />
                        </div>
                    </div>
                </div>

                <div className={styles.product}>
                    <div className={styles.product_id}>1</div>

                    <Image
                        className={styles.product_image}
                        src={img}
                        alt="عکس محصول"
                    />

                    <div className={styles.product_name}>
                        لورم ایپسوم یک متن سخاتگی است
                    </div>

                    <div className={styles.product_price}>1,500,000</div>
                    <div className={styles.product_date}>1403/1/14</div>
                    <div className={styles.product_active}>فعال</div>

                    <div className={styles.product_buttons}>
                        <div className={styles.product_delete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>

                        <div className={styles.product_edit}>
                            <FontAwesomeIcon icon={faGear} />
                        </div>
                    </div>
                </div>

                <div className={styles.product}>
                    <div className={styles.product_id}>1</div>

                    <Image
                        className={styles.product_image}
                        src={img}
                        alt="عکس محصول"
                    />

                    <div className={styles.product_name}>
                        لورم ایپسوم یک متن سخاتگی است
                    </div>

                    <div className={styles.product_price}>1,500,000</div>
                    <div className={styles.product_date}>1403/1/14</div>
                    <div className={styles.product_active}>فعال</div>

                    <div className={styles.product_buttons}>
                        <div className={styles.product_delete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>

                        <div className={styles.product_edit}>
                            <FontAwesomeIcon icon={faGear} />
                        </div>
                    </div>
                </div>

                <div className={styles.product}>
                    <div className={styles.product_id}>1</div>

                    <Image
                        className={styles.product_image}
                        src={img}
                        alt="عکس محصول"
                    />

                    <div className={styles.product_name}>
                        لورم ایپسوم یک متن سخاتگی است
                    </div>

                    <div className={styles.product_price}>1,500,000</div>
                    <div className={styles.product_date}>1403/1/14</div>
                    <div className={styles.product_active}>فعال</div>

                    <div className={styles.product_buttons}>
                        <div className={styles.product_delete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>

                        <div className={styles.product_edit}>
                            <FontAwesomeIcon icon={faGear} />
                        </div>
                    </div>
                </div>

                <div className={styles.product}>
                    <div className={styles.product_id}>1</div>

                    <Image
                        className={styles.product_image}
                        src={img}
                        alt="عکس محصول"
                    />

                    <div className={styles.product_name}>
                        لورم ایپسوم یک متن سخاتگی است
                    </div>

                    <div className={styles.product_price}>1,500,000</div>
                    <div className={styles.product_date}>1403/1/14</div>
                    <div className={styles.product_active}>فعال</div>

                    <div className={styles.product_buttons}>
                        <div className={styles.product_delete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>

                        <div className={styles.product_edit}>
                            <FontAwesomeIcon icon={faGear} />
                        </div>
                    </div>
                </div>

                <div className={styles.product}>
                    <div className={styles.product_id}>1</div>

                    <Image
                        className={styles.product_image}
                        src={img}
                        alt="عکس محصول"
                    />

                    <div className={styles.product_name}>
                        لورم ایپسوم یک متن سخاتگی است
                    </div>

                    <div className={styles.product_price}>1,500,000</div>
                    <div className={styles.product_date}>1403/1/14</div>
                    <div className={styles.product_active}>فعال</div>

                    <div className={styles.product_buttons}>
                        <div className={styles.product_delete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>

                        <div className={styles.product_edit}>
                            <FontAwesomeIcon icon={faGear} />
                        </div>
                    </div>
                </div>

                <div className={styles.product}>
                    <div className={styles.product_id}>1</div>

                    <Image
                        className={styles.product_image}
                        src={img}
                        alt="عکس محصول"
                    />

                    <div className={styles.product_name}>
                        لورم ایپسوم یک متن سخاتگی است
                    </div>

                    <div className={styles.product_price}>1,500,000</div>
                    <div className={styles.product_date}>1403/1/14</div>
                    <div className={styles.product_active}>فعال</div>

                    <div className={styles.product_buttons}>
                        <div className={styles.product_delete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>

                        <div className={styles.product_edit}>
                            <FontAwesomeIcon icon={faGear} />
                        </div>
                    </div>
                </div>
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
    );
}
