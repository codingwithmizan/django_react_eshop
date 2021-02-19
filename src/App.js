import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import About from "./views/About";
import Contact from "./views/Contact";
import ProductDetails from "./components/ProductDetails";
import Category from "./components/Category";
import NotFound from "./components/NotFound";
import Login from "./components/account/Login";
import Register from "./components/account/Register";
import Profile from "./components/account/Profile";
import { useGlobalState } from "./components/state/provider";
import { ADD_PROFILE } from "./components/state/types";

const App = () => {
  const [{ profile, reloadpage }, dispatch] = useGlobalState();
  const getToken = localStorage.getItem("token");

  useEffect(() => {
    if (getToken !== null) {
      const getData = () => {
        Axios({
          method: "get",
          url: "http://localhost:8000/api/profile/",
          headers: {
            Authorization: `token ${getToken}`,
          },
        })
          .then((res) => {
            console.log(res.data);
            let user = res.data.data;
            console.log(user + "user data");

            dispatch({
              type: ADD_PROFILE,
              payload: user,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      };
      getData();
    }
  }, [reloadpage]);

  return (
    <Router>
      <Navigation />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products/:id" component={ProductDetails} />
          <Route exact path="/products/categories/:id" component={Category} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />

          <Route exact path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
