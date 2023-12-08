import React, {useState} from 'react';
import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../types/offer';

type OffersListPropsType = {
  offers: Offer[];
}

const OffersList = ({offers}:OffersListPropsType):JSX.Element => {
  const [focusCard, setFocusCard] = useState<number | null>(null);
  const handleCardMouseMove = (id: number) => {
    setFocusCard(id);
  };

  const handleCardMouseLeave = () => {
    setFocusCard(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <OfferCard key={offer.id} offer={offer} onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave} place={'cities'}/>)}
    </div>
  );
};


export default OffersList;
