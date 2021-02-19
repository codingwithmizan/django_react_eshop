import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Product from "./Product";

const Category = () => {
  const { id } = useParams();
  const [productByCategory, setProductByCategory] = useState(null);
  console.log(productByCategory);

  useEffect(() => {
    const getAllProductByCategory = () => {
      Axios({
        method: "get",
        url: `api/categories/${id}/`,
      })
        .then((res) => {
          setProductByCategory(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAllProductByCategory();
  }, [id]);
  return (
    <div className="row">
      <div className="col-md-12">
        <h2>Category: {productByCategory?.title}</h2>
      </div>
      {productByCategory?.product_category.map((item) => (
        <div className="col-md-3 my-3" key={item.id}>
          <Product item={item} />
        </div>
      ))}
    </div>
  );
};

export default Category;
