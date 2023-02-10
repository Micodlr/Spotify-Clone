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
import { Snackbar } from "@material-ui/core";

import { login } from "../../store/session";

const style = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function LoginModal() {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await dispatch(login(email, password));
    history.push("/dashboard/home");

    if (res) {
      return setErrors(res);
    }
    handleClose();
  };

  const handleGuestLogin = async (e) => {
    e.preventDefault();

    // return setEmail("demo@aa.io"), setPassword("password");
    const res = await dispatch(login("demo@aa.io", "password"));
    history.push("/dashboard/home");
    if (res) {
      return setErrors(res);
    }
    handleClose();
  };

  return (
    <div>
      <Button
        sx={{
          borderRadius: "30px",
          background: "whitesmoke",
          py: "12px",
          px: "25px",
          width: "100%",
          color: "black",
          fontSize: "17px",
          fontWeight: "bold",
          "&:hover": { bgcolor: "#d3d3d3" },
        }}
        onClick={handleOpen}
      >
        Log in
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Log in
          </Typography>

          <FormControl noValidate autoComplete="off">
            <TextField
              name="name"
              id="email"
              label={"Email"}
              required
              value={email}
              onChange={updateEmail}
              sx={{ m: "3px 0" }}
            />
            <TextField
              name="name"
              id="password"
              label={"Password"}
              required
              value={password}
              InputProps={{
                type: "password",
              }}
              onChange={updatePassword}
              sx={{ m: "3px 0" }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                m: "3px 0",
                "&:hover": { bgcolor: "#1DB954", fontWeight: "bold" },
              }}
            >
              Log in
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={(e) => handleGuestLogin(e)}
              sx={{ "&:hover": { bgcolor: "#1DB954", fontWeight: "bold" } }}
            >
              Demo User
            </Button>
          </FormControl>
          <div style={{ color: "red" }}>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
        </Box>
      </Modal>
    </div>
  );
}
