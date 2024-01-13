import {unstable_HistoryRouter as HistoryRouter, Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import PrivateRoute from '../private-route/private-route';
import MainPage from '../../pages/main-page/main-page';
import history from '../../history';
import NotFound from '../../pages/not-found/not-found';

function App(): JSX.Element {
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route index path={AppRoute.Main} element={<MainPage />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={`${AppRoute.Offer}/:id`} element={<OfferPage />} />
        <Route path={AppRoute.Favorites} element={<PrivateRoute><FavoritesPage /></PrivateRoute>} />
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
