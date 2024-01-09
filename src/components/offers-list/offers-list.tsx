import React, {SetStateAction, useState} from 'react';
import OfferCard from '../offer-card/offer-card';
import Sorting from '../sorting/sorting';
import Map from '../map/Map';
import {useAppSelector} from '../../hooks';
import {cities, CityLocation, SortTypes} from '../../const';
import Spinner from '../spinner/spinner';

const OffersList = ():JSX.Element => {
  const [focusCard, setFocusCard] = useState<number | null>(null);
  const handleCardMouseMove = (id: number) => {
    setFocusCard(id);
  };

  const handleCardMouseLeave = () => {
    setFocusCard(null);
  };

  const offers = useAppSelector((state) => state.offers);
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);

  const currentCity = useAppSelector((state) => state.currentCity);
  const currentCityOffers = offers.filter((offer) => offer.city.name === currentCity);

  const [currentSortType, setCurrentSortType] = useState(SortTypes.popular);

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

  const sortTypeClickHandler = (type: SetStateAction<SortTypes>) => {
    setCurrentSortType(type);
  };

  const indexForMap = cities.indexOf(currentCity);

  if (isOffersLoading) {
    return (
      <Spinner />
    );
  }

  return (
    <>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{sortingOffers.length} places to stay in {currentCity}</b>
        <Sorting currentSortType={currentSortType} onSortTypeClick={sortTypeClickHandler}/>
        <div className="cities__places-list places__list tabs__content">
          {currentCityOffers.map((offer) => <OfferCard key={offer.id} offer={offer} onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave} place={'cities'}/>)}
        </div>
      </section>
      <div className="cities__right-section">
        <Map locations={sortingOffers.map(({ id, location }) => ({ id, ...location }))} city={CityLocation[cities[indexForMap]]} activeOffer={focusCard}/>
      </div>
    </>
  );
};


export default OffersList;
