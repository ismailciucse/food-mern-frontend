import React, { useEffect, useState } from "react";
import PageHeader from "../common/header/title/PageHeader";
import "./food.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "react-use-cart";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import Rating from "../common/rating/Rating";
import moment from "moment";

const SingleFood = () => {
  // GET SINGLE FOOD
  const { id } = useParams();
  const [food, setFood] = useState({});
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fatchFood = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/admin/foods/${id}`
      );
      setFood(data);
      setReviews(data.reviews);
    };
    fatchFood();
  }, [food]);

  // ADD-TO-CART
  const { addItem } = useCart();
  const addItemHandlar = (item, id) => {
    item.id = id;
    addItem(item);
    Swal.fire({
      icon: "success",
      title: item.title + " Added.",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  // Review Submit
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const customer_id = Cookies.get("customer");
  const name = Cookies.get("customerName");
  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      name,
      rating,
      comment,
      customer_id,
    };
    axios
      .post(`/api/admin/foods/${id}/review`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.message === "Successfully reviewed.") {
          Swal.fire({
            icon: "success",
            text: response.data.message,
            showConfirmButton: false,
            timer: 1000,
          });
          setRating("");
          setComment("");
        } else {
          Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: response.data.message,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something wrong.",
        });
      });
  };

  return (
    <>
      <PageHeader title={food.title} />
      <section className="food single-food">
        <div className="container">
          <div className="single-food-item grid-2">
            <div className="left">
              <img
                src={process.env.REACT_APP_SERVER + "/foods/" + food.thumb}
                alt={food.title}
              />
            </div>
            <div className="right">
              <h3>{food.title}</h3>
              <p>{food.description}</p>
              <div className="single-order-form">
                <ul>
                  <li>
                    <span>Price</span>
                    <h4>৳ {food.price}</h4>
                  </li>
                  <li>
                    <span>Category</span>
                    <h4>{food.category}</h4>
                  </li>

                  <li>
                    <span>Reviews</span>
                    <h4>
                      <Rating rating={food.rating} />
                      <span>({food.totalReviews})</span>
                    </h4>
                  </li>

                  <li>
                    <span>Status</span>
                    <h4>
                      {food.active === "on" ? "Available" : "Unavailable"}
                    </h4>
                  </li>

                  <li>
                    {food.active === "on" ? (
                      <Link
                        className="btn-primary"
                        onClick={() => {
                          addItemHandlar(food, food._id);
                        }}
                      >
                        <i className="fas fa-shopping-cart"></i> Add To Cart
                      </Link>
                    ) : (
                      <Link
                        className="btn-primary disableLink"
                        title="Diactive Food"
                      >
                        <i className="fas fa-shopping-cart"></i> Add To Cart
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="single-food-item grid-2">
            <div className="left all-review">
              <h4>REVIEWS</h4>
              <div className="grid-2">
                {reviews.length === 0 ? (
                  <div className="review-item">
                    <p>No feedback has been given yet.</p>
                  </div>
                ) : (
                  reviews
                    .slice(0, 10)
                    .reverse()
                    .map((item, index) => (
                      <div key={index} className="review-item">
                        <div className="grid-2">
                          <h5 className="name bold">{item.name}</h5>
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
            <div className="right">
              <h4>WRITE A FOOD REVIEW</h4>
              {Cookies.get("customer") ? (
                <form onSubmit={submitHandler}>
                  <p>Rating</p>
                  <select
                    name="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                  <p>Comment</p>
                  <textarea
                    rows="2"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    required
                  ></textarea>
                  <button className="btn-primary">Submit</button>
                </form>
              ) : (
                <div className="review-item">
                  <p>
                    Please, <Link to="/login">Login</Link> for give a review.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleFood;
