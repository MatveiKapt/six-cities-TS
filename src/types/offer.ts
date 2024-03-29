import {FavoriteStatus} from '../const';

export type City = {
  name: string;
  location: LocationData;
}

export type LocationData = {
  latitude: number,
  longitude: number,
  zoom: number,
}

export type HostData = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export type Offer = {
  bedrooms: number;
  city: City;
  description: string;
  goods: string[];
  host: HostData;
  id: number;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: LocationData;
  maxAdults: number,
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: 'apartment' | 'room' | 'house' | 'hotel';
}

export type SetFavoriteStatusData = {
  offerId: Offer['id'];
  favoriteStatus: FavoriteStatus;
}
