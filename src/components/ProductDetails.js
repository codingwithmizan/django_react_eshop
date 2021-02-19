import { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import Product from "./Product";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [categoryProduct, setCategoryProduct] = useState(null);

  console.log(categoryProduct);
  useEffect(() => {
    const getProduct = async () => {
      Axios({
        method: "get",
        url: `api/products/${id}/`,
      })
        .then((res) => {
          setProduct(res.data);
          console.log(res.data.category);
          getCategoryProduct(res.data.category["id"]);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getProduct();
  }, [id]);

  const getCategoryProduct = (id) => {
    Axios({
      method: "get",
      url: `api/categories/${id}/`,
    }).then((res) => {
      setCategoryProduct(res.data);
    });
  };

  return (
    <div className="container">
      {product !== null && (
        <>
          <div className="row">
            <img src={product.image} alt="" className="w-100" />
            <div className="col-md-7">
              <h1>{product.title}</h1>
              <h2>Price: {product.market_price}</h2>
            </div>
            <div className="col-md-3">
              <p className="btn btn-success">Add to Cart</p>
            </div>
            <p>{product.description}</p>
          </div>
        </>
      )}

      <div className="row">
        <h1>Related Products</h1>
        {categoryProduct !== null &&
          categoryProduct.product_category.map((item) => (
            <div className="col-md-3 my-3" key={item.id}>
              <Product item={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductDetails;
