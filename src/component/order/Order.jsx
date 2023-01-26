import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../common/header/title/PageHeader";
import "./order.css";
import { useCart } from "react-use-cart";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import axios from "axios";
import { v4 as uuid } from "uuid";

function Order() {
  // ADD TO CART
  const {
    isEmpty,
    cartTotal,
    totalItems,
    items,
    totalUniqueItems,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();
  const claerCart = () => {
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        emptyCart();
      }
    });
  };

  // PLACE ORDER
  const orderID = uuid().slice(0, 8);
  const customer_id = Cookies.get("customer");
  const customer_name = Cookies.get("customerName");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");

  // GET CUSTOMER DETAILS
  const id = Cookies.get("customer");
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/admin/customers/${id}`
      );
      setPhone(data.phone);
      setEmail(data.email);
      setAddress(data.address);
    };
    fatchCustomer();
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!isEmpty) {
      if (customer_id) {
        let data = {
          orderID,
          customer_id,
          customer_name,
          items,
          email,
          phone,
          address,
          payment,
          total_foods: totalUniqueItems,
          total_quantity: totalItems,
          deliveryCost: 80,
          total_price: cartTotal + 80,
        };
        axios
          .post(`${process.env.REACT_APP_SERVER}/api/admin/orders`, data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            Swal.fire({
              icon: "success",
              text: response.data.message,
              showConfirmButton: false,
              timer: 500,
            });
            emptyCart();
            window.location.href = "/customer/dashboard";
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something wrong.",
            });
          });
      } else {
        window.location.href = "/login";
      }
    } else {
      Swal.fire({
        icon: "error",
        text: "Please, select any food.",
      });
    }
  };

  return (
    <>
      <PageHeader title="Order" />
      <section className="order">
        <div className="container">
          <div className="order-items">
            <table>
              <tr>
                <th>Food</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
              {isEmpty ? (
                <tr>
                  <td colSpan="6">
                    Your Cart is Empty.{" "}
                    <Link to="/foods/" className="btn-primary danger-btn">
                      Brows Foods
                    </Link>
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr>
                    <td>
                      <Link to={"/foods/" + item._id}>
                        <img
                          src={
                            process.env.REACT_APP_SERVER +
                            "/foods/" +
                            item.thumb
                          }
                          alt=""
                        />
                      </Link>
                    </td>
                    <td>
                      <Link to={"/foods/" + item._id}>{item.title}</Link>
                    </td>
                    <td>৳ {item.price}</td>
                    <td>
                      <button
                        className="btn-primary"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>{" "}
                      <span className="item-qty">{item.quantity}</span>{" "}
                      <button
                        className="btn-primary"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </td>
                    <td>৳ {item.itemTotal}</td>
                    <td>
                      <Link
                        onClick={() => removeItem(item.id)}
                        class="danger-btn"
                      >
                        Remove
                      </Link>
                    </td>
                  </tr>
                ))
              )}
              {!isEmpty && (
                <>
                  <tr className="bold">
                    <td></td>
                    <td></td>
                    <td>Sub-Total</td>
                    <td>{totalItems}</td>
                    <td>৳ {cartTotal}</td>
                    <td>
                      <Link className="btn-danger" onClick={() => claerCart()}>
                        Clear All
                      </Link>
                    </td>
                  </tr>
                  <tr className="bold">
                    <td colSpan="2">Delivery Cost</td>
                    <td>{isEmpty ? "৳ 0" : "৳ 80"}</td>
                    <td>Total Cost</td>
                    <td>৳ {cartTotal ? cartTotal + 80 : 0}</td>
                    <td></td>
                  </tr>
                </>
              )}
            </table>
          </div>
          <div className="">
            <form className="order-form" onSubmit={submitHandler}>
              <fieldset>
                <legend>Delivery Details</legend>
                <div className="order-label">Phone Number</div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone..."
                  required
                />
                <div className="order-label">Email</div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  required
                />
                <div class="order-label">Address</div>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address..."
                  required
                />
                <div className="order-label">Payment Method</div>
                <input
                  type="radio"
                  name="payment"
                  value="Credit Card"
                  onChange={(e) => setPayment(e.target.value)}
                  required
                />{" "}
                Credit Card <br />
                <input
                  type="radio"
                  name="payment"
                  value="Bank Transfer"
                  onChange={(e) => setPayment(e.target.value)}
                  required
                />{" "}
                Bank Transfer <br />
                <input
                  type="radio"
                  name="payment"
                  value="Cash On Delivery"
                  onChange={(e) => setPayment(e.target.value)}
                  required
                />{" "}
                Cash On Delivery <br />
                <input
                  type="submit"
                  name="submit"
                  value="Confirm Order"
                  className="btn-primary"
                />
              </fieldset>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Order;
