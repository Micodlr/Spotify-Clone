import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ClearIcon from "@mui/icons-material/Clear";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { deletePlaylistThunk } from "../../store/playlists";
import { useHistory, useParams } from "react-router-dom";
import BasicModal from "./Modal";
import EditPlaylistModal from "./EditPlaylistModal";

export default function Ellipsis() {
  const { playlistId } = useParams();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const history = useHistory();
  const dispatch = useDispatch();

  const deletePlaylist = async (e) => {
    e.preventDefault();
    await dispatch(deletePlaylistThunk(playlistId));
    history.push("/dashboard/library");
  };

  const user = useSelector((state) => state.session.user);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
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
        <MenuItem sx={{ "&:hover": { color: "#1DB954", fontWeight: "bold" } }}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>

          <EditPlaylistModal />
        </MenuItem>
        <MenuItem
          sx={{
            fontSize: "17px",
            "&:hover": { color: "red", fontWeight: "bold" },
          }}
          onClick={deletePlaylist}
        >
          <ListItemIcon>
            <ClearIcon fontSize="medium" />
          </ListItemIcon>
          Delete Playlist
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
