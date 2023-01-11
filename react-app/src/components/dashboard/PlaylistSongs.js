import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistSongsThunk } from "../../store/playlistSongs";
import { useParams, Link } from "react-router-dom";
import { getSongsThunk } from "../../store/songs";
import Ellipsis from "./EditPlaylist";

// import { getAllreviews } from "../../store/reviews";

export default function PlaylistSongs() {
  const { playlistId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlaylistSongsThunk(playlistId));
    // dispatch(getAllreviews());
  }, [dispatch, playlistId]);
  const songId = useSelector((state) => Object.values(state.playlistSongs));
  let songsId = songId.map((song) => song.songId);

  useEffect(() => {
    dispatch(getSongsThunk());
    // dispatch(getAllreviews());
  }, [dispatch, playlistId]);
  const songs = useSelector((state) => Object.values(state.songs));
  let listOfSongs = songs.filter((song) => songsId.includes(song.id));

  return (
    <>
      <div>
        <Ellipsis />
      </div>
      {listOfSongs.map((song) => (
        <div key={song.id}>{song.title}</div>
      ))}
    </>
  );
}
