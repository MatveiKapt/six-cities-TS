import {HostData, Offer} from './offer';

export type ReviewType = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: HostData;
};

export type ReviewForSend = Pick<ReviewType, 'comment' | 'rating'> & Pick<Offer, 'id'>;

