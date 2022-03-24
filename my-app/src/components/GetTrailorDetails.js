import { useParams, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "../App.css";
export default function GetTrailorDetails() {
  const { id } = useParams();
  console.log("MOVIE ID: " + id);

  // const movieDetails = movie[id];
  // const movieDetails = {};
  // console.log("123",movieDetails);
  const history = useHistory();
  const styles = { width: "100%" };

  const [movieDetail, updateMovieDetail] = useState({ items: {} });
  console.log(movieDetail);

  const getTrailer = () => {
    fetch("https://61fe505ba58a4e00173c97d5.mockapi.io/movies/" + id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((movieDetails) => {
       updateMovieDetail({items: movieDetails.items });
        console.log("Inside API", movieDetail);
      });
  };
  // similar to ComponentDidMount
  useEffect(getTrailer, []);

  return (
    // <div>Nice</div>

    <div className="trailor-container">
      <div style={styles}>
        <iframe
          width="100%"
          height="600"
          src={movieDetail.items.trailer}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <h2>
        {" "}
        Movie No: <span className="colorList">{movieDetail.items.id}</span>
      </h2>
      <h2>
        Movie Name: <span className="colorList">{movieDetail.items.name}</span>
      </h2>
      <h2>
        Movie Rating:{" "}
        <span className="colorList">{movieDetail.items.rating}⭐</span>
      </h2>

      <p>
        {" "}
        <span className="colorList">{movieDetail.items.summary}</span>
      </p>

      <Button
        color="warning"
        variant="outlined"
        onClick={history.goBack}
        startIcon={<KeyboardBackspaceIcon />}
      >
        PREVIOUS
      </Button>
    </div>
  );
}
