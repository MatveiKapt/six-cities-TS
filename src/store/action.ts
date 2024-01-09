import {createAction} from '@reduxjs/toolkit';
import {cities} from '../const';
import {Offer} from '../types/offer';

export const changeCity = createAction('main/changeCity', (value: typeof cities[number]) => (
  {
    payload: value,
  }
));

export const loadOffersList = createAction('main/loadOffersList', (offers: Offer[]) => (
  {
    payload: offers,
  }
));
