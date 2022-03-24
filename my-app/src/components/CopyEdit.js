import Button from "@mui/material/Button";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";

export function CopyEdit({ movieDetails, updateMovieDetails }) {
  const { id } = useParams();
  const movie = movieDetails[id];
  console.log(`${movie}`);
  console.log(JSON.stringify(movie));
  const [name, updateName] = useState(movie.name);
  const [url, updateUrl] = useState(movie.poster);
  const [rating, updateRating] = useState(movie.rating);
  const [summary, updateSummary] = useState(movie.summary);
  const [year, updateYear] = useState(movie.releaseYear);
  const [trailer, updateTrailer] = useState(movie.trailer);
  const history = useHistory();

  return (
    <div>
      <div className="add-movie-container">
        <h3>Selected Movie Id {id}</h3>
        <TextField
          id="filled-basic"
          label="Name"
          value={name}
          variant="filled"
          onChange={(e) => updateName(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Movie Url"
          variant="filled"
          value={url}
          onChange={(e) => updateUrl(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Rating"
          variant="filled"
          value={rating}
          onChange={(e) => updateRating(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Summary"
          variant="filled"
          value={summary}
          onChange={(e) => updateSummary(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Release Year"
          variant="filled"
          value={year}
          onChange={(e) => updateYear(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Trailer"
          variant="filled"
          value={trailer}
          onChange={(e) => updateTrailer(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => {
            const updatedMovie = {
              name: name,
              poster: url,
              rating: rating,
              summary: summary,
              releaseYear: year,
            };
            const copyOfMovieList = [...movieDetails];
            copyOfMovieList[id] = updatedMovie;
            console.log("copyOfMovieList", copyOfMovieList);
            updateMovieDetails(copyOfMovieList);
            history.push("/show");
          }}
          color="success"
        >
          SAVE
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            history.goBack();
          }}
          color="warning"
        >
          BACK
        </Button>
      </div>
    </div>
  );
}
