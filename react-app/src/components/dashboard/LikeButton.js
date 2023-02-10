import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { IconButton } from "@mui/material";
import { useState } from "react";

export default function LikedSong({ liked, onLike }) {
  //   const [like, setLike] = useState(false);
  //   const onLike = (e) => {
  //     e.preventDefault();
  //     setLike(!like);
  //   };
  return (
    <IconButton onClick={onLike}>
      {liked ? (
        <FavoriteIcon sx={{ color: "#1DB954" }} />
      ) : (
        <FavoriteBorderIcon sx={{ color: "	#whitesmoke" }} />
      )}
    </IconButton>
  );
}
