import { csrfFetch } from "./csrf";

const GET_ARTISTS = "artists/GET_ARTISTS";

const getArtists = (artists) => ({
  type: GET_ARTISTS,
  artists,
});

export const getArtistThunk = () => async (dispatch) => {
  const res = await csrfFetch(`/api/artists/`);

  const { artists } = await res.json();

  if (res.ok) {
    const data = {};
    artists.forEach((artist) => (data[artist.id] = artist));

    dispatch(getArtists(data));
  }
  return res;
};

const initialState = {};

const artistsReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case GET_ARTISTS:
      return { ...action.artists };
    default:
      return newState;
  }
};

export default artistsReducer;
