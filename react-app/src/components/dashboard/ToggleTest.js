import { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import {
  addSongToPlaylistThunk,
  deleteSongThunk,
} from "../../store/playlistSongs";

export default function FavoriteToggleButton({ songId, playlist, playlistId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsFavorite(playlist?.some((obj) => obj.songId === songId));
  }, [playlist, songId]);

  const toggleFavorite = async () => {
    setIsFavorite(!isFavorite);

    dispatch(addSongToPlaylistThunk({ songId: songId, playlistId }));
  };
  const unlikeSong = async () => {
    setIsFavorite(!isFavorite);
    dispatch(deleteSongThunk({ songId, playlistId }));
  };

  return (
    <>
      {isFavorite ? (
        <FavoriteIcon sx={{ color: "green" }} onClick={unlikeSong} />
      ) : (
        <FavoriteBorderIcon
          sx={{ color: "whitesmoke" }}
          onClick={toggleFavorite}
        />
      )}
    </>
  );
}
