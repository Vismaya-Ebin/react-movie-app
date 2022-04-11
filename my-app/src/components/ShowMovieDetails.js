import { ViewMovie } from "./ViewMovie";

import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import {API} from "../components/global";

export function ShowMovieDetails() {
  const [movieDetails, updateMovieDetails] = useState([]);
  const getMovies = () => {
    fetch(`${API}/movies/`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((movieDetails) => {
        console.log("111111Movie Details", movieDetails);
        updateMovieDetails(movieDetails);
      });
  };
  // similar to ComponentDidMount
  useEffect(getMovies, []);

  const removeItem = (id) => {
    fetch(`${API}/movies/` +id,{ method: "DELETE",})
      .then((data) => data.json())
       .then(()=> getMovies())
      .then((remData)=>{
        console.log("DELETED DATA", remData);
      })
      .catch((err) => console.log(err));
     
      
  };

  const history = useHistory();
  return (
    <div>
      <section className="movie-list">
        {movieDetails.map((movie, index) => (
          <ViewMovie
            key={movie._id}
            name={movie.name}
            poster={movie.poster}
            releaseYear={movie.releaseYear}
            rating={movie.rating}
            summary={movie.summary}
            index={index}
            id={movie._id}            
            editBtn={
              <Button
                color="warning"
                onClick={() => {
                  history.push("movies/edit/" + movie._id);
                }}
                startIcon={<EditIcon />}
              ></Button>
            }
            deleBtn={
              <Button
                color="error"
                onClick={() => {
                  removeItem(movie._id);
                  console.log("ID",movie._id);
                  // const remainingMovies = movieDetails.filter((data, idx) => {
                  //   return idx !== index;
                  // });
                  // console.log(remainingMovies);
                  // updateMovieDetails(remainingMovies);
                }}
                startIcon={<DeleteIcon />}
              ></Button>
            }
          />
        ))}
      </section>
    </div>
  );
}
