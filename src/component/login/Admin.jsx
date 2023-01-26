import React from "react";
import { useState } from "react";
import PageHeader from "../common/header/title/PageHeader";
import "./login.css";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      email,
      password,
    };
    axios
      .post(`${process.env.REACT_APP_SERVER}/api/admin/adminlogin`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.message === "Email doesn't exist.") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email doesn't exist.",
          });
        } else if (response.data.message === "Password doesn't match.") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Password doesn't match.",
          });
        } else {
          // Set Cookies
          Cookies.set("admin", response.data.admin._id, { expires: 30 });
          Swal.fire({
            icon: "success",
            text: response.data.message,
            showConfirmButton: false,
            timer: 500,
          });
          window.location.href = `${process.env.REACT_APP_DASHBOARD}/dashboard`;
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
      <PageHeader title="Admin Login" />
      <section className="login">
        <div className="container">
          <div className="login-form text-center">
            {Cookies.get("admin") ? (
              <div>
                <h3>You are already logged in.</h3>
                <a
                  href={process.env.REACT_APP_DASHBOARD + "/dashboard"}
                  className="btn-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Dashboard
                </a>
              </div>
            ) : (
              <div>
                <form onSubmit={submitHandler}>
                  <img
                    src={process.env.REACT_APP_SERVER + "/default/avatar.png"}
                    alt=""
                  />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email..."
                    required
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password..."
                    required
                  />
                  <input
                    type="submit"
                    name="submit"
                    value="Login"
                    class="btn-primary"
                  />
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Admin;
