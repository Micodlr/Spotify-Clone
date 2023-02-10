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
import { signUp } from "../../store/session";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function SignUpModal() {
  const [open, setOpen] = React.useState(false);
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = await dispatch(
      signUp(firstName, lastName, username, email, password)
    );
    if (data) {
      return setErrors(data);
    } else {
      handleClose();
    }

    // history.push("/dashboard/library");
    // if (res) {
    //   setErrors(res);
    // }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <Button
        sx={{
          py: "12px",
          px: "25px",
          width: "100%",
          color: "#d3d3d3",
          fontSize: "17px",
          fontWeight: "bold",
          "&:hover": { color: "white" },
        }}
        onClick={handleOpen}
      >
        Sign up
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sign up
          </Typography>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>

          <FormControl noValidate autoComplete="off">
            <TextField
              sx={{ m: "3px 0" }}
              name="firstName"
              id="firstName"
              label={"First Name"}
              onChange={updateUsername}
              value={username}
              required
            />
            <TextField
              sx={{ m: "2px 0" }}
              name="lastName"
              id="lastName"
              label={"last Name"}
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
            />
            <TextField
              sx={{ m: "2px 0" }}
              name="username"
              id="username"
              label={"Username"}
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
            />
            <TextField
              sx={{ m: "2px 0" }}
              name="email"
              id="email"
              label={"Email"}
              onChange={updateEmail}
              value={email}
              required
            />
            <TextField
              sx={{ m: "2px 0" }}
              name="password"
              id="password"
              label={"Password"}
              onChange={updatePassword}
              value={password}
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ "&:hover": { bgcolor: "#1DB954", fontWeight: "bold" } }}
            >
              Create account
            </Button>
          </FormControl>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
        </Box>
      </Modal>
    </div>
  );
}
