import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import Swal from "sweetalert2";
import Rating from "../common/rating/Rating";

const FoodItem = ({ foods }) => {
  // ADD-TO-CART
  const { addItem } = useCart();
  const addItemHandlar = (item, id) => {
    item.id = id;
    addItem(item);
    Swal.fire({
      icon: "success",
      text: item.title + " Added.",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  return (
    <>
      {foods.length === 0 ? (
        <h3 className="text-center">No items found!</h3>
      ) : (
        foods.slice(0, 12).map((item, index) => (
          <div key={index} className="items shadow">
            <div className="img">
              <img
                src={process.env.REACT_APP_SERVER + "/foods/" + item.thumb}
                alt="Pizza"
                className="img-responsive img-curve"
              />
            </div>
            <div className="text text-center">
              <h4>
                <Link to={"/foods/" + item._id}>{item.title}</Link>
              </h4>
              <h5>
                <Rating rating={item.rating} />
                <span>({item.totalReviews})</span>
              </h5>
              <p>{item.description.slice(0, 50)}...</p>
              <h5>৳ {item.price}</h5>
              <div className="flexSB">
                <Link to={"/foods/" + item._id} className="btn-primary">
                  <i className="fas fa-eye"></i> View Detail
                </Link>
                {item.active === "on" ? (
                  <Link
                    className="btn-primary"
                    onClick={() => {
                      addItemHandlar(item, item._id);
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
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default FoodItem;
