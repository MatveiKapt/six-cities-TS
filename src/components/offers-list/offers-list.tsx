import React, {SetStateAction, useCallback, useState} from 'react';
import OfferCard from '../offer-card/offer-card';
import Sorting from '../sorting/sorting';
import Map from '../map/Map';
import {useAppSelector} from '../../hooks';
import {cities, CityLocation, SortTypes} from '../../const';
import Spinner from '../spinner/spinner';
import {getIsOffersLoading} from '../../store/offers-process/selectors';
import {getFilterOffersFromCity, getCurrentCity} from '../../store/main-process/selectors';
import MainEmpty from '../main-empty/main-empty';

const OffersList = ():JSX.Element => {
  const [focusCard, setFocusCard] = useState<number | null>(null);
  const isOffersLoading = useAppSelector(getIsOffersLoading);
  const currentCity = useAppSelector(getCurrentCity);
  const currentCityOffers = useAppSelector(getFilterOffersFromCity);
  const [currentSortType, setCurrentSortType] = useState(SortTypes.popular);
  const handleCardMouseMove = (id: number) => {
    setFocusCard(id);
  };

  const handleCardMouseLeave = () => {
    setFocusCard(null);
  };

  let sortingOffers = [];

  switch (currentSortType) {
    case SortTypes.lowToHigh:
      sortingOffers = currentCityOffers.sort((a, b) => a.price - b.price);
      break;
    case SortTypes.highToLow:
      sortingOffers = currentCityOffers.sort((a, b) => b.price - a.price);
      break;
    case SortTypes.topRatedFirst:
      sortingOffers = currentCityOffers.sort((a, b) => b.rating - a.rating);
      break;
    default:
      sortingOffers = currentCityOffers;
  }

  const sortTypeClickHandler = useCallback((type: SetStateAction<SortTypes>) => {
    setCurrentSortType(type);
  }, []);

  const indexForMap = cities.indexOf(currentCity);

  const isEmpty = currentCityOffers.length === 0;

  if (isOffersLoading) {
    return (
      <Spinner />
    );
  }

  if (isEmpty) {
    return <MainEmpty />;
  }

  const locations = currentCityOffers.map(({ id, location }) => ({ id, ...location }));

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{sortingOffers.length} places to stay in {currentCity}</b>
          <Sorting currentSortType={currentSortType} onSortTypeClick={sortTypeClickHandler}/>
          <div className="cities__places-list places__list tabs__content">
            {currentCityOffers
              .map((offer) =>
                (
                  <OfferCard
                    key={offer.id}
                    {...offer}
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                  />
                ))}
          </div>
        </section>
        <div className="cities__right-section">
          <Map locations={locations} city={CityLocation[cities[indexForMap]]} activeOffer={focusCard}/>
        </div>
      </div>
    </div>
  );
};


export default OffersList;
