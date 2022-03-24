import { ViewMovie } from "./ViewMovie";

import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

export function ShowMovieDetails() {
  const [movieDetails, updateMovieDetails] = useState([]);
  const getMovies = () => {
    fetch("https://61fe505ba58a4e00173c97d5.mockapi.io/movies/", {
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
    fetch("https://61fe505ba58a4e00173c97d5.mockapi.io/movies/" +id,{ method: "DELETE",})
      .then((data) => data.json())
       .then(()=> getMovies())
      .then((remData)=>{
        console.log("DELETED DATA", remData);
      })
     
      
  };

  const history = useHistory();
  return (
    <div>
      <section className="movie-list">
        {movieDetails.map((movie, index) => (
          <ViewMovie
            key={index}
            name={movie.name}
            poster={movie.poster}
            releaseYear={movie.releaseYear}
            rating={movie.rating}
            summary={movie.summary}
            index={index}
            id={movie.id}            
            editBtn={
              <Button
                color="warning"
                onClick={() => {
                  history.push("movies/edit/" + movie.id);
                }}
                startIcon={<EditIcon />}
              ></Button>
            }
            deleBtn={
              <Button
                color="error"
                onClick={() => {
                  removeItem(movie.id);
                  console.log("ID",movie.id);
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
