import React, { useEffect } from "react";
import PageHeader from "../common/header/title/PageHeader";
import FoodItem from "./FoodItem";
import "./food.css";
import Pagination from "./Pagination";
import { useState } from "react";
import axios from "axios";

const Food = () => {
  const [query, setQuery] = useState("");
  // GET FOODS
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    const fatchFoods = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/admin/foods?q=${query}`
      );
      setFoods(data);
    };
    fatchFoods();
  }, [query]);

  return (
    <>
      <PageHeader title="Our Food Menu" />
      <section className="food">
        <div className="container text-center">
          <div className="search-food-form">
            <input
              type="search"
              name="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for Food.."
              required
            />
          </div>
        </div>
        <div className="container grid-4">
          <FoodItem foods={foods} />
        </div>
        <Pagination />
      </section>
    </>
  );
};

export default Food;
