import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Redirect } from "react-router-dom";
import axios from "axios";

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(6).max(15),
  password2: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "password does not match"),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
});

const Register = () => {
  const [redirect, setRedirect] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios.post("account/register/", data).then((res) => {
      setRedirect(true);
    });
  };
  if (redirect) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="row mx-auto mt-5">
      <div className="col-md-4 mx-auto">
        <h2 className="text-success text-center"> User Register</h2>
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              ref={register}
              className="form-control form-control-sm"
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
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
          <div className="mb-3">
            <label htmlFor="password2">Confirmed Password</label>
            <input
              type="password"
              name="password2"
              ref={register}
              className="form-control form-control-sm"
            />
            {errors.password2 && (
              <p className="text-danger">{errors.password2.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="username">First Name</label>
            <input
              type="text"
              name="first_name"
              ref={register}
              className="form-control form-control-sm"
            />
            {errors.first_name && (
              <p className="text-danger">{errors.first_name.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="last_name">List Name</label>
            <input
              type="text"
              name="last_name"
              ref={register}
              className="form-control form-control-sm"
            />
            {errors.last_name && (
              <p className="text-danger">{errors.last_name.message}</p>
            )}
          </div>

          <div>
            <button type="submit" className="btn btn-success">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
