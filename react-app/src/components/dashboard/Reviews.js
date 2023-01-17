// import * as React from "react";
// import { useState, useEffect } from "react";
// import { getreviewsThunk } from "../../store/reviews";
// import { useDispatch, useSelector } from "react-redux";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import { CardActionArea, Container } from "@mui/material";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { maxHeight } from "@mui/system";
// import { useHistory } from "react-router-dom";
// import Ellipsis from "./Editreview";
// import { getReviewsThunk } from "../../store/reviews";

// export default function Reviews() {
//   const dispatch = useDispatch();

//   const reviews = useSelector((state) => Object.values(state.reviews));

//   const history = useHistory();
//   const onClick = (e) => {
//     e.preventDefault();
//   };
//   //   useEffect(() => {
//   //     const myreviews = async () => await dispatch(getreviewsThunk());
//   //     myreviews();
//   //   }, [dispatch]);

//   useEffect(() => {
//     dispatch(getReviewsThunk());
//   }, [dispatch]);
//   return (
//     <Container sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//       {reviews.map((review) => (
//         //   <Card>
//         //     <div id="review-container" key={review?.id}>
//         //       <div id="review" key={review?.id}>
//         //         {review?.name}
//         //       </div>
//         //     </div>
//         //   </Card>
//         <Card key={review.id} sx={{ maxWidth: 180 }}>
//           <CardActionArea onClick={(e) => onClick(e)}>
//             {/* <CardMedia
//               sx={{ height: 100 }}
//               image={review?.reviewImg}
//               title="review image"
//             /> */}
//             <CardContent color="custom">
//               <Typography
//                 color="custom"
//                 gutterBottom
//                 variant="h5"
//                 component="div"
//               >
//                 {review.name}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 review descrption
//               </Typography>
//             </CardContent>
//             {/* <CardActions>
//           <Button size="small">Share</Button>
//         </CardActions> */}
//           </CardActionArea>
//         </Card>
//       ))}
//     </Container>
//   );
// }
