import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
export default function Signup() {
  const [serverRes, setServerRes] = useState("null");
  async function signup(email, password) {
    const userData = { email, password };
    console.log("sending user data", userData);
    const response = await fetch("http://localhost:8082/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers":
          "Content-Type, Access-Control-Allow-Headers, X-Requested-With, Authorization",
      },
      body: JSON.stringify(userData),
    });
    console.log("response", response);
    const data = await response.json();
    console.log("data received", data);
    setServerRes(data);
  }
  return (
    <div>
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
    </div>
  );
}
