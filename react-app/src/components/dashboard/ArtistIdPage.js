import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistSongsThunk } from "../../store/playlistSongs";
import { getplaylistsThunk } from "../../store/playlists";
import { useParams, Link } from "react-router-dom";
import { getSongsThunk } from "../../store/songs";
import Ellipsis from "./EditPlaylist";
import { Box, fontSize } from "@mui/system";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  ListSubheader,
} from "@material-ui/core";
import {
  Card,
  Avatar,
  Button,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  ListItemIcon,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import zIndex from "@mui/material/styles/zIndex";
import PlaylistSongsElipsis from "./PlaylistSongsElipsis";
import { getArtistThunk } from "../../store/artists";
import { getAlbumsThunk } from "../../store/albums";
import Albums from "./Albums";
// import { getAllreviews } from "../../store/reviews";

// const useStyles = makeStyles({
//   media: {
//     height: 0,
//     paddingTop: "56.25%", // 16:9
//   },
// });

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette,
    color: theme.palette,
    "&:hover": {
      backgroundColor: theme.palette,
    },
  },
}));

export default function ArtistIdPage() {
  const { artistId } = useParams();

  const classes = useStyles();

  const dispatch = useDispatch();

  const [imageSrc, setImageSrc] = useState(
    "data:image/jpeg;base64,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"
  );

  //   useEffect(() => {
  //     dispatch(getSongsThunk());
  //     // dispatch(getAllreviews());
  //   }, [dispatch]);
  //   const songs = useSelector((state) => state.songs[artistId]);
  //   console.log(songs);
  useEffect(() => {
    dispatch(getArtistThunk());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAlbumsThunk());
  }, [dispatch]);

  //   useEffect(() => {
  //     dispatch(getPlaylistSongsThunk(playlistId));
  //     // dispatch(getAllreviews());
  //   }, [dispatch, playlistId]);
  //   const songId = useSelector((state) => Object.values(state.playlistSongs));
  //   let songsId = songId.map((song) => song.songId);

  //   useEffect(() => {
  //     dispatch(getSongsThunk());
  //     // dispatch(getAllreviews());
  //   }, [dispatch, playlistId]);
  //   const songs = useSelector((state) => Object.values(state.songs));
  //   let listOfSongs = songs.filter((song) => songsId.includes(song.id));

  const artist = useSelector((state) => state.artists[artistId]);
  const albums = useSelector((state) => Object.values(state.albums));

  const artistAlbums = albums.filter((album) => album.artistId == artistId);
  console.log(artistAlbums);
  return (
    <Container style={{ paddingBottom: "200px" }}>
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

      <Card style={{ width: "95%", height: "28vw" }}>
        <img
          src={artist?.image}
          style={{ width: "100%", height: "100%" }}
        ></img>
        {/* <CardMedia
          style={{
            position: "relative",
            paddingTop: "56.25%",
            borderRadius: "10px",
            marginBottom: "35px",
          }}
          image={artist?.image}
          title="header image"
        /> */}
      </Card>

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
        {artist?.name}
      </Box>

      <div style={{ color: "whitesmoke", paddingTop: "10px" }}>
        To add ellipsis to overflow text in Material-UI, you can use the
        overflow and textOverflow CSS properties. You can set the overflow
        property to hidden and the text-overflow property to ellipsis to
        truncate the text and add an ellipsis to the end of it when it overflows
        the containing element. Here's an example of how you might use these CSS
        properties to add ellipsis to overflow text in a Typography component:
      </div>

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
        Albums
      </Box>
      <Albums artistAlbums={artistAlbums} />

      {/* <Box
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
      > */}
      {/* <h1 style={{ color: "whitesmoke" }}>Albums</h1>
      <Container sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {artistAlbums.map((album) => (
          <Card key={artist?.id} sx={{ width: 160, height: 260 }}>
            <CardActionArea>
              <CardMedia
                sx={{ height: 130, maxWidth: "100%" }}
                image={album.albumCover}
                title="Album cover"
              />
              <CardContent sx={{ width: 130 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  style={{ fontSize: "16px", fontWeight: "bold" }}
                  component="div"
                  textOverflow={"ellipsis"}
                >
                  {album?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {album.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Container> */}

      {/* <List component="ol">

          {artistAlbums.map((album, index) => (
            <ListItem key={album.id}>
              <ListItemAvatar>
                <ListItemIcon>
                  <Button
                    sx={{ "&:hover": { bgcolor: "#1DB954" } }}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    <PlayArrowIcon />
                  </Button>

                </ListItemIcon>
              </ListItemAvatar>

              <ListItemIcon>
                <Avatar
                  sx={{ width: "2.5rem", height: "2.5rem", borderRadius: "0" }}
                  src={album?.albumCover}
                />
              </ListItemIcon>
              <ListItemText
                style={{ color: "whitesmoke" }}
                secondaryTypographyProps={{ style: { color: "whitesmoke" } }}
                primary={album.title}
                // secondary={song.artist.name}
              />


              <PlaylistSongsElipsis />
            </ListItem>
          ))}
        </List> */}
      {/* </Box> */}
    </Container>
  );
}
