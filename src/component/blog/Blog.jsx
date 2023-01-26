import React from "react";
import PageHeader from "../common/header/title/PageHeader";
import "./blog.css";
import BlogItem from "./BlogItem";
// import Pagination from "./Pagination";

const Blog = () => {
  return (
    <>
      <PageHeader title="Our Blog" />
      <section className="blog">
        <div className="container grid-3">
          <BlogItem />
        </div>
        {/* <Pagination /> */}
      </section>
    </>
  );
};

export default Blog;
