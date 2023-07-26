import { useFormik } from "formik";

export default function UploadFile({ userId }) {
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
      console.log("Data received:", data);
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
    <div className="max-w-lg mx-auto my-10 p-6 bg-white rounded shadow-md">
      
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.errors.file && formik.touched.file && (
            <p className="text-red-500 text-xs italic">{formik.errors.file}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.errors.title && formik.touched.title && (
            <p className="text-red-500 text-xs italic">{formik.errors.title}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
