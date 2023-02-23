// Render Prop
import "./Auth.css";
import React from "react";
import { useFormik } from "formik";
import { SignUpSchema } from "../../schemas";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin, setUser } from "./authSlice";
import { auth } from "../../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuth = async (userInfo) => {
    const { first_name, last_name, email, password } = userInfo;
    console.log("user info", userInfo);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const updatedAuthUser = await updateProfile(auth.currentUser, {
        displayName: `${first_name}-${last_name}`,
      });

      console.log(updatedAuthUser);
    } catch (error) {
      console.log(error);
    }
    dispatch(setLogin(true));
    navigate("/");
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: SignUpSchema,
      onSubmit: (values, action) => {
        console.log(values);
        handleAuth(values);
        action.resetForm();
      },
    });
  console.log(errors);
  return (
    <>
      <div className="reg-container">
        <div className="reg-left">
          <h1 className="reg-title">Sing Up</h1>
          <p className="reg-desc">To Free Driving theory test.</p>
          <form onSubmit={handleSubmit}>
            <div className="input-block">
              <label htmlFor="name" className="input-label">
                First Name
              </label>
              <input
                type="first_name"
                autoComplete="off"
                name="first_name"
                id="first_name"
                placeholder="First Name"
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.first_name && touched.first_name ? (
                <p className="form-error">{errors.first_name}</p>
              ) : null}
            </div>
            <div className="input-block">
              <label htmlFor="name" className="input-label">
                Last Name
              </label>
              <input
                type="last_name"
                autoComplete="off"
                name="last_name"
                id="last_name"
                placeholder="Last Name"
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.last_name && touched.last_name ? (
                <p className="form-error">{errors.last_name}</p>
              ) : null}
            </div>
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
            <div className="input-block">
              <label htmlFor="confirm_password" className="input-label">
                Confirm Password
              </label>
              <input
                type="password"
                autoComplete="off"
                name="confirm_password"
                id="confirm_password"
                placeholder="Confirm Password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirm_password && touched.confirm_password ? (
                <p className="form-error">{errors.confirm_password}</p>
              ) : null}
            </div>
            <div className="reg-buttons">
              <Link href="#" className="">
                Want to register using Gmail?
              </Link>
              <button className="input-button" type="submit">
                Registration
              </button>
            </div>
          </form>
          <p className="sign-up">
            Already have an account? <Link to={"/login"}>Sign In now</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
