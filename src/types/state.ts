import {store} from '../store/index';
import {AuthorizationStatus} from '../const';
import {User} from './user';
import {Offer} from './offer';
import {ReviewType} from './review';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof  store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: User['email'];
}

export type OffersProcess = {
  offers: Offer[];
  offer: Offer | undefined;
  nearbyOffers: Offer[];
  favoriteOffers: Offer[];
  isFavoriteOffersLoading: boolean;
  isOffersLoading: boolean;
  isOfferLoading: boolean;
  isNearbyOffersLoading: boolean;
}

export type ReviewsProcess = {
  reviews: ReviewType[];
  isReviewsLoading: boolean;
}

export type MainProcess = {
  currentCity: string;
}
