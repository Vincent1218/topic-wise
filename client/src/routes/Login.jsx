import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Login() {
  const [serverRes, setServerRes] = useState(" ");
  async function signup(email, password) {
    const userData = { email, password };
    console.log("sending user data", userData);
    const response = await fetch("http://localhost:8082/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers":
          "Content-Type, Access-Control-Allow-Headers, X-Requested-With, Authorization",
      },
      body: JSON.stringify(userData),
    });
    // console.log(response)

    const data = await response.json()
    if (!response.ok) {
      setServerRes(data.message);
      return;
    }
    console.log("data received", data);
    setServerRes(`User with id:${data._id} is logged in`);
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
      <div>{serverRes !== " " ? JSON.stringify(serverRes) : <p>User not logged in</p>}</div>
    </div>
  );
}
