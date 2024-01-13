import React, {useMemo} from 'react';
import Logo from '../logo/logo';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Link} from 'react-router-dom';
import {getAuthorizationStatus, getUser} from '../../store/user-process/selectors';
import {getFavoriteOffers} from '../../store/offers-process/selectors';
import {logoutUser} from '../../store/api-actions';

const Header = () => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const isLogged = useMemo(() => authorizationStatus === AuthorizationStatus.Auth, [authorizationStatus]);

  const handleLogoutButtonClick = () => {
    if (isLogged) {
      dispatch(logoutUser());
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo/>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {
                isLogged && (
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.Favorites}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                        {user}
                      </span>
                      <span className="header__favorite-count">{favoriteOffers.length}</span>
                    </Link>
                  </li>)
              }
              <li className="header__nav-item">
                <a className="header__nav-link" href="#">
                  <span className="header__signout" onClick={handleLogoutButtonClick}>
                    {isLogged ? 'Sign out' : <Link to={AppRoute.Login}>Sign in</Link>}
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
