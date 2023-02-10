// import { csrfFetch } from "./csrf";

// const GET_SPOT_PLAYLIST = "playlists/GET_SPOT_PLAYLIST";

// const getPlaylists = (playlists) => ({
//   type: GET_SPOT_PLAYLIST,
//   playlists,
// });

// export const getSuggestedPlaylistsThunk = () => async (dispatch) => {
//   const res = await csrfFetch(`/api/playlists/suggested`);

//   const { playlists } = await res.json();

//   if (res.ok) {
//     const data = {};
//     playlists.forEach((playlist) => (data[playlist.id] = playlist));
//     dispatch(getPlaylists(data));
//   }
//   return res;
// };

// const initialState = {};

// const spotPlaylistReducer = (state = initialState, action) => {
//   let newState = { ...state };

//   switch (action.type) {
//     case GET_SPOT_PLAYLIST:
//       return { ...action.playlists };
//     default:
//       return newState;
//   }
// };
// export default spotPlaylistReducer;
