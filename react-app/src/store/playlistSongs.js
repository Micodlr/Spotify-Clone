import { csrfFetch } from "./csrf";

const GET_PLAYLIST_SONGS = "playlists/GET_SONGS";
const ADD_PLAYLIST_SONG = "playlists/ADD_SONG";
const DELETE_PLAYLIST_SONG = "playlists/DELETE_SONG";

const getPlaylistSongs = (playlist) => ({
  type: GET_PLAYLIST_SONGS,
  playlist,
});

const addSongToPlaylist = (song) => ({
  type: ADD_PLAYLIST_SONG,
  song,
});

const deleteSong = (song) => ({
  type: DELETE_PLAYLIST_SONG,
  song,
});

export const getPlaylistSongsThunk = (playlistId) => async (dispatch) => {
  const res = await csrfFetch(`/api/playlists/${playlistId}`);

  const { playlist } = await res.json();

  if (res.ok) {
    const data = {};
    playlist.songs.forEach((song) => (data[song.id] = song));

    dispatch(getPlaylistSongs(data));
  }
  return res;
};

export const addSongToPlaylistThunk = (song) => async (dispatch) => {
  console.log("hit addSong");
  const { playlistId } = song;
  const { songId } = song;
  console.log(songId);

  const res = await csrfFetch(`/api/playlists/${playlistId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(song),
  });
  if (res.ok) {
    const newSong = await res.json();
    dispatch(addSongToPlaylist(newSong));
  }
  return res;
};

export const deleteSongThunk = (song) => async (dispatch) => {
  const { playlistId, songId } = song;
  const res = await csrfFetch(`/api/playlists/${playlistId}/songs/${songId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteSong(songId));
  }
  return res;
};

const initialState = {};

const playlistSongsReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case GET_PLAYLIST_SONGS:
      return { ...action.playlist };
    case ADD_PLAYLIST_SONG:
      return { ...state, ...action.song };
    case DELETE_PLAYLIST_SONG:
      delete newState[action.song];
      return newState;
    default:
      return newState;
  }
};

export default playlistSongsReducer;
