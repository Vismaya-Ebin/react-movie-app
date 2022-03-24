import { useHistory } from "react-router-dom";
import { Likes } from "./Likes.js";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";

export function ViewMovie({ name, poster, rating, summary, releaseYear, index,deleBtn,editBtn ,id}) {
  const styles = { color: rating >= 8.5 ? "green" : "red" };
  const [clicked, updateClick] = useState(true);
  const toggleStyle = { display: clicked ? "block" : "none" };
  const history = useHistory();
  return (
    <div>
      <div className="movie-container">
        <img className="movie-poster" src={poster} alt="" />
        <div className="movie-box">
          <p className="movie-name">{name}</p>
         
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            onClick={(e) => {
              updateClick(!clicked);
            }}
          >
            {clicked ? <ExpandLessIcon /> : <ExpandMoreSharpIcon />}
          </IconButton>

          <IconButton
            color="primary"
            aria-label="Movie details"
            onClick={() => history.push("/add/" + id)}
          >
            <InfoIcon />
          </IconButton>
          <p className="movie-rating" style={styles}>
            {rating}⭐
          </p>
        </div>

        <p className="movie-summary" style={toggleStyle}>
          {summary}
        </p>
        <div className="movie-box">
          <p className="movie-year">{releaseYear} </p>
          {deleBtn}
          {editBtn}
          <Likes />
        </div>
      </div>
    </div>
  );
}
