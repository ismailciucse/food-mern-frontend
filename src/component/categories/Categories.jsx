import React from "react";
import PageHeader from "../common/header/title/PageHeader";
import CategoriesItem from "./CategoriesItem";
import "./categories.css";
// import Pagination from "./Pagination";

const Categories = () => {
  return (
    <>
      <PageHeader title="Our Categories" />
      <section className="categories">
        <div className="container grid-4">
          <CategoriesItem />
        </div>
        {/* <Pagination /> */}
      </section>
    </>
  );
};

export default Categories;
