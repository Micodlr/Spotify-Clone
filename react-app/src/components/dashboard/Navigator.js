import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";

import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import LandingPage from "../LandingPage";
import { Avatar } from "@mui/material";
import "./logo.css";
const categories = [
  {
    id: "Build",
    children: [
      {
        id: "Home",
        icon: <HomeIcon />,
        active: true,
        href: "/",
      },
      { id: "Search", icon: <SearchIcon />, href: "/search" },
      { id: "Your Library", icon: <LibraryMusicIcon />, href: "/library" },
    ],
  },
  {
    id: "Quality",
    children: [
      { id: "Create Playlist", icon: <PlaylistAddIcon />, href: "/search" },
      { id: "Like Songs", icon: <ThumbUpIcon />, href: "/search" },
    ],
  },
];

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{
            ...item,
            ...itemCategory,
            fontSize: 22,
            color: "#ffffff",
          }}
        >
          {/* <Avatar
            src="https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png"
            sx={{
              width: 65,
              height: 65,
            }}
          ></Avatar> */}
          <img
            className="logo"
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
          />
          {/* <Box
            component="img"
            sx={{
              height: 75,
              width: 75,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
              padding: 0,
              margin: 0,
            }}
            alt="The house from the offer."
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
          /> */}
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#00000" }}>
            {children.map(({ id: childId, icon, active, href }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton
                  selected={active}
                  sx={item}
                  href={`/dashboard${href}`}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}

            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
        <ListItemText sx={{ mt: 2, fontSize: 22, color: "#ffffff" }}>
          playlist 1
        </ListItemText>
      </List>
    </Drawer>
  );
}
