import { useForm } from "react-hook-form";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});
const Login = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    axios
      .post("api/login/", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        alert("Incorrect username or password");
      });
  };
  return (
    <div className="row mx-auto mt-5">
      <div className="col-md-4 mx-auto">
        <h2 className="text-success text-center">User Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              ref={register}
              className="form-control form-control-sm"
            />
            {errors.username && (
              <p className="text-danger">{errors.username.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              ref={register}
              className="form-control form-control-sm"
            />
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}
          </div>
          <div>
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
