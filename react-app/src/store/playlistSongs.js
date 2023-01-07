import { csrfFetch } from "./csrf";

const GET_PLAYLIST_SONGS = "playlists/GET_SONGS";

const getPlaylistSongs = (playlist) => ({
  type: GET_PLAYLIST_SONGS,
  playlist,
});

export const getPlaylistSongsThunk = (playlistId) => async (dispatch) => {
  const res = await csrfFetch(`/api/playlists/${playlistId}`);
  console.log("hit  get playlistSongs");

  const { playlist } = await res.json();

  if (res.ok) {
    const data = {};
    playlist.songs.forEach((song) => (data[song.id] = song));

    dispatch(getPlaylistSongs(data));
  }
  return res;
};

const initialState = {};

const playlistSongsReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case GET_PLAYLIST_SONGS:
      return { ...state, ...action.playlist };
    default:
      return newState;
  }
};

export default playlistSongsReducer;
