import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Navigator from "./Navigator";
import Content from "./Content";
import Header from "./Header";
import UsersList from "../UsersList";
import User from "../User";
import { Route, Switch } from "react-router-dom";
import HomePage from "./Home";
import MuiAudioPlayer from "material-ui-audio-player";
import AudioPlayer from "material-ui-audio-player";
import { Card } from "@mui/material";
import MediaControlCard from "./MediaPlayer";
import PlaylistsPage from "./Playlists";
import PlaylistSongs from "./PlaylistSongs";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getplaylistsThunk } from "../../store/playlists";
import SearchPage from "./SongsPage";
import AccountMenu from "./AccountMenu";
import { yellow } from "@mui/material/colors";
import ArtistsPage from "./Artists";
import { getArtistThunk } from "../../store/artists";
import ArtistIdPage from "./ArtistIdPage";
import AlbumPage from "./AlbumPage";
import SongsPage from "./SongsPage";
import LikedSongsPage from "./testpage";
import Dashboard from "./Dashboard";
import AllSongs from "./SongsPage";
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

let theme = createTheme({
  palette: {
    primary: {
      light: "#63ccff",
      main: "#0a0001",
      dark: "#006db3",
    },
    secondary: {
      main: "#e9f542",
    },
    // custom: {
    //   light: "#e517fc",
    //   main: "#cc1629",
    //   dark: "#e517fc",
    //   contrastText: "rgba(0, 0, 0, 0.87)",
    // },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#0a0001",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        contained: {
          boxShadow: "none",
          "&:active": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          margin: "0 16px",
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up("md")]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(255,255,255,0.15)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#4fc3f7",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 16,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
          minWidth: "auto",
          marginRight: theme.spacing(2),
          "& svg": {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

const drawerWidth = 220;

export default function Paperbase() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getArtistThunk());
  // }, [dispatch]);
  // useEffect(() => {
  //   const myPlaylists = async () => await dispatch(getplaylistsThunk());
  //   myPlaylists();
  // }, [dispatch]);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: "blue", display: "flex", height: "100vh" }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
          }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}

          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{
              backgroundColor: "blue",
              display: { sm: "flex", xs: "none" },
            }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header onDrawerToggle={handleDrawerToggle} />
          <Box
            component="nav"
            sx={{
              flex: 1,
              pt: 1,
              pb: 14,
              px: 2,

              bgcolor: "#0f0f0f",
            }}
          >
            <Switch>
              <Route exact path="/">
                <Content Component={Dashboard} />
              </Route>
              <Route exact path="/dashboard/home">
                <Content Component={HomePage} />
              </Route>
              {/* <Route exact path="/dashboard/artists">
                <Content Component={ArtistsPage} />
              </Route> */}
              <Route exact path="/dashboard/artists/:artistId">
                <Content Component={ArtistIdPage} />
              </Route>
              <Route exact path="/dashboard/artists/">
                <Content Component={ArtistsPage} />
              </Route>
              <Route exact path="/dashboard/albums/:albumId">
                <Content Component={AlbumPage} />
              </Route>
              <Route path="/dashboard/likedSongs">
                <Content Component={AllSongs} />
              </Route>
              <Route path="/dashboard/library">
                <Content Component={PlaylistsPage} />
              </Route>
              <Route exact path="/dashboard/playlists">
                <Content Component={PlaylistsPage} />
              </Route>
              <Route exact path="/dashboard/playlists/:playlistId">
                <Content Component={PlaylistSongs} />
              </Route>
            </Switch>
          </Box>
          <Box
            component="footer"
            sx={{
              bottom: 0,
              width: "100%",
              position: "fixed",
              p: 0,
              bgcolor: "#0f0f0f",
            }}
          >
            {/* <audio
              controls
              // src="https://boring-music.s3.us-west-1.amazonaws.com/clear-sky-hartzmann-main-version-02-20-18592.mp3"
            ></audio> */}
            <Copyright />
            <MediaControlCard />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
