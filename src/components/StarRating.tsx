import { Rating } from "@mui/material";
import { useState } from "react";
export function StarRating({ className }) {
  const [rating, setRating] = useState(0);

  return (
    <div className={className}>
      <Rating
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
          console.log("New rating:", newValue);
        }}
        size="large" // options: small, medium, large
        precision={1} // can be 0.5 for half stars
      />
    </div>
  );
}
