import React from 'react';
import {Offer} from '../../types/offer';
import {AppRoute, OffersType} from '../../const';
import {Link} from 'react-router-dom';
import {STARS_COUNT} from '../../const';

type OfferCardProps = {
  offer: Offer;
  onMouseMove?: (id: number) => void;
  onMouseLeave?: () => void;
  place?: 'cities' | 'favorites';
}

const OfferCard = (props:OfferCardProps) => {
  const {
    offer,
    onMouseMove = () => void 0,
    onMouseLeave = () => void 0,
    place
  } = props;
  const {price, title, type, rating, id} = offer;
  const handleMouseMove = () => {
    onMouseMove(id);
  };

  return(
    <article className={`${place!}__place-card place-card`} onMouseMove={handleMouseMove} onMouseLeave={onMouseLeave}>
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>)}
      <div className={`${place!}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${(rating * 100) / STARS_COUNT}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{OffersType[type]}</p>
      </div>
    </article>
  );
};

export default OfferCard;
