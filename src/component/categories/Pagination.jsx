import React from "react";
import { Link } from "react-router-dom";

const Pagination = () => {
  return (
    <>
      <div className="pagination container text-center">
        <ul>
          <li>
            <Link to="" className="btn-primary active">
              1
            </Link>
          </li>
          <li>
            <Link to="" className="btn-primary">
              2
            </Link>
          </li>
          <li>
            <Link to="" className="btn-primary">
              3
            </Link>
          </li>
          <li>
            <Link to="" className="btn-primary">
              4
            </Link>
          </li>
          <li>
            <Link to="" className="btn-primary">
              5
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Pagination;
