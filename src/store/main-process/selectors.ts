import {State} from '../../types/state';
import {NameSpace} from '../../const';
import {createSelector} from '@reduxjs/toolkit';
import {getOffers} from '../offers-process/selectors';

export const getCurrentCity = (state: State): string => state[NameSpace.Main].currentCity;

export const getFilterOffersFromCity = createSelector(
  [getOffers, getCurrentCity],
  (offers, currentCity) => offers.filter((offer) => offer.city.name === currentCity)
);
