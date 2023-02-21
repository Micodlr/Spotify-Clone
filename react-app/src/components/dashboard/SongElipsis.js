import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Tooltip from "@mui/material/Tooltip";

import { useDispatch, useSelector } from "react-redux";
import { deletePlaylistThunk, getplaylistsThunk } from "../../store/playlists";
import { useHistory, useParams } from "react-router-dom";
import BasicModal from "./Modal";

import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AddIcon from "@mui/icons-material/Add";
import { addSongToPlaylistThunk } from "../../store/playlistSongs";
export default function SongEllipsis({ songId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [nestedAnchorEl, setNestedAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (!user) return;
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setNestedAnchorEl(null);
  };
  const handleNestedMenuOpen = (event) => {
    setNestedAnchorEl(event.currentTarget);
  };

  const history = useHistory();
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   dispatch(getplaylistsThunk());
  // }, [dispatch]);

  const addSong = async (e, playlistId) => {
    e.preventDefault();
    await dispatch(
      addSongToPlaylistThunk({ songId: songId, playlistId: playlistId })
    );
    handleClose();
    // history.push("/dashboard/playlists");
  };

  const user = useSelector((state) => state.session.user);
  const playlists = useSelector((state) => Object.values(state.playlists));
  const userPlaylists = playlists.filter(
    (playlist) => playlist?.userId == user?.id
  );

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Add to playlist">
          <MoreHorizIcon
            onClick={handleClick}
            size="small"
            sx={{ color: "white", ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          ></MoreHorizIcon>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,

          sx: {
            bgcolor: "black",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          sx={{
            color: "whitesmoke",

            "&:hover": { color: "#1DB954", fontWeight: "bold" },
          }}
        >
          <PlaylistAddIcon />

          <BasicModal />
        </MenuItem>
        <MenuItem
          sx={{
            color: "whitesmoke",
            "&:hover": { color: "#1DB954", fontWeight: "bold" },
          }}
          //   onClick={handleNestedMenuOpen}
          onMouseEnter={handleNestedMenuOpen}
        >
          <AddIcon />
          Add to playlist
        </MenuItem>
        <Menu
          id="nested-menu"
          anchorEl={nestedAnchorEl}
          keepMounted
          open={Boolean(nestedAnchorEl)}
          onClose={handleClose}
          onMouseLeave={handleClose}
          PaperProps={{
            elevation: 0,

            sx: {
              bgcolor: "black",
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
        >
          {userPlaylists.map((playlist) => (
            <MenuItem
              sx={{
                bgcolor: "black",
                color: "whitesmoke",
                "&:hover": {
                  bgcolor: "black",
                  color: "#1DB954",
                  fontWeight: "bold",
                },
              }}
              key={playlist.id}
              onClick={(e) => addSong(e, playlist.id)}
            >
              {playlist.name}
            </MenuItem>
          ))}
        </Menu>
      </Menu>
    </React.Fragment>
  );
}
