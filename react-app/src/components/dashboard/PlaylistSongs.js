import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistSongsThunk } from "../../store/playlists";
import { useParams, Link } from "react-router-dom";

// import { getAllreviews } from "../../store/reviews";

export default function PlaylistSongs() {
  const { playlistId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlaylistSongsThunk(Number(playlistId)));
    // dispatch(getAllreviews());
  }, [dispatch]);
  const songs = useSelector((state) => state.playlists[playlistId]);

  return <div>playlist songs</div>;
}
