import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Product from "./Product";

const Home = () => {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getProducts = () => {
      Axios({
        method: "get",
        url: "api/products/",
      }).then((res) => {
        setProducts(res.data);
      });
    };

    getProducts();
  }, []);
  useEffect(() => {
    const getCategory = () => {
      Axios({
        method: "get",
        url: "api/categories/",
      }).then((res) => {
        setCategories(res.data);
      });
    };

    getCategory();
  }, []);

  const nextpage = async () => {
    Axios({
      method: "get",
      url: products?.next,
    }).then((res) => {
      setProducts(res.data);
    });
  };
  const previouspage = async () => {
    Axios({
      method: "get",
      url: products?.previous,
    }).then((res) => {
      setProducts(res.data);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 mt-3">
          <h1>All Categoris</h1>
          {categories.map((category) => (
            <div className="p-2 m-2" key={category.id}>
              <Link
                to={`/products/categories/${category.id}`}
                className="btn btn-success"
              >
                {category.title}
              </Link>
            </div>
          ))}
        </div>
        <div className="col-md-9">
          <div className="row">
            {products !== null ? (
              <>
                {products?.results.map((item, i) => (
                  <div key={i} className="col-md-4 my-3">
                    <Product item={item} />
                  </div>
                ))}
              </>
            ) : (
              <>
                <h1>Loding...</h1>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-2 offset-md-3">
          {products?.previous !== null ? (
            <button className="btn btn-primary" onClick={previouspage}>
              Previous
            </button>
          ) : (
            <button className="btn btn-primary" disabled>
              Previous
            </button>
          )}
        </div>
        <div className="col-md-1 offset-md-6">
          {products?.next !== null ? (
            <button className="btn btn-primary" onClick={nextpage}>
              Next
            </button>
          ) : (
            <button className="btn btn-primary" disabled>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
