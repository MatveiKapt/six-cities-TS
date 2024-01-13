import React, {memo} from 'react';
import {Offer} from '../../types/offer';
import {AppRoute, OffersType} from '../../const';
import {Link} from 'react-router-dom';
import {STARS_COUNT} from '../../const';
import Bookmark from '../bookmark/bookmark';

type OfferCardProps = Offer & {
  onMouseMove?: (id: number) => void;
  onMouseLeave?: () => void;
}

const OfferCard = ({
  id,
  price,
  title,
  type,
  rating,
  isFavorite,
  isPremium,
  previewImage,
  onMouseMove = () => void 0,
  onMouseLeave = () => void 0,
}:OfferCardProps) => {

  const handleMouseMove = () => {
    onMouseMove(id);
  };

  return(
    <article className="cities__place-card place-card" onMouseMove={handleMouseMove} onMouseLeave={onMouseLeave}>
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>)}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Bookmark isFavorite={isFavorite} offerId={id} place={'place-card'} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${(rating * 100) / STARS_COUNT}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{OffersType[type]}</p>
      </div>
    </article>
  );
};

export default memo(OfferCard, (prevProps, nextProps) => prevProps.isFavorite === nextProps.isFavorite);
