import React from 'react';
import Logo from '../logo/logo';
import {useAppSelector} from '../../hooks';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Link} from 'react-router-dom';

const Header = () => {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);

  const isLogged = () => authorizationStatus === AuthorizationStatus.Auth;

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
                isLogged() && (
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.Favorites}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                        {user}
                      </span>
                      <span className="header__favorite-count">3</span>
                    </Link>
                  </li>)
              }
              <li className="header__nav-item">
                <a className="header__nav-link" href="#">
                  <span className="header__signout">{isLogged() ? 'Sign out' : <Link to={AppRoute.Login}>Sign in</Link>}</span>
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
