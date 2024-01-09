import React, {useEffect} from 'react';
import Logo from '../../components/logo/logo';
import {AppRoute, AuthorizationStatus, cities, CityLocation, OffersType, STARS_COUNT} from '../../const';
import {Link, useParams} from 'react-router-dom';
import ReviewsList from '../../components/reviews-list/reviews-list';
import {useAppDispatch, useAppSelector} from '../../hooks';

import Spinner from '../../components/spinner/spinner';
import {fetchReviews, fetchNearbyOffers, fetchOfferById} from '../../store/api-actions';
import Map from '../../components/map/Map';
import ReviewForm from '../../components/review-form/review-form';

const OfferPage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const isOfferLoading = useAppSelector((state) => state.isOfferLoading);
  const isNearbyOffersLoading = useAppSelector((state) => state.isNearbyOffersLoading);
  const isReviewsLoading = useAppSelector((state) => state.isReviewsLoading);
  const offer = useAppSelector((state) => state.offer);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers);
  const reviews = useAppSelector((state) => state.reviews);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);


  useEffect(() => {
    const paramsId = params.id;

    if (paramsId) {
      const parseId = Number(paramsId);
      dispatch(fetchOfferById(parseId));
      dispatch(fetchNearbyOffers(parseId));
      dispatch(fetchReviews(parseId));
    }
  }, [params, dispatch]);

  if (isOfferLoading) {
    return <Spinner />;
  }

  if (!offer) {
    return null;
  }

  const {
    images,
    isPremium,
    title,
    isFavorite,
    rating,
    bedrooms,
    type,
    maxAdults,
    price,
    goods,
    host,
    description,
    location,
    id,
  } = offer;

  const locations = nearbyOffers.map(({ id: nearbyId, location: nearbyLocation }) => ({ id: nearbyId, ...nearbyLocation }));
  locations.push({id, ...location});
  const indexForMap = cities.indexOf(offer.city.name);

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
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Logo />
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a
                      className="header__nav-link header__nav-link--profile"
                      href="#"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                    Oliver.conner@gmail.com
                      </span>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {images.map((image) => (
                  <div key={image} className="property__image-wrapper">
                    <img
                      className="property__image"
                      src={image}
                      alt="Photo studio"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {
                  isPremium && (
                    <div className="property__mark">
                      <span>Premium</span>
                    </div>)
                }
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {title}
                  </h1>
                  <button
                    className={`property__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`}
                    type="button"
                  >
                    <svg className="property__bookmark-icon" width={31} height={33}>
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{ width: `${(rating * 100) / STARS_COUNT}%` }} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {OffersType[type]}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">€{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {goods.map((good) => (
                      <li key={good} className="property__inside-item">{good}</li>
                    ))}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className={`property__avatar-wrapper ${host.isPro ? 'property__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                      <img
                        className="property__avatar user__avatar"
                        src={`${host.avatarUrl}`}
                        width={74}
                        height={74}
                        alt="Host avatar"
                      />
                    </div>
                    <span className="property__user-name">{host.name}</span>
                    {host.isPro && <span className="property__user-status">Pro</span>}
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  {!isReviewsLoading && <ReviewsList reviews={reviews}/>}
                  {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm id={id}/>}
                </section>
              </div>
            </div>
            <Map
              locations={locations}
              city={CityLocation[cities[indexForMap]]}
              activeOffer={id}
              place={'property'}
            />
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <div className="near-places__list places__list">
                {!isNearbyOffersLoading &&
                  nearbyOffers.map((item) => (
                    <article key={item.id} className="near-places__card place-card">
                      <div className="near-places__image-wrapper place-card__image-wrapper">
                        {item.isPremium && (
                          <div className="place-card__mark">
                            <span>Premium</span>
                          </div>
                        )}
                        <Link to={`${AppRoute.Offer}/${offer.id}`}>
                          <img
                            className="place-card__image"
                            src={item.previewImage}
                            width={260}
                            height={200}
                            alt="Place image"
                          />
                        </Link>
                      </div>
                      <div className="place-card__info">
                        <div className="place-card__price-wrapper">
                          <div className="place-card__price">
                            <b className="place-card__price-value">€{item.price}</b>
                            <span className="place-card__price-text">/&nbsp;night</span>
                          </div>
                          <button
                            className={`place-card__bookmark-button ${item.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
                            type="button"
                          >
                            <svg
                              className="place-card__bookmark-icon"
                              width={18}
                              height={19}
                            >
                              <use xlinkHref="#icon-bookmark"/>
                            </svg>
                            <span className="visually-hidden">In bookmarks</span>
                          </button>
                        </div>
                        <div className="place-card__rating rating">
                          <div className="place-card__stars rating__stars">
                            <span style={{width: `${(rating * 100) / STARS_COUNT}%`}}/>
                            <span className="visually-hidden">Rating</span>
                          </div>
                        </div>
                        <h2 className="place-card__name">
                          <Link to={`${AppRoute.Offer}/${offer.id}`}>{item.title}</Link>
                        </h2>
                        <p className="place-card__type">{OffersType[item.type]}</p>
                      </div>
                    </article>
                  ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default OfferPage;
