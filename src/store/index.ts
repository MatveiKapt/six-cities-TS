import {configureStore} from '@reduxjs/toolkit';
import {createApi} from '../services/api';
import {checkAuthAction, fetchFavoriteOffers, fetchOffersAction} from './api-actions';
import history from '../history';
import {rootReducer} from './root-reducer';

export const api = createApi();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api,
          history,
        },
      },
    }),
});

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());
store.dispatch(fetchFavoriteOffers());
