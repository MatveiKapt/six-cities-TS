import {State} from '../../types/state';
import {ReviewType} from '../../types/review';
import {NameSpace} from '../../const';

export const getReviews = (state: State): ReviewType[] => state[NameSpace.Reviews].reviews;
export const getIsReviewsLoading = (state: State): boolean => state[NameSpace.Reviews].isReviewsLoading;
