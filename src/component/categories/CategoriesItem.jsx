import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const CategoriesItem = () => {
  // GET CATEGORIES
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fatchCategories = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/admin/categories`
      );
      setCategories(data);
    };
    fatchCategories();
  }, [categories]);
  return (
    <>
      {categories.length === 0 ? (
        <h3 className="text-center">No items found!</h3>
      ) : (
        categories.map((item) => (
          <div className="items shadow">
            <Link to={"/category-food/" + item.title}>
              <div class="box-3 float-container">
                <div className="category-thumb text-center">
                  <img
                    src={
                      process.env.REACT_APP_SERVER + "/categories/" + item.thumb
                    }
                    alt={item.title}
                    class="img-responsive img-curve"
                  />
                </div>

                <div className="category-title text-center">
                  <h4 class="float-text text-white">{item.title}</h4>
                </div>
              </div>
            </Link>
          </div>
        ))
      )}
    </>
  );
};

export default CategoriesItem;
