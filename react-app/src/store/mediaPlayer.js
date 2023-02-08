import { csrfFetch } from "./csrf";

const GET_SONG = "mediaPlayer/GET_SONG";

export const getSong = (song) => ({
  type: GET_SONG,
  song,
});

const initialState = {};

const mediaPlayerReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case GET_SONG:
      return { ...action.song };
    default:
      return newState;
  }
};

export default mediaPlayerReducer;
