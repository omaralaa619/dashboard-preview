"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "../UI/Card";
import classes from "./OrderDetails.module.css";
import Modal from "../UI/Modal";
import EditModal from "./EditModal";
import Price from "@/components/user/UI/Price";

const OrderDetails = ({ id }) => {
  const router = useRouter();

  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fulfillModal, setfulfillModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // const deliverModalOpen = () => {
  //   setModalOpen(true);
  //   setModalType("deliver");
  // };
  const fetchOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: "GET",
      });

      if (response) {
        const data = await response.json();

        setOrder(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fulfillHandler = async () => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    fetchOrder();
    setfulfillModal(false);
  };

  const deleteHandler = async () => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      console.log(response);

      router.push("/dashboard/orders");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const address = order.address;
  let statusText = "Fulfilled";
  order.status ? (statusText = "Fulfilled") : (statusText = "Unfulfilled");

  return (
    <>
      {loading && <h1>Loading...</h1>}

      {!loading && (
        <EditModal
          fetchOrder={fetchOrder}
          closeHandler={() => setEditModalOpen(false)}
          deliveryInfo={order.address}
          id={id}
          open={editModalOpen}
        />
      )}

      <Modal
        title={"Fulfill selected order"}
        subtitle={"Are you sure you want to fulfill selected order?"}
        closeHandler={() => setfulfillModal(false)}
        ctaStyle={classes.fulfillButton}
        ctaTitle={"Fulfill"}
        action={fulfillHandler}
        loading={loading}
        open={fulfillModal}
      />

      <Modal
        title={"Delete selected orders"}
        subtitle={
          "Are you sure you want to delete selected orders? This action cannot be undone"
        }
        closeHandler={() => setDeleteModal(false)}
        ctaStyle={classes.deleteButton}
        ctaTitle={"Delete"}
        action={deleteHandler}
        open={deleteModal}
        loading={loading}
      />

      {!loading && (
        <div>
          <div
            className={classes.titleContainer}
            onClick={() => console.log(order)}
          >
            <p className={classes.title}>
              Order #{order._id.substr(order._id.length - 5)}
            </p>
            <div className={classes.statusContainer}>
              <div
                className={`${classes.status} ${
                  order.status ? "" : classes.unfulfilled
                }`}
              ></div>
              <p>{statusText}</p>
            </div>
          </div>

          <p className={classes.date}>
            Placed on{" "}
            {new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
            }).format(new Date(order.date))}
          </p>

          <div className={classes.buttons}>
            <button onClick={() => setfulfillModal(true)}>Fulfill</button>
            <button onClick={() => setDeleteModal(true)}>Delete</button>
          </div>
          <div className={classes.main}>
            <Card className={classes.left}>
              <div className={classes.items}>
                {JSON.parse(order.cart.items).map((item) => (
                  <div key={item.id} className={classes.item}>
                    <img src={item.image} alt="" className={classes.image} />
                    <div className={classes.nameSize}>
                      <p>{item.title}</p>

                      <p className={classes.size}>{item.size}</p>

                      <p>x {item.quantity}</p>
                    </div>

                    <p>
                      <Price number={item.price} />
                    </p>
                  </div>
                ))}
              </div>

              <div className={classes.totals}>
                <div className={classes.numbers}>
                  <p>Subtotal:</p>
                  <p className={classes.bold}>
                    <Price number={order.cart.totalAmount} />
                  </p>
                </div>

                <div className={classes.numbers}>
                  <p>Shipping:</p>
                  <p className={classes.bold}>
                    <Price number={order.cart.shipping} />
                  </p>
                </div>

                {order.discount && (
                  <div className={classes.numbers}>
                    <p>
                      Disocunt: <br />{" "}
                      <span className="text-xs"> ({order.discount.title})</span>
                    </p>
                    <p className={classes.bold}>
                      {order.discount.type == "shipping" ? (
                        "Free Shipping"
                      ) : (
                        <Price number={order.discount.amount} />
                      )}
                    </p>
                  </div>
                )}

                <div className={classes.numbers} style={{ fontSize: 24 }}>
                  <p>Total: </p>
                  <p className={classes.bold}>
                    {!order.discount && (
                      <Price
                        number={order.cart.totalAmount + order.cart.shipping}
                      />
                    )}
                    {order.discount?.type == "offOrder" && (
                      <Price
                        number={
                          order.cart.totalAmount +
                          order.cart.shipping -
                          order.discount.amount
                        }
                      />
                    )}
                    {order.discount?.type == "shipping" && (
                      <Price number={order.cart.totalAmount} />
                    )}
                  </p>
                </div>
              </div>
            </Card>

            <Card className={classes.right}>
              <div className={classes.container}>
                <div className={classes.labelContainer}>
                  <p>Customer</p>
                  <p
                    className={classes.link}
                    onClick={() => setEditModalOpen(true)}
                  >
                    Edit
                  </p>
                </div>
                <p>{order.address.name}</p>
              </div>

              <div className={classes.container}>
                <div className={classes.labelContainer}>
                  <p>Contact Info</p>
                  <p
                    className={classes.link}
                    onClick={() => setEditModalOpen(true)}
                  >
                    Edit
                  </p>
                </div>
                <p>{order.address.email}</p>
                <p>{order.address.number}</p>
                <p>{order.address.instagram}</p>
              </div>

              <div className={classes.container}>
                <div className={classes.labelContainer}>
                  <p>Shipping Adress</p>
                  <p
                    className={classes.link}
                    onClick={() => setEditModalOpen(true)}
                  >
                    Edit
                  </p>
                </div>
                <p>
                  apartment {address.apartment}, floor{address.floor}, building{" "}
                  {address.building}, {address.streetName}, {address.zone},
                  {address.city}
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
