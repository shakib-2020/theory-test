// Render Prop
import "./Auth.css";
import React from "react";
import { useFormik } from "formik";
import { SignInSchema } from "../../schemas";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setLogin, setUser } from "./authSlice";
const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (userInfo) => {
    const { email, password } = userInfo;
    const userCradential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    dispatch(setLogin(true));
    navigate("/");
  };

  // formik
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: SignInSchema,
      onSubmit: (values, action) => {
        handleLogin(values);
        console.log(values);
        action.resetForm();
      },
    });
  console.log(errors);
  return (
    <>
      <div className="reg-container">
        <div className="reg-left">
          <h1 className="reg-title">Sign In</h1>
          <p className="reg-desc">To Free Driving theory test.</p>
          <form onSubmit={handleSubmit}>
            <div className="input-block">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input
                type="email"
                autoComplete="off"
                name="email"
                id="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <p className="form-error">{errors.email}</p>
              ) : null}
            </div>
            <div className="input-block">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                type="password"
                autoComplete="off"
                name="password"
                id="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <p className="form-error">{errors.password}</p>
              ) : null}
            </div>
            <div className="reg-buttons">
              <Link href="#" className="">
                Want to sing in using Gmail?
              </Link>
              <button className="input-button" type="submit">
                LogIn
              </button>
            </div>
          </form>
          <p className="sign-up">
            Don not have an account? <Link to={"/register"}>Sign Up now</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
