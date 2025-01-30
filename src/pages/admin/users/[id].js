import styles from "../../../styles/admin-options/EditUser.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export default function EditUser() {
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
                صفحه کاربر
            </div>

            <div className={styles.user}>
                <div className={styles.first_section}>
                    <div className={styles.inf_box}>
                        <div className={styles.title}>نام</div>

                        <div className={styles.content}>امیر مسعود چراغی</div>
                    </div>

                    <div className={styles.inf_box}>
                        <div className={styles.title}>شماره موبایل</div>

                        <div className={styles.content}>09054182307</div>
                    </div>

                    <div className={styles.inf_box}>
                        <div className={styles.title}>وضعیت کاربر</div>

                        <div className={styles.content}>فعال</div>
                    </div>

                    <div className={styles.inf_box}>
                        <div className={styles.title}>وضعیت شماره موبایل</div>

                        <div className={styles.content}>غیر فعال</div>
                    </div>

                    <div className={styles.inf_box}>
                        <div className={styles.title}>تاریخ پیوستن</div>

                        <div className={styles.content}>1403/1/14</div>
                    </div>

                    <div className={styles.inf_box}>
                        <div className={styles.title}>حالت ادمین</div>

                        <div className={styles.content}>غیر فعال</div>
                    </div>
                </div>

                <div className={styles.second_section}>
                    <div className={styles.admin_btn}>
                        <div className={styles.title}>تغییر حالت ادمین</div>

                        <div className={styles.inventory_button}>
                            <div>
                                <span></span>
                            </div>
                            فعال کردن
                        </div>
                    </div>

                    <div className={styles.admin_btn}>
                        <div className={styles.title}>تغییر حالت کاربر</div>

                        <div className={styles.inventory_button}>
                            <div>
                                <span></span>
                            </div>
                            غیر فعال کردن
                        </div>
                    </div>
                </div>

                <div className={styles.third_section}>
                    <div className={styles.title}>تاریخچه سفارشات</div>

                    <div className={styles.content}>
                        <div className={styles.order}>
                            <div className={styles.order_name}>
                                هود آشپزی مدل سیمرغ
                            </div>

                            <div className={styles.order_num}>تعداد : 2</div>

                            <div className={styles.order_price}>1,500,000</div>
                        </div>

                        <div className={styles.order}>
                            <div className={styles.order_name}>
                                هود آشپزی مدل سیمرغ
                            </div>

                            <div className={styles.order_num}>تعداد : 2</div>

                            <div className={styles.order_price}>1,500,000</div>
                        </div>

                        <div className={styles.order}>
                            <div className={styles.order_name}>
                                هود آشپزی مدل سیمرغ
                            </div>

                            <div className={styles.order_num}>تعداد : 2</div>

                            <div className={styles.order_price}>1,500,000</div>
                        </div>

                        <div className={styles.order}>
                            <div className={styles.order_name}>
                                هود آشپزی مدل سیمرغ
                            </div>

                            <div className={styles.order_num}>تعداد : 2</div>

                            <div className={styles.order_price}>1,500,000</div>
                        </div>

                        <div className={styles.order}>
                            <div className={styles.order_name}>
                                هود آشپزی مدل سیمرغ
                            </div>

                            <div className={styles.order_num}>تعداد : 2</div>

                            <div className={styles.order_price}>1,500,000</div>
                        </div>

                        <div className={styles.order}>
                            <div className={styles.order_name}>
                                هود آشپزی مدل سیمرغ
                            </div>

                            <div className={styles.order_num}>تعداد : 2</div>

                            <div className={styles.order_price}>1,500,000</div>
                        </div>
                    </div>
                </div>

                <div className={styles.fourth_section}>
                    <div className={styles.title}>تاریخچه کامنت ها</div>

                    <div className={styles.content}>
                        <div className={styles.comment}>
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                            صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و
                            متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم
                            است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
                            متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای
                            زیادی در شصت و سه درصد گذشته حال و آینده شناخت
                            فراوان جامعه و متخصصان را می طلبد
                        </div>

                        <div className={styles.comment}>
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                            صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و
                            متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم
                            است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
                            متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای
                            زیادی در شصت و سه درصد گذشته حال و آینده شناخت
                            فراوان جامعه و متخصصان را می طلبد
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
