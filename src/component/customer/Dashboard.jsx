import Cookies from "js-cookie";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../common/header/title/PageHeader";
import "./customer.css";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import Profile from "./Profile";

const Dashboard = () => {
  // GET ORDERS
  const [orders, setOrders] = useState([]);
  const customer_id = Cookies.get("customer");
  useEffect(() => {
    const fatchOrders = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/admin/orders`
      );
      const fatchCustomerOrders = data.filter((curData) => {
        return curData.customer_id === customer_id;
      });
      setOrders(fatchCustomerOrders);
    };
    fatchOrders();
  }, [orders]);

  // CANCEL ORDER
  const deleteHandler = (id) => {
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${process.env.REACT_APP_SERVER}/api/admin/orders/${id}`)
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Order deleted field!",
            });
          });
      }
    });
  };

  // ACCEPT ORDER
  const acceptHandler = (id) => {
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
    }).then((result) => {
      if (result.isConfirmed) {
        let updateData = {
          status: "Delivered",
        };
        axios
          .put(
            `${process.env.REACT_APP_SERVER}/api/admin/orders/${id}`,
            updateData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Order update field!",
            });
          });
      }
    });
  };

  if (!Cookies.get("customer")) {
    window.location.href = "/login";
  } else {
    return (
      <>
        <PageHeader title="Dashboard" />
        <section className="dashboard main-dashboard">
          <div className="container padding">
            <Profile />
            <div className="dashboard-content">
              <div className="order">
                <div className="order-items">
                  <table>
                    <tr>
                      <th>Order ID</th>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Total_price</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Order_Date</th>
                      <th>Accept_Time</th>
                      <th>Delivered_at</th>
                      <th>Action</th>
                    </tr>
                    {orders.length === 0 ? (
                      <tr>
                        <td className="text-center" colSpan="10">
                          No items found!
                        </td>
                      </tr>
                    ) : (
                      orders.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <Link to={"/customer/dashboard/" + item._id}>
                              {item.orderID}
                            </Link>
                          </td>
                          <td>{item.total_foods}</td>
                          <td>{item.total_quantity}</td>
                          <td>৳ {item.total_price}</td>
                          <td>{item.payment}</td>
                          <td>
                            <span
                              className={
                                (item.status === "Ordered" && "btn-order") ||
                                (item.status === "OnDelivery" &&
                                  "btn-on-delv") ||
                                (item.status === "Cancelled" && "btn-cncl") ||
                                (item.status === "Delivered" && "btn-delv")
                              }
                            >
                              {item.status}
                            </span>
                          </td>
                          <td>{moment(item.order_date).format("lll")}</td>
                          <td>
                            {item.delivered_at
                              ? moment(item.accept_time).format("lll")
                              : "NaN"}
                          </td>
                          <td>
                            {item.delivered_at === 0
                              ? "NaN"
                              : item.delivered_at + "Hr"}
                          </td>
                          <td>
                            {item.status === "OnDelivery" && (
                              <Link
                                onClick={() => acceptHandler(item._id)}
                                className="success-btn"
                              >
                                ACCEPT
                              </Link>
                            )}
                            {(item.status === "Delivered" ||
                              item.status === "Cancelled") && (
                              <Link className="success-btn disableLink">
                                ACCEPT
                              </Link>
                            )}
                            {item.status === "Ordered" && (
                              <Link
                                onClick={() => deleteHandler(item._id)}
                                className="danger-btn"
                              >
                                CANCEL
                              </Link>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default Dashboard;
