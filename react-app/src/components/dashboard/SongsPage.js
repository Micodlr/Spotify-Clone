import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSongToPlaylistThunk,
  getPlaylistSongsThunk,
} from "../../store/playlistSongs";
import { useParams, Link, useHistory } from "react-router-dom";
import { getSongsThunk } from "../../store/songs";
import Ellipsis from "./EditPlaylist";
import { Box, fontSize } from "@mui/system";
import PauseIcon from "@mui/icons-material/Pause";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import {
  Avatar,
  Container,
  ListItemIcon,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SongEllipsis from "./SongElipsis";

import { Grid } from "@material-ui/core";
import { getSong } from "../../store/mediaPlayer";
import AudioContext from "./AudioContext";
import { likeSong } from "../../store/likedSongs";
import { getplaylistsThunk } from "../../store/playlists";
import ToggleComponent from "./ToggleTest";
import FavoriteToggleButton from "./ToggleTest";

// import { getAllreviews } from "../../store/reviews";

export default function AllSongs() {
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);

  const audioRef = useContext(AudioContext);

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlePause = () => {
    if (currentSongIndex !== -1) {
      const newPlayStatus = [...playStatus];
      newPlayStatus[currentSongIndex] = false;
      setPlayStatus(newPlayStatus);
      setCurrentSongIndex(-1);
    }
    audioRef?.current?.pause();
  };
  const { playlistId } = useParams();

  const dispatch = useDispatch();
  const playlists = useSelector((state) => Object.values(state.playlists));
  const user = useSelector((state) => state.session.user);
  const songs = useSelector((state) => Object.values(state.songs));
  const [playStatus, setPlayStatus] = useState(
    new Array(songs.length).fill(false)
  );

  const likedSongs = playlists.filter(
    (playlist) => playlist.name == "Liked Songs"
  );
  const likedSongsId = likedSongs[0]?.id;
  const likedSongsList = likedSongs[0]?.playlistSongs;

  function resetPlayStatus() {
    setPlayStatus(new Array(songs.length).fill(false));
  }
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("pause", resetPlayStatus);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("pause", resetPlayStatus);
      }
    };
  }, [audioRef]);

  function handleTogglePlay(index) {
    const newPlayStatus = [...playStatus];
    newPlayStatus[index] = !newPlayStatus[index];
    setPlayStatus(newPlayStatus);
    audioRef.current.play();

    // stop currently playing song, if any
    if (currentSongIndex !== -1 && currentSongIndex !== index) {
      newPlayStatus[currentSongIndex] = false;
      setPlayStatus(newPlayStatus);
    }

    // update current song index
    setCurrentSongIndex(playStatus[index] ? -1 : index);
  }

  useEffect(() => {
    dispatch(getSongsThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getplaylistsThunk());
  }, [dispatch]);
  const onClick = (song) => {
    if (!user) return handleClick();

    dispatch(getSong(song));
    dispatch(getplaylistsThunk());
  };

  return (
    <Container sx={{ ml: 0, pb: 5 }}>
      <List>
        <h1 style={{ color: "whitesmoke" }}>Songs</h1>

        {songs.map((song, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <ListItemIcon>
                <IconButton
                  // onClick={(e) => onClick(e, song)}
                  sx={{
                    color: "whitesmoke",
                    borderRadius: "20px",

                    "&:hover": { bgcolor: "#1DB954", color: "black" },
                  }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={() => handleTogglePlay(index)}
                >
                  {/* <PlayArrowIcon /> */}
                  {playStatus[index] ? (
                    <PauseIcon
                      sx={{
                        bgcolor: "green",
                        borderRadius: "18px",
                        height: "1em",
                      }}
                      onClick={(e) => handlePause(song)}
                    />
                  ) : (
                    <PlayArrowIcon onClick={(e) => onClick(song)} />
                  )}
                </IconButton>

                <Snackbar
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      borderRadius: "15px",

                      width: "100%",
                      color: "whitesmoke",
                      bgcolor: "black",
                    }}
                  >
                    Error: Login Required. Please log in to access this feature.
                  </Alert>
                </Snackbar>
              </ListItemIcon>
            </ListItemAvatar>

            <ListItemIcon>
              <Avatar
                sx={{ width: "2.5rem", height: "2.5rem", borderRadius: "0" }}
                src={song?.album?.albumCover}
              />
            </ListItemIcon>
            <ListItemText
              style={{ color: "whitesmoke" }}
              secondaryTypographyProps={{ style: { color: "whitesmoke" } }}
              primary={song.title}
              secondary={song.artist.name}
            />

            {/* {likedSongsList.some((obj) => obj.songId === song.id) ? (
              <FavoriteIcon sx={{ color: "green" }} />
            ) : (
              <FavoriteBorderIcon
                onClick={(e) => likeSong(e, song.id)}
                sx={{ color: "whitesmoke" }}
              />
            )} */}
            {/* <IconButton onClick={() => handleLikeSong(index)}>
              {likedSongs.has(index) ? (
                <FavoriteIcon
                  sx={{
                    color: "whitesmoke",
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  sx={{
                    color: "whitesmoke",
                  }}
                />
              )}
            </IconButton> */}
            <FavoriteToggleButton
              songId={song.id}
              playlist={likedSongsList}
              playlistId={likedSongsId}
            />
            <SongEllipsis songId={song.id} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
