import React, {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {cities} from '../../const';
import {getCurrentCity} from '../../store/main-process/selectors';
import {changeCity} from '../../store/main-process/main-process';
import City from '../city/city';

const CitiesList = () => {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(getCurrentCity);

  const cityClickHandler = useCallback((city: string) => {
    dispatch(changeCity(city));
  }, [dispatch]);

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <City key={city} isActive={city === currentCity} city={city} cityClickHandler={cityClickHandler}/>
      ))}
    </ul>
  );
};

export default CitiesList;
