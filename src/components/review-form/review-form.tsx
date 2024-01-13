import React, {ChangeEvent, FormEvent, Fragment, useState} from 'react';
import {STARS_COUNT} from '../../const';
import {useAppDispatch} from '../../hooks';
import {postReviewAction} from '../../store/api-actions';

type ReviewFormProps = {
  id: number;
}

const ReviewForm = ({id}: ReviewFormProps) => {
  const dispatch = useAppDispatch();

  const [review, setReview] = useState({
    comment: '',
    rating: 0,
  });

  const textInputChangeHandle = (evt:ChangeEvent<HTMLTextAreaElement>) => {
    setReview({
      ...review,
      comment: evt.target.value,
    });
  };

  const ratingChangeHandle = (evt:ChangeEvent<HTMLInputElement>) => {
    setReview({
      ...review,
      rating: Number(evt.target.defaultValue),
    });
  };

  const formSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(postReviewAction({...review, id}));
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={formSubmitHandler}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {Array.from({length: STARS_COUNT}, (_, index) => (
          <Fragment key={`Star ${STARS_COUNT - index}`}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={STARS_COUNT - index}
              id={`${STARS_COUNT - index}-stars`}
              type="radio"
              onChange={ratingChangeHandle}
            />
            <label
              htmlFor={`${STARS_COUNT - index}-stars`}
              className="reviews__rating-label form__rating-label"
              title="perfect"
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
        onChange={textInputChangeHandle}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set&nbsp;
          <span className="reviews__star">rating</span> and describe
          your stay with at least&nbsp;
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
