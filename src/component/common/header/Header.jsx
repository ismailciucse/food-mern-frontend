import "./header.css";
import { Link } from "react-router-dom";
import ShoppingCart from "./ShoppingCart";
import { useCart } from "react-use-cart";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Header = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  // CART DROPDOWN
  let cartRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!cartRef.current.contains(e.target)) {
        setOpenCart(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  // PROFILE DROPDOWN
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handler);
  });

  const { totalUniqueItems } = useCart();

  // GET CUSTOMER DETAILS
  const customer_id = Cookies.get("customer");
  const [customer, setCustomer] = useState({});
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/admin/customers/${customer_id}`
      );
      setCustomer(data);
    };
    fatchCustomer();
  }, [customer]);

  // GET DELIVERY MAN DETAILS
  const deliveryMan_id = Cookies.get("delivery-man");
  const [deliveryMan, setDeliveryMan] = useState({});
  useEffect(() => {
    const fatchDeliveryMan = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/admin/delivery-men/${deliveryMan_id}`
      );
      setDeliveryMan(data);
    };
    fatchDeliveryMan();
  }, [deliveryMan]);

  // CUSTOMER LOGOUT
  const customerLogout = () => {
    Cookies.remove("customer");
    Cookies.remove("customerName");
    window.location.href = "/";
  };

  // DELIVERY MAN LOGOUT
  const deliveryManLogout = () => {
    Cookies.remove("delivery-man");
    window.location.href = "/";
  };

  return (
    <>
      <header className="navbar">
        <nav id="site-top-nav" className="navbar-menu navbar-fixed-top">
          <div className="container">
            <div className="logo">
              <Link to="/" title="Logo">
                <img
                  src={process.env.REACT_APP_SERVER + "/default/logo.png"}
                  alt="Restaurant Logo"
                  className="img-responsive"
                />
              </Link>
            </div>
            <div id="menu" className="menu text-right">
              <ul>
                <li>
                  <Link className="hvr-underline-from-center" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="hvr-underline-from-center" to="/categories">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link className="hvr-underline-from-center" to="/foods">
                    Food
                  </Link>
                </li>
                <li>
                  <Link className="hvr-underline-from-center" to="/orders">
                    Order
                  </Link>
                </li>
                <li>
                  <Link className="hvr-underline-from-center" to="/blogs">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link className="hvr-underline-from-center" to="/contact">
                    Contact
                  </Link>
                </li>
                {!Cookies.get("customer") && (
                  <li>
                    <Link className="hvr-underline-from-center" to="/login">
                      Login
                    </Link>
                  </li>
                )}

                <li ref={cartRef}>
                  <Link
                    onClick={() => {
                      setOpenCart(!openCart);
                    }}
                    className="shopping-cart"
                  >
                    <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>{" "}
                    <span className="notify">{totalUniqueItems}</span>
                  </Link>
                  <div
                    className={`cart-content ${
                      openCart ? "active" : "inactive"
                    }`}
                  >
                    <h3 className="text-center">Shopping Cart</h3>
                    <ShoppingCart />
                  </div>
                </li>
                {Cookies.get("customer") && (
                  <li>
                    <Link
                      className="customer-profile-pic"
                      ref={menuRef}
                      onClick={() => {
                        setOpenProfile(!openProfile);
                      }}
                    >
                      <div className="img">
                        <Link>
                          <img
                            src={
                              process.env.REACT_APP_SERVER +
                              "/customers/" +
                              customer.thumb
                            }
                            alt="avatar"
                          />
                        </Link>
                      </div>
                    </Link>
                    <div
                      className={`customer-profile-content ${
                        openProfile ? "active" : "inactive"
                      }`}
                    >
                      <ul>
                        <li>
                          <Link to="/customer/dashboard">
                            <i
                              className="fa-solid fa-gauge"
                              aria-hidden="true"
                            ></i>{" "}
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={() => {
                              customerLogout();
                            }}
                          >
                            <i class="fa-solid fa-right-from-bracket"></i>{" "}
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                )}
                {Cookies.get("delivery-man") && (
                  <li>
                    <Link
                      ref={menuRef}
                      onClick={() => {
                        setOpenProfile(!openProfile);
                      }}
                      className="customer-profile-pic"
                    >
                      <div className="img">
                        <Link>
                          <img
                            src={
                              process.env.REACT_APP_SERVER +
                              "/delivery-men/" +
                              deliveryMan.thumb
                            }
                            alt="avatar"
                          />
                        </Link>
                      </div>
                    </Link>
                    <div
                      className={`customer-profile-content ${
                        openProfile ? "active" : "inactive"
                      }`}
                    >
                      <ul>
                        <li>
                          <Link to="/delivery-man/dashboard">
                            <i
                              className="fa-solid fa-gauge"
                              aria-hidden="true"
                            ></i>{" "}
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={() => {
                              deliveryManLogout();
                            }}
                          >
                            <i class="fa-solid fa-right-from-bracket"></i>{" "}
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                )}

                {/* <li>
                  <Link
                    className="customer-profile-pic"
                    ref={menuRef}
                    onClick={() => {
                      setOpenProfile(!openProfile);
                    }}
                  >
                    <div className="img">
                      <Link>
                        <img
                          src={"/customers/" + customer.thumb}
                          alt="avatar"
                        />
                      </Link>
                    </div>
                  </Link>
                  <div
                    // id="customer-profile-content"
                    className={`customer-profile-content ${
                      openProfile ? "active" : "inactive"
                    }`}
                  >
                    <ul>
                      <li>
                        <Link to="/customer/dashboard">
                          <i
                            className="fa-solid fa-gauge"
                            aria-hidden="true"
                          ></i>{" "}
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link to="/customer/profile">
                          <i className="fa fa-user" aria-hidden="true"></i>{" "}
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={() => {
                            customerLogout();
                          }}
                        >
                          <i class="fa-solid fa-right-from-bracket"></i> Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li> */}
              </ul>
            </div>
            <div className="mobile-menu">
              <span id="mobile-menu-bar" className="mobile-menu-bar">
                &#9776;
              </span>
              <div id="mobileNav" className="mobileNav menu">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/categories">Categories</Link>
                  </li>
                  <li>
                    <Link to="/foods">Food</Link>
                  </li>
                  <li>
                    <Link to="/orders">Order</Link>
                  </li>
                  <li>
                    <Link to="/blogs">Blog</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                  {!Cookies.get("customer") && (
                    <li>
                      <Link className="hvr-underline-from-center" to="/login">
                        Login
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link id="shopping-cart-mobile" className="shopping-cart">
                      <i
                        className="fa fa-cart-arrow-down"
                        aria-hidden="true"
                      ></i>{" "}
                      <span className="notify">(1)</span>
                    </Link>
                    <div
                      id="cart-content-mobile"
                      className="cart-content cart-content-2"
                    >
                      <h3 className="text-center">Shopping Cart</h3>
                      <ShoppingCart />
                    </div>
                  </li>
                  {Cookies.get("customer") && (
                    <li>
                      <Link
                        id="customer-profile-pic"
                        className="customer-profile-pic"
                      >
                        <div className="img">
                          <Link>
                            <img
                              src={"/customers/" + customer.thumb}
                              alt="avatar"
                            />
                          </Link>
                        </div>
                      </Link>
                      <div
                        id="customer-profile-content"
                        className="customer-profile-content"
                      >
                        <ul>
                          <li>
                            <Link to="/customer/dashboard">
                              <i
                                className="fa-solid fa-gauge"
                                aria-hidden="true"
                              ></i>{" "}
                              Dashboard
                            </Link>
                          </li>
                          <li>
                            <Link to="/customer/profile">
                              <i className="fa fa-user" aria-hidden="true"></i>{" "}
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link
                              onClick={() => {
                                customerLogout();
                              }}
                            >
                              <i class="fa-solid fa-right-from-bracket"></i>{" "}
                              Logout
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                  )}
                  {Cookies.get("delivery-man") && (
                    <li>
                      <Link
                        id="customer-profile-pic"
                        className="customer-profile-pic"
                      >
                        <div className="img">
                          <Link>
                            <img
                              src={"/delivery-men/" + deliveryMan.thumb}
                              alt="avatar"
                            />
                          </Link>
                        </div>
                      </Link>
                      <div
                        id="customer-profile-content"
                        className="customer-profile-content"
                      >
                        <ul>
                          <li>
                            <Link to="/delivery-man/dashboard">
                              <i
                                className="fa-solid fa-gauge"
                                aria-hidden="true"
                              ></i>{" "}
                              Dashboard
                            </Link>
                          </li>
                          <li>
                            <Link to="/delivery-man/profile">
                              <i className="fa fa-user" aria-hidden="true"></i>{" "}
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link
                              onClick={() => {
                                deliveryManLogout();
                              }}
                            >
                              <i class="fa-solid fa-right-from-bracket"></i>{" "}
                              Logout
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="clearfix"></div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
