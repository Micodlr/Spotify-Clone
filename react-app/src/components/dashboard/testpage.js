import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import { Divider, Paper } from "@mui/material";
import { Box, Card, Drawer, GridList } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//   },
//   title: {
//     flexGrow: 1,
//   },
//   listItem: {
//     display: "flex",
//     alignItems: "center",
//   },
//   cover: {
//     width: 50,
//     height: 50,
//     marginRight: theme.spacing(2),
//   },
// }));
// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.primary,
//     padding: theme.spacing(2),
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 700,
//     color: theme.palette.primary.main,
//   },
// }));

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    height: 400,
    padding: theme.spacing(2),
  },
}));

function LikedSongsPage() {
  const classes = useStyles();

  return (
    <ul disablePadding>
      {songs.map((song) => (
        <li
          sx={{
            boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
            py: 1.5,
            px: 2,
          }}
          key={song.title}
        >
          <Avatar alt={song.album} src={song.cover} />
          <div>
            <Typography variant="subtitle1">{song.title}</Typography>
            <Typography variant="body2">{song.artist}</Typography>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default LikedSongsPage;
