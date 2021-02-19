import { Link } from "react-router-dom";
const Product = ({ item }) => {
  return (
    <div className="card" style={{ height: "40%" }}>
      <Link to={`/products/${item.id}/`}>
        <img className="card-img-top" src={item.image} alt="card top" />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-subtitle mb-3">
          {item.excerpt}
          <Link to={`/products/${item.id}/`}> Read more</Link>
        </p>
        <Link className="btn btn-primary" to="/">
          Add to Card
        </Link>
      </div>
      <div className="card-footer">
        <h5>Price: {item.market_price}$</h5>
      </div>
    </div>
  );
};

export default Product;
