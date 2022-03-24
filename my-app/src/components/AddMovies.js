import Button from "@mui/material/Button";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { validateYupSchema } from "formik";
import { useFormik } from "formik";

export const formValidationSchema = yup.object({
  name: yup.string().required("Please fill name"),
  releaseYear: yup.number().min(4,"Fill Year").required("Please fill Year"),
  poster: yup.string().required("Please fill movie url"),
  rating: yup.number().required("Please fill rating").min(0,"0 - 10 required").max(10,'Should not exceed 10'),
  summary: yup.string().required("Please fill summary").min(20,"Minimum 20 character needed"),
  trailer: yup.string().required("Please fill trailer").min(20,"Minimum 20 character needed"),
});

export function AddMovies() {
  // const [name, updateName] = useState("");
  // const [url, updateUrl] = useState("");
  // const [rating, updateRating] = useState("");
  // const [summary, updateSummary] = useState("");
  // const [year, updateYear] = useState("");
  // const [trailer, updateTrailer] = useState("");
  const history = useHistory();

  const addData = (data) => {
    fetch("https://61fe505ba58a4e00173c97d5.mockapi.io/movies/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      history.push("/show");
    });
  };
 
  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        releaseYear: "",
        poster: "",
        rating: "",
        summary: "",
        trailer: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        console.log("12222222", values);addData(values);

      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <div className="add-movie-container">
        <TextField
          id="filled-basic"
          label="Name"
          value={values.name}
          variant="filled"
          onChange={handleChange}
          onBlur={handleBlur}
          id="name"
          name="name"
          error={errors.name && touched.name}
          helperText={errors.name && touched.name? errors.name:""}
        />
        
        <TextField
          id="filled-basic"
          label="Movie Url"
          variant="filled"
          value={values.poster}
          onChange={handleChange}
          onBlur={handleBlur}
          id="poster"
          name="poster"
          error={errors.poster && touched.poster}
          helperText={errors.poster && touched.poster? errors.poster:""}
         
        />
        <TextField
          id="filled-basic"
          label="Rating"
          variant="filled"
          value={values.rating}
          onChange={handleChange}
          onBlur={handleBlur}
          id="rating"
          name="rating"
          error={errors.rating && touched.rating}
          helperText={errors.rating && touched.rating? errors.rating:""}
        
        />
        <TextField
          id="filled-basic"
          label="Summary"
          value={values.summary}
          variant="filled"
          onChange={handleChange}
          onBlur={handleBlur}
          id="summary"
          name="summary"
          error={errors.summary && touched.summary}
          helperText={errors.summary && touched.summary? errors.summary:""}
        
        
          
         
        />
        <TextField
          id="filled-basic"
          label="Release Year"
          variant="filled"
          value={values.year}
          onChange={handleChange}
          onBlur={handleBlur}
          id="releaseYear"
          name="releaseYear"
          error={errors.releaseYear && touched.releaseYear}
          helperText={errors.releaseYear && touched.releaseYear? errors.releaseYear:""}
         
        />
        <TextField
          id="filled-basic"
          label="Trailer"
          value={values.trailer}
          variant="filled"
          onChange={handleChange}
          onBlur={handleBlur}
          id="trailer"
          name="trailer"
          error={errors.trailer && touched.trailer}
          helperText={errors.trailer && touched.trailer? errors.trailer:""}
        />
        <Button
        type="submit"
          variant="contained"
          onClick={() => {
            // const newMovie = {
            //   name: values.name,
            //   poster: values.url,
            //   rating: values.rating,
            //   summary: values.summary,
            //   releaseYear: values.year,
            //   trailer: values.trailer,
            // };
            // updateMovieDetails([...movieDetails, newMovie]);
            // addData(newMovie);
          }}
        >
          Add Movie
        </Button>
      </div>
    </form>
  );
}
