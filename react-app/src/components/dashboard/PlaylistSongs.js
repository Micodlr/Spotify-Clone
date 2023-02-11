import { useEffect, useState } from "react";
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
} from "@mui/material";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import PlaylistSongsElipsis from "./PlaylistSongsElipsis";
import { getSong } from "../../store/mediaPlayer";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SongEllipsis from "./SongElipsis";

export default function PlaylistSongs() {
  const { playlistId } = useParams();

  const [like, setLike] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getplaylistsThunk());
  }, [dispatch, playlistId]);

  useEffect(() => {
    dispatch(getPlaylistSongsThunk(playlistId));
  }, [dispatch, playlistId]);
  const songId = useSelector((state) => Object.values(state.playlistSongs));
  let songsId = songId.map((song) => song.songId);

  useEffect(() => {
    dispatch(getSongsThunk());
    // dispatch(getAllreviews());
  }, [dispatch, playlistId]);
  const songs = useSelector((state) => Object.values(state.songs));
  let listOfSongs = songs.filter((song) => songsId.includes(song.id));

  const playlist = useSelector((state) => state.playlists[playlistId]);

  const onClick = (e, song) => {
    e.preventDefault();
    dispatch(getSong(song));
  };
  const likeButton = (e) => {
    e.preventDefault();
    setLike(!like);
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

      <List>
        {/* <ListSubheader style={{ color: "whitesmoke" }}>
          {playlistName}
        </ListSubheader> */}

        {listOfSongs.map((song, index) => (
          <ListItem key={song.id}>
            <ListItemAvatar>
              <ListItemIcon>
                <IconButton
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
                </IconButton>
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

            <FavoriteBorderIcon sx={{ color: "whitesmoke" }} />
            {/* <IconButton onClick={(e) => likeButton(e)}>
              {like ? (
                <FavoriteIcon sx={{ color: "#1DB954" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton> */}
            {playlist?.user?.id === 4 ? (
              <PlaylistSongsElipsis songId={song.id} />
            ) : (
              <SongEllipsis songId={song.id} />
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
