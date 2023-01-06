import { csrfFetch } from "./csrf";

const GET_SONGS = "songs/GET_SONGS";

const getSongs = (songs) => ({
  type: GET_SONGS,
  songs,
});

export const getSongsThunk = () => async (dispatch) => {
  const res = await csrfFetch(`/api/users/balance`);

  const { balance, owe, owed } = await res.json();

  if (res.ok) {
    const data = {};
    data["owe"] = owe;
    data["owed"] = owed;
    data["balance"] = balance;
    dispatch(getSongs(data));
  }
  return res;
};

const initialState = {};

const songsReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case GET_SONGS:
      return { ...state, ...action.songs };
    default:
      return newState;
  }
};

export default songsReducer;
