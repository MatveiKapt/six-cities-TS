import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import PrivateRoute from '../private-route/private-route';
import MainPage from '../../pages/main-page/main-page';
import {Offer} from '../../types/offer';
import {reviews} from '../../mocks/reviews';

type AppPropsType = {
  offers: Offer[];
};

function App(props:AppPropsType): JSX.Element {
  const {offers} = props;
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={AppRoute.Main} element={<MainPage offers={offers}/>} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={`${AppRoute.Offer}/:id`} element={<OfferPage reviews={reviews} offers={offers} />} />
        <Route path={AppRoute.Favorites} element={<PrivateRoute authorizationStatus={AuthorizationStatus.Auth}><FavoritesPage offers={offers}/></PrivateRoute>} />
        <Route path={'*'} element={<>404</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
