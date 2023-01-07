import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistSongsThunk } from "../../store/playlistSongs";
import { useParams, Link } from "react-router-dom";
import { getSongsThunk } from "../../store/songs";

// import { getAllreviews } from "../../store/reviews";

export default function PlaylistSongs() {
  const { playlistId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlaylistSongsThunk(playlistId));
    // dispatch(getAllreviews());
  }, [dispatch]);
  const songId = useSelector((state) => Object.values(state.playlistSongs));
  console.log(songId);
  let songsId = songId.map((song) => song.songId);
  console.log(songsId);

  useEffect(() => {
    dispatch(getSongsThunk());
    // dispatch(getAllreviews());
  }, [dispatch]);
  const songs = useSelector((state) => Object.values(state.songs));
  let listOfSongs = songs.filter((song) => songsId.includes(song.id));
  console.log(listOfSongs);

  return (
    <>
      {listOfSongs.map((song) => (
        <div key={song.id}>{song.title}</div>
      ))}
    </>
  );
}
