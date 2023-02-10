import * as React from "react";
import { useState, useEffect } from "react";
import {
  getplaylistsThunk,
  getSuggestedPlaylistsThunk,
} from "../../store/playlists";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { Alert, Box, CardActionArea, Container, Snackbar } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { maxHeight } from "@mui/system";
import { useHistory } from "react-router-dom";
import Ellipsis from "./EditPlaylist";
import { getArtistThunk } from "../../store/artists";
import AllSongs from "./SongsPage";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  //   const playlistsState = useSelector((state) => state.playlists);
  //   console.log(playlistsState);
  const artists = useSelector((state) => Object.values(state.artists));
  const playlists = useSelector((state) => Object.values(state.playlists));
  const suggested = playlists.filter((playlist) => playlist.userId == 4);
  const history = useHistory();
  const onClick = (e, artistId) => {
    e.preventDefault();
    history.push(`/dashboard/artists/${artistId}`);
  };
  const onClick2 = (e, playlistId) => {
    e.preventDefault();
    history.push(`/dashboard/playlists/${playlistId}`);
  };
  useEffect(() => {
    const myPlaylists = async () =>
      await dispatch(getSuggestedPlaylistsThunk());
    myPlaylists();
  }, [dispatch]);
  useEffect(() => {
    const playlist = async () => await dispatch(getplaylistsThunk());
    playlist();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getArtistThunk());
  }, [dispatch]);

  return (
    <>
      <h1 style={{ color: "whitesmoke" }}>Welcome to Potify</h1>
      <h2 style={{ color: "whitesmoke" }}>Artists</h2>
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          paddingBottom: "30px",
        }}
      >
        {artists.map((artist) => (
          // <Card>
          //   <div id="playlist-container" key={playlist?.id}>
          //     <div id="playlist" key={playlist?.id}>
          //       {playlist?.name}
          //     </div>
          //   </div>
          // </Card>
          <Card
            key={artist?.id}
            sx={{
              width: 160,
              height: 260,
              p: "10px",
              bgcolor: "#121212",
              color: "white",
              "&:hover": { bgcolor: "#515151" },
            }}
          >
            <CardActionArea onClick={handleClick}>
              <CardMedia
                sx={{ height: 130, maxWidth: "100%", borderRadius: "10px" }}
                image={artist?.image}
                title="playlist image"
              />
              <CardContent sx={{ width: 130 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  style={{ fontSize: "16px", fontWeight: "bold" }}
                  component="div"
                  textOverflow={"ellipsis"}
                >
                  {artist?.name}
                </Typography>
                <Typography variant="body2" color="gray">
                  artist description/genre
                </Typography>
              </CardContent>
              {/* <CardActions>
          <Button size="small">Share</Button>
        </CardActions> */}
            </CardActionArea>
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
          </Card>
        ))}
      </Container>

      <Typography
        variant="h2"
        style={{ fontSize: "24px", fontWeight: "bold", paddingTop: "10px" }}
        textOverflow={"ellipsis"}
        color={"whitesmoke"}
      >
        Suggested Playlists
      </Typography>
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        {suggested.map((playlist) => (
          //   <Card>
          //     <div id="playlist-container" key={playlist?.id}>
          //       <div id="playlist" key={playlist?.id}>
          //         {playlist?.name}
          //       </div>
          //     </div>
          //   </Card>
          <Card
            key={playlist?.id}
            sx={{
              width: 190,
              height: 280,
              p: "10px",

              bgcolor: "#121212",
              color: "white",
              "&:hover": { bgcolor: "#515151" },
            }}
          >
            <CardActionArea onClick={handleClick}>
              <CardMedia
                sx={{ height: 150, width: 170 }}
                //   image={ playlist?.playlistImg}
                image={playlist?.playlistImg}
                title="playlist image"
              />
              <CardContent color="custom">
                <Typography
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "normal",
                    fontSize: "1.2em",
                    marginBottom: "2px",
                  }}
                  color="custom"
                  gutterBottom
                  variant="h6"
                  component="div"
                >
                  {playlist.name}
                </Typography>
                <p
                  style={{
                    marginTop: "1px",
                    marginBottom: "5px",
                    paddingBottom: "5px",
                    color: "gray",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "normal",
                    fontFamily: "inherit",
                    fontSize: "14px",
                  }}
                >
                  playlist description asdczxcas asda sczcasdqw
                  asdaaasdasdasdasdasdasdasdads
                </p>
                {/* <Typography
                style={{
                  whiteSpace: "normal",
                  overflow: "auto",
                  textOverflow: "ellipsis",
                }}
                variant="body2"
                color="gray"
              >
                playlist descrption this is a great album, mix of funk, reggae,
                rock, hip-hop, r&b, soul, metal, rap, punk, pop!
              </Typography> */}
              </CardContent>
              {/* <CardActions>
          <Button size="small">Share</Button>
        </CardActions> */}
            </CardActionArea>
          </Card>
        ))}
      </Container>
      <Typography
        guttertop
        variant="h2"
        style={{ fontSize: "24px", fontWeight: "bold" }}
        textOverflow={"ellipsis"}
        color={"whitesmoke"}
      >
        Songs
      </Typography>
      <AllSongs />
    </>
  );
}
