import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistSongsThunk } from "../../store/playlistSongs";
import { useParams, Link } from "react-router-dom";
import { getSongsThunk } from "../../store/songs";
import Ellipsis from "./EditPlaylist";
import { Box, fontSize } from "@mui/system";

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
} from "@mui/material";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SongEllipsis from "./SongElipsis";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { Grid } from "@material-ui/core";

// import { getAllreviews } from "../../store/reviews";

export default function AllSongs() {
  const { playlistId } = useParams();

  const dispatch = useDispatch();

  const [imageSrc, setImageSrc] = useState(
    "data:image/jpeg;base64,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"
  );

  useEffect(() => {
    dispatch(getSongsThunk());
    // dispatch(getAllreviews());
  }, [dispatch, playlistId]);
  const songs = useSelector((state) => Object.values(state.songs));

  return (
    <Container sx={{ ml: 0, pb: 5 }}>
      <List>
        {/* <ListSubheader
          style={{ fontSize: "20px", fontWeight: "bold", color: "whitesmoke" }}
        >
          Browse all
        </ListSubheader> */}

        {songs.map((song, index) => (
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
                >
                  <PlayArrowIcon />
                </IconButton>
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
