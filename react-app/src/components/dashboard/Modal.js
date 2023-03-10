import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import BasicTextFields from "./AddPlaylistForm";
import { FormControl, TextField } from "@mui/material";
import { addPlaylistsThunk } from "../../store/playlists";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "whitesmoke",
  borderRadius: "40px",
  display: "flex",
  flexDirection: "column",

  border: "2px solid whitesmoke",
  boxShadow: 24,
  p: 5,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    await dispatch(addPlaylistsThunk({ name: data.get("name") }));

    handleClose();
    history.push("/dashboard/library");
    // if (res) {
    //   setErrors(res);
    // }
  };

  return (
    <div>
      <Button
        sx={{ fontSize: 16, py: "2px", px: "2px", color: "whitesmoke" }}
        onClick={handleOpen}
      >
        Create Playlist
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Playlist
          </Typography>

          <FormControl noValidate autoComplete="off">
            <TextField
              inputProps={{ maxLength: 20 }}
              name="name"
              id="name"
              label="Playlist Name"
              required
            />

            <Button
              sx={{ "&:hover": { bgcolor: "#1DB954" } }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </FormControl>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
        </Box>
      </Modal>
    </div>
  );
}
