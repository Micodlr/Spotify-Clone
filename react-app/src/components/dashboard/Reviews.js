import * as React from "react";
import { useState, useEffect } from "react";
import { deleteReviewThunk, getreviewsThunk } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { Box, CardActionArea, Container } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { maxHeight } from "@mui/system";
import { useHistory, useParams } from "react-router-dom";
// import Ellipsis from "./Editreview";
import { getReviewsThunk } from "../../store/reviews";
import EditReviewModal from "./EditReviewModal";

export default function Reviews() {
  const { albumId } = useParams();
  const dispatch = useDispatch();

  const reviews = useSelector((state) => Object.values(state.reviews));
  const user = useSelector((state) => state.session);

  const handleDelete = async (e, reviewId) => {
    e.preventDefault();
    await dispatch(deleteReviewThunk(reviewId));
    dispatch(getReviewsThunk(albumId));
  };

  const history = useHistory();
  const onClick = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    const myreviews = async () => await dispatch(getReviewsThunk(albumId));
    myreviews();
  }, [dispatch, albumId]);

  // useEffect(() => {
  //   dispatch(getReviewsThunk(albumId));
  // }, [dispatch]);

  return (
    <Container sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      <h1 style={{ color: "whitesmoke" }}>Reviews:</h1>
      {reviews.map((review) => (
        <Card
          key={review.id}
          sx={{
            // minWidth: 150,
            // maxWidth: 150,

            // bgcolor: "whitesmoke",
            display: "flex",

            flexWrap: "wrap",
            alignItems: "flex-end",
            flexDirection: "row",
            justifyContent: "space-between",
            p: "10px",

            bgcolor: "whitesmoke",
            color: "black",
            "&:hover": { bgcolor: "white" },
          }}
        >
          <CardContent color="custom">
            <Typography
              // color="custom"
              // gutterBottom
              // variant="h6"
              // sx={{ display: "flex", flexWrap: "wrap" }}
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "normal",
                fontSize: "1.2em",
                marginBottom: "2px",
              }}
              color="custom"
              gutterBottom
              variant="h6"
            >
              {review?.review}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              by: {review?.username?.username}
            </Typography>
          </CardContent>

          {review.userId === user?.user?.id ? (
            <Box
              sx={{
                display: "flex",
                gap: "2px",
                justifyContent: "space-between",
              }}
            >
              <Button
                sx={{
                  bgcolor: "black",
                  color: "whitesmoke",

                  "&:hover": { bgcolor: "red", fontWeight: "bold" },
                }}
                onClick={(e) => handleDelete(e, review.id)}
              >
                DELETE
              </Button>
              <EditReviewModal review={review} />
            </Box>
          ) : (
            <></>
          )}
        </Card>
      ))}
    </Container>
  );
}
