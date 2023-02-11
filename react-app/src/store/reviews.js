import { csrfFetch } from "./csrf";

const GET_REVIEWS = "reviews/GET_REVIEWS";
const ADD_REVIEW = "reviews/ADD_REVIEW";
const EDIT_REVIEW = "reviews/EDIT_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews,
});
const addReview = (review) => ({
  type: ADD_REVIEW,
  review,
});

const editReview = (review) => ({
  type: EDIT_REVIEW,
  review,
});

const deleteReview = (review) => ({
  type: DELETE_REVIEW,
  review,
});

export const clearReviews = () => ({
  type: GET_REVIEWS,
  reviews: {},
});

export const addReviewThunk = (review) => async (dispatch) => {
  const { albumId } = review;

  const res = await csrfFetch(`/api/albums/${albumId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const newReview = await res.json();
    dispatch(addReview(newReview));
  }
  return res;
};

export const editReviewThunk = (review) => async (dispatch) => {
  const { id } = review;
  const res = await csrfFetch(`/api/reviews/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const editedReview = await res.json();
    dispatch(editReview(editedReview));
  } else if (res.errors) {
    return res.errors;
  }

  return res;
};

export const deleteReviewThunk = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteReview(id));
    return res;
  }
};

export const getReviewsThunk = (albumId) => async (dispatch) => {
  const res = await csrfFetch(`/api/albums/${albumId}/reviews`);

  const { reviews } = await res.json();

  if (res.ok) {
    const data = {};
    reviews.forEach((review) => (data[review.id] = review));
    dispatch(getReviews(data));
  }
  return res;
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case GET_REVIEWS:
      return { ...action.reviews };
    case ADD_REVIEW:
      //   return { ...state, ...action.reviews };
      newState = { ...state, [action.review.id]: action.review };
      return newState;
    case EDIT_REVIEW:
      newState = { ...state, [action.review.id]: action.review };
      return newState;
    case DELETE_REVIEW:
      delete newState[action.review];
      return newState;
    default:
      return newState;
  }
};

export default reviewsReducer;
