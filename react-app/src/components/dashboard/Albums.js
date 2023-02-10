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

export default function Albums({ artistAlbums }) {
  const history = useHistory();
  const onClick = (e, albumId) => {
    e.preventDefault();
    history.push(`/dashboard/albums/${albumId}`);
  };
  //   useEffect(() => {
  //     const myPlaylists = async () => await dispatch(getplaylistsThunk());
  //     myPlaylists();
  //   }, [dispatch]);

  return (
    <Container
      style={{ paddingLeft: "2px", paddingBottom: 100 }}
      sx={{
        display: "flex",
        flexWrap: "wrap",

        pt: "10px",
        gap: "20px",
      }}
    >
      {artistAlbums.map((album) => (
        //   <Card>
        //     <div id="playlist-container" key={playlist?.id}>
        //       <div id="playlist" key={playlist?.id}>
        //         {playlist?.name}
        //       </div>
        //     </div>
        //   </Card>
        <Card key={album.id} sx={{ maxWidth: 180 }}>
          <CardActionArea onClick={(e) => onClick(e, album.id)}>
            <CardMedia
              sx={{ height: 100 }}
              //   image={ playlist?.playlistImg}
              image={album.albumCover}
              title="album cover"
            />
            <CardContent color="custom">
              <Typography
                color="custom"
                gutterBottom
                variant="h5"
                component="div"
              >
                {album.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                album description
              </Typography>
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
