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
import { Alert, Avatar, Button, Snackbar } from "@mui/material";
import { useHistory } from "react-router-dom";
import logo from "./logo2.png";

import { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { useSelector } from "react-redux";
import BasicModal from "./Modal";
import AboutMeModal from "./AboutMeModal";
import { height } from "@mui/system";
import SignUpModal from "../auth/SignupModal";
import LoginModal from "../auth/LoginModal";

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
      // {
      //   id: "Songs",
      //   icon: <LibraryMusicIcon />,
      //   href: "/songs",
      // },
      {
        id: "Search",
        icon: <SearchIcon />,
        href: "/search",
      },
      { id: "Your Library", icon: <QueueMusicIcon />, href: "/library" },
    ],
  },
  // {
  //   id: "Quality",
  //   children: [
  //     // { id: "Create Playlist", icon: <PlaylistAddIcon />, href: "/search" },
  //     { id: "Liked Songs", icon: <ThumbUpIcon />, href: "/likedSongs" },
  //   ],
  // },
];

const categoriesTwo = [
  {
    id: "Build",
    children: [
      {
        id: "Home",
        icon: <HomeIcon />,
        active: false,
        href: "/dashboard",
      },
      {
        id: "Artists",
        icon: <GroupIcon />,
        href: "/artists",
      },
      // {
      //   id: "Songs",
      //   icon: <LibraryMusicIcon />,
      //   href: "/songs",
      // },
      {
        id: "Search",
        icon: <SearchIcon />,
        href: "/search",
      },
      { id: "Your Library", icon: <QueueMusicIcon />, href: "/library" },
    ],
  },
  // {
  //   id: "Quality",
  //   children: [
  //     // { id: "Create Playlist", icon: <PlaylistAddIcon />, href: "/search" },
  //     { id: "Liked Songs", icon: <ThumbUpIcon />, href: "/likedSongs" },
  //   ],
  // },
];

const item = {
  py: "2px",
  px: 3,
  color: "whitesmoke",
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
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { ...other } = props;
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  function changeUrl(e, href) {
    e.preventDefault();
    if (!user) {
      // return history.push("/dashboard/home");
      return handleClick();
    }
    history.push(`/dashboard${href}`);
  }
  return (
    <Drawer variant="permanent" {...other}>
      <List>
        <ListItem
          sx={{
            fontSize: 22,
            color: "#ffffff",
            p: 0.4,
          }}
        >
          <img
            src={logo}
            style={{
              width: "200px",
              height: "90px",
              padding: "0",
            }}
            // src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
          />
        </ListItem>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            height: "80%",
          }}
        >
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
                      Error: Login Required. Please log in to access this
                      feature.
                    </Alert>
                  </Snackbar>
                  {/* <Snackbar
                    anchorOrigin={{
                      vertical: "center",
                      horizontal: "center",
                    }}
                    open={open}
                    onClose={handleClose}
                    message="Snackbar was opened."
                    autoHideDuration={3000}
                  /> */}
                </ListItem>
              ))}

              <Divider sx={{ bgcolor: "	black", mt: 2 }} />
            </Box>
          ))}

          <Box sx={{ bgcolor: "#00000", color: "whitesmoke" }}>
            {!user ? (
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    py: "2px",
                    px: 3,
                    color: "whitesmoke",
                    "&:hover, &:focus": {
                      bgcolor: "rgba(255, 255, 255, 0.08)",
                    },
                  }}
                  onClick={() => (!user ? handleClick() : null)}
                >
                  <ListItemIcon>
                    <PlaylistAddIcon />
                  </ListItemIcon>
                  Create Playlist
                  {/* <ListItemText></ListItemText> */}
                </ListItemButton>

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
                    {/* <Box
                        sx={{ display: "flex", justifyContent: "space-evenly" }}
                      >
                        <Button sx={{ bgcolor: "black" }}>
                          <SignUpModal />
                        </Button>
                        <Button>
                          <LoginModal />
                        </Button>
                      </Box> */}
                  </Alert>
                </Snackbar>
              </ListItem>
            ) : (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      py: "2px",
                      px: 3,
                      color: "whitesmoke",
                      "&:hover, &:focus": {
                        bgcolor: "rgba(255, 255, 255, 0.08)",
                      },
                    }}
                    onClick={() => (!user ? handleClick() : null)}
                  >
                    <ListItemIcon>
                      <PlaylistAddIcon />
                    </ListItemIcon>
                    <BasicModal />
                    {/* <ListItemText></ListItemText> */}
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      py: "2px",
                      px: 3.2,
                      fontSize: 16,
                      color: "whitesmoke",
                      "&:hover, &:focus": {
                        bgcolor: "rgba(255, 255, 255, 0.08)",
                      },
                    }}
                    onClick={(e) => {
                      changeUrl(e, "/likedSongs");
                    }}
                  >
                    <ListItemIcon>
                      <ThumbUpIcon />
                    </ListItemIcon>
                    Liked Songs
                    {/* <ListItemText></ListItemText> */}
                  </ListItemButton>
                </ListItem>
              </>
            )}

            <Divider variant="middle" sx={{ bgcolor: "	#whitesmoke", m: 1 }} />

            <Box sx={{ color: "whitesmoke" }}>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    py: "2px",
                    px: 2.9,
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
            </Box>
          </Box>
        </Box>
      </List>
    </Drawer>
  );
}
