import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {offersProcess} from './offers-process/offers-process';
import {reviewsProcess} from './reviews-process/reviews-process';
import {userProcess} from './user-process/user-process';
import {mainProcess} from './main-process/main-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Offers]: offersProcess.reducer,
  [NameSpace.Reviews]: reviewsProcess.reducer,
  [NameSpace.Main]: mainProcess.reducer,
});
