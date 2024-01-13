import {CityName} from './types/city';
import {LocationData} from './types/offer';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Offer = '/offers',
  Favorites = '/favorites',
  NotFound = '/404',
}

export enum ApiRoute {
  Offers = '/hotels',
  NearbyOffers = '/nearby',
  Favorites = '/favorite',
  Reviews = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum HttpCode {
  NotFound = 404,
  Unauthorized = 401,
}


export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum OffersType {
  apartment = 'Apartment',
  room = 'Private Room',
  house = 'House',
  hotel = 'Hotel',
}

export enum NameSpace {
  Offers = 'OFFERS',
  User = 'USER',
  Reviews = 'REVIEWS',
  Main = 'MAIN',
}

export const STARS_COUNT = 5;

export const cities: string[] = ['Amsterdam', 'Cologne', 'Brussels', 'Paris', 'Hamburg', 'Dusseldorf'];

export enum SortTypes {
  popular = 'Popular',
  lowToHigh = 'Price: low to high',
  highToLow = 'Price: high to low',
  topRatedFirst = 'Top rated first',
}


export const CityLocation: { [key in CityName]: LocationData } = {
  Paris: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13,
  },
  Cologne: {
    latitude: 50.938361,
    longitude: 6.959974,
    zoom: 13,
  },
  Brussels: {
    latitude: 50.846557,
    longitude: 4.351697,
    zoom: 13,
  },
  Amsterdam: {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 13,
  },
  Hamburg: {
    latitude: 53.550341,
    longitude: 10.000654,
    zoom: 13,
  },
  Dusseldorf: {
    latitude: 51.225402,
    longitude: 6.776314,
    zoom: 13,
  },
};

export enum FavoriteStatus {
  Favorite = 1,
  NotFavorite = 0,
}

export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_CURRENT = 'img/pin-active.svg';
