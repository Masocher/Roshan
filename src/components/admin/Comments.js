import styles from "../../styles/admin/Comments.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrashCan,
    faCheckSquare,
    faAngleRight,
    faAngleLeft,
    faStar,
    faReply,
} from "@fortawesome/free-solid-svg-icons";

export default function Comments() {
    return (
        <div className={styles.container}>
            <div className={styles.top_box}>
                <div className={styles.inventory_button}>
                    <div>
                        <span></span>
                    </div>
                    تایید نشده ها
                </div>

                <div className={styles.inventory_button}>
                    <div>
                        <span></span>
                    </div>
                    تایید شده ها
                </div>

                <div className={styles.inventory_button}>
                    <div>
                        <span></span>
                    </div>
                    همه
                </div>
            </div>

            <div className={styles.comments}>
                <div className={styles.comments_top}>
                    <div className={styles.comments_title}>شماره</div>
                    <div className={styles.comments_title}>نویسنده</div>
                    <div className={styles.comments_title}>محصول</div>
                    <div className={styles.comments_title}>امتیاز</div>
                    <div className={styles.comments_title}>تاریخ</div>
                    <div className={styles.comments_title}>وضعیت</div>
                    <div className={styles.hidden_box}></div>
                </div>

                <div className={styles.comment}>
                    <div className={styles.comment_id}>1</div>

                    <div className={styles.comment_user}>09054182307</div>

                    <div className={styles.comment_name}>هود آشپزی</div>

                    <div className={styles.comment_stars}>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                    </div>

                    <div className={styles.comment_date}>1403/1/14</div>

                    <div className={styles.comment_status}>تایید نشده</div>

                    <div className={styles.comment_buttons}>
                        <div className={styles.comment_delete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>

                        <div className={styles.comment_edit}>
                            <FontAwesomeIcon icon={faCheckSquare} />
                        </div>

                        <div className={styles.comment_reply}>
                            <FontAwesomeIcon icon={faReply} />
                        </div>
                    </div>
                </div>

                <div className={styles.comment}>
                    <div className={styles.comment_id}>1</div>

                    <div className={styles.comment_user}>09054182307</div>

                    <div className={styles.comment_name}>هود آشپزی</div>

                    <div className={styles.comment_stars}>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                    </div>

                    <div className={styles.comment_date}>1403/1/14</div>

                    <div className={styles.comment_status}>تایید نشده</div>

                    <div className={styles.comment_buttons}>
                        <div className={styles.comment_delete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>

                        <div className={styles.comment_edit}>
                            <FontAwesomeIcon icon={faCheckSquare} />
                        </div>

                        <div className={styles.comment_reply}>
                            <FontAwesomeIcon icon={faReply} />
                        </div>
                    </div>
                </div>

                <div className={styles.comment}>
                    <div className={styles.comment_id}>1</div>

                    <div className={styles.comment_user}>09054182307</div>

                    <div className={styles.comment_name}>هود آشپزی</div>

                    <div className={styles.comment_stars}>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                    </div>

                    <div className={styles.comment_date}>1403/1/14</div>

                    <div className={styles.comment_status}>تایید نشده</div>

                    <div className={styles.comment_buttons}>
                        <div className={styles.comment_delete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>

                        <div className={styles.comment_edit}>
                            <FontAwesomeIcon icon={faCheckSquare} />
                        </div>

                        <div className={styles.comment_reply}>
                            <FontAwesomeIcon icon={faReply} />
                        </div>
                    </div>
                </div>

                <div className={styles.comment}>
                    <div className={styles.comment_id}>1</div>

                    <div className={styles.comment_user}>09054182307</div>

                    <div className={styles.comment_name}>هود آشپزی</div>

                    <div className={styles.comment_stars}>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                    </div>

                    <div className={styles.comment_date}>1403/1/14</div>

                    <div className={styles.comment_status}>تایید نشده</div>

                    <div className={styles.comment_buttons}>
                        <div className={styles.comment_delete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>

                        <div className={styles.comment_edit}>
                            <FontAwesomeIcon icon={faCheckSquare} />
                        </div>

                        <div className={styles.comment_reply}>
                            <FontAwesomeIcon icon={faReply} />
                        </div>
                    </div>
                </div>

                <div className={styles.comment}>
                    <div className={styles.comment_id}>1</div>

                    <div className={styles.comment_user}>09054182307</div>

                    <div className={styles.comment_name}>هود آشپزی</div>

                    <div className={styles.comment_stars}>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                    </div>

                    <div className={styles.comment_date}>1403/1/14</div>

                    <div className={styles.comment_status}>تایید نشده</div>

                    <div className={styles.comment_buttons}>
                        <div className={styles.comment_delete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>

                        <div className={styles.comment_edit}>
                            <FontAwesomeIcon icon={faCheckSquare} />
                        </div>

                        <div className={styles.comment_reply}>
                            <FontAwesomeIcon icon={faReply} />
                        </div>
                    </div>
                </div>

                <div className={styles.comment}>
                    <div className={styles.comment_id}>1</div>

                    <div className={styles.comment_user}>09054182307</div>

                    <div className={styles.comment_name}>هود آشپزی</div>

                    <div className={styles.comment_stars}>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                    </div>

                    <div className={styles.comment_date}>1403/1/14</div>

                    <div className={styles.comment_status}>تایید نشده</div>

                    <div className={styles.comment_buttons}>
                        <div className={styles.comment_delete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>

                        <div className={styles.comment_edit}>
                            <FontAwesomeIcon icon={faCheckSquare} />
                        </div>

                        <div className={styles.comment_reply}>
                            <FontAwesomeIcon icon={faReply} />
                        </div>
                    </div>
                </div>

                <div className={styles.comment}>
                    <div className={styles.comment_id}>1</div>

                    <div className={styles.comment_user}>09054182307</div>

                    <div className={styles.comment_name}>هود آشپزی</div>

                    <div className={styles.comment_stars}>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                    </div>

                    <div className={styles.comment_date}>1403/1/14</div>

                    <div className={styles.comment_status}>تایید نشده</div>

                    <div className={styles.comment_buttons}>
                        <div className={styles.comment_delete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>

                        <div className={styles.comment_edit}>
                            <FontAwesomeIcon icon={faCheckSquare} />
                        </div>

                        <div className={styles.comment_reply}>
                            <FontAwesomeIcon icon={faReply} />
                        </div>
                    </div>
                </div>

                <div className={styles.comment}>
                    <div className={styles.comment_id}>1</div>

                    <div className={styles.comment_user}>09054182307</div>

                    <div className={styles.comment_name}>هود آشپزی</div>

                    <div className={styles.comment_stars}>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                    </div>

                    <div className={styles.comment_date}>1403/1/14</div>

                    <div className={styles.comment_status}>تایید نشده</div>

                    <div className={styles.comment_buttons}>
                        <div className={styles.comment_delete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>

                        <div className={styles.comment_edit}>
                            <FontAwesomeIcon icon={faCheckSquare} />
                        </div>

                        <div className={styles.comment_reply}>
                            <FontAwesomeIcon icon={faReply} />
                        </div>
                    </div>
                </div>

                <div className={styles.comment}>
                    <div className={styles.comment_id}>1</div>

                    <div className={styles.comment_user}>09054182307</div>

                    <div className={styles.comment_name}>هود آشپزی</div>

                    <div className={styles.comment_stars}>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                    </div>

                    <div className={styles.comment_date}>1403/1/14</div>

                    <div className={styles.comment_status}>تایید نشده</div>

                    <div className={styles.comment_buttons}>
                        <div className={styles.comment_delete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>

                        <div className={styles.comment_edit}>
                            <FontAwesomeIcon icon={faCheckSquare} />
                        </div>

                        <div className={styles.comment_reply}>
                            <FontAwesomeIcon icon={faReply} />
                        </div>
                    </div>
                </div>

                <div className={styles.comment}>
                    <div className={styles.comment_id}>1</div>

                    <div className={styles.comment_user}>09054182307</div>

                    <div className={styles.comment_name}>هود آشپزی</div>

                    <div className={styles.comment_stars}>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                    </div>

                    <div className={styles.comment_date}>1403/1/14</div>

                    <div className={styles.comment_status}>تایید نشده</div>

                    <div className={styles.comment_buttons}>
                        <div className={styles.comment_delete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>

                        <div className={styles.comment_edit}>
                            <FontAwesomeIcon icon={faCheckSquare} />
                        </div>

                        <div className={styles.comment_reply}>
                            <FontAwesomeIcon icon={faReply} />
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
