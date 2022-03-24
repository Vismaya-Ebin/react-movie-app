import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { formValidationSchema } from "./components/AddMovies";

import { useFormikContext, Formik, Form, Field, useFormik } from "formik";

export function EditDetails({ movieDetails, updateMovieDetails }) {
  const { id } = useParams();
  const [data, editData] = useState({ items: "" });

  const updateDetails = () => {
    fetch("https://61fe505ba58a4e00173c97d5.mockapi.io/movies/" + id, {
      method: "GET",
    }).then((response) => {
      response.json().then((mv) => {
        editData({ items: mv.items });
        console.log("Edited Items: " + JSON.stringify(mv.items));
      });
    });
  };

  useEffect(updateDetails, []);
  return (
    <div>
      <h1>Get Data For Edit</h1>
      {data.items ? (
        <EditMovieForm
          data={data}
          editData={editData}
          id={id}
          updateMovieDetails={updateMovieDetails}
        />
      ) : null}
    </div>
  );
}

function EditMovieForm({ data, editData, id }) {
  const history = useHistory();
  const textDetails = {
    textAlign: "center",
    color: "blue",
    fontSize: "1.5rem",
  };

  const updateApiCall = (data) => {
    console.log("AOI DATA",data);
    fetch("https://61fe505ba58a4e00173c97d5.mockapi.io/movies/" + id, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => {
      // history.push("/show");
    });
  };
  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: data.items,
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        console.log("12222222", values);
        updateApiCall(values);
      },
    });
  return (
    // <div></div>
    <form onSubmit={handleSubmit}>
      <h3 style={textDetails}>UPDATE MOVIE DETAILS {id}</h3>
      <div className="add-movie-container">
        <TextField
          id="filled-basic"
          label="Name"
          defaultValue={data.items.name}
          variant="filled"
          onChange={handleChange}
          id="name"
          name="name"
          error={errors.name && touched.name}
          helperText={errors.name && touched.name ? errors.name : ""}
        />
        <TextField
          id="filled-basic"
          label="Movie Url"
          variant="filled"
          defaultValue={data.items.poster}
          id="poster"
          name="poster"
          onChange={handleChange}
          error={errors.poster && touched.poster}
          helperText={errors.poster && touched.poster ? errors.poster : ""}
        />
        <TextField
          id="filled-basic"
          label="Rating"
          variant="filled"
          defaultValue={data.items.rating}
          id="rating"
          name="rating"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.rating && touched.rating}
          helperText={errors.rating && touched.rating ? errors.rating : ""}
        />
        <TextField
          id="filled-basic"
          label="Summary"
          variant="filled"
          defaultValue={data.items.summary}
          onChange={handleChange}
          onBlur={handleBlur}
          id="summary"
          name="summary"
          error={errors.summary && touched.summary}
          helperText={errors.summary && touched.summary ? errors.summary : ""}
        />
        <TextField
          id="filled-basic"
          label="Release Year"
          variant="filled"
          defaultValue={data.items.releaseYear}
          onChange={handleChange}
          onBlur={handleBlur}
          id="releaseYear"
          name="releaseYear"
          error={errors.releaseYear && touched.releaseYear}
          helperText={
            errors.releaseYear && touched.releaseYear ? errors.releaseYear : ""
          }
        />

        <TextField
          onChange={handleChange}
          onBlur={handleBlur}
          id="trailer"
          name="trailer"
          id="filled-basic"
          label="Trailer"
          value={values.trailer}
          variant="filled"
          error={errors.trailer && touched.trailer}
          helperText={errors.trailer && touched.trailer ? errors.trailer : ""}
        />
        <Button
          variant="contained"
          type="submit"
          onClick={() => {
            // const newMovie = {
            //   id: data.id,
            //   name: name,
            //   poster: url,
            //   rating: rating,
            //   summary: summary,
            //   releaseYear: year,
            // };
            // updateApiCall(newMovie);
            // const copyOFMovieList = [...movieDetails];
            // copyOFMovieList[id] = newMovie;
            // console.log("1234", copyOFMovieList);
            // updateMovieDetails(copyOFMovieList);
          }}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}
