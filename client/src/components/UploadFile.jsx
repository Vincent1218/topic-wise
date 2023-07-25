import { useState } from "react";
import { Formik, Field, Form } from "formik";
export default function UploadFile({ userId }) {
  const handleFileChange = (setFieldValue, event) => {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.currentTarget.files[0];

    reader.onloadend = () => {
      setFieldValue("file", file);
      setFieldValue("content", reader.result);
    };

    if (file) {
      reader.readAsText(file);
    } else {
      setFieldValue("file", null);
      setFieldValue("content", null);
    }
  };

  const handleSubmit = async (values) => {
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
    console.log("data received", data);
  };

  return (
    <div>
      <Formik
        initialValues={{
          file: null,
          content: "",
          title: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.file) {
            errors.file = "Required";
          } else if (!values.title) {
            errors.title = "Required";
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <Field
              name="file"
              type="file"
              accept=".txt"
              onChange={(event) => handleFileChange(setFieldValue, event)}
            />
            <Field name="title" type="text" placeholder="Title" />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
