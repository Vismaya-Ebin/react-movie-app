import { useFormik } from "formik";
import * as Yup from "yup";

export const BasicForm = () => {
  const validateForm = (values) => {
    console.log("ValidateForm", values);
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    return errors;
  };
  const formValidationSchema = Yup.object({
    email: Yup.string()
      .min(5)
      .matches(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Match not found")
      .required("Please fill Email"),
    password: Yup.string()
      .min(8, "Try Strong password  😊😊")
      .max(12, "exceeded 12 please reduce")
      .required("Please fill Password"),
  });
  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: { email: "abc", password: "" },
      validate: validateForm,
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        console.log("12222222", values);
      },
    });

  const style = { color: "red" };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Basic Form</h1>

      <input
        placeholder="Email"
        id="email"
        name="email"
        value={values.email}
        type="email"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <br />
      <p style={style}>
        {errors.email && touched.email ? errors.email : ""}
      </p>
      <input
        placeholder="Password"
        id="password"
        name="password"
        value={values.password}
        type="password"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <br />
      <p style={style}>
        {errors.password && touched.password ? errors.password : ""}
      </p>
      <button type="submit">SUBMIT</button>
    </form>
  );
};
