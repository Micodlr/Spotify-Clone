import artistsReducer from "./artists";
import { csrfFetch } from "./csrf";

const GET_ALBUMS = "playlists/GET_ALBUMS";
const ADD_PLAYLIST = "playlists/ADD_PLAYLIST";
const EDIT_PLAYLIST_NAME = "playlist/EDIT_PLAYLIST_NAME";
const DELETE_PLAYLIST = "playlist/DELETE_PLAYLIST";

const getAlbums = (albums) => ({
  type: GET_ALBUMS,
  albums,
});

export const getAlbumsThunk = () => async (dispatch) => {
  const res = await csrfFetch(`/api/albums/`);

  const { albums } = await res.json();

  if (res.ok) {
    const data = {};
    albums.forEach((album) => (data[album.id] = album));
    dispatch(getAlbums(data));
  }
  return res;
};

const initialState = {};

const albumsReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case GET_ALBUMS:
      return { ...action.albums };
    default:
      return newState;
  }
};

export default albumsReducer;
