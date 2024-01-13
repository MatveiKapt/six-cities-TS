import {OffersProcess} from '../../types/state';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {
  fetchFavoriteOffers,
  fetchNearbyOffers,
  fetchOfferById,
  fetchOffersAction, logoutUser,
  setFavoriteStatus
} from '../api-actions';

const initialState: OffersProcess = {
  offers: [],
  offer: undefined,
  nearbyOffers: [],
  favoriteOffers: [],
  isFavoriteOffersLoading: false,
  isOffersLoading: false,
  isOfferLoading: false,
  isNearbyOffersLoading: false,
};

export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state, action) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
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
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.isFavoriteOffersLoading = true;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteOffersLoading = false;
      })
      .addCase(setFavoriteStatus.fulfilled, (state, action) => {
        const updateOffer = action.payload;

        state.offers = state.offers.map((offer) => offer.id === updateOffer.id ? updateOffer : offer);

        if (state.offer && state.offer.id === updateOffer.id) {
          state.offer = updateOffer;
        }

        if (updateOffer.isFavorite) {
          state.favoriteOffers = state.favoriteOffers.concat(updateOffer);
        } else {
          state.favoriteOffers = state.favoriteOffers.filter((favoriteOffer) => favoriteOffer.id !== updateOffer.id);
        }
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.favoriteOffers = [];

        state.offers.forEach((offer) => {
          offer.isFavorite = false;
        });
      });
  }
});
