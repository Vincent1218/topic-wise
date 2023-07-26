import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [serverRes, setServerRes] = useState(" ");
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  async function signup(email, password) {
    const userData = { email, password };
    // console.log("sending user data", userData);
    try {
      const response = await fetch("http://localhost:8082/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });
      // console.log(response)

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
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h1>Login </h1>
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
      <p>
        If you don&apos;t have an account already{" "}
        <Link to="/signup">Sign up</Link>
      </p>
      <div>
        {serverRes !== " " ? (
          JSON.stringify(serverRes)
        ) : (
          <p>User not logged in</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
