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
  const [selectedIndex, setSelectedIndex] = useState(-1);

  function handleListItemClick(event, index) {
    setSelectedIndex(index);
  }
  const audioRef = useContext(AudioContext);
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlePause = (song) => {
    song.play = true;
    audioRef?.current?.pause();
  };
  const { playlistId } = useParams();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const songs = useSelector((state) => Object.values(state.songs));

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
          <ListItem
            key={index}
            button
            selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index)}
          >
            <ListItemAvatar>
              <ListItemIcon>
                <IconButton
                  // onClick={(e) => onClick(e, song)}
                  sx={{
                    color: "whitesmoke",
                    "&:hover": { bgcolor: "#1DB954", color: "black" },
                  }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {/* <PlayArrowIcon /> */}
                  {!song.play ? (
                    <PlayArrowIcon
                      onClick={(e) => onClick(song)}
                      sx={{ height: 38, width: 38 }}
                    />
                  ) : (
                    <PauseIcon
                      onClick={(e) => handlePause(song)}
                      sx={{ height: 38, width: 38 }}
                    />
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
            <FavoriteBorderIcon sx={{ color: "whitesmoke" }} />
            <SongEllipsis songId={song.id} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
