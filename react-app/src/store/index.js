import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import songsReducer from "./songs";
import playlistsReducer from "./playlists";
import playlistSongsReducer from "./playlistSongs";
import artistsReducer from "./artists";
import reviewsReducer from "./reviews";
import albumsReducer from "./albums";
import mediaPlayerReducer from "./mediaPlayer";
import spotPlaylistReducer from "./recommendedPlaylist";
import likedSongsReducer from "./likedSongs";

const rootReducer = combineReducers({
  session,
  songs: songsReducer,
  artists: artistsReducer,
  albums: albumsReducer,
  playlists: playlistsReducer,
  playlistSongs: playlistSongsReducer,
  reviews: reviewsReducer,
  mediaPlayer: mediaPlayerReducer,
  likedSongs: likedSongsReducer,
  // spotPlaylist: spotPlaylistReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
