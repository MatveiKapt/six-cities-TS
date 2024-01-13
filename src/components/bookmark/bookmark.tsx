import React from 'react';
import {Offer} from '../../types/offer';
import {setFavoriteStatus} from '../../store/api-actions';
import {FavoriteStatus} from '../../const';
import {useAppDispatch} from '../../hooks';

type BookmarkProps = {
  isFavorite: boolean;
  offerId: number;
  place?: 'place-card' | 'property';
};

const Bookmark = ({isFavorite, offerId, place = 'place-card'}: BookmarkProps) => {
  const dispatch = useAppDispatch();
  const handleSetFavoriteStatus = (currentStatus: Offer['isFavorite'], id: Offer['id']): void => {
    if (currentStatus) {
      dispatch(setFavoriteStatus({offerId: id, favoriteStatus: FavoriteStatus.NotFavorite}));
    } else {
      dispatch(setFavoriteStatus({offerId: id, favoriteStatus: FavoriteStatus.Favorite}));
    }
  };

  return (
    <button
      className={`${place}__bookmark-button button ${isFavorite ? `${place}__bookmark-button--active` : ''}`}
      type="button"
      onClick={() => handleSetFavoriteStatus(isFavorite, offerId)}
    >
      <svg
        className={`${place}__bookmark-icon`}
        width={place === 'property' ? 31 : 18}
        height={place === 'property' ? 33 : 19}
      >
        <use xlinkHref="#icon-bookmark"/>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};

export default Bookmark;
