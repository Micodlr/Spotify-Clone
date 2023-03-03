import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistSongsThunk } from "../../store/playlistSongs";
import { useParams, Link } from "react-router-dom";
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
  Button,
  Container,
  Icon,
  ListItemIcon,
  IconButton,
  Snackbar,
  Alert,
  Typography,
  ListSubheader,
} from "@mui/material";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SongEllipsis from "./SongElipsis";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { Grid } from "@material-ui/core";
import { getSong } from "../../store/mediaPlayer";
import AudioContext from "./AudioContext";

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

  const user = useSelector((state) => state.session.user);
  const songs = useSelector((state) => Object.values(state.songs));
  const [playStatus, setPlayStatus] = useState(
    new Array(songs.length).fill(false)
  );

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
    // dispatch(getAllreviews());
  }, [dispatch, playlistId]);
  const onClick = (song) => {
    if (!user) return handleClick();

    song.play = !song.play;

    dispatch(getSong(song));
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
                  {/* {!song.play ? (
                    <PlayArrowIcon
                      // onClick={(e) => onClick(song)}
                      onClick={handleTogglePlay}
                      sx={{ height: 38, width: 38 }}
                    />
                  ) : (
                    <PauseIcon
                      onClick={(e) => handlePause(song)}
                      sx={{ height: 38, width: 38 }}
                    />
                  )} */}
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
            <FavoriteBorderIcon sx={{ color: "whitesmoke" }} />
            <SongEllipsis songId={song.id} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
