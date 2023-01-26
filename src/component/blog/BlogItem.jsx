import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const BlogItem = () => {
  // GET BLOGS
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fatchBlogs = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/admin/blogs`
      );
      setBlogs(data);
    };
    fatchBlogs();
  }, [blogs]);

  return (
    <>
      {blogs.length === 0 ? (
        <h3 className="text-center">No items found!</h3>
      ) : (
        blogs.map((item) => (
          <div className="items shadow">
            <div className="img">
              <img
                src={process.env.REACT_APP_SERVER + "/blogs/" + item.thumb}
                alt=""
              />
            </div>
            <div className="text">
              <div className="admin flexSB">
                <span>
                  <i className="fa fa-user"></i>
                  <label htmlFor="">{item.post_by}</label>
                </span>
                <span>
                  <i className="fa fa-calendar-alt"></i>
                  <label htmlFor="">{moment(item.date).format("lll")}</label>
                </span>
              </div>
              <Link to={"/blogs/" + item._id} className="blog-title">
                <h1>{item.title.slice(0, 60)}...</h1>
              </Link>
              <p>
                {item.description.slice(0, 100)}...{" "}
                <Link to={"/blogs/" + item._id} class="success-btn">
                  <i className="fas fa-eye"></i> Read More
                </Link>
              </p>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default BlogItem;
