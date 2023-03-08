import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistSongsThunk } from "../../store/playlistSongs";
import { getplaylistsThunk } from "../../store/playlists";
import { useParams, Link } from "react-router-dom";
import { getSongsThunk } from "../../store/songs";
import Ellipsis from "./EditPlaylist";
import { Box, fontSize } from "@mui/system";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import {
  Avatar,
  Button,
  Card,
  Container,
  IconButton,
  ListItemIcon,
  ListSubheader,
} from "@mui/material";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseIcon from "@mui/icons-material/Pause";

import PlaylistSongsElipsis from "./PlaylistSongsElipsis";
import { getSong } from "../../store/mediaPlayer";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SongEllipsis from "./SongElipsis";
import AudioContext from "./AudioContext";
import FavoriteToggleButton from "./ToggleTest";

export default function PlaylistSongs() {
  const { playlistId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getplaylistsThunk());
  }, [dispatch, playlistId]);

  useEffect(() => {
    dispatch(getPlaylistSongsThunk(playlistId));
  }, [dispatch, playlistId]);
  const songId = useSelector((state) => Object.values(state.playlistSongs));
  let songsId = songId.map((song) => song.songId);

  const songs = useSelector((state) => Object.values(state.songs));
  let listOfSongs = songs.filter((song) => songsId.includes(song.id));
  const playlist = useSelector((state) => state.playlists[playlistId]);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);

  //liked songs playlistId
  const playlists = useSelector((state) => Object.values(state.playlists));
  const likedSongsPlaylist = playlists.filter(
    (playlist) => playlist.name == "Liked Songs"
  );
  const likedSongsPlaylistId = likedSongsPlaylist[0]?.id;
  const likedSongsList = likedSongsPlaylist[0]?.playlistSongs;

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

  const user = useSelector((state) => state.session.user);
  // const songs = useSelector((state) => Object.values(state.songs));
  const [playStatus, setPlayStatus] = useState(
    new Array(songs.length).fill(false)
  );

  function resetPlayStatus() {
    setPlayStatus(new Array(listOfSongs.length).fill(false));
  }
  useEffect(() => {
    if (audioRef?.current) {
      audioRef?.current?.addEventListener("pause", resetPlayStatus);
    }

    return () => {
      if (audioRef?.current) {
        audioRef?.current?.removeEventListener("pause", resetPlayStatus);
      }
    };
  }, [audioRef]);

  function handleTogglePlay(index) {
    const newPlayStatus = [...playStatus];
    newPlayStatus[index] = !newPlayStatus[index];
    setPlayStatus(newPlayStatus);
    audioRef?.current?.play();

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

    dispatch(getSong(song));
  };

  return (
    <Box sx={{ pb: 10 }}>
      {/* <Grid container spacing={3}>
        {listOfSongs.map((song, index) => (
          <Grid item xs={4} key={index}>
            <Card>
              <Typography variant="h5">{song.title}</Typography>
              <Typography variant="subtitle1">{song.artistId}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid> */}
      <Container sx={{ pl: 5, pt: 0 }}>
        <Card style={{ width: "95%", height: "28vw" }}>
          <img
            src={playlist?.playlistImg}
            style={{ width: "100%", height: "100%" }}
          ></img>
          {/* <CardMedia
          component={"img"}
          style={{
            width: "100%",
            height: "100%",

            objectFit: "fill",
          }}
          image={playlist?.playlistImg}
          title="header image"
        /> */}
        </Card>
      </Container>

      <Box
        style={{
          display: "flex",
          color: "whitesmoke",
          zIndex: "99",
          height: "60px",
          width: "25%",
          fontSize: "25px",
          fontWeight: "bold",
          alignItems: "flex-end",
          textShadow: "1px 2px black",
        }}
      >
        {playlist?.name}
      </Box>
      <div>
        <Ellipsis />
      </div>

      <List component="ol">
        {/* <Box>
          <ListSubheader>Title</ListSubheader>
          <ListSubheader>Album</ListSubheader>
        </Box> */}
        {/* <ListSubheader style={{ color: "whitesmoke" }}>
          {playlistName}
        </ListSubheader> */}

        {listOfSongs.map((song, index) => (
          <ListItem component="li" key={index}>
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
                {/* <IconButton
                  sx={{
                    color: "whitesmoke",
                    "&:hover": { bgcolor: "#1DB954", color: "black" },
                  }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={(e) => onClick(e, song)}
                >
                  <PlayArrowIcon />
                </IconButton> */}
                {/* <PlayArrowIcon
                  style={{
                    color: "whitesmoke",
                    fontSize: "30",
                  }}
                  sx={{ "&:hover": { color: "#black" } }}
                /> */}
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

            {/* <IconButton>
              <PlayArrowIcon />
            </IconButton> */}

            <FavoriteToggleButton
              songId={song.id}
              playlist={likedSongsList}
              playlistId={likedSongsPlaylistId}
            />

            {/* <IconButton onClick={(e) => likeButton(e)}>
              {like ? (
                <FavoriteIcon sx={{ color: "#1DB954" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton> */}
            {playlist?.userId === 4 ? (
              <SongEllipsis songId={song.id} />
            ) : (
              <>
                <PlaylistSongsElipsis songId={song.id} />
              </>
            )}
          </ListItem>
        ))}
      </List>

      {/* <List>
        {listOfSongs.map((song) => (
          <Box sx={{ color: "whitesmoke" }} key={song.id}>
            {song.title}
          </Box>
        ))}
      </List> */}
    </Box>
  );
}
