import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
export default function Signup() {
  const navigate = useNavigate();

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Sign up for an account
          </h2>
        </div>
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
            <Form className="mt-8">
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md ">
                <div>
                  <Field
                    aria-label="Email address"
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                    placeholder="Email address"
                  />
                </div>
                <div className="-mt-px">
                  <Field
                    aria-label="Password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                    placeholder="Password"
                  />
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm leading-5 text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm leading-5">
                    <a
                      href="#"
                      className="font-medium text-slate-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                    >
                      Already have an account?{" "}
                      <Link
                        className="text-indigo-500"
                        to="/login
                      "
                      >
                        Log in
                      </Link>{" "}
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9a7 7 0 1114 0 7 7 0 01-14 0zm7-6a6 6 0 100 12A6 6 0 0012 3zm.707 3.293a1 1 0 00-1.414 0L9 7.586 7.707 6.293a1 1 0 00-1.414 1.414L7.586 9l-1.293 1.293a1 1 0 101.414 1.414L9 10.414l1.293 1.293a1 1 0 001.414-1.414L10.414 9l1.293-1.293a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  Sign up
                </button>
              </div>
            </Form>
          )}
        </Formik>
        {/* <div>
          {serverRes !== "null" ? (
            JSON.stringify(serverRes)
          ) : (
            <p>User not logged in</p>
          )}
        </div> */}
        <ToastContainer />
      </div>
    </div>
  );
}
