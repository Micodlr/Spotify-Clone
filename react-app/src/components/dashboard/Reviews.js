import * as React from "react";
import { useState, useEffect } from "react";
import { getreviewsThunk } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { CardActionArea, Container } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { maxHeight } from "@mui/system";
import { useHistory, useParams } from "react-router-dom";
// import Ellipsis from "./Editreview";
import { getReviewsThunk } from "../../store/reviews";

export default function Reviews() {
  const { albumId } = useParams();
  const dispatch = useDispatch();

  const reviews = useSelector((state) => Object.values(state.reviews));
  const user = useSelector((state) => state.session);

  const history = useHistory();
  const onClick = (e) => {
    e.preventDefault();
  };
  //   useEffect(() => {
  //     const myreviews = async () => await dispatch(getreviewsThunk());
  //     myreviews();
  //   }, [dispatch]);

  useEffect(() => {
    dispatch(getReviewsThunk(albumId));
  }, [dispatch]);
  return (
    <Container sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      <h1 style={{ color: "whitesmoke" }}>Reviews:</h1>
      {reviews.map((review) => (
        <Card key={review.id} sx={{ maxWidth: 180, bgcolor: "whitesmoke" }}>
          <CardActionArea onClick={(e) => onClick(e)}>
            <CardContent color="custom">
              <Typography
                color="custom"
                gutterBottom
                variant="h5"
                component="div"
              >
                {review.review}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                by: {review.username.username}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Container>
  );
}
