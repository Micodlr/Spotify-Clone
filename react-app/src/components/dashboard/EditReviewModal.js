import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import BasicTextFields from "./AddPlaylistForm";
import { FormControl, TextField } from "@mui/material";

import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editReviewThunk } from "../../store/reviews";

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

  border: "2px solid #000",
  boxShadow: 24,
  p: 5,
};

export default function EditReviewModal({ review }) {
  const { albumId } = useParams();
  const [errors, setErrors] = React.useState([]);
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
    const res = await dispatch(
      editReviewThunk({ id: review.id, review: data.get("review") })
    );
    if (res) {
      return setErrors(res);
    } else {
      handleClose();
    }

    // if (res) {
    //   setErrors(res);
    // }
  };

  return (
    <>
      <Button
        sx={{
          bgcolor: "#1DB954",
          mb: 0,
          fontSize: "16px",

          "&:hover": {
            bgcolor: "#1DB954",
            fontWeight: "bold",
            color: "whitesmoke",
          },
        }}
        onClick={handleOpen}
      >
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {review.review}
          </Typography>
          {/* <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div> */}

          <FormControl noValidate autoComplete="off">
            <TextField
              inputProps={{ minLength: 4, maxLength: 25 }}
              name="review"
              id="review"
              label="review"
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
    </>
  );
}
