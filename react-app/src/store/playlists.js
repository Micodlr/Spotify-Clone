import { csrfFetch } from "./csrf";

const GET_PLAYLISTS = "playlists/GET_PLAYLISTS";
const ADD_PLAYLIST = "playlists/ADD_PLAYLIST";

const getPlaylists = (playlists) => ({
  type: GET_PLAYLISTS,
  playlists,
});
const addPlaylists = (playlist) => ({
  type: GET_PLAYLISTS,
  playlist,
});

export const addPlaylistsThunk = (playlist) => async (dispatch) => {
  const res = await csrfFetch(`/api/playlists/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(playlist),
  });

  if (res.ok) {
    const newPlaylist = await res.json();
    dispatch(addPlaylists(newPlaylist));
  }
  return res;
};
// const getPlaylistSongs = (playlist) => ({
//   type: GET_PLAYLIST_SONGS,
//   playlist,
// });

// export const getPlaylistSongsThunk = (playlistId) => async (dispatch) => {
//   const res = await csrfFetch(`/api/playlists/${playlistId}`);
//   console.log("hit  get playlistSongs");

//   const { playlist } = await res.json();

//   if (res.ok) {
//     const data = {};
//     playlist.songs.forEach((song) => (data[song.id] = song));
//     console.log(data);
//     dispatch(getPlaylistSongs(data));
//   }
//   return res;
// };

export const getplaylistsThunk = () => async (dispatch) => {
  const res = await csrfFetch(`/api/playlists/`);

  const { playlists } = await res.json();

  if (res.ok) {
    const data = {};
    playlists.forEach((playlist) => (data[playlist.id] = playlist));
    dispatch(getPlaylists(data));
  }
  return res;
};

const initialState = {};

const playlistsReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case GET_PLAYLISTS:
      return { ...state, ...action.playlists };
    case ADD_PLAYLIST:
      return { ...state, ...action.playlist };
    default:
      return newState;
  }
};

export default playlistsReducer;
