import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import {ApiRoute, AppRoute, HttpCode} from '../const';
import {Offer, SetFavoriteStatusData} from '../types/offer';
import {User, UserAuth} from '../types/user';
import {History} from 'history';
import {dropToken, saveToken} from '../services/token';
import {ReviewForSend, ReviewType} from '../types/review';

const Action = {
  FETCH_OFFERS: 'offers/fetchOffers',
  FETCH_NEARBY_OFFERS: 'offers/fetchNearbyOffers',
  FETCH_OFFER_BY_ID: 'offers/fetchOfferById',
  FETCH_FAVORITE_OFFERS: 'offers/fetchFavoriteOffers',
  SET_FAVORITE_STATUS: 'offers/setFavoriteStatus',
  FETCH_REVIEWS: 'reviews/fetchReviews',
  CHECK_USER_AUTH: 'user/checkAuth',
  USER_LOGIN: 'user/login',
  USER_LOGOUT: 'user/logout',
  POST_REVIEW: 'reviews/postReview'
};

type Extra = {
  api: AxiosInstance;
  history: History;
}

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: Extra;
}>(
  Action.FETCH_OFFERS,
  async (_arg, {extra}): Promise<Offer[]> => {
    const {api} = extra;
    const response = await api.get<Offer[]>(ApiRoute.Offers);
    const data: Offer[] = response.data;

    return data;
  });

export const checkAuthAction = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: Extra;
}>(Action.CHECK_USER_AUTH,
  async (_arg, {extra}): Promise<User> => {
    const {api} = extra;
    const {data} = await api.get<User>(ApiRoute.Login);
    return data;
  });

export const loginUserAction = createAsyncThunk<User['email'], UserAuth, {extra: Extra}>(
  Action.USER_LOGIN,
  async ({email, password}, {extra}) => {
    const {api, history} = extra;
    const {data} = await api.post<User>(ApiRoute.Login, {email, password});
    const {token} = data;

    saveToken(token);
    history.push(AppRoute.Main);
    return email;
  }
);

export const logoutUser = createAsyncThunk<AxiosResponse, undefined, {extra: Extra}>(
  Action.USER_LOGOUT,
  async (_arg, {extra}) => {
    const {api, history} = extra;

    const {data} = await api.delete<AxiosResponse>(ApiRoute.Logout);

    dropToken();
    history.push(AppRoute.Main);

    return data;
  }
);

export const fetchOfferById = createAsyncThunk<Offer, Offer['id'], {extra: Extra}>(
  Action.FETCH_OFFER_BY_ID,
  async (id, {extra}): Promise<Offer> => {
    const {api, history} = extra;

    try {
      const {data} = await api.get<Offer>(`${ApiRoute.Offers}/${id}`);

      return data;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === HttpCode.NotFound) {
        history.push(AppRoute.NotFound);
      }

      return Promise.reject(error);
    }
  }
);

export const fetchNearbyOffers = createAsyncThunk<Offer[], Offer['id'], {extra: Extra}>(
  Action.FETCH_NEARBY_OFFERS,
  async (id, {extra}): Promise<Offer[]> => {
    const {api} = extra;
    const {data} = await api.get<Offer[]>(`${ApiRoute.Offers}/${id}${ApiRoute.NearbyOffers}`);

    return data;
  }
);

export const fetchReviews = createAsyncThunk<ReviewType[], Offer['id'], {extra: Extra}>(
  Action.FETCH_REVIEWS,
  async (id, {extra}): Promise<ReviewType[]> => {
    const {api} = extra;
    const {data} = await api.get<ReviewType[]>(`${ApiRoute.Reviews}/${id}`);

    return data;
  }
);

export const postReviewAction = createAsyncThunk<ReviewType[], ReviewForSend, {extra: Extra}>(
  Action.POST_REVIEW,
  async ({comment, rating, id}, {extra}): Promise<ReviewType[]> => {
    const {api} = extra;

    const {data} = await api.post<ReviewType[]>(`${ApiRoute.Reviews}/${id.toString()}`, {comment, rating});

    return data;
  }
);

export const fetchFavoriteOffers = createAsyncThunk<Offer[], undefined, {extra: Extra}>(
  Action.FETCH_FAVORITE_OFFERS,
  async (_arg, {extra}): Promise<Offer[]> => {
    const {api} = extra;

    const {data} = await api.get<Offer[]>(ApiRoute.Favorites);

    return data;
  }
);

export const setFavoriteStatus = createAsyncThunk<Offer, SetFavoriteStatusData, {extra: Extra}>(
  Action.SET_FAVORITE_STATUS,
  async ({offerId, favoriteStatus}, {extra}): Promise<Offer> => {
    const {api, history} = extra;

    try {
      const {data} = await api.post<Offer>(`${ApiRoute.Favorites}/${String(offerId)}/${String(favoriteStatus)}`);

      return data;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === HttpCode.Unauthorized) {
        history.push(AppRoute.Login);
      }

      return Promise.reject(error);
    }
  }
);
