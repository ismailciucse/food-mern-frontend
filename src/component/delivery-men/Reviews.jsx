import Cookies from "js-cookie";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import PageHeader from "../common/header/title/PageHeader";
import "../customer/customer.css";
import axios from "axios";
import moment from "moment";
import Profile from "./Profile";
import Rating from "../common/rating/Rating";

const Reviews = () => {
  // GET DELIVERY MAN DETAILS
  const id = Cookies.get("delivery-man");
  const [deliveryMan, setDeliveryMan] = useState({});
  const [deliveryManReviews, setDeliveryManReviews] = useState([]);
  useEffect(() => {
    const fatchDeliveryMan = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/admin/delivery-men/${id}`
      );
      setDeliveryMan(data);
      setDeliveryManReviews(data.reviews);
    };
    fatchDeliveryMan();
  }, [deliveryMan]);

  if (!Cookies.get("delivery-man")) {
    window.location.href = "/delivery-man";
  } else {
    return (
      <>
        <PageHeader title="Reviews" />
        <section className="dashboard">
          <div className="container padding">
            <Profile />
            <div className="dashboard-content">
              <div className="grid-4">
                {deliveryManReviews.length === 0 ? (
                  <div className="review-item">
                    <p>No feedback has been given yet.</p>
                  </div>
                ) : (
                  deliveryManReviews
                    .slice(0, 12)
                    .reverse()
                    .map((item, index) => (
                      <div key={index} className="review-item">
                        <div className="grid-2">
                          <p className="name bold">{item.name}</p>
                          <Rating rating={item.rating} />
                        </div>
                        <p className="date">
                          {item.date && moment(item.date).format("lll")}
                        </p>
                        <p className="content">{item.comment}</p>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default Reviews;
