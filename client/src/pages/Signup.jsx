import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
export default function Signup() {
  const navigate = useNavigate();
  const [serverRes, setServerRes] = useState("null");
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  async function signup(email, password) {
    const userData = { email, password };
    // console.log("sending user data", userData);
    try {
      const response = await fetch("http://localhost:8082/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers":
            "Content-Type, Access-Control-Allow-Headers, X-Requested-With, Authorization",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <h1>Sign up</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          signup(values.email, values.password);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <div>{JSON.stringify(serverRes)}</div>
      <ToastContainer />
    </div>
  );
}
