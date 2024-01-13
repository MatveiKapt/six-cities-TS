import React from 'react';
import {STARS_COUNT} from '../../const';
import {ReviewType} from '../../types/review';

type ReviewPropsType = {
  review: ReviewType;
}

const Review = ({review}: ReviewPropsType) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img
          className="reviews__avatar user__avatar"
          src={review.user.avatarUrl}
          width={59}
          height={59}
          alt="Reviews avatar"
        />
      </div>
      <span className="reviews__user-name">{review.user.name}</span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{width: `${(review.rating * 100) / STARS_COUNT}%`}}/>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">
        {review.comment}
      </p>
      <time className="reviews__time" dateTime={review.date}>
        {review.date}
      </time>
    </div>
  </li>
);

export default Review;
