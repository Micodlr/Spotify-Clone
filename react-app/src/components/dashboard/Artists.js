import * as React from "react";
import { useState, useEffect } from "react";
import { getplaylistsThunk } from "../../store/playlists";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { CardActionArea, Container } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { maxHeight } from "@mui/system";
import { useHistory } from "react-router-dom";
import Ellipsis from "./EditPlaylist";
import { getArtistThunk } from "../../store/artists";

export default function ArtistsPage() {
  const dispatch = useDispatch();
  //   const playlistsState = useSelector((state) => state.playlists);
  //   console.log(playlistsState);
  const artists = useSelector((state) => Object.values(state.artists));

  const history = useHistory();
  const onClick = (e, artistId) => {
    e.preventDefault();
    history.push(`/dashboard/artists/${artistId}`);
  };
  //   useEffect(() => {
  //     const myPlaylists = async () => await dispatch(getplaylistsThunk());
  //     myPlaylists();
  //   }, [dispatch]);

  useEffect(() => {
    dispatch(getArtistThunk());
  }, [dispatch]);
  console.log(artists);
  return (
    <>
      <h1 style={{ color: "whitesmoke" }}>Artists</h1>
      <Container
        sx={{ pb: 10, display: "flex", flexWrap: "wrap", gap: "20px" }}
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
              width: 200,
              height: 300,
              p: "10px",
              bgcolor: "#121212",
              color: "white",
              "&:hover": { bgcolor: "#515151" },
            }}
          >
            <CardActionArea onClick={(e) => onClick(e, artist?.id)}>
              {/* <CardMedia
                sx={{ height: 130, maxWidth: "100%", borderRadius: "10px" }}
                image={artist?.image}
                title="artist image"
              /> */}
              <img
                src={artist?.image}
                style={{ borderRadius: "10px", width: "100%", height: 150 }}
              ></img>
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
          </Card>
        ))}
      </Container>
    </>
  );
}
