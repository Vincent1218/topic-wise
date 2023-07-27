import { useFormik } from "formik";

export default function UploadFile({ setUploadedNew, userId }) {
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

      const data = await response.json();
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
        <div className="flex items-center justify-between">
          <button
            className="px-4 py-2 font-bold text-white bg-indigo-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
