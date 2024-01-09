import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {changeCity} from './action';
import {
  checkAuthAction,
  fetchReviews,
  fetchNearbyOffers,
  fetchOfferById,
  fetchOffersAction,
  loginUserAction, postReviewAction
} from './api-actions';
import {Offer} from '../types/offer';
import {AuthorizationStatus} from '../const';
import {User} from '../types/user';
import {ReviewType} from '../types/review';

type State = {
  currentCity: string;
  offers: Offer[];
  offer: Offer | undefined;
  nearbyOffers: Offer[];
  reviews: ReviewType[];
  isOffersLoading: boolean;
  isOfferLoading: boolean;
  isNearbyOffersLoading: boolean;
  isReviewsLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: User['email'];
}

const initialState: State = {
  currentCity: 'Paris',
  offers: [],
  offer: undefined,
  nearbyOffers: [],
  reviews: [],
  isOffersLoading: false,
  isOfferLoading: false,
  isNearbyOffersLoading: false,
  isReviewsLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: '',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchOffersAction.pending, (state, action) => {
      state.isOffersLoading = true;
    })
    .addCase(fetchOffersAction.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isOffersLoading = false;
    })
    .addCase(changeCity, (state, action: PayloadAction<string>) => {
      state.currentCity = action.payload;
    })
    .addCase(checkAuthAction.fulfilled, (state, action) => {
      state.user = action.payload.email;
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(checkAuthAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(loginUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(fetchOfferById.pending, (state) => {
      state.isOfferLoading = true;
    })
    .addCase(fetchOfferById.fulfilled, (state, action) => {
      state.offer = action.payload;
      state.isOfferLoading = false;
    })
    .addCase(fetchOfferById.rejected, (state) => {
      state.isOfferLoading = false;
    })
    .addCase(fetchNearbyOffers.pending, (state) => {
      state.isNearbyOffersLoading = true;
    })
    .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
      state.nearbyOffers = action.payload;
      state.isNearbyOffersLoading = false;
    })
    .addCase(fetchReviews.pending, (state) => {
      state.isReviewsLoading = true;
    })
    .addCase(fetchReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
      state.isReviewsLoading = false;
    })
    .addCase(postReviewAction.fulfilled, (state, action) => {
      state.reviews = action.payload;
    });
});

export {reducer};
