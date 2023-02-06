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
import img from "./Silverbackogo.png";

export default function HomePage() {
  const dispatch = useDispatch();
  //   const playlistsState = useSelector((state) => state.playlists);
  //   console.log(playlistsState);
  const playlists = useSelector((state) => Object.values(state.playlists));

  const history = useHistory();
  const onClick = (e, playlistId) => {
    e.preventDefault();
    history.push(`/dashboard/playlists/${playlistId}`);
  };
  //   useEffect(() => {
  //     const myPlaylists = async () => await dispatch(getplaylistsThunk());
  //     myPlaylists();
  //   }, [dispatch]);

  useEffect(() => {
    dispatch(getplaylistsThunk());
  }, [dispatch]);
  return (
    <>
      <h2 style={{ color: "whitesmoke" }}>Spotify Playlists</h2>
      <Container sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {playlists.map((playlist) => (
          //   <Card>
          //     <div id="playlist-container" key={playlist?.id}>
          //       <div id="playlist" key={playlist?.id}>
          //         {playlist?.name}
          //       </div>
          //     </div>
          //   </Card>
          <Card
            key={playlist.id}
            sx={{
              maxWidth: 180,
              maxWidth: 170,
              p: "10px",
              bgcolor: "#121212",
              color: "white",
              "&:hover": { bgcolor: "#515151" },
            }}
          >
            <CardActionArea onClick={(e) => onClick(e, playlist.id)}>
              <CardMedia
                sx={{ height: 100 }}
                //   image={ playlist?.playlistImg}
                image={playlist?.playlistImg}
                title="playlist image"
              />
              <CardContent color="custom">
                <Typography
                  color="custom"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {playlist.name}
                </Typography>
                <Typography variant="body2" color="gray">
                  playlist descrption
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
