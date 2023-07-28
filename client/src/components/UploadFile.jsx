import { useFormik } from "formik";
import { useState } from "react";
export default function UploadFile({ setUploadedNew, userId }) {
  const [created, setCreated] = useState(false);
  const [analysed, setAnalysed] = useState(false);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      file: "",
      content: "",
      title: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.file) {
        errors.file = "Required";
      }
      if (!values.title) {
        errors.title = "Required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      console.log("values", values);
      const response = await fetch("http://localhost:8082/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          post: {
            title: values.title,
            content: values.content,
          },
        }),
      });
      setCreated(true);
      const data = await response.json();
      console.log("data", data);
      const { postId } = data; // Once the post is created, then call your classification API
      const classifyResponse = await fetch(
        "http://localhost:8082/api/classify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            postId: postId,
            content: values.content,
          }),
        }
      );

      // const classifyData = await classifyResponse.json();
      setAnalysed(true);
      setLoading(false);
      setAnalysed(false);
      setCreated(false);
      setUploadedNew(true);
    },
  });

  const handleFileChange = (event) => {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.currentTarget.files[0];

    reader.onloadend = () => {
      formik.setFieldValue("file", file);
      formik.setFieldValue("content", reader.result);
    };

    if (file) {
      reader.readAsText(file);
    } else {
      formik.setFieldValue("file", null);
      formik.setFieldValue("content", null);
    }
  };

  return (
    <div className="max-w-lg h-min p-6 mx-auto my-10 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Upload Your Essay</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="file"
          >
            File
          </label>
          <input
            id="file"
            name="file"
            type="file"
            accept=".txt"
            onChange={handleFileChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
          {formik.errors.file && formik.touched.file && (
            <p className="text-xs italic text-red-500">{formik.errors.file}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            onChange={formik.handleChange}
            value={formik.values.title}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
          {formik.errors.title && formik.touched.title && (
            <p className="text-xs italic text-red-500">{formik.errors.title}</p>
          )}
        </div>
        <div className="flex items-center align-middle">
          {loading ? (
            <ul className="max-w-md space-y-2 text-gray-500 list-inside dark:text-gray-400">
              <li className="flex items-center">
                {!created ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <svg
                    className="w-4 h-4 mr-2 text-green-500 dark:text-green-400 flex-shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                )}
                Uploading file{" "}
              </li>
              <li className="flex items-center">
                {!analysed ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <svg
                    className="w-4 h-4 mr-2 text-green-500 dark:text-green-400 flex-shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                )}
                Analyzing Text{" "}
              </li>
            </ul>
          ) : (
            <button
              className="w-full px-4 py-2 font-bold text-white bg-indigo-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
