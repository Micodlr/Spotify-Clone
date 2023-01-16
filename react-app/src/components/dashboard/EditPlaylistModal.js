import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import BasicTextFields from "./AddPlaylistForm";
import { FormControl, TextField } from "@mui/material";
import {
  editPlaylistNameThunk,
  getplaylistsThunk,
} from "../../store/playlists";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelect } from "@mui/base";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditPlaylistModal() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const { playlistId } = useParams();

  useEffect(() => {
    const myPlaylists = async () => await dispatch(getplaylistsThunk());
    myPlaylists();
  }, [dispatch, open]);

  const playlist = useSelector((state) => state.playlists[playlistId]);
  const [currentPlaylistName, setCurrentPlaylistName] = React.useState(
    playlist?.name
  );

  const handleOnChange = (e) => {
    setCurrentPlaylistName(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    await dispatch(
      editPlaylistNameThunk({ id: playlist.id, name: data.get("name") })
    );

    handleClose();
    // history.push("/dashboard/library");
    // if (res) {
    //   setErrors(res);
    // }
  };

  return (
    <div>
      <Button
        sx={{
          py: "2px",
          px: "2px",
          width: "100%",
          color: "black",
          fontSize: "17px",
          "&:hover": { color: "#1DB954", fontWeight: "bold" },
        }}
        onClick={handleOpen}
      >
        - Edit name
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Playlist Name
          </Typography>

          <FormControl noValidate autoComplete="off">
            <TextField
              inputProps={{ maxLength: 25 }}
              name="name"
              id="name"
              label={playlist?.name}
            />

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </FormControl>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
        </Box>
      </Modal>
    </div>
  );
}
