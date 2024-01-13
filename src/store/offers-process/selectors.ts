import {OffersProcess, State} from '../../types/state';
import {Offer} from '../../types/offer';
import {NameSpace} from '../../const';

export const getOffers = (state: State): Offer[] => state[NameSpace.Offers].offers;
export const getOffer = (state: State): Offer | undefined => state[NameSpace.Offers].offer;
export const getNearbyOffers = (state: State): Offer[] => state[NameSpace.Offers].nearbyOffers;
export const getIsOffersLoading = (state: State): OffersProcess['isOffersLoading'] => state[NameSpace.Offers].isOffersLoading;
export const getIsOfferLoading = (state: State): OffersProcess['isOfferLoading'] => state[NameSpace.Offers].isOfferLoading;
export const getIsNearbyOffersLoading = (state: State): OffersProcess['isNearbyOffersLoading'] => state[NameSpace.Offers].isNearbyOffersLoading;
export const getIsFavoriteOffersLoading = (state: State): OffersProcess['isFavoriteOffersLoading'] => state[NameSpace.Offers].isFavoriteOffersLoading;
export const getFavoriteOffers = (state: State): Offer[] => state[NameSpace.Offers].favoriteOffers;
