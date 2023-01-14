import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Tooltip from "@mui/material/Tooltip";

import { useDispatch, useSelector } from "react-redux";
import { deletePlaylistThunk } from "../../store/playlists";
import { useHistory, useParams } from "react-router-dom";
import BasicModal from "./Modal";

import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AddIcon from "@mui/icons-material/Add";
import { addSongToPlaylistThunk } from "../../store/playlistSongs";
import ClearIcon from "@mui/icons-material/Clear";
import { deleteSongThunk } from "../../store/playlistSongs";
import { getPlaylistSongsThunk } from "../../store/playlistSongs";
export default function PlaylistSongsElipsis({ songId }) {
  const { playlistId } = useParams();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [nestedAnchorEl, setNestedAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
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

  //   React.useEffect(() => {
  //     dispatch(getPlaylistSongsThunk(playlistId));
  //     // dispatch(getAllreviews());
  //   }, [dispatch, playlistId]);
  const deleteSong = async (e, playlistId, songId) => {
    e.preventDefault();
    await dispatch(deleteSongThunk({ songId: songId, playlistId: playlistId }));
    handleClose();
    dispatch(getPlaylistSongsThunk(playlistId));
    history.push(`/dashboard/playlists/${playlistId}`);
  };

  const user = useSelector((state) => state.session.user);
  const playlists = useSelector((state) => Object.values(state.playlists));

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
          sx={{ "&:hover": { color: "red", fontWeight: "bold" } }}
          onClick={(e) => deleteSong(e, playlistId, songId)}
        >
          <ClearIcon />
          Remove from playlist
        </MenuItem>
        {/* <MenuItem
          sx={{ "&:hover": { color: "#1DB954", fontWeight: "bold" } }}
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
          //   onClose={handleClose}
          onMouseLeave={handleClose}
        >
          {playlists.map((playlist) => (
            <MenuItem onClick={(e) => addSong(e, playlist.id)}>
              {playlist.name}
            </MenuItem>
          ))}
        </Menu> */}
      </Menu>
    </React.Fragment>
  );
}
