import styles from "../../../styles/admin-options/Order.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCheck,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import spiner from "../../../../public/images/loading.svg";

axios.defaults.withCredentials = true;

export async function getServerSideProps(context) {
  const { id } = context.params;

  const res = await fetch(`https://abazarak.ir/api/admin/orders/${id}`, {
    headers: {
      Cookie: context.req.headers.cookie || "",
    },
  });

  const order = await res.json();

  return {
    props: {
      order,
    },
  };
}

export default function Order({ order }) {
  const [loading, setLoading] = useState(false);

  const [postedAt, setPostedAt] = useState(
    (order.shipping && order.shipping.posted_at) || ""
  );
  const [address, setAddress] = useState(
    (order.shipping && order.shipping.address) || ""
  );
  const [trackingCode, setTrackingCode] = useState(
    (order.shipping && order.shipping.tracking_code) || ""
  );
  const [shippingFee, setShippingFee] = useState(
    (order.shipping && order.shipping.shipping_fee) || ""
  );
  const [extraDetails, setExtraDetails] = useState(
    (order.shipping && order.shipping.extra_details) || ""
  );

  const setShiping = () => {
    setLoading(true);
    axios
      .post(`/api/admin/orders/${order.id}/set_shipping/`, {
        posted_at: postedAt,
        address: address,
        tracking_code: trackingCode,
        shipping_fee: shippingFee,
        extra_details: extraDetails,
      })
      .then(() => {
        toast.success("تغییرات با موفقیت ثبت شد");
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          if (error.response.data.address) {
            toast.error("آدرس : " + error.response.data.address);
          } else if (error.response.data.shipping_fee) {
            toast.error("هزینه ارسال : " + error.response.data.shipping_fee);
          } else if (error.response.data.tracking_code) {
            toast.error("کد رهگیری : " + error.response.data.tracking_code);
          } else if (error.response.data.posted_at) {
            toast.error("تاریخ : " + error.response.data.posted_at);
          } else {
            toast.error("خطایی رخ داد !");
          }
        }
        setLoading(false);
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

      <div className={styles.main_title}>
        <Link className={styles.back_btn} href={"/admin-panel/orders"}>
          <span>
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
          بازگشت
        </Link>
        صفحه سفارش
      </div>

      <div className={styles.order}>
        <div className={styles.first_section}>
          <div className={styles.main_information}>
            <div className={styles.name}>{order.full_name}</div>
            <div className={styles.phone}>{order.number}</div>
          </div>

          <div className={styles.payment_status}>
            <div className={styles.title}>وضعیت ارسال</div>

            <div
              className={`${styles.content} ${
                order.shipped ? styles.show : ""
              }`}
            >
              <span>
                <FontAwesomeIcon icon={order.shipped ? faCheck : faClose} />
              </span>
              <div>{order.shipped ? "ارسال شده" : "ارسال نشده"}</div>
            </div>
          </div>

          <div className={styles.payment_status}>
            <div className={styles.title}>وضعیت پرداخت</div>

            <div
              className={`${styles.content} ${order.paid ? styles.show : ""}`}
            >
              <span>
                <FontAwesomeIcon icon={order.paid ? faCheck : faClose} />
              </span>
              <div>{order.paid ? "پرداخت شده" : "پرداخت نشده"}</div>
            </div>
          </div>

          <div className={styles.payment_status}>
            <div className={styles.title}>تاریخ سفارش</div>

            <div className={styles.content}>
              <div>{order.created_at}</div>
            </div>
          </div>
        </div>

        <div className={styles.second_section}>
          <div className={styles.address}>
            <div className={styles.title}>آدرس</div>

            <div className={styles.content}>{order.address.address}</div>
          </div>

          <div className={styles.offer}>
            <div className={styles.title}>کد تخفیف</div>

            <div className={styles.content}>
              {order.cupon ? order.cupon : "بدون کد تخفیف"}
            </div>
          </div>
        </div>

        <div className={styles.third_section}>
          <div className={styles.title}>محصولات انتخاب شده</div>

          <div className={styles.products}>
            {order.items.map((item) => (
              <div className={styles.product} key={item.id}>
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  className={styles.product_img}
                  width={100}
                  height={100}
                  quality={100}
                  priority
                />

                <div className={styles.product_inf}>
                  <div className={styles.badge}>تعداد : {item.quantity}</div>

                  <div className={styles.cart_product_num}>
                    {item.product.final_price} تومان
                  </div>

                  <div className={styles.product_name}>هود آشپزی مدل سیمرغ</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {order.paid ? (
          <div className={styles.fourth_section}>
            <div className={styles.section_title}>صورتحساب</div>

            <div className={styles.bottom_section}>
              <div className={styles.botom_box}>
                <div className={styles.title}>وضعیت پرداخت</div>

                <div className={styles.content}>
                  {order.paid ? "پرداخت شده" : "پرداخت نشده"}
                </div>
              </div>

              <div className={styles.botom_box}>
                <div className={styles.title}>قیمت پرداخت شده</div>

                <div className={styles.content}>
                  {order.billing
                    ? order.billing.paid_price + " " + "تومان"
                    : "در انتظار پرداخت"}
                </div>
              </div>

              <div className={styles.botom_box}>
                <div className={styles.title}>تاریخ پرداخت</div>

                <div className={styles.content}>
                  {order.billing ? order.billing.paid_at : "در انتظار پرداخت"}
                </div>
              </div>

              <div className={styles.botom_box}>
                <div className={styles.title}>کد تراکنش</div>

                <div className={styles.content}>
                  {order.billing && order.billing.ref_id
                    ? order.billing.ref_id
                    : "در انتظار پرداخت"}
                </div>
              </div>

              <div className={styles.payment_gateway_details}>
                <div className={styles.title}>جزئیات درگاه پرداخت</div>

                {order.billing && order.billing.gateway_details ? (
                  <div className={styles.content}>
                    <div className={styles.content_box}>
                      کد وضعیت :{" "}
                      {order.billing && order.billing.gateway_details
                        ? order.billing.gateway_details.code
                        : ""}
                    </div>

                    <div className={styles.content_box}>
                      پیغام :{" "}
                      {order.billing && order.billing.gateway_details
                        ? order.billing.gateway_details.message
                        : ""}
                    </div>

                    <div className={styles.content_box}>
                      کد هش کارت :{" "}
                      {order.billing && order.billing.gateway_details
                        ? order.billing.gateway_details.card_hash
                        : ""}
                    </div>

                    <div className={styles.content_box}>
                      شماره کارت :{" "}
                      {order.billing && order.billing.gateway_details
                        ? order.billing.gateway_details.card_pan
                        : ""}
                    </div>

                    <div className={styles.content_box}>
                      نوع کارمزد :{" "}
                      {order.billing && order.billing.gateway_details
                        ? order.billing.gateway_details.fee_type
                        : ""}
                    </div>

                    <div className={styles.content_box}>
                      کارمزد :{" "}
                      {order.billing && order.billing.gateway_details
                        ? order.billing.gateway_details.shaparak_fee
                        : ""}{" "}
                      تومان
                    </div>
                  </div>
                ) : (
                  <div className={styles.content}>در انتظار پرداخت</div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.waiting_for_paying}>در انتظار پرداخت ...</div>
        )}

        {order.billing && order.billing.status === "done" ? (
          <div className={styles.fifth_section}>
            <div className={styles.section_title}>جزئیات مرسوله</div>

            <div className={styles.content}>
              <div className={styles.main_user_information}>
                <textarea
                  className={styles.user_address}
                  type="text"
                  placeholder="آدرس تحویل گیرنده"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
              </div>

              <div className={styles.order_details}>
                <input
                  type="text"
                  placeholder="تاریخ ارسال"
                  onChange={(e) => setPostedAt(e.target.value)}
                  value={postedAt}
                />

                <div>
                  <input
                    type="text"
                    placeholder="هزینه ارسال"
                    onChange={(e) => setShippingFee(e.target.value)}
                    value={shippingFee}
                  />

                  <span>تومان</span>
                </div>

                <input
                  type="text"
                  placeholder="کد رهگیری مرسوله"
                  onChange={(e) => setTrackingCode(e.target.value)}
                  value={trackingCode}
                />
              </div>

              <div className={styles.main_user_information}>
                <textarea
                  className={styles.user_address}
                  type="text"
                  placeholder="جزئیات اضافی ( اختیاری )"
                  onChange={(e) => setExtraDetails(e.target.value)}
                  value={extraDetails}
                />
              </div>

              <div className={styles.submit_btn} onClick={() => setShiping()}>
                ثبت تغییرات
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
