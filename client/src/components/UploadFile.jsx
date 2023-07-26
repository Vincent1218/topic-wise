import { useFormik } from 'formik';

export default function UploadFile({ userId }) {
  const formik = useFormik({
    initialValues: {
      file: '',
      content: '',
      title: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.file) {
        errors.file = 'Required';
      }
      if (!values.title) {
        errors.title = 'Required';
      }
      return errors;
    },
    onSubmit: async (values) => {
      const response = await fetch('http://localhost:8082/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      console.log('Data received:', data);
    },
  });

  const handleFileChange = (event) => {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.currentTarget.files[0];

    reader.onloadend = () => {
      formik.setFieldValue('file', file);
      formik.setFieldValue('content', reader.result);
    };

    if (file) {
      reader.readAsText(file);
    } else {
      formik.setFieldValue('file', null);
      formik.setFieldValue('content', null);
    }
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
          name='file'
          type='file'
          accept='.txt'
          onChange={handleFileChange}
        />
        {formik.errors.file && formik.touched.file && <div>{formik.errors.file}</div>}
        <input
          name='title'
          type='text'
          placeholder='Title'
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        {formik.errors.title && formik.touched.title && <div>{formik.errors.title}</div>}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
