import Cookies from "js-cookie";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../common/header/title/PageHeader";
import "../customer/customer.css";
import axios from "axios";
import moment from "moment";
import Profile from "./Profile";

const Dashboard = () => {
  // GET ORDERS
  const [orders, setOrders] = useState([]);
  const delivery_man_id = Cookies.get("delivery-man");
  useEffect(() => {
    const fatchOrders = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/admin/orders`
      );
      const fatchDeliveryManOrders = data.filter((curData) => {
        return curData.delivery_man_id === delivery_man_id;
      });
      setOrders(fatchDeliveryManOrders);
    };
    fatchOrders();
  }, [orders]);

  if (!Cookies.get("delivery-man")) {
    window.location.href = "/delivery-man";
  } else {
    return (
      <>
        <PageHeader title="Dashboard" />
        <section className="dashboard">
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
                            <Link to={"/delivery-man/dashboard/" + item._id}>
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
                            {item.accept_time &&
                              moment(item.accept_time).format("lll")}
                          </td>
                          <td>
                            {item.delivered_at === 0
                              ? "NaN"
                              : item.delivered_at + "hr"}
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
