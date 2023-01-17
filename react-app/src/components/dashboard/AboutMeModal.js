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
  bgcolor: "	black",
  borderRadius: "40px",
  display: "flex",
  flexDirection: "column",

  border: "2px solid #212129",
  boxShadow: 24,
  p: 5,
};

export default function AboutMeModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div>
      <Button
        sx={{ py: "2px", px: "2px", color: "whitesmoke" }}
        onClick={handleOpen}
      >
        About Me
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontWeight: "bold", color: "gray" }}
          >
            About Me
          </Typography>
          <Typography
            sx={{ color: "whitesmoke" }}
            id="modal-modal-title"
            variant="p"
            component="h2"
          >
            Michael De los Reyes
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="p"
            component="h2"
            sx={{ color: "#1DB954" }}
          >
            Full Stack Developer
          </Typography>
          <p style={{ color: "whitesmoke" }} id="email">
            Email: dlreyesmico@gmail.com
          </p>
          <a
            style={{ textDecoration: "none", color: "#1DB954" }}
            href="https://github.com/Micodlr"
          >
            Github
          </a>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
        </Box>
      </Modal>
    </div>
  );
}

// <div id="about-me-container">
//   <div id="image-container">
//     <img
//       id="d-choe"
//       src="https://i.pinimg.com/564x/03/7d/eb/037deb185b73074e6d792864730fdca9.jpg"
//     ></img>
//   </div>
//   <div id="info-container">
//     <div id="name-container">
//       <h4>About Me</h4>
//       <h1>Michael De los Reyes</h1>
//       <h5>Full Stack Developer</h5>
//       <p id="email">Email: dlreyesmico@gmail.com</p>
//       <a href="https://github.com/Micodlr">Github</a>
//     </div>
//     <div id="my-links"></div>
//   </div>
// </div>;
