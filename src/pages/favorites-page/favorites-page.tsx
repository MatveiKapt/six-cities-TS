import React from 'react';
import Logo from '../../components/logo/logo';
import {Offer} from '../../types/offer';
import Header from '../../components/header/header';
import {useAppSelector} from '../../hooks';
import {getFavoriteOffers, getIsFavoriteOffersLoading} from '../../store/offers-process/selectors';
import Spinner from '../../components/spinner/spinner';
import Bookmark from '../../components/bookmark/bookmark';
import {AppRoute, STARS_COUNT} from '../../const';
import {Link} from 'react-router-dom';
import FavoritesEmptyPage from '../favorites-empty-page/favorites-empty-page';

const FavoritesPage = () => {
  const isFavoriteOffersLoading = useAppSelector(getIsFavoriteOffersLoading) as boolean;
  const offers = useAppSelector(getFavoriteOffers);

  if (isFavoriteOffersLoading) {
    return <Spinner />;
  }

  if (!offers.length) {
    return <FavoritesEmptyPage />;
  }

  const cities = offers.map((offer: Offer) => offer.city.name);
  const uniqueCities = [...new Set(cities)];

  return (
    <>
      <div style={{ display: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"
            />
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z" />
          </symbol>
          <symbol id="icon-star" viewBox="0 0 13 12">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"
            />
          </symbol>
        </svg>
      </div>
      <div className="page">
        <Header />
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {
                  uniqueCities.map((city) => (
                    <li className="favorites__locations-items" key={city}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{city}</span>
                          </a>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {
                          offers.map((offer) => (offer.city.name === city && offer.isFavorite) && (
                            <article key={offer.id} className="favorites__card place-card">
                              {offer.isPremium && (
                                <div className="place-card__mark">
                                  <span>Premium</span>
                                </div>)}
                              <div className="favorites__image-wrapper place-card__image-wrapper">
                                <Link to={`${AppRoute.Offer}/${offer.id}`}>
                                  <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place image" />
                                </Link>
                              </div>
                              <div className="favorites__card-info place-card__info">
                                <div className="place-card__price-wrapper">
                                  <div className="place-card__price">
                                    <b className="place-card__price-value">&euro;{offer.price}</b>
                                    <span className="place-card__price-text">&#47;&nbsp;night</span>
                                  </div>
                                  <Bookmark isFavorite={offer.isFavorite} offerId={offer.id} />
                                </div>
                                <div className="place-card__rating rating">
                                  <div className="place-card__stars rating__stars">
                                    <span style={{width: `${(offer.rating * 100) / STARS_COUNT}%`}}></span>
                                    <span className="visually-hidden">Rating</span>
                                  </div>
                                </div>
                                <h2 className="place-card__name">
                                  <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
                                </h2>
                                <p className="place-card__type">Apartment</p>
                              </div>
                            </article>)
                          )
                        }
                      </div>
                    </li>
                  ))
                }
              </ul>
            </section>
          </div>
        </main>
        <footer className="footer container">
          <Logo />
        </footer>
      </div>
    </>
  );
};

export default FavoritesPage;
