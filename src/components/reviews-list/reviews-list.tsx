import React from 'react';
import {ReviewType} from '../../types/review';
import Review from '../review/review';

type ReviewsListPropsType = {
  reviews: ReviewType[];
}

const ReviewsList = ({reviews}: ReviewsListPropsType) => (
  <>
    <h2 className="reviews__title">
      Reviews · <span className="reviews__amount">{reviews.length}</span>
    </h2>
    <ul className="reviews__list">
      {reviews.map((review) => (
        <Review review={review} key={review.id}/>
      ))}
    </ul>
  </>
);

export default ReviewsList;
