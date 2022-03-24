import { useState ,useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";


export function Likes() {
  const [initialCount, updatedCount] = useState(0);
  const [disLike, updatedDisLike] = useState(0);
  const styles = {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
  };
  const colorGreen = {
    color:"green"
  }

  useEffect(()=>{
    console.log(`See component get updated when?? ${initialCount} ${disLike}`)
  },[disLike])
  return (
    <div style={styles}>
      <IconButton
       style={colorGreen}
        aria-label="add to shopping cart"
        onClick={(e) => {
          updatedCount(initialCount + 1);
        }}
      >
        <Badge badgeContent={initialCount}>
          👍
        </Badge>
      </IconButton>
      <IconButton
        color="error"
        aria-label="add to shopping cart"
        onClick={(e) => {
          updatedDisLike(disLike + 1);
        }}
      >
        <Badge badgeContent={disLike}>
          👎
        </Badge>
      </IconButton>
    </div>
  );
}
