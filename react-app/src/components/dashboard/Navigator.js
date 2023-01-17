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
import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import LandingPage from "../LandingPage";
import { Avatar } from "@mui/material";
import { useHistory } from "react-router-dom";
import "./logo.css";
import InfoIcon from "@mui/icons-material/Info";

import BasicModal from "./Modal";
import AboutMeModal from "./AboutMeModal";

const categories = [
  {
    id: "Build",
    children: [
      {
        id: "Home",
        icon: <HomeIcon />,
        active: false,
        href: "/home",
      },
      {
        id: "Artists",
        icon: <GroupIcon />,
        href: "/artists",
      },
      {
        id: "Songs",
        icon: <LibraryMusicIcon />,
        href: "/songs",
      },
      {
        id: "Search",
        icon: <SearchIcon />,
        href: "/search",
      },
      { id: "Your Library", icon: <QueueMusicIcon />, href: "/library" },
    ],
  },
  {
    id: "Quality",
    children: [
      // { id: "Create Playlist", icon: <PlaylistAddIcon />, href: "/search" },
      { id: "Liked Songs", icon: <ThumbUpIcon />, href: "/search" },
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
  px: 2,
};

export default function Navigator(props) {
  const { ...other } = props;
  const history = useHistory();
  function changeUrl(e, href) {
    e.preventDefault();
    history.push(`/dashboard${href}`);
  }

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{
            ...item,
            ...itemCategory,
            fontSize: 22,
            color: "#ffffff",
            p: 2,
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
            {children.map(({ id: childId, icon, active, href, modal }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton
                  selected={active}
                  sx={item}
                  onClick={(e) => changeUrl(e, href)}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}

            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}

        <Box sx={{ bgcolor: "#00000", color: "whitesmoke" }}>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                py: "2px",
                px: 3,
                color: "rgba(255, 255, 255, 0.7)",
                "&:hover, &:focus": {
                  bgcolor: "rgba(255, 255, 255, 0.08)",
                },
              }}
            >
              <ListItemIcon>
                <PlaylistAddIcon />
              </ListItemIcon>
              <BasicModal />
              {/* <ListItemText></ListItemText> */}
            </ListItemButton>
          </ListItem>

          {/* <Divider sx={{ mt: 2 }} /> */}
        </Box>

        <Box sx={{ mt: "220px", color: "whitesmoke" }}>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                mt: "600px",
                py: "2px",
                px: 3,
                color: "rgba(255, 255, 255, 0.7)",
                "&:hover, &:focus": {
                  bgcolor: "rgba(255, 255, 255, 0.08)",
                },
              }}
            >
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <AboutMeModal />
            </ListItemButton>
          </ListItem>

          {/* <Divider sx={{ mt: 2 }} /> */}
        </Box>
      </List>
    </Drawer>
  );
}
