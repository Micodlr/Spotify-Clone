import artistsReducer from "./artists";
import { csrfFetch } from "./csrf";

const GET_SONGS = "likedSongs/GET_SONGS";
const LIKE_SONG = "likedSongs/LIKE_SONG";
const UNLIKE_SONG = "likedSongs/UNLIKE_SONG";

export const getLikedSongs = (songs) => ({
  type: GET_SONGS,
  songs,
});

export const likeSong = (song) => ({
  type: LIKE_SONG,
  song,
});

export const unlikeSong = (song) => ({
  type: UNLIKE_SONG,
  song,
});

const initialState = {};

const likedSongsReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case GET_SONGS:
      return { ...action.songs };
    case LIKE_SONG:
      return { ...action.song };
    case UNLIKE_SONG:
      delete newState[action.song];
    default:
      return newState;
  }
};

export default likedSongsReducer;
