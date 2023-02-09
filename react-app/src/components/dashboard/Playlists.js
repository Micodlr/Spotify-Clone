// import React, { useState, useEffect } from "react";
// import NavBar from "../NavBar";

// import "./playlists.css";

// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import CssBaseline from "@mui/material/CssBaseline";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
// import Navigator from "./Navigator";
// import Content from "./Content";
// import Header from "./Header";
// import UsersList from "../UsersList";
// import User from "../User";
// import { Route, Switch } from "react-router-dom";
// import HomePage from "./Home";
// import MuiAudioPlayer from "material-ui-audio-player";
// import AudioPlayer from "material-ui-audio-player";
// import {
//   AppBar,
//   Button,
//   Card,
//   Grid,
//   Paper,
//   TextField,
//   Toolbar,
//   Tooltip,
//   IconButton,
// } from "@mui/material";
// import MediaControlCard from "./MediaPlayer";

// function PlaylistsPage() {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const myPlaylists = async () => await dispatch(getplaylistsThunk());
//     myPlaylists();
//   }, [dispatch]);

//   const playlists = useSelector((state) => Object.values(state.playlists));
//   console.log(playlists);

//   return (
//     <div class="page-container">
//       <h2>Playlists</h2>
//       <div id="playlists-container">
//         {playlists.map((playlist) => (
//           <Card>
//             <div id="playlist-container" key={playlist?.id}>
//               <div id="playlist" key={playlist?.id}>
//                 {playlist?.name}
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>

//   );
// }

// export default PlaylistsPage;

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

export default function PlaylistPage() {
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
            width: 190,
            height: 280,
            p: "10px",

            bgcolor: "#121212",
            color: "white",
            "&:hover": { bgcolor: "#515151" },
          }}
        >
          <CardActionArea onClick={(e) => onClick(e, playlist.id)}>
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
  );
}
